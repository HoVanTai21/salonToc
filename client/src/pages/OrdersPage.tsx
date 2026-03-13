import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  confirmed: { label: 'Đã xác nhận', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  shipping: { label: 'Đang giao', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
  completed: { label: 'Hoàn thành', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
  cancelled: { label: 'Đã hủy', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
};

const orders: Order[] = [
  {
    id: 'DH-20250312-001',
    date: '12/03/2025 - 14:30',
    status: 'pending',
    items: [
      { name: 'Thuốc nhuộm tóc L\'Oreal Excellence', qty: 2, price: 450000 },
      { name: 'Dầu gội Kerastase Bain Satin', qty: 1, price: 680000 },
    ],
    total: 1580000,
  },
  {
    id: 'DH-20250310-002',
    date: '10/03/2025 - 10:15',
    status: 'shipping',
    items: [
      { name: 'Serum dưỡng tóc Moroccanoil', qty: 1, price: 920000 },
      { name: 'Lược chải tóc Tangle Teezer', qty: 1, price: 350000 },
      { name: 'Kẹp tóc cao cấp (set 6)', qty: 2, price: 180000 },
    ],
    total: 1630000,
  },
  {
    id: 'DH-20250305-003',
    date: '05/03/2025 - 16:45',
    status: 'completed',
    items: [
      { name: 'Combo cắt + gội + sấy tạo kiểu', qty: 1, price: 250000 },
    ],
    total: 250000,
  },
];

function formatVND(n: number) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function OrderCard({ order }: { order: Order }) {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <span className="text-xs text-gray-400">Mã đơn</span>
          <p className="font-bold text-[#1a1a2e] text-sm">{order.id}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.color}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </div>

      {/* Items */}
      <div className="px-6 py-4 space-y-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5b7df7]/10 to-[#b54784]/10 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-[#5b7df7]" />
              </div>
              <div>
                <p className="text-[#1a1a2e] font-medium">{item.name}</p>
                <p className="text-gray-400 text-xs">x{item.qty}</p>
              </div>
            </div>
            <span className="text-[#1a1a2e] font-semibold whitespace-nowrap">
              {formatVND(item.price)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
        <span className="text-xs text-gray-400">{order.date}</span>
        <div className="text-right">
          <span className="text-xs text-gray-400">Tổng cộng</span>
          <p
            className="text-lg font-bold"
            style={{
              background: 'linear-gradient(135deg, #5b7df7, #b54784)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {formatVND(order.total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back + Title */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            to="/"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#5b7df7] hover:border-[#5b7df7] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a1a2e]">
              Đơn Hàng Của Bạn
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {orders.length} đơn hàng
            </p>
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
