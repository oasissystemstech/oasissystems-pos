import { Business, Product, Sale, Expense, Supplier, Employee, CashSession, DeploymentRecord } from './types';

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz-1',
    name: 'Akwaboah Supermarket & Mini-Mart',
    industry: 'supermarket',
    country: 'Ghana',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    address: 'Ring Road Central, Accra',
    phone: '+233 30 224 5589',
    email: 'accra@akwaboahpos.com',
    taxRate: 15,
    deploymentType: 'Managed Cloud',
    activeBranch: 'Accra Main Branch',
    branches: ['Accra Main Branch', 'East Legon Branch', 'Tema Community 1']
  },
  {
    id: 'biz-2',
    name: 'Kofi & Sister Pub & Grill',
    industry: 'bar',
    country: 'Ghana',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    address: 'Adum Commercial Area, Kumasi',
    phone: '+233 32 208 1142',
    email: 'kumasi@kofibar.com',
    taxRate: 15,
    deploymentType: 'Managed Cloud',
    activeBranch: 'Kumasi Adum',
    branches: ['Kumasi Adum', 'Santasi Junction']
  },
  {
    id: 'biz-3',
    name: 'St. Raphael Pharmacy & Health Services',
    industry: 'pharmacy',
    country: 'Ghana',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    address: 'Market Circle, Takoradi',
    phone: '+233 31 202 3391',
    email: 'info@straphaelpharma.gh',
    taxRate: 0, // exempt medicines
    deploymentType: 'Dedicated Installation',
    activeBranch: 'Takoradi Central',
    branches: ['Takoradi Central', 'Sekondi Station']
  },
  {
    id: 'biz-4',
    name: 'Monrovia Royal Fashion & Boutique',
    industry: 'fashion',
    country: 'Liberia',
    currency: 'USD',
    currencySymbol: '$',
    address: 'Broad Street, Monrovia',
    phone: '+231 77 055 8921',
    email: 'sales@monroviafashion.lr',
    taxRate: 10,
    deploymentType: 'Managed Cloud',
    activeBranch: 'Monrovia Main Store',
    branches: ['Monrovia Main Store', 'Sinkor Branch']
  },
  {
    id: 'biz-5',
    name: 'Mama Africa Traditional Kitchen',
    industry: 'restaurant',
    country: 'Ghana',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    address: 'Osu Oxford Street, Accra',
    phone: '+233 30 277 4920',
    email: 'orders@mamaafricarestaurant.com',
    taxRate: 15,
    deploymentType: 'Managed Cloud',
    activeBranch: 'Osu Branch',
    branches: ['Osu Branch', 'Airport City Branch']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Supermarket
  {
    id: 'prod-1',
    businessId: 'biz-1',
    name: 'Ideal Milk 400g Tin',
    sku: 'MILK-400',
    barcode: '603120400112',
    category: 'Dairy & Breakfast',
    purchasePrice: 12.00,
    sellingPrice: 16.50,
    wholesalePrice: 15.00,
    stockQuantity: 145,
    unit: 'tin',
    reorderLevel: 20
  },
  {
    id: 'prod-2',
    businessId: 'biz-1',
    name: 'Geisha Soap (Gold) 120g',
    sku: 'SOAP-GEISHA',
    barcode: '603120120883',
    category: 'Household & Cleaning',
    purchasePrice: 5.50,
    sellingPrice: 7.50,
    wholesalePrice: 6.80,
    stockQuantity: 230,
    unit: 'piece',
    reorderLevel: 30
  },
  {
    id: 'prod-3',
    businessId: 'biz-1',
    name: 'Key Soap Carbolic Large',
    sku: 'KEY-SOAP-L',
    barcode: '603120999201',
    category: 'Household & Cleaning',
    purchasePrice: 8.00,
    sellingPrice: 11.00,
    wholesalePrice: 10.00,
    stockQuantity: 85,
    unit: 'bar',
    reorderLevel: 15
  },
  {
    id: 'prod-4',
    businessId: 'biz-1',
    name: 'Everpack Tomato Paste 210g',
    sku: 'TOMATO-210',
    barcode: '603120210442',
    category: 'Canned Goods',
    purchasePrice: 9.00,
    sellingPrice: 13.00,
    wholesalePrice: 12.00,
    stockQuantity: 12, // low stock trigger
    unit: 'tin',
    reorderLevel: 25
  },
  {
    id: 'prod-5',
    businessId: 'biz-1',
    name: 'Milo Nestlé 400g Refill',
    sku: 'MILO-400',
    barcode: '603120400999',
    category: 'Dairy & Breakfast',
    purchasePrice: 35.00,
    sellingPrice: 45.00,
    wholesalePrice: 42.00,
    stockQuantity: 64,
    unit: 'pouch',
    reorderLevel: 10
  },

  // Bar / Pub (biz-2)
  {
    id: 'prod-6',
    businessId: 'biz-2',
    name: 'Club Lager Beer 625ml',
    sku: 'CLUB-625',
    barcode: '5012345678901',
    category: 'Beers',
    purchasePrice: 15.00,
    sellingPrice: 22.00,
    wholesalePrice: 20.00,
    stockQuantity: 180,
    unit: 'bottle',
    reorderLevel: 40
  },
  {
    id: 'prod-7',
    businessId: 'biz-2',
    name: 'Star Lager Beer 625ml',
    sku: 'STAR-625',
    barcode: '5012345678902',
    category: 'Beers',
    purchasePrice: 15.00,
    sellingPrice: 22.00,
    wholesalePrice: 20.00,
    stockQuantity: 95,
    unit: 'bottle',
    reorderLevel: 30
  },
  {
    id: 'prod-8',
    businessId: 'biz-2',
    name: 'Johnnie Walker Black Label 750ml',
    sku: 'JW-BLACK',
    barcode: '5012345678999',
    category: 'Spirits & Whisky',
    purchasePrice: 220.00,
    sellingPrice: 320.00,
    wholesalePrice: 300.00,
    stockQuantity: 18,
    unit: 'bottle',
    reorderLevel: 5
  },

  // Pharmacy (biz-3)
  {
    id: 'prod-9',
    businessId: 'biz-3',
    name: 'Paracetamol 500mg (Pack of 100)',
    sku: 'PARA-500',
    barcode: '4012345678901',
    category: 'Analgesics',
    purchasePrice: 25.00,
    sellingPrice: 38.00,
    wholesalePrice: 34.00,
    stockQuantity: 120,
    unit: 'pack',
    reorderLevel: 20,
    batchNumber: 'BATCH-GH-9821',
    expiryDate: '2028-06-15'
  },
  {
    id: 'prod-10',
    businessId: 'biz-3',
    name: 'Coartem 80/480mg (Artemether/Lumefantrine)',
    sku: 'COARTEM-80',
    barcode: '4012345678902',
    category: 'Anti-Malarials',
    purchasePrice: 45.00,
    sellingPrice: 65.00,
    wholesalePrice: 60.00,
    stockQuantity: 75,
    unit: 'box',
    reorderLevel: 15,
    batchNumber: 'BATCH-COA-4412',
    expiryDate: '2027-12-31'
  },

  // Fashion (biz-4)
  {
    id: 'prod-11',
    businessId: 'biz-4',
    name: 'African Print Ankara Maxi Dress',
    sku: 'DRESS-ANKARA-01',
    barcode: '7012345678901',
    category: 'Women Dresses',
    purchasePrice: 40.00,
    sellingPrice: 75.00,
    wholesalePrice: 65.00,
    stockQuantity: 24,
    unit: 'piece',
    size: 'M, L, XL',
    reorderLevel: 5
  },
  {
    id: 'prod-12',
    businessId: 'biz-4',
    name: 'Men Kente Luxury Wedding Shirt',
    sku: 'SHIRT-KENTE-02',
    barcode: '7012345678902',
    category: 'Men Wear',
    purchasePrice: 50.00,
    sellingPrice: 90.00,
    wholesalePrice: 80.00,
    stockQuantity: 15,
    unit: 'piece',
    size: 'L, XL',
    reorderLevel: 4
  },

  // Restaurant (biz-5)
  {
    id: 'prod-13',
    businessId: 'biz-5',
    name: 'Ghana Jollof Rice with Grilled Chicken',
    sku: 'JOLLOF-CHK',
    barcode: '8012345678901',
    category: 'Main Dishes',
    purchasePrice: 25.00,
    sellingPrice: 60.00,
    wholesalePrice: 60.00,
    stockQuantity: 100, // prepared portions
    unit: 'plate',
    tableNumber: 'Table 1-10',
    reorderLevel: 10
  },
  {
    id: 'prod-14',
    businessId: 'biz-5',
    name: 'Banku & Hot Tilapia with Pepper',
    sku: 'BANKU-TILAPIA',
    barcode: '8012345678902',
    category: 'Local Delicacies',
    purchasePrice: 35.00,
    sellingPrice: 85.00,
    wholesalePrice: 85.00,
    stockQuantity: 50,
    unit: 'plate',
    tableNumber: 'Table 1-10',
    reorderLevel: 8
  }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'sale-101',
    businessId: 'biz-1',
    branch: 'Accra Main Branch',
    receiptNumber: 'REC-2026-0001',
    cashierName: 'Abena Mensah',
    customerName: 'Kofi Owusu',
    items: [
      { productId: 'prod-1', productName: 'Ideal Milk 400g Tin', quantity: 2, unitPrice: 16.50, total: 33.00 },
      { productId: 'prod-2', productName: 'Geisha Soap (Gold) 120g', quantity: 3, unitPrice: 7.50, total: 22.50 }
    ],
    subtotal: 55.50,
    discount: 0,
    tax: 8.33,
    total: 63.83,
    payments: [{ method: 'Mobile Money', amount: 63.83, reference: 'MOMO-TX-99821' }],
    amountPaid: 63.83,
    changeDue: 0,
    status: 'Completed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    synced: true
  },
  {
    id: 'sale-102',
    businessId: 'biz-1',
    branch: 'Accra Main Branch',
    receiptNumber: 'REC-2026-0002',
    cashierName: 'Abena Mensah',
    customerName: 'Yaw Boateng',
    items: [
      { productId: 'prod-5', productName: 'Milo Nestlé 400g Refill', quantity: 1, unitPrice: 45.00, total: 45.00 }
    ],
    subtotal: 45.00,
    discount: 2.00,
    tax: 6.45,
    total: 49.45,
    payments: [{ method: 'Cash', amount: 50.00 }],
    amountPaid: 50.00,
    changeDue: 0.55,
    status: 'Completed',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    synced: true
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    businessId: 'biz-1',
    category: 'Utilities & Power',
    description: 'ECG Prepaid Electricity Token',
    amount: 350.00,
    paymentMethod: 'Mobile Money',
    date: '2026-11-14',
    recordedBy: 'Business Owner'
  },
  {
    id: 'exp-2',
    businessId: 'biz-1',
    category: 'Logistics & Transport',
    description: 'Delivery Fuel for Stock Restock',
    amount: 180.00,
    paymentMethod: 'Cash',
    date: '2026-11-15',
    recordedBy: 'Manager'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    businessId: 'biz-1',
    name: 'Nestlé Ghana Ltd',
    contactPerson: 'Kwame Addo',
    phone: '+233 30 221 0000',
    email: 'orders@gh.nestle.com',
    address: 'Industrial Area, Accra',
    outstandingBalance: 1250.00
  },
  {
    id: 'sup-2',
    businessId: 'biz-1',
    name: 'Unilever Ghana PLC',
    contactPerson: 'Efua Sutherland',
    phone: '+233 30 222 4411',
    email: 'sales@unileverghana.com',
    address: 'Tema Heavy Industrial Area',
    outstandingBalance: 0.00
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    businessId: 'biz-1',
    name: 'Abena Mensah',
    role: 'Cashier',
    email: 'abena@akwaboahpos.com',
    phone: '+233 24 111 2233',
    branch: 'Accra Main Branch',
    status: 'Active',
    lastLogin: 'Today, 08:30 AM'
  },
  {
    id: 'emp-2',
    businessId: 'biz-1',
    name: 'Kofi Boateng',
    role: 'Inventory Officer',
    email: 'kofi.inv@akwaboahpos.com',
    phone: '+233 20 555 6677',
    branch: 'Accra Main Branch',
    status: 'Active',
    lastLogin: 'Yesterday, 04:15 PM'
  },
  {
    id: 'emp-3',
    businessId: 'biz-1',
    name: 'Yaw Osei',
    role: 'Business Administrator',
    email: 'yaw@akwaboahpos.com',
    phone: '+233 27 888 9900',
    branch: 'Accra Main Branch',
    status: 'Active',
    lastLogin: 'Today, 09:00 AM'
  }
];

export const INITIAL_DEPLOYMENTS: DeploymentRecord[] = [
  {
    id: 'dep-1',
    businessName: 'Akwaboah Supermarket & Mini-Mart',
    deploymentType: 'Managed Cloud',
    version: 'v1.0.4-stable',
    environment: 'Production (Vercel + Supabase US-East)',
    licenceStatus: 'Active',
    installedDate: '2026-01-15',
    renewalDate: '2027-01-15',
    branchesCount: 3,
    terminalsCount: 5,
    maintenanceStatus: 'Managed'
  },
  {
    id: 'dep-2',
    businessName: 'St. Raphael Pharmacy & Health Services',
    deploymentType: 'Dedicated Installation',
    version: 'v1.0.4-stable',
    environment: 'Dedicated Local Server + Cloud Backup',
    licenceStatus: 'Active',
    installedDate: '2026-03-10',
    renewalDate: '2027-03-10',
    branchesCount: 2,
    terminalsCount: 3,
    maintenanceStatus: 'Managed'
  },
  {
    id: 'dep-3',
    businessName: 'Kofi & Sister Pub & Grill',
    deploymentType: 'Managed Cloud',
    version: 'v1.0.3',
    environment: 'Production (Vercel)',
    licenceStatus: 'Pending Renewal',
    installedDate: '2025-11-20',
    renewalDate: '2026-11-20',
    branchesCount: 2,
    terminalsCount: 4,
    maintenanceStatus: 'Managed'
  }
];
