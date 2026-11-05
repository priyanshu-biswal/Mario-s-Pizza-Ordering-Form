import React from 'react';
import { Package, Trash2 } from 'lucide-react';

export default function ReceiptHistory({ history, onClearHistory }) {
  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
        <Package className="w-16 h-16 text-slate-300 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-700">No Past Orders Found</h3>
        <p className="text-slate-500 text-sm mt-1">Place an order to view your receipts here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-extrabold text-slate-800">Order History</h2>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All History
        </button>
      </div>

      {history.map((order) => (
        <div key={order.orderId} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800 text-base">{order.orderId}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">Completed</span>
            </div>
            <p className="text-xs text-slate-400">{order.timestamp}</p>
            <p className="text-sm text-slate-700 font-medium">
              {order.quantity}x {order.size.name} • {order.crust.name}
            </p>
          </div>

          <div className="sm:text-right flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <div className="text-lg font-black text-red-600">₹{order.priceDetails.grandTotal}</div>
            <div className="text-xs text-slate-500">Customer: {order.customerName}</div>
          </div>
        </div>
      ))}
    </div>
  );
}