import { MapPin, User, Wallet, Moon } from 'lucide-react';

export default function Navbar() {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color var(--transition-speed)' }}>
          <Wallet size={20} />
          <span style={{ fontWeight: 600 }}>¥1200</span>
        </button>
        <button style={{ color: 'var(--text-primary)', transition: 'color var(--transition-speed)' }}><Moon size={20} /></button>
        <button style={{ color: 'var(--text-primary)', backgroundColor: 'var(--border-color)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}
