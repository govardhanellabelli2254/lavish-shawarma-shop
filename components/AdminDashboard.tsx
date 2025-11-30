import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import { X, RefreshCw, CheckCircle, Clock, QrCode } from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'qrs'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [qrCount, setQrCount] = useState(10);

  // Simulate real-time orders
  useEffect(() => {
    if (!isOpen) return;

    // Initial mock orders
    const initialOrders: Order[] = [
        {
            id: 'ORD-1023',
            customerName: 'Table #5',
            items: [],
            total: 240.00,
            status: 'Preparing',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            type: 'Pickup' // Used as proxy for 'Dine-in' in this mock
        }
    ];
    setOrders(initialOrders);

    const interval = setInterval(() => {
        if (Math.random() > 0.8) {
            const newOrder: Order = {
                id: `ORD-${Math.floor(Math.random() * 10000)}`,
                customerName: `Table #${Math.floor(Math.random() * 10) + 1}`,
                items: [],
                total: parseFloat((Math.random() * 500 + 100).toFixed(2)),
                status: 'Pending',
                timestamp: new Date(),
                type: 'Pickup'
            };
            setOrders(prev => [newOrder, ...prev]);
        }
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-gray-50 overflow-y-auto">
        {/* Header */}
        <div className="bg-lavish-dark text-white sticky top-0 z-10 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-lavish-red p-2 rounded-lg text-white font-bold">LS</div>
                    <h2 className="text-xl font-bold">Admin Dashboard</h2>
                </div>
                <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>
            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 flex gap-6 mt-2">
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`pb-3 font-semibold text-sm ${activeTab === 'orders' ? 'text-lavish-red border-b-2 border-lavish-red' : 'text-gray-400 hover:text-white'}`}
                >
                    Live Orders
                </button>
                <button 
                    onClick={() => setActiveTab('qrs')}
                    className={`pb-3 font-semibold text-sm ${activeTab === 'qrs' ? 'text-lavish-red border-b-2 border-lavish-red' : 'text-gray-400 hover:text-white'}`}
                >
                    Table QR Codes
                </button>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
            {activeTab === 'orders' ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Kitchen Display System</h3>
                        <span className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Live
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-mono text-gray-500 text-sm">#{order.id}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                                            order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-xl">{order.customerName}</h4>
                                    <p className="text-sm text-gray-400 flex items-center gap-1">
                                        <Clock size={12} /> {order.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                                
                                <div className="text-right flex flex-col items-end gap-3">
                                    <div className="text-2xl font-bold text-lavish-dark">₹{order.total.toFixed(2)}</div>
                                    <div className="flex gap-2">
                                        {order.status === 'Pending' && (
                                            <button 
                                                onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'Preparing'} : o))}
                                                className="bg-lavish-red hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                                            >
                                                Start Cooking
                                            </button>
                                        )}
                                        {order.status === 'Preparing' && (
                                            <button 
                                                onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'Ready'} : o))}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                                            >
                                                Mark Ready
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <QrCode /> Generate Table QR Codes
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Generate links for your tables. Print these out or convert them to QR codes using any free tool.
                        When a customer scans them, the app will know which table they are seated at.
                    </p>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <label className="font-semibold">Number of Tables:</label>
                        <input 
                            type="number" 
                            value={qrCount} 
                            onChange={(e) => setQrCount(parseInt(e.target.value))}
                            className="border border-gray-300 rounded p-2 w-20"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: qrCount }).map((_, i) => {
                            const tableNum = i + 1;
                            const url = `${window.location.origin}/?table=${tableNum}`;
                            return (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div>
                                        <span className="font-bold text-lavish-dark block">Table {tableNum}</span>
                                        <a href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 truncate block max-w-[200px]">{url}</a>
                                    </div>
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(url)}
                                        className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        Copy Link
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
