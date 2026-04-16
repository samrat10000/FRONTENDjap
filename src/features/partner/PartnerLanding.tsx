import { Rocket, TrendingUp, Users, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react';
import '../../styles/partner.css';
import partnerHero from '../../assets/partner_hero.png';
import { useState } from 'react';
import { useRegisterMutation } from '../../redux/api/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function PartnerLanding() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'vendor' // Default to vendor for this page
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(formData).unwrap();
      dispatch(login({ user: result.user, token: result.token }));
      navigate('/vendor');
    } catch (err) {
      alert("Registration failed. Try a different email.");
    }
  };

  return (
    <div style={{ backgroundColor: '#fcfcfc' }}>
      {/* <Navbar /> */}
      
      {/* Hero Section */}
      <section 
        className="partner-hero"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${partnerHero})` }}
      >
        <div className="container">
          <h1>Partner with DiscoverJP</h1>
          <p>Get your restaurant in front of thousands of local food enthusiasts and grow your business with our premium technology.</p>
          <a href="#register" style={{ backgroundColor: 'var(--primary-red)', padding: '1.2rem 2.5rem', borderRadius: 'var(--radius-md)', fontSize: '1.2rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
            Get Started Now <ChevronRight size={24} />
          </a>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="partner-card-grid">
        <div className="partner-info-card">
          <div className="icon-wrapper"><TrendingUp size={30} /></div>
          <h3>Boost Sales</h3>
          <p>Expand your reach beyond your physical storefront. Reach new customers in your neighborhood and beyond.</p>
        </div>
        <div className="partner-info-card">
          <div className="icon-wrapper"><Users size={30} /></div>
          <h3>Smart Insights</h3>
          <p>Understand your customers better with our powerful analytics and order management tools.</p>
        </div>
        <div className="partner-info-card">
          <div className="icon-wrapper"><ShieldCheck size={30} /></div>
          <h3>Complete Control</h3>
          <p>Manage your menu, prices, and availability in real-time with our intuitive Vendor Dashboard.</p>
        </div>
      </section>

      {/* Onboarding Form */}
      <section id="register" className="partner-cta-section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Join the DiscoverJP family today</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Rocket color="var(--primary-red)" /> <span>Step 1: Create your business account</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Rocket color="var(--primary-red)" /> <span>Step 2: Register your restaurant & menu</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Rocket color="var(--primary-red)" /> <span>Step 3: Go live and start receiving orders</span>
              </li>
            </ul>
          </div>

          <div className="partner-form-container">
            <h3 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 800 }}>Vendor Launchpad</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input 
                required
                placeholder="Business Name / Owner Name"
                style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '1rem' }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                required
                type="email"
                placeholder="Business Email"
                style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '1rem' }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                required
                type="password"
                placeholder="Create Password"
                style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '1rem' }}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '1.2rem', borderRadius: 'var(--radius-md)', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Register as Partner'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
