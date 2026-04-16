import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import CategoryScroll from '../../components/CategoryScroll';
import RestaurantCard from '../../components/RestaurantCard';
import { restaurants } from '../../utils/mockData';

export default function HomePage() {
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
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
