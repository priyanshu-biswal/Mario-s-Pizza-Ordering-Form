import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import RegistrationForm from './components/RegistrationForm';
import PizzaOrderForm from './components/PizzaOrderForm';
import OrderReceiptModal from './components/OrderReceiptModal';
import ReceiptHistory from './components/ReceiptHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('mario_order_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mario_order_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const handleNewOrder = (receipt) => {
    setActiveReceipt(receipt);
    setOrderHistory(prev => [receipt, ...prev]);
  };

  const handleClearHistory = () => {
    setOrderHistory([]);
    localStorage.removeItem('mario_order_history');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={orderHistory.length}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {activeTab === 'register' && <RegistrationForm />}
        {activeTab === 'pizza' && <PizzaOrderForm onOrderSubmit={handleNewOrder} />}
        {activeTab === 'history' && (
          <ReceiptHistory history={orderHistory} onClearHistory={handleClearHistory} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Mario's Pizza & User System. Built with React & Tailwind CSS.</p>
      </footer>

      {activeReceipt && (
        <OrderReceiptModal
          receipt={activeReceipt}
          onClose={() => setActiveReceipt(null)}
        />
      )}
    </div>
  );
}