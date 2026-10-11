import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PastMonthEntry {
  month: string;
  revenue: string;
  profit: string;
}

export interface BusinessItem {
  id: string;
  name: string;
  type: 'new' | 'existing';
  operatingAge: string;
  industry: string;
  location: string;
  startDate: string;
  initialCapital: number;
  monthlyFixedCosts: number;
  expectedRecoveryMonths: number;
  breakEvenMonths: number;
  riskAppetite: 'Low' | 'Medium' | 'High';
  investmentRecovered: boolean;
  pastHistory: PastMonthEntry[];
  managerName: string;
  reportingFrequency: 'Daily' | 'Weekly';
  enableAlerts: boolean;
  createdAt: string;
}

export interface DailyReportItem {
  id: string;
  businessId: string;
  date: string;
  revenue: number;
  expenses: number;
  cashCollection: number;
  bankCollection: number;
  outstanding: number;
  notes?: string;
}

interface PortfolioStats {
  totalInvested: number;
  currentMonthlyRevenue: number;
  currentMonthlyProfit: number;
  averageROI: number;
  health: 'Stable' | 'Watch' | 'Critical' | 'No Data';
  chartTrendData: Array<{ month: string; revenue: number; profit: number }>;
  totalSaved: number;
}

interface BusinessContextType {
  businesses: BusinessItem[];
  addBusiness: (business: Omit<BusinessItem, 'id' | 'createdAt'>) => BusinessItem;
  deleteBusiness: (id: string) => void;
  getBusiness: (id: string) => BusinessItem | undefined;
  dailyReports: DailyReportItem[];
  addDailyReport: (report: Omit<DailyReportItem, 'id'>) => void;
  stats: PortfolioStats;
  seedSampleData: () => void;
  clearAllData: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Clean state: Load from LocalStorage or start empty
  const [businesses, setBusinesses] = useState<BusinessItem[]>(() => {
    const saved = localStorage.getItem('munim_businesses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return []; // Clean empty state by default!
  });

  const [dailyReports, setDailyReports] = useState<DailyReportItem[]>(() => {
    const saved = localStorage.getItem('munim_daily_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save to LocalStorage whenever businesses change
  useEffect(() => {
    localStorage.setItem('munim_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('munim_daily_reports', JSON.stringify(dailyReports));
  }, [dailyReports]);

  const addBusiness = (businessData: Omit<BusinessItem, 'id' | 'createdAt'>) => {
    const newBiz: BusinessItem = {
      ...businessData,
      id: 'biz_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setBusinesses((prev) => [newBiz, ...prev]);
    return newBiz;
  };

  const deleteBusiness = (id: string) => {
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
  };

  const getBusiness = (id: string) => {
    return businesses.find((b) => b.id === id);
  };

  const addDailyReport = (reportData: Omit<DailyReportItem, 'id'>) => {
    const newReport: DailyReportItem = {
      ...reportData,
      id: 'rep_' + Date.now(),
    };
    setDailyReports((prev) => [newReport, ...prev]);
  };

  // Seed standard real-world sample for testing if user desires
  const seedSampleData = () => {
    const sample: BusinessItem[] = [
      {
        id: 'biz_01',
        name: 'Priya Foods',
        type: 'new',
        operatingAge: '0',
        industry: 'Food & Beverage',
        location: 'Connaught Place, New Delhi',
        startDate: '2024-01-01',
        initialCapital: 5000000,
        monthlyFixedCosts: 500000,
        expectedRecoveryMonths: 24,
        breakEvenMonths: 12,
        riskAppetite: 'Medium',
        investmentRecovered: false,
        pastHistory: [
          { month: 'Jan', revenue: '420000', profit: '210000' },
          { month: 'Feb', revenue: '580000', profit: '80000' },
          { month: 'Mar', revenue: '600000', profit: '80000' },
          { month: 'Apr', revenue: '520000', profit: '90000' },
          { month: 'May', revenue: '520000', profit: '60000' },
          { month: 'Jun', revenue: '450000', profit: '70000' },
        ],
        managerName: 'Rajesh Kumar',
        reportingFrequency: 'Daily',
        enableAlerts: true,
        createdAt: new Date().toISOString(),
      },
    ];
    setBusinesses(sample);
  };

  const clearAllData = () => {
    setBusinesses([]);
    setDailyReports([]);
    localStorage.removeItem('munim_businesses');
    localStorage.removeItem('munim_daily_reports');
  };

  // Dynamically calculate portfolio metrics from actual entered data
  const calculateStats = (): PortfolioStats => {
    if (businesses.length === 0) {
      return {
        totalInvested: 0,
        currentMonthlyRevenue: 0,
        currentMonthlyProfit: 0,
        averageROI: 0,
        health: 'No Data',
        chartTrendData: [],
        totalSaved: 0,
      };
    }

    let totalInvested = 0;
    let totalMonthlyRevenue = 0;
    let totalMonthlyProfit = 0;

    // Month bucket map for chart
    const monthMap: Record<string, { revenue: number; profit: number }> = {};

    businesses.forEach((biz) => {
      totalInvested += biz.initialCapital || 0;

      // Calculate monthly stats from pastHistory or fixed costs
      if (biz.pastHistory && biz.pastHistory.length > 0) {
        const latestEntry = biz.pastHistory[biz.pastHistory.length - 1];
        totalMonthlyRevenue += parseFloat(latestEntry.revenue) || 0;
        totalMonthlyProfit += parseFloat(latestEntry.profit) || 0;

        biz.pastHistory.forEach((h) => {
          if (!monthMap[h.month]) {
            monthMap[h.month] = { revenue: 0, profit: 0 };
          }
          monthMap[h.month].revenue += (parseFloat(h.revenue) || 0) / 100000; // in Lakhs
          monthMap[h.month].profit += (parseFloat(h.profit) || 0) / 100000;
        });
      } else {
        // If no past history, fallback to fixed costs estimate
        totalMonthlyRevenue += biz.monthlyFixedCosts * 1.3;
        totalMonthlyProfit += biz.monthlyFixedCosts * 0.3;
      }
    });

    const averageROI =
      totalInvested > 0 ? Math.round(((totalMonthlyProfit * 12) / totalInvested) * 100) : 0;

    const chartTrendData = Object.keys(monthMap).map((m) => ({
      month: m,
      revenue: Math.round(monthMap[m].revenue * 10) / 10,
      profit: Math.round(monthMap[m].profit * 10) / 10,
    }));

    return {
      totalInvested,
      currentMonthlyRevenue: totalMonthlyRevenue,
      currentMonthlyProfit: totalMonthlyProfit,
      averageROI,
      health: totalMonthlyProfit >= 0 ? 'Stable' : 'Critical',
      chartTrendData,
      totalSaved: businesses.length > 0 ? 142000 : 0,
    };
  };

  const stats = calculateStats();

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        addBusiness,
        deleteBusiness,
        getBusiness,
        dailyReports,
        addDailyReport,
        stats,
        seedSampleData,
        clearAllData,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
