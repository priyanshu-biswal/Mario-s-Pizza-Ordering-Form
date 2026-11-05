import React, { useState, useMemo } from 'react';
import { SIZES, CRUSTS, TOPPINGS, SIDES } from '../data/pizzaOptions';
import { ShoppingBag, RotateCcw, Plus, Minus, Check } from 'lucide-react';

export default function PizzaOrderForm({ onOrderSubmit }) {
  const initialOrder = {
    customerName: '',
    customerPhone: '',
    size: SIZES[1], // Default Medium
    crust: CRUSTS[0], // Default Classic
    toppings: [],
    selectedSides: {}, // { 'coke': 1, 'garlic-bread': 2 }
    quantity: 1,
    instructions: ''
  };

  const [order, setOrder] = useState(initialOrder);
  const [errors, setErrors] = useState({});

  // Dynamic Price Calculation
  const priceDetails = useMemo(() => {
    const sizePrice = order.size ? order.size.basePrice : 0;
    const crustPrice = order.crust ? order.crust.price : 0;
    const toppingsPrice = order.toppings.reduce((sum, item) => sum + item.price, 0);

    const singlePizzaTotal = sizePrice + crustPrice + toppingsPrice;
    const allPizzasTotal = singlePizzaTotal * order.quantity;

    const sidesTotal = Object.entries(order.selectedSides).reduce((sum, [sideId, qty]) => {
      const sideObj = SIDES.find(s => s.id === sideId);
      return sum + (sideObj ? sideObj.price * qty : 0);
    }, 0);

    const subTotal = allPizzasTotal + sidesTotal;
    const tax = Math.round(subTotal * 0.05); // 5% GST
    const grandTotal = subTotal + tax;

    return { singlePizzaTotal, allPizzasTotal, sidesTotal, subTotal, tax, grandTotal };
  }, [order]);

  const handleToppingToggle = (topping) => {
    setOrder(prev => {
      const exists = prev.toppings.some(t => t.id === topping.id);
      return {
        ...prev,
        toppings: exists
          ? prev.toppings.filter(t => t.id !== topping.id)
          : [...prev.toppings, topping]
      };
    });
  };

  const handleSideQty = (sideId, delta) => {
    setOrder(prev => {
      const currentQty = prev.selectedSides[sideId] || 0;
      const nextQty = Math.max(0, currentQty + delta);
      const updated = { ...prev.selectedSides };
      if (nextQty === 0) {
        delete updated[sideId];
      } else {
        updated[sideId] = nextQty;
      }
      return { ...prev, selectedSides: updated };
    });
  };

  const handleReset = () => {
    setOrder(initialOrder);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrs = {};
    if (!order.customerName.trim()) newErrs.customerName = 'Name is required for delivery.';
    if (!order.customerPhone.trim() || !/^[6-9]\d{9}$/.test(order.customerPhone)) {
      newErrs.customerPhone = 'Valid 10-digit phone number is required.';
    }

    if (Object.keys(newErrs).length > 0) {
      setErrors(newErrs);
      return;
    }

    const completedReceipt = {
      orderId: 'MARIO-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      ...order,
      priceDetails
    };

    onOrderSubmit(completedReceipt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* LEFT 2 COLUMNS: FORM CONFIGURATION */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Customer Quick Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-extrabold text-slate-800 text-lg">1. Delivery Contact</h3>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-600 bg-slate-100 px-2.5 py-1 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Selection
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Customer Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={order.customerName}
                onChange={e => setOrder({ ...order, customerName: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              {errors.customerName && <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={order.customerPhone}
                onChange={e => setOrder({ ...order, customerPhone: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              {errors.customerPhone && <p className="text-xs text-red-600 mt-1">{errors.customerPhone}</p>}
            </div>
          </div>
        </div>

        {/* Pizza Size Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-extrabold text-slate-800 text-lg mb-3">2. Choose Size</h3>
          <div className="grid grid-cols-3 gap-3">
            {SIZES.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setOrder({ ...order, size: s })}
                className={`p-3.5 rounded-xl border-2 text-center transition ${
                  order.size.id === s.id
                    ? 'border-red-600 bg-red-50/50 text-red-700 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-xs text-slate-500 mt-1">₹{s.basePrice}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Crust Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-extrabold text-slate-800 text-lg mb-3">3. Choose Crust</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CRUSTS.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setOrder({ ...order, crust: c })}
                className={`p-3 rounded-xl border-2 flex justify-between items-center transition ${
                  order.crust.id === c.id
                    ? 'border-red-600 bg-red-50/50 text-red-700 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-sm">{c.name}</span>
                <span className="text-xs text-slate-500">
                  {c.price > 0 ? `+₹${c.price}` : 'Free'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Toppings Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-extrabold text-slate-800 text-lg mb-1">4. Select Extra Toppings</h3>
          <p className="text-xs text-slate-500 mb-3">Customize your pizza with tasty add-ons</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TOPPINGS.map(t => {
              const selected = order.toppings.some(item => item.id === t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleToppingToggle(t)}
                  className={`p-3 rounded-xl border text-left flex justify-between items-center transition ${
                    selected
                      ? 'border-red-600 bg-red-600 text-white font-medium shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">{t.name}</div>
                    <div className={`text-[10px] ${selected ? 'text-red-100' : 'text-slate-500'}`}>
                      +₹{t.price}
                    </div>
                  </div>
                  {selected && <Check className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sides & Drinks */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-extrabold text-slate-800 text-lg mb-3">5. Sides & Beverages</h3>
          <div className="space-y-3">
            {SIDES.map(side => {
              const qty = order.selectedSides[side.id] || 0;
              return (
                <div key={side.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <span className="text-sm font-semibold text-slate-800">{side.name}</span>
                    <span className="block text-xs text-slate-500">₹{side.price} each</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSideQty(side.id, -1)}
                      className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center font-bold text-sm">{qty}</span>
                    <button
                      type="button"
                      onClick={() => handleSideQty(side.id, 1)}
                      className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: SUMMARY & LIVE PRICING PANEL */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 sticky top-20">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <ShoppingBag className="w-5 h-5 text-red-600" />
            <h3 className="font-black text-slate-800 text-lg">Order Summary</h3>
          </div>

          <div className="space-y-3 text-sm border-b border-slate-100 pb-4">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>{order.size.name}</span>
              <span>₹{order.size.basePrice}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-500">
              <span>Crust: {order.crust.name}</span>
              <span>+₹{order.crust.price}</span>
            </div>

            {order.toppings.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="text-xs font-bold text-slate-600">Toppings:</div>
                {order.toppings.map(t => (
                  <div key={t.id} className="flex justify-between text-xs text-slate-500 pl-2">
                    <span>• {t.name}</span>
                    <span>+₹{t.price}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-700">Pizza Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOrder({ ...order, quantity: Math.max(1, order.quantity - 1) })}
                  className="p-1 bg-slate-100 rounded text-slate-600 hover:bg-slate-200"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold">{order.quantity}</span>
                <button
                  type="button"
                  onClick={() => setOrder({ ...order, quantity: order.quantity + 1 })}
                  className="p-1 bg-slate-100 rounded text-slate-600 hover:bg-slate-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sides breakdown */}
            {Object.keys(order.selectedSides).length > 0 && (
              <div className="pt-2 border-t border-dashed border-slate-200">
                <div className="text-xs font-bold text-slate-600 mb-1">Sides & Drinks:</div>
                {Object.entries(order.selectedSides).map(([sId, qty]) => {
                  const item = SIDES.find(s => s.id === sId);
                  return (
                    <div key={sId} className="flex justify-between text-xs text-slate-500 pl-2">
                      <span>{qty}x {item?.name}</span>
                      <span>₹{item?.price * qty}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pricing Totals */}
          <div className="py-4 space-y-2 text-sm border-b border-slate-100">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{priceDetails.subTotal}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Taxes & Fees (5% GST)</span>
              <span>₹{priceDetails.tax}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2">
              <span>Grand Total</span>
              <span className="text-red-600">₹{priceDetails.grandTotal}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-5 py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-extrabold rounded-xl shadow-lg shadow-red-200 transition"
          >
            Place Order • ₹{priceDetails.grandTotal}
          </button>
        </div>
      </div>

    </div>
  );
}