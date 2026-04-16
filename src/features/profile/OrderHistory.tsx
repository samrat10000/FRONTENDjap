import { Clock, Package, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useGetMyOrdersQuery } from '../../redux/api/orderApi';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 2rem' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> Back to Discovery
        </button>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>My Orders</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Track your culinary journey across Japan.</p>

        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: '120px', backgroundColor: 'var(--border-color)', borderRadius: 'var(--radius-md)', opacity: 0.1, animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : isError ? (
          <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
            <p>Failed to load orders. Make sure the backend is running.</p>
          </div>
        ) : orders && orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
            <ShoppingBag size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>No orders yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Once you place an order, it will appear here.</p>
            <button 
              onClick={() => navigate('/')}
              style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}
            >
              Start Discovering Food
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders?.map((order) => (
              <div 
                key={order._id}
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '2rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-red)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#fef2f2', color: 'var(--primary-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={24} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Order #{order._id?.slice(-6).toUpperCase()}</span>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '12px', 
                        backgroundColor: order.status === 'Pending' ? '#fff7ed' : '#f0fdf4',
                        color: order.status === 'Pending' ? '#c2410c' : '#15803d',
                        fontWeight: 700
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={14} /> {new Date(order.createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>¥{order.totalPrice.toLocaleString()}</span>
                  </div>
                  <ChevronRight size={24} style={{ color: 'var(--border-color)' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
