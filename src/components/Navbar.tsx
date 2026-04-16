import { MapPin, User, Wallet, Moon, Sun, ShoppingBag, LayoutDashboard, LogOut, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleTheme, toggleCart, toggleAuthModal } from '../redux/slices/uiSlice';
import { logout } from '../redux/slices/authSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.ui.theme);
  const totalQuantity = useAppSelector(state => state.cart.totalQuantity);
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  const handleToggleVendor = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      dispatch(toggleAuthModal());
    }
  };

  return (
    <nav style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Brand & Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <h1 style={{ color: 'var(--primary-red)', fontSize: '1.5rem', fontWeight: 700 }}>DiscoverJP</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer' }}>
          <MapPin size={16} />
          <span>Tokyo, Shibuya</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {isAuthenticated && user?.role !== 'user' && (
          <Link to="/vendor" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <LayoutDashboard size={18} />
            <span className="hide-mobile">Dashboard</span>
          </Link>
        )}
        
        <button style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color var(--transition-speed)' }}>
          <Wallet size={20} />
          <span style={{ fontWeight: 600 }} className="hide-mobile">¥1200</span>
        </button>

        <button 
          onClick={() => dispatch(toggleCart())}
          style={{ position: 'relative', color: 'var(--text-primary)', transition: 'color var(--transition-speed)' }}
        >
          <ShoppingBag size={20} />
          {totalQuantity > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--primary-red)', color: 'white', fontSize: '0.7rem', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {totalQuantity}
            </span>
          )}
        </button>

        <button 
          onClick={() => dispatch(toggleTheme())}
          style={{ color: 'var(--text-primary)', transition: 'color var(--transition-speed)' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {isAuthenticated && (
          <Link to="/orders" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
             <ClipboardList size={20} />
             <span className="hide-mobile">My Orders</span>
          </Link>
        )}

        <button 
          onClick={handleToggleVendor}
          style={{ 
            color: isAuthenticated ? 'var(--primary-red)' : 'var(--text-primary)', 
            backgroundColor: 'var(--border-color)', 
            padding: '0.5rem', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          title={isAuthenticated ? "Sign Out" : "Sign In as Vendor"}
        >
          {isAuthenticated ? <LogOut size={20} /> : <User size={20} />}
        </button>
      </div>
    </nav>
  );
}
