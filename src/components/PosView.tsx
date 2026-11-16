import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product, CartItem, SalePayment } from '../types';
import { 
  Search, Barcode, Trash2, Plus, Minus, CreditCard, 
  Banknote, Smartphone, CheckCircle, QrCode, RefreshCw, ShoppingCart 
} from 'lucide-react';

export const PosView: React.FC = () => {
  const { 
    currentBusiness, products, processSale, 
    setScannerModalOpen, setScannedBarcodeCallback 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  
  // Payment modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Mobile Money' | 'Bank Transfer' | 'Debit/Credit Card'>('Cash');
  const [amountTendered, setAmountTendered] = useState<string>('');
  const [momoReference, setMomoReference] = useState('');

  // Categories list
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.barcode.includes(searchQuery) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Register scanner callback
  useEffect(() => {
    setScannedBarcodeCallback((product: Product) => {
      addToCart(product);
    });
    return () => setScannedBarcodeCallback(null);
  }, [products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, {
        product,
        quantity: 1,
        unitPrice: product.sellingPrice,
        discount: 0
      }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const tax = subtotal * (currentBusiness.taxRate / 100);
  const total = subtotal + tax;

  const handleCheckoutSubmit = () => {
    const tendered = parseFloat(amountTendered) || total;
    const changeDue = Math.max(0, tendered - total);

    const payments: SalePayment[] = [
      {
        method: paymentMethod,
        amount: tendered,
        reference: paymentMethod === 'Mobile Money' ? momoReference || 'MOMO-REF-9921' : undefined
      }
    ];

    processSale({
      branch: currentBusiness.activeBranch,
      cashierName: 'Abena Mensah',
      customerName: customerName.trim() || 'Walk-in Customer',
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.unitPrice * item.quantity
      })),
      subtotal,
      discount: 0,
      tax,
      total,
      payments,
      amountPaid: tendered,
      changeDue,
      status: 'Completed'
    });

    // Reset cart
    setCart([]);
    setPaymentModalOpen(false);
    setAmountTendered('');
    setMomoReference('');
    setCustomerName('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-6rem)]">
      
      {/* Left: Product Grid & Search */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-4 overflow-hidden">
        
        {/* Search & Barcode scanner top bar */}
        <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search products by name, SKU or barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
          <button
            onClick={() => setScannerModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow transition flex-shrink-0"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Scan Barcode</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredProducts.map(product => {
              const isLowStock = product.stockQuantity <= product.reorderLevel;
              return (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition text-left flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isLowStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {product.stockQuantity} {product.unit}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition line-clamp-2">
                      {product.name}
                    </h4>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between w-full">
                    <span className="font-extrabold text-slate-900 text-base">
                      {currentBusiness.currencySymbol}{product.sellingPrice.toFixed(2)}
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 flex items-center justify-center transition">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right: Cart & Payment Checkout */}
      <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Cart Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Current Cart</h3>
            <span className="text-xs text-slate-500">{cart.reduce((sum, i) => sum + i.quantity, 0)} items added</span>
          </div>
          <button 
            onClick={() => setCart([])}
            disabled={cart.length === 0}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 disabled:opacity-40 px-3 py-1 bg-rose-50 rounded-lg"
          >
            Clear Cart
          </button>
        </div>

        {/* Customer input */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
          <input 
            type="text"
            placeholder="Customer Name (Optional)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
          />
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-12">
              <ShoppingCart className="w-12 h-12 stroke-1" />
              <p className="text-sm font-medium">Cart is currently empty</p>
              <p className="text-xs text-slate-400">Select products from catalogue to begin</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex-1 pr-3">
                  <h5 className="font-bold text-xs text-slate-900">{item.product.name}</h5>
                  <span className="text-xs font-semibold text-emerald-600">
                    {currentBusiness.currencySymbol}{item.unitPrice.toFixed(2)} each
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-slate-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & Checkout Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900">{currentBusiness.currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            {tax > 0 && (
              <div className="flex justify-between">
                <span>VAT / Tax ({currentBusiness.taxRate}%):</span>
                <span className="font-semibold text-slate-900">{currentBusiness.currencySymbol}{tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total:</span>
              <span className="text-emerald-600">{currentBusiness.currencySymbol}{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setPaymentModalOpen(true)}
            disabled={cart.length === 0}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
          >
            <span>Proceed to Payment ({currentBusiness.currencySymbol}{total.toFixed(2)})</span>
          </button>
        </div>

      </div>

      {/* Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">Select Payment Method</h3>
              <button 
                onClick={() => setPaymentModalOpen(false)}
                className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
                <span className="text-xs uppercase font-bold text-emerald-700 block mb-1">Total Amount Due</span>
                <h2 className="text-3xl font-black text-emerald-900">
                  {currentBusiness.currencySymbol}{total.toFixed(2)}
                </h2>
              </div>

              {/* Payment Method selector */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Cash', label: 'Cash', icon: <Banknote className="w-5 h-5" /> },
                  { id: 'Mobile Money', label: 'Mobile Money', icon: <Smartphone className="w-5 h-5" /> },
                  { id: 'Bank Transfer', label: 'Bank Transfer', icon: <RefreshCw className="w-5 h-5" /> },
                  { id: 'Debit/Credit Card', label: 'Card', icon: <CreditCard className="w-5 h-5" /> }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`flex items-center space-x-3 p-3.5 rounded-xl border text-left font-semibold text-sm transition ${
                      paymentMethod === m.id 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Tendered amount input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount Tendered</label>
                <input 
                  type="number"
                  placeholder={total.toFixed(2)}
                  value={amountTendered}
                  onChange={(e) => setAmountTendered(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {paymentMethod === 'Mobile Money' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Mobile Money Ref / Transaction ID</label>
                  <input 
                    type="text"
                    placeholder="e.g. MOMO-TX-88219"
                    value={momoReference}
                    onChange={(e) => setMomoReference(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </div>

            <div className="bg-slate-100 px-6 py-4 flex justify-end space-x-3 border-t border-slate-200">
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckoutSubmit}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/25 transition"
              >
                Confirm & Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
