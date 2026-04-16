import { Star, MapPin, Plus } from 'lucide-react';
import { useAppDispatch } from '../redux/hooks';
import { addItem } from '../redux/slices/cartSlice';

interface RestaurantProps {
  restaurant: {
    id?: number;
    _id?: string;
    name: string;
    rating: number;
    distance?: string;
    location?: string;
    price?: string;
    priceRange?: string;
    image?: string;
    category: string;
  }
}

export default function RestaurantCard({ restaurant }: RestaurantProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addItem({
      id: restaurant.id ?? (Number(restaurant._id?.slice(-6).replace(/\D/g, '')) || 0),
      name: restaurant.name,
      price: (restaurant.price ?? restaurant.priceRange ?? '$').length * 10,
      quantity: 1,
      image: restaurant.image ?? '',
    }));
  };

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
      flexDirection: 'column',
      position: 'relative'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={restaurant.image ?? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80'} 
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
            {restaurant.distance ?? restaurant.location ?? 'Local area'}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ fontWeight: 500 }}>{restaurant.price ?? restaurant.priceRange ?? '$$'}</span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ color: 'var(--primary-red)', backgroundColor: '#d1413815', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>{restaurant.category}</span>
        </div>
      </div>
      <button 
        onClick={handleAddToCart}
        style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: 'var(--primary-red)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
