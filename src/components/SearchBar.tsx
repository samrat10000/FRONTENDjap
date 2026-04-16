import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '1rem auto' }}>
      <div style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
        <Search size={20} />
      </div>
      <input 
        type="text" 
        placeholder="Search for ramen, sushi, takoyaki..." 
        style={{
          width: '100%',
          padding: '1.2rem 1rem 1.2rem 3.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          fontSize: '1rem',
          outline: 'none',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all var(--transition-speed) ease',
          backgroundColor: 'var(--card-bg)',
          color: 'var(--text-primary)',
          fontFamily: 'inherit'
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-red)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
      />
    </div>
  );
}
