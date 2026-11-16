import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, ArrowDownLeft, ArrowUpRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { currentBusiness, products } = useApp();

  const totalStockValuation = products.reduce((sum, p) => sum + (p.stockQuantity * p.purchasePrice), 0);
  const totalRetailValuation = products.reduce((sum, p) => sum + (p.stockQuantity * p.sellingPrice), 0);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Inventory & Stock Management</h2>
          <p className="text-xs text-slate-500">Track stock movements, valuation and replenishment for {currentBusiness.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Stock Valuation (Cost)</span>
            <span className="text-sm font-black text-slate-900">{currentBusiness.currencySymbol}{totalStockValuation.toFixed(2)}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Potential Retail Value</span>
            <span className="text-sm font-black text-emerald-900">{currentBusiness.currencySymbol}{totalRetailValuation.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Stock Levels Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900">Current Stock Balances</h3>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
            {products.length} Products Tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">In Stock</th>
                <th className="px-6 py-4">Reorder Level</th>
                <th className="px-6 py-4">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(p => {
                const isLow = p.stockQuantity <= p.reorderLevel;
                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{p.sku}</td>
                    <td className="px-6 py-4 text-slate-600">{p.category}</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">{p.stockQuantity} {p.unit}</td>
                    <td className="px-6 py-4 text-slate-500">{p.reorderLevel} {p.unit}</td>
                    <td className="px-6 py-4">
                      {isLow ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-lg">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Low Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>In Stock</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
