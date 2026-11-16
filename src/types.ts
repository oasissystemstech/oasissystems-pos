export type IndustryType = 
  | 'supermarket'
  | 'restaurant'
  | 'bar'
  | 'pharmacy'
  | 'cosmetics'
  | 'fashion'
  | 'electronics'
  | 'provision'
  | 'general';

export type UserRole = 
  | 'Platform Super Admin'
  | 'Platform Support'
  | 'Business Owner'
  | 'Business Administrator'
  | 'Manager'
  | 'Supervisor'
  | 'Cashier'
  | 'Inventory Officer'
  | 'Accountant'
  | 'Pharmacist';

export type DeploymentType = 'Managed Cloud' | 'Dedicated Installation';

export interface Business {
  id: string;
  name: string;
  industry: IndustryType;
  country: 'Ghana' | 'Liberia';
  currency: 'GHS' | 'USD' | 'LRD';
  currencySymbol: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  taxRate: number; // e.g. 15% VAT
  deploymentType: DeploymentType;
  activeBranch: string;
  branches: string[];
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  wholesalePrice?: number;
  stockQuantity: number;
  unit: string; // e.g. piece, pack, bottle, kg
  reorderLevel: number;
  expiryDate?: string;
  batchNumber?: string;
  image?: string;
  // Industry specific
  tableNumber?: string; // for restaurant
  shadeOrColor?: string; // cosmetics
  size?: string; // fashion
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number; // percentage or fixed
  selectedUnit?: string;
}

export interface SalePayment {
  method: 'Cash' | 'Mobile Money' | 'Bank Transfer' | 'Debit/Credit Card' | 'Store Credit';
  amount: number;
  reference?: string;
}

export interface Sale {
  id: string;
  businessId: string;
  branch: string;
  receiptNumber: string;
  cashierName: string;
  customerName?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payments: SalePayment[];
  amountPaid: number;
  changeDue: number;
  status: 'Completed' | 'Held' | 'Refunded' | 'Voided';
  createdAt: string;
  synced: boolean;
}

export interface Expense {
  id: string;
  businessId: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  date: string;
  recordedBy: string;
}

export interface Supplier {
  id: string;
  businessId: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  outstandingBalance: number;
}

export interface Employee {
  id: string;
  businessId: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  branch: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  lastLogin?: string;
}

export interface CashSession {
  id: string;
  businessId: string;
  cashierName: string;
  openingCash: number;
  cashSales: number;
  cashAdditions: number;
  cashWithdrawals: number;
  expectedCash: number;
  actualCash?: number;
  variance?: number;
  status: 'Open' | 'Closed';
  openedAt: string;
  closedAt?: string;
}

export interface DeploymentRecord {
  id: string;
  businessName: string;
  deploymentType: DeploymentType;
  version: string;
  environment: string;
  licenceStatus: 'Active' | 'Pending Renewal' | 'Suspended';
  installedDate: string;
  renewalDate: string;
  branchesCount: number;
  terminalsCount: number;
  maintenanceStatus: 'Managed' | 'Self-Hosted';
}

export interface SyncQueueItem {
  id: string;
  type: 'SALE' | 'EXPENSE' | 'STOCK_ADJUSTMENT';
  payload: any;
  createdAt: string;
  status: 'Pending' | 'Synced' | 'Conflict';
}

export type PortalTab = 
  | 'dashboard'
  | 'pos'
  | 'products'
  | 'inventory'
  | 'purchasing'
  | 'finance'
  | 'employees'
  | 'industry'
  | 'reports'
  | 'admin'
  | 'settings';
