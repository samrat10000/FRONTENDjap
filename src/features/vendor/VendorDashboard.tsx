import { Plus, Store, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useGetVendorRestaurantsQuery } from '../../redux/api/vendorApi';

export default function VendorDashboard() {
  const { data: restaurants, isLoading } = useGetVendorRestaurantsQuery();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Navbar />
      
      <main className="container" style={{ padding: '3rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Vendor Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your restaurants and menu items.</p>
          </div>
          <Link to="/vendor/register" style={{
            backgroundColor: 'var(--primary-red)',
            color: 'white',
            padding: '0.8rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--transition-speed) ease'
          }}>
            <Plus size={20} />
            Register New Restaurant
          </Link>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>Loading your restaurants...</div>
        ) : restaurants && restaurants.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {restaurants.map((resto) => (
              <div key={resto._id} style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-speed)'
              }}>
                <div style={{ height: '180px', position: 'relative' }}>
                  <img src={resto.image} alt={resto.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 600 }}>
                    {resto.category}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{resto.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{resto.location}</p>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to={`/vendor/manage/${resto._id}`} style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'background-color 0.2s'
                    }}>
                      <UtensilsCrossed size={16} />
                      Manage Menu
                    </Link>
                    <button style={{
                      padding: '0.7rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Store size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '8rem 2rem', 
            backgroundColor: 'var(--card-bg)', 
            borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--border-color)'
          }}>
            <Store size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', opacity: 0.5 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>No restaurants found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>You haven't registered any restaurants yet. Start your journey today!</p>
            <Link to="/vendor/register" style={{ color: 'var(--primary-red)', fontWeight: 700 }}>Register your first restaurant &rarr;</Link>
          </div>
        )}
      </main>
    </div>
  );
}
