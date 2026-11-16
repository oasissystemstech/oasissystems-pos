import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QrCode, X, Search, CheckCircle } from 'lucide-react';

export const ScannerModal: React.FC = () => {
  const { scannerModalOpen, setScannerModalOpen, products, onScanBarcode, scannedBarcodeCallback } = useApp();
  const [inputCode, setInputCode] = useState('');
  const [scannedFeedback, setScannedFeedback] = useState<string | null>(null);

  if (!scannerModalOpen) return null;

  const handleSimulateScan = (barcode: string) => {
    const matched = products.find(p => p.barcode === barcode);
    if (matched) {
      if (scannedBarcodeCallback) {
        scannedBarcodeCallback(matched);
      }
      onScanBarcode(barcode);
      setScannedFeedback(`Successfully scanned: ${matched.name}`);
      setTimeout(() => {
        setScannedFeedback(null);
        setScannerModalOpen(false);
      }, 1000);
    } else {
      setScannedFeedback(`Product with barcode "${barcode}" not found.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg">Barcode Scanner Simulator</h3>
          </div>
          <button 
            onClick={() => setScannerModalOpen(false)}
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {scannedFeedback && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-xl flex items-center space-x-3 text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{scannedFeedback}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type or Select Barcode</label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Enter barcode number..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                onClick={() => handleSimulateScan(inputCode)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 font-semibold rounded-xl text-sm transition shadow-lg shadow-emerald-600/20"
              >
                Scan
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Or Click a Sample Product Barcode</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {products.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSimulateScan(p.barcode)}
                  className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-left transition group"
                >
                  <div className="truncate pr-2">
                    <span className="font-medium text-sm block text-white group-hover:text-emerald-400 transition">{p.name}</span>
                    <span className="text-xs text-slate-400 font-mono">Barcode: {p.barcode}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-800/60">
                    {p.sellingPrice.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-4 flex justify-end border-t border-slate-800">
          <button
            onClick={() => setScannerModalOpen(false)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
