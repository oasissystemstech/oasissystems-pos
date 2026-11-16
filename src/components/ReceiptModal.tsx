import React from 'react';
import { useApp } from '../context/AppContext';
import { Printer, Download, X, CheckCircle2 } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { activeReceipt, setActiveReceipt, currentBusiness } = useApp();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg">Sale Completed Successfully</h3>
          </div>
          <button 
            onClick={() => setActiveReceipt(null)}
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thermal Receipt Preview Box */}
        <div className="p-6 max-h-[65vh] overflow-y-auto bg-slate-50 font-mono text-xs">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-slate-700 max-w-[320px] mx-auto space-y-3">
            
            <div className="text-center space-y-1">
              <h4 className="font-bold text-base text-slate-900">{currentBusiness.name}</h4>
              <p className="text-[10px] text-slate-500">{currentBusiness.address}</p>
              <p className="text-[10px] text-slate-500">Tel: {currentBusiness.phone}</p>
              <div className="border-b border-dashed border-slate-300 my-2"></div>
            </div>

            <div className="space-y-0.5 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>Receipt #:</span>
                <span className="font-bold text-slate-900">{activeReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date(activeReceipt.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Cashier:</span>
                <span>{activeReceipt.cashierName}</span>
              </div>
              <div className="flex justify-between">
                <span>Branch:</span>
                <span>{activeReceipt.branch}</span>
              </div>
              {activeReceipt.customerName && (
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span>{activeReceipt.customerName}</span>
                </div>
              )}
            </div>

            <div className="border-b border-dashed border-slate-300 my-2"></div>

            {/* Items table */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-[10px] text-slate-500 uppercase border-b border-slate-200 pb-1">
                <span>Item</span>
                <span>Qty x Price</span>
                <span>Total</span>
              </div>
              {activeReceipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-[11px]">
                  <span className="max-w-[140px] truncate">{item.productName}</span>
                  <span className="text-slate-500">{item.quantity} x {currentBusiness.currencySymbol}{item.unitPrice.toFixed(2)}</span>
                  <span className="font-semibold">{currentBusiness.currencySymbol}{item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-b border-dashed border-slate-300 my-2"></div>

            {/* Totals */}
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{currentBusiness.currencySymbol}{activeReceipt.subtotal.toFixed(2)}</span>
              </div>
              {activeReceipt.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span>-{currentBusiness.currencySymbol}{activeReceipt.discount.toFixed(2)}</span>
                </div>
              )}
              {activeReceipt.tax > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>VAT / Tax ({currentBusiness.taxRate}%):</span>
                  <span>{currentBusiness.currencySymbol}{activeReceipt.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Due:</span>
                <span>{currentBusiness.currencySymbol}{activeReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payments */}
            <div className="border-t border-dashed border-slate-300 pt-2 space-y-1 text-[11px]">
              <div className="font-semibold text-slate-600">Payment Breakdown:</div>
              {activeReceipt.payments.map((p, idx) => (
                <div key={idx} className="flex justify-between text-slate-600">
                  <span>{p.method} {p.reference ? `(${p.reference})` : ''}:</span>
                  <span>{currentBusiness.currencySymbol}{p.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-medium pt-1">
                <span>Change Due:</span>
                <span>{currentBusiness.currencySymbol}{activeReceipt.changeDue.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-b border-dashed border-slate-300 my-2"></div>

            <div className="text-center text-[10px] text-slate-500 space-y-1 pt-1">
              <p className="font-medium text-slate-700">Thank you for your patronage!</p>
              <p>Powered by Akwaboah POS Platform</p>
            </div>

          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-100 px-6 py-4 flex items-center justify-end space-x-3 border-t border-slate-200">
          <button
            onClick={() => setActiveReceipt(null)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-600/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};
