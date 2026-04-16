import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MapPin,
  Moon,
  ShoppingBag,
  Store,
  Sun,
  User,
  Wallet,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleTheme, toggleCart, toggleAuthModal } from '../redux/slices/uiSlice';
import { logout } from '../redux/slices/authSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useAppSelector((state) => state.ui.theme);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const isVendor = isAuthenticated && ['vendor', 'admin'].includes(user?.role || '');
  const isPartnerSurface = location.pathname.startsWith('/partner') || location.pathname.startsWith('/vendor');
  const showVendorNav = isVendor || isPartnerSurface;

  const handleAuthAction = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      dispatch(toggleAuthModal());
    }
  };

  return (
    <nav
      style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--card-bg)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link
          to={showVendorNav ? '/partner' : '/'}
          style={{ color: 'var(--primary-red)', fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none' }}
        >
          DiscoverJP
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
          }}
        >
          <MapPin size={16} />
          <span>{showVendorNav ? 'Vendor Console' : 'Tokyo, Shibuya'}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {showVendorNav ? (
          <>
            {isVendor ? (
              <>
                <Link
                  to="/vendor"
                  style={navLinkStyle(location.pathname === '/vendor')}
                >
                  <LayoutDashboard size={18} />
                  <span className="hide-mobile">Dashboard</span>
                </Link>

                <Link
                  to="/vendor/register"
                  style={navLinkStyle(location.pathname === '/vendor/register')}
                >
                  <Store size={18} />
                  <span className="hide-mobile">Register Restaurant</span>
                </Link>
              </>
            ) : (
              <button
                onClick={() => dispatch(toggleAuthModal())}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '999px',
                  padding: '0.7rem 1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--card-bg)',
                }}
              >
                Vendor Login
              </button>
            )}
          </>
        ) : (
          <>
            <button
              style={{
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'color var(--transition-speed)',
              }}
            >
              <Wallet size={20} />
              <span style={{ fontWeight: 600 }} className="hide-mobile">
                Yen 1200
              </span>
            </button>

            <button
              onClick={() => dispatch(toggleCart())}
              style={{ position: 'relative', color: 'var(--text-primary)', transition: 'color var(--transition-speed)' }}
            >
              <ShoppingBag size={20} />
              {totalQuantity > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: 'var(--primary-red)',
                    color: 'white',
                    fontSize: '0.7rem',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {totalQuantity}
                </span>
              )}
            </button>
          </>
        )}

        <button
          onClick={() => dispatch(toggleTheme())}
          style={{ color: 'var(--text-primary)', transition: 'color var(--transition-speed)' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {isAuthenticated && !isVendor && (
          <Link
            to="/orders"
            style={{
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <ClipboardList size={20} />
            <span className="hide-mobile">My Orders</span>
          </Link>
        )}

        <button
          onClick={handleAuthAction}
          style={{
            color: isAuthenticated ? 'var(--primary-red)' : 'var(--text-primary)',
            backgroundColor: 'var(--border-color)',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          title={isAuthenticated ? 'Sign Out' : showVendorNav ? 'Vendor Sign In' : 'Sign In'}
        >
          {isAuthenticated ? <LogOut size={20} /> : <User size={20} />}
        </button>
      </div>
    </nav>
  );
}

const navLinkStyle = (isActive: boolean) => ({
  color: isActive ? 'var(--primary-red)' : 'var(--text-primary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
  fontSize: '0.95rem',
  fontWeight: 700,
  textDecoration: 'none',
});
