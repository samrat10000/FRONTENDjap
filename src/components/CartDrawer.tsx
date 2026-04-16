import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCartOpen, toggleAuthModal } from '../redux/slices/uiSlice';
import { updateQuantity, removeItem, clearCart } from '../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../redux/api/orderApi';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.ui.isCartOpen);
  const { items, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [createOrder, { isLoading: isOrdering }] = useCreateOrderMutation();

  const handleClose = () => dispatch(setCartOpen(false));

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      dispatch(toggleAuthModal());
      return;
    }

    try {
      await createOrder({
        items,
        totalPrice,
      }).unwrap();
      
      alert("Order placed successfully! 🍣");
      dispatch(clearCart());
      dispatch(setCartOpen(false));
      navigate('/');
    } catch (err) {
      console.error('Failed to place order:', err);
      alert("Failed to place order. Make sure the backend is running.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '450px',
        height: '100vh',
        backgroundColor: 'var(--card-bg)',
        zIndex: 1001,
        boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.3s ease-out'
      }}>
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <ShoppingBag size={24} color="var(--primary-red)" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Your Cart</h2>
            <span style={{ fontSize: '0.9rem', backgroundColor: 'var(--primary-red)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 700 }}>
              {totalQuantity}
            </span>
          </div>
          <button onClick={handleClose} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-red)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '5rem', opacity: 0.5 }}>
              <ShoppingBag size={64} style={{ margin: '0 auto 1.5rem' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Your cart is empty</p>
              <button 
                onClick={handleClose}
                style={{ marginTop: '1rem', color: 'var(--primary-red)', fontWeight: 700, borderBottom: '2px solid var(--primary-red)' }}
              >
                Browse Restaurant Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.5rem 0' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.name}</h4>
                  <p style={{ color: 'var(--primary-red)', fontWeight: 600, marginTop: '0.2rem' }}>¥{item.price}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <button 
                        onClick={() => item.quantity > 1 ? dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 })) : dispatch(removeItem(item.id))}
                        style={{ padding: '4px 8px', backgroundColor: '#f5f5f5' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: '0 12px', fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        style={{ padding: '4px 8px', backgroundColor: '#f5f5f5' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => dispatch(removeItem(item.id))}
                  style={{ color: '#ff4d4d', opacity: 0.6 }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '2rem', borderTop: '1px solid var(--border-color)', backgroundColor: '#fff', boxShadow: '0 -4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Amount</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginLeft: 'auto' }}>¥{totalPrice.toLocaleString()}</span>
            </div>
            
            <button 
              disabled={isOrdering}
              onClick={handleCheckout}
              style={{
                width: '100%',
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                transition: 'all 0.2s ease',
                cursor: isOrdering ? 'not-allowed' : 'pointer',
                opacity: isOrdering ? 0.7 : 1
              }}
              onMouseEnter={(e) => { if(!isOrdering) e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(209, 65, 56, 0.3)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {isOrdering ? 'Processing Order...' : <>Checkout <ArrowRight size={20} /></>}
            </button>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
