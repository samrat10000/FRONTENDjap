import { categories } from '../utils/mockData';

export default function CategoryScroll() {
  return (
    <div className="hide-scrollbar" style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '1rem 0.5rem', WebkitOverflowScrolling: 'touch' }}>
      {categories.map((category) => (
        <div key={category.id} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem',
          cursor: 'pointer',
          minWidth: '80px'
        }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-bg)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            border: '2px solid transparent',
            transition: 'all var(--transition-speed) ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-red)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          >
            {category.icon}
          </div>
          <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{category.name}</span>
        </div>
      ))}
    </div>
  );
}
