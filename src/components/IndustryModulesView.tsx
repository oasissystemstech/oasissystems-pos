import React from 'react';
import { useApp } from '../context/AppContext';
import { UtensilsCrossed, Wine, Pill, Sparkles, CheckCircle2 } from 'lucide-react';

export const IndustryModulesView: React.FC = () => {
  const { currentBusiness, products } = useApp();

  const industry = currentBusiness.industry;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
              {industry} Module Workspace
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Specialized Industry Operations</h2>
          <p className="text-xs text-slate-500">Industry-specific configuration and workflows for {currentBusiness.name}</p>
        </div>
      </div>

      {industry === 'restaurant' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Table 1 (Dine-in)', 'Table 2 (VIP)', 'Table 3 (Outdoor)', 'Takeaway Counter'].map((tbl, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{tbl}</h4>
                  <span className="text-xs text-emerald-600 font-semibold block mt-1">Status: Active & Ready</span>
                </div>
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Kitchen Order Tickets (KOT)</h3>
            <div className="space-y-3">
              {[
                { id: 'KOT-8821', table: 'Table 2 (VIP)', items: '2x Ghana Jollof with Chicken, 1x Tilapia', status: 'Cooking' },
                { id: 'KOT-8822', table: 'Takeaway Counter', items: '1x Banku & Tilapia with Pepper', status: 'Ready' }
              ].map((kot, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900">{kot.id}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">{kot.table}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{kot.items}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    kot.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {kot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {industry === 'bar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Active Bar Tabs & Open Bills</h3>
            <div className="space-y-3">
              {[
                { tabName: 'Kofi Mensah Tab', items: '4x Club Lager Beer 625ml, 1x Suya Grill', total: 'GH₵110.00', status: 'Running' },
                { tabName: 'VIP Lounge Table 4', items: '1x Johnnie Walker Black Label, 4x Malt', total: 'GH₵380.00', status: 'Running' }
              ].map((tab, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{tab.tabName}</h4>
                    <p className="text-xs text-slate-600 mt-1">{tab.items}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-600 block text-base">{tab.total}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-md">Open Tab</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {industry === 'pharmacy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Batch Number & Expiry Tracking</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Medicine Name</th>
                    <th className="px-6 py-4">Batch Number</th>
                    <th className="px-6 py-4">Expiry Date</th>
                    <th className="px-6 py-4">Stock Level</th>
                    <th className="px-6 py-4">Compliance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
                      <td className="px-6 py-4 font-mono text-xs">{p.batchNumber || 'BATCH-GEN-9912'}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{p.expiryDate || '2028-12-31'}</td>
                      <td className="px-6 py-4 font-bold">{p.stockQuantity} {p.unit}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approved</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {industry !== 'restaurant' && industry !== 'bar' && industry !== 'pharmacy' && (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-200 space-y-3">
          <Sparkles className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-lg text-slate-900">General Retail & Provision Workspace</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Optimized for rapid barcode checkout, wholesale pricing tiers, multi-unit conversions and multi-branch inventory tracking.
          </p>
        </div>
      )}

    </div>
  );
};
