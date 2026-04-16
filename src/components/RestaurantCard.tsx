import { Star, MapPin } from 'lucide-react';

interface RestaurantProps {
  restaurant: {
    id: number;
    name: string;
    rating: number;
    distance: string;
    price: string;
    image: string;
    category: string;
  }
}

export default function RestaurantCard({ restaurant }: RestaurantProps) {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-color)',
      cursor: 'pointer',
      transition: 'all var(--transition-speed) ease',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-speed)' }} 
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--card-bg)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600, fontSize: '0.9rem', boxShadow: 'var(--shadow-sm)' }}>
          <Star size={16} color="var(--primary-red)" fill="var(--primary-red)" />
          {restaurant.rating}
        </div>
      </div>
      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{restaurant.name}</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <MapPin size={14} />
            {restaurant.distance}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ fontWeight: 500 }}>{restaurant.price}</span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ color: 'var(--primary-red)', backgroundColor: '#d1413815', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>{restaurant.category}</span>
        </div>
      </div>
    </div>
  );
}
