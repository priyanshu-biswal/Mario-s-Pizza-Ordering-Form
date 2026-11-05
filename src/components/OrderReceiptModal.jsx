import React from 'react';
import { CheckCircle, X, Printer } from 'lucide-react';

export default function OrderReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto" />
          <h3 className="text-2xl font-black text-slate-800">Order Confirmed!</h3>
          <p className="text-xs text-slate-500">Receipt ID: {receipt.orderId}</p>
          <p className="text-xs text-slate-400">{receipt.timestamp}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl space-y-3 text-xs md:text-sm mb-6 border border-slate-100">
          <div className="border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-700 block">Customer Info:</span>
            <div className="text-slate-600">{receipt.customerName} ({receipt.customerPhone})</div>
          </div>

          <div className="border-b border-slate-200 pb-2 space-y-1">
            <span className="font-bold text-slate-700 block">Items Ordered:</span>
            <div className="flex justify-between">
              <span>{receipt.quantity}x {receipt.size.name} ({receipt.crust.name})</span>
              <span>₹{receipt.priceDetails.allPizzasTotal}</span>
            </div>
            {receipt.toppings.length > 0 && (
              <div className="text-slate-500 text-xs pl-2">
                Toppings: {receipt.toppings.map(t => t.name).join(', ')}
              </div>
            )}
            {Object.keys(receipt.selectedSides).length > 0 && (
              <div className="text-slate-500 text-xs pl-2">
                Sides: {Object.entries(receipt.selectedSides).map(([id, q]) => `${q}x ${id}`).join(', ')}
              </div>
            )}
          </div>

          <div className="pt-1 space-y-1 font-semibold">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{receipt.priceDetails.subTotal}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Taxes (5%)</span>
              <span>₹{receipt.priceDetails.tax}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-1">
              <span>Total Paid</span>
              <span className="text-emerald-600">₹{receipt.priceDetails.grandTotal}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}