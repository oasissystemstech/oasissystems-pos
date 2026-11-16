import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PosView } from './components/PosView';
import { ProductsView } from './components/ProductsView';
import { InventoryView } from './components/InventoryView';
import { PurchasingView } from './components/PurchasingView';
import { FinanceView } from './components/FinanceView';
import { EmployeesView } from './components/EmployeesView';
import { IndustryModulesView } from './components/IndustryModulesView';
import { PlatformAdminView } from './components/PlatformAdminView';
import { SettingsView } from './components/SettingsView';
import { ReceiptModal } from './components/ReceiptModal';
import { ScannerModal } from './components/ScannerModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex-1 bg-slate-100 min-h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 lg:p-8">
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'pos' && <PosView />}
      {activeTab === 'products' && <ProductsView />}
      {activeTab === 'inventory' && <InventoryView />}
      {activeTab === 'purchasing' && <PurchasingView />}
      {activeTab === 'finance' && <FinanceView />}
      {activeTab === 'employees' && <EmployeesView />}
      {activeTab === 'industry' && <IndustryModulesView />}
      {activeTab === 'reports' && <DashboardView />}
      {activeTab === 'admin' && <PlatformAdminView />}
      {activeTab === 'settings' && <SettingsView />}

      <ReceiptModal />
      <ScannerModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
