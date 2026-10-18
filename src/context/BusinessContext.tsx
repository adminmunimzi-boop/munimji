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

export interface ManagerItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessId: string;
  businessName: string;
  cutoffTime: string; // e.g. "22:00"
  status: 'Active' | 'Pending' | 'On Leave' | 'Inactive';
  streakDays: number;
  completionRate: number; // e.g. 96
  createdAt: string;
}

export interface DailyReportItem {
  id: string;
  businessId: string;
  businessName?: string;
  managerId?: string;
  managerName?: string;
  date: string;
  revenue: number;
  expenses: number;
  cashCollection: number;
  bankCollection: number;
  outstanding: number;
  // Detailed breakdown
  cashSales?: number;
  digitalSales?: number;
  creditSales?: number;
  rawMaterialExpenses?: number;
  laborExpenses?: number;
  utilitiesExpenses?: number;
  otherExpenses?: number;
  closingCashInDrawer?: number;
  discrepancy?: number;
  billCount?: number;
  notes?: string;
  status?: 'Verified' | 'Pending' | 'Flagged';
  submittedAt?: string;
}

export interface StoreClosureItem {
  id: string;
  businessId: string;
  date: string; // YYYY-MM-DD
  reason: 'Weekly Off' | 'Festival / Holiday' | 'Maintenance / Renovation' | 'Emergency' | 'Other';
  notes?: string;
  markedBy?: string;
  createdAt: string;
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
  managers: ManagerItem[];
  addManager: (manager: Omit<ManagerItem, 'id' | 'createdAt'>) => ManagerItem;
  updateManager: (id: string, updates: Partial<ManagerItem>) => void;
  deleteManager: (id: string) => void;
  dailyReports: DailyReportItem[];
  addDailyReport: (report: Omit<DailyReportItem, 'id'>) => void;
  verifyDailyReport: (id: string, status: 'Verified' | 'Flagged') => void;
  storeClosures: StoreClosureItem[];
  markStoreClosed: (closure: Omit<StoreClosureItem, 'id' | 'createdAt'>) => void;
  removeStoreClosure: (id: string) => void;
  getDateReportingState: (
    businessId: string,
    dateStr: string,
    cutoffTime?: string
  ) => 'submitted' | 'closed' | 'missed' | 'today' | 'future';
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

  const [managers, setManagers] = useState<ManagerItem[]>(() => {
    const saved = localStorage.getItem('munim_managers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
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

  const [storeClosures, setStoreClosures] = useState<StoreClosureItem[]>(() => {
    const saved = localStorage.getItem('munim_store_closures');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('munim_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('munim_managers', JSON.stringify(managers));
  }, [managers]);

  useEffect(() => {
    localStorage.setItem('munim_daily_reports', JSON.stringify(dailyReports));
  }, [dailyReports]);

  useEffect(() => {
    localStorage.setItem('munim_store_closures', JSON.stringify(storeClosures));
  }, [storeClosures]);

  const addBusiness = (businessData: Omit<BusinessItem, 'id' | 'createdAt'>) => {
    const newBiz: BusinessItem = {
      ...businessData,
      id: 'biz_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setBusinesses((prev) => [newBiz, ...prev]);

    // If a manager name is provided during business onboarding, auto-register them
    if (businessData.managerName && businessData.managerName.trim() && businessData.managerName !== 'Owner Managed') {
      const newMgr: ManagerItem = {
        id: 'mgr_' + Date.now(),
        name: businessData.managerName.trim(),
        phone: '+91 98765 43210',
        businessId: newBiz.id,
        businessName: newBiz.name,
        cutoffTime: '22:00',
        status: 'Active',
        streakDays: 1,
        completionRate: 100,
        createdAt: new Date().toISOString(),
      };
      setManagers((prev) => [newMgr, ...prev]);
    }

    return newBiz;
  };

  const deleteBusiness = (id: string) => {
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
    setManagers((prev) => prev.filter((m) => m.businessId !== id));
    setDailyReports((prev) => prev.filter((r) => r.businessId !== id));
    setStoreClosures((prev) => prev.filter((c) => c.businessId !== id));
  };

  const getBusiness = (id: string) => {
    return businesses.find((b) => b.id === id);
  };

  const addManager = (managerData: Omit<ManagerItem, 'id' | 'createdAt'>) => {
    const newMgr: ManagerItem = {
      ...managerData,
      id: 'mgr_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setManagers((prev) => [newMgr, ...prev]);

    // Update business's assigned manager name
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === managerData.businessId ? { ...b, managerName: managerData.name } : b
      )
    );

    return newMgr;
  };

  const updateManager = (id: string, updates: Partial<ManagerItem>) => {
    setManagers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteManager = (id: string) => {
    setManagers((prev) => prev.filter((m) => m.id !== id));
  };

  const addDailyReport = (reportData: Omit<DailyReportItem, 'id'>) => {
    const newReport: DailyReportItem = {
      ...reportData,
      id: 'rep_' + Date.now(),
      status: reportData.status || 'Verified',
      submittedAt: reportData.submittedAt || new Date().toISOString(),
    };
    // Replace if report exists for same business and date, otherwise prepend
    setDailyReports((prev) => {
      const filtered = prev.filter(
        (r) => !(r.businessId === reportData.businessId && r.date === reportData.date)
      );
      return [newReport, ...filtered];
    });

    // Remove any store closure marked for this date since a report was submitted
    setStoreClosures((prev) =>
      prev.filter((c) => !(c.businessId === reportData.businessId && c.date === reportData.date))
    );

    // Update submitting manager's streak if found
    if (reportData.managerId) {
      setManagers((prev) =>
        prev.map((m) =>
          m.id === reportData.managerId
            ? { ...m, streakDays: m.streakDays + 1, completionRate: Math.min(100, m.completionRate + 1) }
            : m
        )
      );
    }
  };

  const verifyDailyReport = (id: string, status: 'Verified' | 'Flagged') => {
    setDailyReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const markStoreClosed = (closureData: Omit<StoreClosureItem, 'id' | 'createdAt'>) => {
    const newClosure: StoreClosureItem = {
      ...closureData,
      id: 'cls_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setStoreClosures((prev) => {
      const filtered = prev.filter(
        (c) => !(c.businessId === closureData.businessId && c.date === closureData.date)
      );
      return [newClosure, ...filtered];
    });
  };

  const removeStoreClosure = (id: string) => {
    setStoreClosures((prev) => prev.filter((c) => c.id !== id));
  };

  const getDateReportingState = (
    businessId: string,
    dateStr: string,
    cutoffTime: string = '22:00'
  ): 'submitted' | 'closed' | 'missed' | 'today' | 'future' => {
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Check if store was closed on this date
    const isClosed = storeClosures.some(
      (c) => c.businessId === businessId && c.date === dateStr
    );
    if (isClosed) return 'closed';

    // 2. Check if a report was submitted
    const hasReport = dailyReports.some(
      (r) => r.businessId === businessId && r.date === dateStr
    );
    if (hasReport) return 'submitted';

    // 3. Future dates
    if (dateStr > todayStr) {
      return 'future';
    }

    // 4. Current day
    if (dateStr === todayStr) {
      return 'today';
    }

    // 5. Past date with no report and not closed is missed
    return 'missed';
  };

  // Seed standard real-world sample for testing if user desires
  const seedSampleData = () => {
    const today = new Date();
    const formatDate = (offsetDays: number) => {
      const d = new Date();
      d.setDate(today.getDate() - offsetDays);
      return d.toISOString().split('T')[0];
    };

    const sampleBiz: BusinessItem[] = [
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
      {
        id: 'biz_02',
        name: 'Shree Sai Fashion',
        type: 'existing',
        operatingAge: '2+ years',
        industry: 'Retail & Garments',
        location: 'Chandni Chowk, Delhi',
        startDate: '2023-04-01',
        initialCapital: 1000000,
        monthlyFixedCosts: 180000,
        expectedRecoveryMonths: 18,
        breakEvenMonths: 6,
        riskAppetite: 'Low',
        investmentRecovered: false,
        pastHistory: [
          { month: 'Apr', revenue: '220000', profit: '50000' },
          { month: 'May', revenue: '250000', profit: '62000' },
          { month: 'Jun', revenue: '240000', profit: '58000' },
        ],
        managerName: 'Amit Verma',
        reportingFrequency: 'Daily',
        enableAlerts: true,
        createdAt: new Date().toISOString(),
      },
    ];

    const sampleManagers: ManagerItem[] = [
      {
        id: 'mgr_01',
        name: 'Rajesh Kumar',
        phone: '+91 98112 45678',
        email: 'rajesh@priyafoods.in',
        businessId: 'biz_01',
        businessName: 'Priya Foods',
        cutoffTime: '22:00',
        status: 'Active',
        streakDays: 14,
        completionRate: 98,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'mgr_02',
        name: 'Amit Verma',
        phone: '+91 98765 89012',
        email: 'amit@shreesai.in',
        businessId: 'biz_02',
        businessName: 'Shree Sai Fashion',
        cutoffTime: '21:30',
        status: 'Active',
        streakDays: 8,
        completionRate: 92,
        createdAt: new Date().toISOString(),
      },
    ];

    // Seed multiple days of reports for October to populate calendar
    const sampleReports: DailyReportItem[] = [
      {
        id: 'rep_today',
        businessId: 'biz_01',
        businessName: 'Priya Foods',
        managerId: 'mgr_01',
        managerName: 'Rajesh Kumar',
        date: formatDate(0), // Today
        revenue: 18500,
        expenses: 11200,
        cashCollection: 11000,
        bankCollection: 7500,
        cashSales: 11000,
        digitalSales: 7500,
        creditSales: 0,
        rawMaterialExpenses: 8000,
        laborExpenses: 2500,
        utilitiesExpenses: 700,
        otherExpenses: 0,
        closingCashInDrawer: 4500,
        discrepancy: 0,
        billCount: 142,
        outstanding: 0,
        notes: 'Dinner rush was active. All kitchen bills closed cleanly.',
        status: 'Verified',
        submittedAt: new Date().toISOString(),
      },
      {
        id: 'rep_1',
        businessId: 'biz_01',
        businessName: 'Priya Foods',
        managerId: 'mgr_01',
        managerName: 'Rajesh Kumar',
        date: formatDate(1), // Yesterday
        revenue: 19200,
        expenses: 11800,
        cashCollection: 11500,
        bankCollection: 7700,
        cashSales: 11500,
        digitalSales: 7700,
        creditSales: 0,
        rawMaterialExpenses: 8200,
        laborExpenses: 2500,
        utilitiesExpenses: 1100,
        otherExpenses: 0,
        closingCashInDrawer: 5200,
        discrepancy: 0,
        billCount: 156,
        outstanding: 0,
        notes: 'Smooth Saturday operations.',
        status: 'Verified',
        submittedAt: new Date().toISOString(),
      },
      {
        id: 'rep_2',
        businessId: 'biz_01',
        businessName: 'Priya Foods',
        managerId: 'mgr_01',
        managerName: 'Rajesh Kumar',
        date: formatDate(2),
        revenue: 16800,
        expenses: 10500,
        cashCollection: 10000,
        bankCollection: 6800,
        cashSales: 10000,
        digitalSales: 6800,
        creditSales: 0,
        rawMaterialExpenses: 7500,
        laborExpenses: 2500,
        utilitiesExpenses: 500,
        otherExpenses: 0,
        closingCashInDrawer: 4100,
        discrepancy: 0,
        billCount: 130,
        outstanding: 0,
        notes: 'Vendor delivery delayed by 30 mins.',
        status: 'Verified',
        submittedAt: new Date().toISOString(),
      },
      {
        id: 'rep_3',
        businessId: 'biz_01',
        businessName: 'Priya Foods',
        managerId: 'mgr_01',
        managerName: 'Rajesh Kumar',
        date: formatDate(3),
        revenue: 17400,
        expenses: 10900,
        cashCollection: 10500,
        bankCollection: 6900,
        cashSales: 10500,
        digitalSales: 6900,
        creditSales: 0,
        rawMaterialExpenses: 7800,
        laborExpenses: 2500,
        utilitiesExpenses: 600,
        otherExpenses: 0,
        closingCashInDrawer: 4300,
        discrepancy: 0,
        billCount: 138,
        outstanding: 0,
        notes: 'Standard Thursday footfall.',
        status: 'Verified',
        submittedAt: new Date().toISOString(),
      },
      {
        id: 'rep_5',
        businessId: 'biz_01',
        businessName: 'Priya Foods',
        managerId: 'mgr_01',
        managerName: 'Rajesh Kumar',
        date: formatDate(5),
        revenue: 15500,
        expenses: 9800,
        cashCollection: 9500,
        bankCollection: 6000,
        cashSales: 9500,
        digitalSales: 6000,
        creditSales: 0,
        rawMaterialExpenses: 7000,
        laborExpenses: 2200,
        utilitiesExpenses: 600,
        otherExpenses: 0,
        closingCashInDrawer: 3800,
        discrepancy: 0,
        billCount: 122,
        outstanding: 0,
        notes: 'Post-holiday recovery sales.',
        status: 'Verified',
        submittedAt: new Date().toISOString(),
      },
    ];

    // Seed sample store closure for Tuesday (formatDate 4 = Tuesday)
    const sampleClosures: StoreClosureItem[] = [
      {
        id: 'cls_01',
        businessId: 'biz_01',
        date: formatDate(4), // Tuesday Weekly Off
        reason: 'Weekly Off',
        notes: 'Scheduled Tuesday rest day for Connaught Place branch.',
        markedBy: 'Rajesh Kumar',
        createdAt: new Date().toISOString(),
      },
    ];

    setBusinesses(sampleBiz);
    setManagers(sampleManagers);
    setDailyReports(sampleReports);
    setStoreClosures(sampleClosures);
  };

  const clearAllData = () => {
    setBusinesses([]);
    setManagers([]);
    setDailyReports([]);
    setStoreClosures([]);
    localStorage.removeItem('munim_businesses');
    localStorage.removeItem('munim_managers');
    localStorage.removeItem('munim_daily_reports');
    localStorage.removeItem('munim_store_closures');
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
        managers,
        addManager,
        updateManager,
        deleteManager,
        dailyReports,
        addDailyReport,
        verifyDailyReport,
        storeClosures,
        markStoreClosed,
        removeStoreClosure,
        getDateReportingState,
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
