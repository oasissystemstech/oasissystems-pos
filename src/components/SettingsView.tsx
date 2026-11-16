import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, CheckCircle2, Building2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentBusiness, setCurrentBusiness } = useApp();

  const [name, setName] = useState(currentBusiness.name);
  const [address, setAddress] = useState(currentBusiness.address);
  const [phone, setPhone] = useState(currentBusiness.phone);
  const [taxRate, setTaxRate] = useState(currentBusiness.taxRate.toString());
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...currentBusiness,
      name,
      address,
      phone,
      taxRate: parseFloat(taxRate) || 0
    };
    setCurrentBusiness(updated);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Business & Tax Settings</h2>
        <p className="text-xs text-slate-500">Configure business identity, receipts, and country tax rules for {currentBusiness.name}</p>
      </div>

      {savedFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
        
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 uppercase">Business Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase">Country</label>
            <input 
              type="text"
              disabled
              value={currentBusiness.country}
              className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 cursor-not-allowed"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase">Currency</label>
            <input 
              type="text"
              disabled
              value={`${currentBusiness.currency} (${currentBusiness.currencySymbol})`}
              className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 uppercase">Business Address</label>
          <input 
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase">Phone Contact</label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase">VAT / Tax Rate (%)</label>
            <input 
              type="number"
              step="0.1"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-slate-200">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition"
          >
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
};
