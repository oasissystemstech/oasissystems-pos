import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, ShoppingBag, TrendingUp, AlertTriangle, 
  ArrowUpRight, Users, ShieldCheck, Layers 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { currentBusiness, sales, products, expenses, employees } = useApp();

  // Compute metrics
  const totalSalesAmount = sales.reduce((sum, s) => sum + s.total, 0);
  const totalExpensesAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalCostOfGoods = sales.reduce((sum, s) => {
    return sum + s.items.reduce((itemSum, item) => itemSum + (item.quantity * 10), 0); // estimated cost
  }, 0);
  const grossProfit = totalSalesAmount - totalCostOfGoods;
  const netOperatingProfit = grossProfit - totalExpensesAmount;

  const lowStockProducts = products.filter(p => p.stockQuantity <= p.reorderLevel);

  const chartData = [
    { day: 'Mon', sales: 1250, profit: 450 },
    { day: 'Tue', sales: 1840, profit: 680 },
    { day: 'Wed', sales: 1520, profit: 510 },
    { day: 'Thu', sales: 2100, profit: 890 },
    { day: 'Fri', sales: 2950, profit: 1200 },
    { day: 'Sat', sales: 3400, profit: 1450 },
    { day: 'Sun', sales: totalSalesAmount > 0 ? totalSalesAmount : 2200, profit: grossProfit > 0 ? grossProfit : 950 },
  ];

  const paymentBreakdownData = [
    { name: 'Cash', value: 45, color: '#10b981' },
    { name: 'Mobile Money', value: 35, color: '#3b82f6' },
    { name: 'Cards / Bank', value: 20, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome & Overview banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              {currentBusiness.industry} Industry Profile
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold">
              {currentBusiness.deploymentType}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{currentBusiness.name}</h1>
          <p className="text-slate-400 text-sm mt-1">
            {currentBusiness.address} • Currency: <strong className="text-white">{currentBusiness.currency}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 backdrop-blur-sm">
          <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="text-xs text-slate-400 block">Licence & Compliance</span>
            <span className="font-bold text-sm text-white">Active (Perpetual / Managed)</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Sales (Today)</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {currentBusiness.currencySymbol}{totalSalesAmount.toFixed(2)}
            </h2>
            <span className="text-xs text-emerald-600 font-semibold flex items-center mt-1">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12.4% vs yesterday
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gross Profit</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {currentBusiness.currencySymbol}{grossProfit.toFixed(2)}
            </h2>
            <span className="text-xs text-slate-500 mt-1 block">Est. COGS deducted</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Operating Expenses</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {currentBusiness.currencySymbol}{totalExpensesAmount.toFixed(2)}
            </h2>
            <span className="text-xs text-slate-500 mt-1 block">{expenses.length} expense records</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Low Stock Alerts</span>
            <h2 className={`text-2xl font-black mt-1 ${lowStockProducts.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {lowStockProducts.length} Items
            </h2>
            <span className="text-xs text-rose-600 font-medium mt-1 block">Requires restocking</span>
          </div>
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales trend chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Weekly Sales & Profit Trend</h3>
              <p className="text-xs text-slate-500">Performance overview across active terminals</p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">Last 7 Days</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">Payment Methods</h3>
            <p className="text-xs text-slate-500 mb-6">Cash vs MoMo vs Cards allocation</p>
            
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 text-xs">
            {paymentBreakdownData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Low stock alerts table */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-lg text-slate-900">Low Stock Warning Items</h3>
            </div>
            <span className="text-xs bg-rose-50 text-rose-700 px-3 py-1 rounded-lg font-semibold">
              Action Required
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Current Stock</th>
                  <th className="px-4 py-3">Reorder Level</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowStockProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.sku}</td>
                    <td className="px-4 py-3 text-slate-600">{p.category}</td>
                    <td className="px-4 py-3 font-bold text-rose-600">{p.stockQuantity} {p.unit}</td>
                    <td className="px-4 py-3 text-slate-500">{p.reorderLevel} {p.unit}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-lg">
                        Restock Needed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
