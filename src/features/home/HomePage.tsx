import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import CategoryScroll from '../../components/CategoryScroll';
import RestaurantCard from '../../components/RestaurantCard';
import { useGetRestaurantsQuery } from '../../redux/api/restaurantApi';

const SkeletonCard = () => (
  <div style={{
    backgroundColor: '#eee',
    borderRadius: 'var(--radius-lg)',
    height: '320px',
    width: '100%',
    animation: 'pulse 1.5s infinite ease-in-out'
  }}>
    <style>{`
      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
    `}</style>
  </div>
);


export default function HomePage() {
  const { data: restaurants, isLoading, isError } = useGetRestaurantsQuery();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="container" style={{ paddingBottom: '4rem', flex: 1 }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Discover <span style={{ color: 'var(--primary-red)' }}>Authentic</span> Taste
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto' }}>
            Explore hidden gems and the best local food in your neighborhood.
          </p>
        </div>

        <SearchBar />

        {/* Categories Section */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>What are you craving?</h3>
          </div>
          <CategoryScroll />
        </div>

        {/* Popular Near You Section */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Popular Near You</h3>
            <span style={{ color: 'var(--primary-red)', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', transition: 'background-color var(--transition-speed)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1413810'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              See all
            </span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {isLoading ? (
              // Loading State: 4 Skeleton cards
              [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
            ) : isError ? (
              // Error State
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--primary-red)' }}>
                <p>Failed to load restaurants. Please try again later.</p>
              </div>
            ) : (
              // Success State
              restaurants?.map(restaurant => (
                <RestaurantCard key={restaurant._id ?? restaurant.id ?? restaurant.name} restaurant={restaurant} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
