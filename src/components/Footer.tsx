import { Globe, Camera, Send, Play, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">DiscoverJP</div>
          <div className="footer-selectors">
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'none' }}>
              <img src="https://flagcdn.com/jp.svg" alt="Japan" style={{ width: '20px' }} />
              Japan
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'none' }}>
              <Globe size={18} />
              English
            </button>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-column">
            <h4>About DiscoverJP</h4>
            <ul>
              <li><Link to="#">Who We Are</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">Work With Us</Link></li>
              <li><Link to="#">Investor Relations</Link></li>
              <li><Link to="#">Report Fraud</Link></li>
              <li><Link to="#">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Japfoodverse</h4>
            <ul>
              <li><Link to="#">Tokyofood</Link></li>
              <li><Link to="#">Kyoto Eats</Link></li>
              <li><Link to="#">Osaka Bites</Link></li>
              <li><Link to="#">Feeding Japan</Link></li>
              <li><Link to="#">Hyperlocal</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>For Restaurants</h4>
            <ul>
              <li><Link to="/partner" style={{ color: 'var(--primary-red)', fontWeight: 600 }}>Partner With Us</Link></li>
              <li><Link to="#">Apps For You</Link></li>
            </ul>
            <h4 style={{ marginTop: '2rem' }}>For Enterprises</h4>
            <ul>
              <li><Link to="#">DiscoverJP For Business</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Learn More</h4>
              <ul>
              <li><Link to="#">Privacy</Link></li>
              <li><Link to="#">Security</Link></li>
              <li><Link to="#">Terms</Link></li>
              <li><Link to="#">Sitemap</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Social Links</h4>
            <div className="footer-social">
              <span className="social-icon"><Camera size={14} /></span>
              <span className="social-icon"><Send size={14} /></span>
              <span className="social-icon"><Play size={14} /></span>
              <span className="social-icon"><MessageCircle size={14} /></span>
            </div>
            <div className="footer-apps">
               <img src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e3341898a9ed774f760265611618145503.png" alt="App Store" />
               <img src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638ff5c31618145512.png" alt="Google Play" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2024-2025 © DiscoverJP™ Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
