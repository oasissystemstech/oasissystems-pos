import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Building2, Wifi, WifiOff, RefreshCw, Shield, ChevronDown, 
  UserCheck, QrCode, Printer 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    businesses, currentBusiness, setCurrentBusiness, 
    userRole, setUserRole, isOnline, setIsOnline, 
    syncQueue, triggerSync, setScannerModalOpen,
    activeReceipt, setActiveReceipt 
  } = useApp();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Business Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-2 rounded-lg text-white font-black text-xl tracking-wider shadow-inner">
              AK
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">Akwaboah POS</span>
              <span className="text-xs block text-emerald-400 font-medium">Multi-Industry Platform</span>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700">
            <Building2 className="w-4 h-4 text-emerald-400 mr-2" />
            <select 
              value={currentBusiness.id}
              onChange={(e) => {
                const found = businesses.find(b => b.id === e.target.value);
                if (found) setCurrentBusiness(found);
              }}
              aria-label="Select active business workspace"
              className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
            >
              {businesses.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-800 text-white">
                  {b.name} ({b.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Actions & Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Barcode scanner shortcut */}
          <button 
            onClick={() => setScannerModalOpen(true)}
            title="Scan Barcode"
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-200 border border-slate-700 transition"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>Barcode Scanner</span>
          </button>

          {/* Offline / Online Status */}
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              isOnline 
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60' 
                : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
            }`}
            title="Click to toggle network connection state"
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5 animate-pulse" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOnline ? 'Online (Cloud)' : 'Offline Mode'}</span>
          </button>

          {/* Sync Queue Badge */}
          {syncQueue.length > 0 && (
            <button 
              onClick={triggerSync}
              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-900/80 text-blue-200 rounded-lg text-xs font-semibold border border-blue-700 hover:bg-blue-800 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Sync ({syncQueue.length})</span>
            </button>
          )}

          {/* Role Switcher */}
          <div className="hidden lg:flex items-center bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
            <select 
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              aria-label="Select user role"
              className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer"
            >
              <option value="Platform Super Admin" className="bg-slate-800">Platform Super Admin</option>
              <option value="Business Owner" className="bg-slate-800">Business Owner</option>
              <option value="Manager" className="bg-slate-800">Manager</option>
              <option value="Cashier" className="bg-slate-800">Cashier</option>
              <option value="Inventory Officer" className="bg-slate-800">Inventory Officer</option>
              <option value="Accountant" className="bg-slate-800">Accountant</option>
              <option value="Pharmacist" className="bg-slate-800">Pharmacist</option>
            </select>
          </div>

          {/* Branch badge */}
          <div className="hidden xl:block text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Active Branch</span>
            <span className="text-xs font-semibold text-emerald-400">{currentBusiness.activeBranch}</span>
          </div>

        </div>

      </div>
    </header>
  );
};
