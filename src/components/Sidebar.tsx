import React from 'react';
import { useApp } from '../context/AppContext';
import { PortalTab } from '../types';
import { 
  LayoutDashboard, ShoppingCart, Package, Layers, Truck, 
  Wallet, Users, UtensilsCrossed, BarChart3, ShieldCheck, Settings 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentBusiness } = useApp();

  const navItems: { id: PortalTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'pos', label: 'POS Terminal', icon: <ShoppingCart className="w-5 h-5" />, badge: 'Fast' },
    { id: 'products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory & Stock', icon: <Layers className="w-5 h-5" /> },
    { id: 'purchasing', label: 'Purchasing & Sup.', icon: <Truck className="w-5 h-5" /> },
    { id: 'finance', label: 'Finance & Expenses', icon: <Wallet className="w-5 h-5" /> },
    { id: 'employees', label: 'Employees & Shifts', icon: <Users className="w-5 h-5" /> },
    { 
      id: 'industry', 
      label: currentBusiness.industry === 'restaurant' ? 'Restaurant Tables & KOT' :
             currentBusiness.industry === 'bar' ? 'Bar Tabs & Drinks' :
             currentBusiness.industry === 'pharmacy' ? 'Pharmacy & Prescriptions' : 'Industry Workspace', 
      icon: <UtensilsCrossed className="w-5 h-5" /> 
    },
    { id: 'reports', label: 'Reports & Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'admin', label: 'Platform Administration', icon: <ShieldCheck className="w-5 h-5" />, badge: 'HQ' },
    { id: 'settings', label: 'Settings & Tax', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="p-4 flex-1 space-y-1.5">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Business Portal ({currentBusiness.country})
        </div>
        
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 font-semibold' 
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-emerald-400 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer info in sidebar */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400 bg-slate-950/40">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-slate-300">Deployment</span>
          <span className="text-emerald-400 font-medium">{currentBusiness.deploymentType}</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Currency: <strong className="text-white">{currentBusiness.currency} ({currentBusiness.currencySymbol})</strong>
        </div>
      </div>
    </aside>
  );
};
