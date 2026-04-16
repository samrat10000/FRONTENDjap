import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import VendorDashboard from './features/vendor/VendorDashboard';
import RegisterRestaurant from './features/vendor/RegisterRestaurant';
import ManageMenu from './features/vendor/ManageMenu';
import CartDrawer from './components/CartDrawer';
import AuthModal from './features/auth/AuthModal';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Footer from './components/Footer';
import PartnerLanding from './features/partner/PartnerLanding';
import OrderHistory from './features/profile/OrderHistory';

function App() {
  return (
    <Router>
      <CartDrawer />
      <AuthModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partner" element={<PartnerLanding />} />
        <Route path="/orders" element={<OrderHistory />} />
        
        {/* Vendor Routes (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['vendor', 'admin']} />}>
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/vendor/register" element={<RegisterRestaurant />} />
          <Route path="/vendor/manage/:id" element={<ManageMenu />} />
        </Route>
        
        {/* Fallback for now */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
