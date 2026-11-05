import React from 'react';
import { UserPlus, Pizza, History } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab, historyCount }) {
  return (
    <header className="bg-red-600 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Pizza className="h-8 w-8 text-yellow-300 animate-bounce" />
          <h1 className="text-xl md:text-2xl font-black tracking-wide">
            MARIO'S HUB
          </h1>
        </div>

        <nav className="flex bg-red-700/60 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab('register')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition ${
              activeTab === 'register'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-white hover:bg-red-600/50'
            }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>Registration</span>
          </button>

          <button
            onClick={() => setActiveTab('pizza')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition ${
              activeTab === 'pizza'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-white hover:bg-red-600/50'
            }`}
          >
            <Pizza className="h-4 w-4" />
            <span>Order Pizza</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition relative ${
              activeTab === 'history'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-white hover:bg-red-600/50'
            }`}
          >
            <History className="h-4 w-4" />
            <span>Orders</span>
            {historyCount > 0 && (
              <span className="bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                {historyCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}