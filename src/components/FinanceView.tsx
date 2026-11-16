import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, Plus, X, DollarSign } from 'lucide-react';

export const FinanceView: React.FC = () => {
  const { currentBusiness, expenses, addExpense } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [category, setCategory] = useState('Utilities & Power');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Mobile Money');

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    addExpense({
      category,
      description,
      amount: parseFloat(amount) || 0,
      paymentMethod,
      date: new Date().toISOString().split('T')[0],
      recordedBy: 'Business Owner'
    });

    setDescription('');
    setAmount('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Finance & Expense Management</h2>
          <p className="text-xs text-slate-500">Track operating expenses, cash sessions and financial reconciliation for {currentBusiness.name}</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-600/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* Metric card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Operating Expenses</span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            {currentBusiness.currencySymbol}{totalExpenses.toFixed(2)}
          </h2>
          <span className="text-xs text-slate-500 mt-1 block">{expenses.length} expense transactions recorded</span>
        </div>
        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
          <Wallet className="w-7 h-7" />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900">Expense History</h3>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
            {expenses.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Recorded By</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map(e => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">{e.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{e.category}</td>
                  <td className="px-6 py-4 text-slate-700">{e.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {e.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{e.recordedBy}</td>
                  <td className="px-6 py-4 text-right font-extrabold text-rose-600">
                    -{currentBusiness.currencySymbol}{e.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">Record Business Expense</h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">Expense Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Expense Category"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
                >
                  <option value="Utilities & Power">Utilities & Power</option>
                  <option value="Logistics & Transport">Logistics & Transport</option>
                  <option value="Rent & Lease">Rent & Lease</option>
                  <option value="Salaries & Wages">Salaries & Wages</option>
                  <option value="Maintenance & Repairs">Maintenance & Repairs</option>
                  <option value="Taxes & Licenses">Taxes & Licenses</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">Description *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. ECG Prepaid Electricity Token"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Amount * ({currentBusiness.currencySymbol})</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Payment Method</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    aria-label="Payment Method"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Mobile Money">Mobile Money</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Debit/Credit Card">Debit/Credit Card</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
