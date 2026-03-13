import { Package, Clock, CheckCircle, Truck, XCircle, X } from 'lucide-react';

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

interface OrderDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderDrawer({ open, onClose }: OrderDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a2e]">
              Đơn Hàng
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{orders.length} đơn hàng</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#b54784] hover:border-[#b54784] transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order List */}
        <div className="overflow-y-auto h-[calc(100%-76px)] px-4 py-4 space-y-4">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Mã đơn</span>
                    <p className="font-bold text-[#1a1a2e] text-xs">{order.id}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${config.bg} ${config.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                </div>

                {/* Items */}
                <div className="px-4 py-3 space-y-2.5">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5b7df7]/10 to-[#b54784]/10 flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-[#5b7df7]" />
                        </div>
                        <div>
                          <p className="text-[#1a1a2e] font-medium text-xs leading-tight">{item.name}</p>
                          <p className="text-gray-400 text-[10px]">x{item.qty}</p>
                        </div>
                      </div>
                      <span className="text-[#1a1a2e] font-semibold text-xs whitespace-nowrap ml-2">
                        {formatVND(item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-50">
                  <span className="text-[10px] text-gray-400">{order.date}</span>
                  <span
                    className="text-sm font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #5b7df7, #b54784)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {formatVND(order.total)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
