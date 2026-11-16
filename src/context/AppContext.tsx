import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Business, Product, Sale, Expense, Supplier, Employee, 
  UserRole, PortalTab, SyncQueueItem 
} from '../types';
import { 
  INITIAL_BUSINESSES, INITIAL_PRODUCTS, INITIAL_SALES, 
  INITIAL_EXPENSES, INITIAL_SUPPLIERS, INITIAL_EMPLOYEES, 
  INITIAL_DEPLOYMENTS 
} from '../mockData';

interface AppContextType {
  businesses: Business[];
  currentBusiness: Business;
  setCurrentBusiness: (business: Business) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: PortalTab;
  setActiveTab: (tab: PortalTab) => void;
  
  // Data lists
  products: Product[];
  sales: Sale[];
  expenses: Expense[];
  suppliers: Supplier[];
  employees: Employee[];
  deployments: any[];
  
  // Offline & sync
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  syncQueue: SyncQueueItem[];
  triggerSync: () => void;
  
  // Actions
  addProduct: (product: Omit<Product, 'id' | 'businessId'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  processSale: (saleData: Omit<Sale, 'id' | 'businessId' | 'receiptNumber' | 'createdAt' | 'synced'>) => Sale;
  addExpense: (expense: Omit<Expense, 'id' | 'businessId'>) => void;
  addSupplier: (supplier: Omit<Supplier, 'id' | 'businessId'>) => void;
  addEmployee: (employee: Omit<Employee, 'id' | 'businessId'>) => void;
  
  // UI helpers
  activeReceipt: Sale | null;
  setActiveReceipt: (sale: Sale | null) => void;
  scannerModalOpen: boolean;
  setScannerModalOpen: (open: boolean) => void;
  onScanBarcode: (barcode: string) => void;
  scannedBarcodeCallback: ((product: Product) => void) | null;
  setScannedBarcodeCallback: (cb: ((product: Product) => void) | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem('akw_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [currentBusiness, setCurrentBusinessState] = useState<Business>(() => {
    return businesses[0];
  });

  const [userRole, setUserRole] = useState<UserRole>('Business Owner');
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard');

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('akw_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('akw_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('akw_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('akw_suppliers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('akw_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [deployments] = useState(INITIAL_DEPLOYMENTS);

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>(() => {
    const saved = localStorage.getItem('akw_sync_queue');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeReceipt, setActiveReceipt] = useState<Sale | null>(null);
  const [scannerModalOpen, setScannerModalOpen] = useState<boolean>(false);
  const [scannedBarcodeCallback, setScannedBarcodeCallback] = useState<((product: Product) => void) | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('akw_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('akw_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('akw_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('akw_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('akw_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('akw_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('akw_sync_queue', JSON.stringify(syncQueue));
  }, [syncQueue]);

  const setCurrentBusiness = (bus: Business) => {
    setCurrentBusinessState(bus);
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'businessId'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      businessId: currentBusiness.id
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const processSale = (saleData: Omit<Sale, 'id' | 'businessId' | 'receiptNumber' | 'createdAt' | 'synced'>): Sale => {
    const receiptNum = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSale: Sale = {
      ...saleData,
      id: `sale-${Date.now()}`,
      businessId: currentBusiness.id,
      receiptNumber: receiptNum,
      createdAt: new Date().toISOString(),
      synced: isOnline
    };

    setSales(prev => [newSale, ...prev]);

    // Deduct stock
    setProducts(prevProducts => {
      const updated = [...prevProducts];
      newSale.items.forEach(item => {
        const prod = updated.find(p => p.id === item.productId);
        if (prod) {
          prod.stockQuantity = Math.max(0, prod.stockQuantity - item.quantity);
        }
      });
      return updated;
    });

    if (!isOnline) {
      const queueItem: SyncQueueItem = {
        id: `sync-${Date.now()}`,
        type: 'SALE',
        payload: newSale,
        createdAt: new Date().toISOString(),
        status: 'Pending'
      };
      setSyncQueue(prev => [...prev, queueItem]);
    }

    setActiveReceipt(newSale);
    return newSale;
  };

  const addExpense = (expData: Omit<Expense, 'id' | 'businessId'>) => {
    const newExp: Expense = {
      ...expData,
      id: `exp-${Date.now()}`,
      businessId: currentBusiness.id
    };
    setExpenses(prev => [newExp, ...prev]);
  };

  const addSupplier = (supData: Omit<Supplier, 'id' | 'businessId'>) => {
    const newSup: Supplier = {
      ...supData,
      id: `sup-${Date.now()}`,
      businessId: currentBusiness.id
    };
    setSuppliers(prev => [newSup, ...prev]);
  };

  const addEmployee = (empData: Omit<Employee, 'id' | 'businessId'>) => {
    const newEmp: Employee = {
      ...empData,
      id: `emp-${Date.now()}`,
      businessId: currentBusiness.id
    };
    setEmployees(prev => [newEmp, ...prev]);
  };

  const triggerSync = () => {
    if (syncQueue.length === 0) return;
    setSyncQueue(prev => prev.map(item => ({ ...item, status: 'Synced' })));
    setSales(prev => prev.map(s => ({ ...s, synced: true })));
    setTimeout(() => {
      setSyncQueue([]);
    }, 1500);
  };

  const onScanBarcode = (barcode: string) => {
    const matched = products.find(p => p.barcode === barcode && p.businessId === currentBusiness.id);
    if (matched && scannedBarcodeCallback) {
      scannedBarcodeCallback(matched);
    }
  };

  return (
    <AppContext.Provider value={{
      businesses,
      currentBusiness,
      setCurrentBusiness,
      userRole,
      setUserRole,
      activeTab,
      setActiveTab,
      products: products.filter(p => p.businessId === currentBusiness.id),
      sales: sales.filter(s => s.businessId === currentBusiness.id),
      expenses: expenses.filter(e => e.businessId === currentBusiness.id),
      suppliers: suppliers.filter(s => s.businessId === currentBusiness.id),
      employees: employees.filter(e => e.businessId === currentBusiness.id),
      deployments,
      isOnline,
      setIsOnline,
      syncQueue,
      triggerSync,
      addProduct,
      updateProduct,
      deleteProduct,
      processSale,
      addExpense,
      addSupplier,
      addEmployee,
      activeReceipt,
      setActiveReceipt,
      scannerModalOpen,
      setScannerModalOpen,
      onScanBarcode,
      scannedBarcodeCallback,
      setScannedBarcodeCallback
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
