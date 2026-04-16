import { useState, type CSSProperties, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock3,
  FileText,
  Image as ImageIcon,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Store,
  Tag,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useCreateRestaurantMutation, useUploadImageMutation } from '../../redux/api/vendorApi';

const CATEGORIES = ['Sushi', 'Ramen', 'Takoyaki', 'Matcha', 'Bento', 'Sake', 'Tempura'];
const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'] as const;
type PriceRange = (typeof PRICE_RANGES)[number];

const inputStyle: CSSProperties = {
  padding: '0.8rem 1rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-color)',
  outline: 'none',
};

const checkboxLabelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontWeight: 600,
};

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

export default function RegisterRestaurant() {
  const navigate = useNavigate();
  const [createRestaurant, { isLoading }] = useCreateRestaurantMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    category: 'Sushi',
    description: '',
    phone: '',
    email: '',
    image: '',
    coverImage: '',
    cuisines: '',
    openingHours: '',
    priceRange: '$$' as PriceRange,
    deliveryAvailable: true,
    pickupAvailable: true,
  });
  const [selectedFiles, setSelectedFiles] = useState<{
    image: File | null;
    coverImage: File | null;
  }>({
    image: null,
    coverImage: null,
  });

  const handleFileUpload = async (field: 'image' | 'coverImage', folder: 'restaurants' | 'restaurant-covers') => {
    const file = selectedFiles[field];

    if (!file) {
      return;
    }

    const payload = new FormData();
    payload.append('image', file);
    payload.append('folder', folder);

    try {
      const result = await uploadImage(payload).unwrap();
      setFormData((current) => ({ ...current, [field]: result.imageUrl }));
      alert(`${field === 'image' ? 'Restaurant card image' : 'Restaurant cover image'} uploaded.`);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRestaurant({
        ...formData,
        cuisines: formData.cuisines
          .split(',')
          .map((entry) => entry.trim())
          .filter(Boolean),
        openingHours: formData.openingHours
          .split(',')
          .map((entry) => entry.trim())
          .filter(Boolean),
      }).unwrap();
      navigate('/vendor');
    } catch (err) {
      console.error('Failed to create restaurant:', err);
      alert('Error creating restaurant. Please check the form and try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Navbar />

      <main className="container" style={{ padding: '3rem 1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 600 }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Register Restaurant</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Add your business details so vendors can manage menus and go live properly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'var(--card-bg)',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <Field label="Restaurant Name" icon={<Store size={16} />}>
                <input
                  required
                  type="text"
                  placeholder="Kyoto Sushi House"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
              </Field>
              <Field label="Location" icon={<MapPin size={16} />}>
                <input
                  required
                  type="text"
                  placeholder="Shibuya, Tokyo"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={inputStyle}
                />
              </Field>
            </div>

            <Field label="Full Address" icon={<MapPin size={16} />}>
              <input
                required
                type="text"
                placeholder="Street, area, city, postal code"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={inputStyle}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <Field label="Category" icon={<Tag size={16} />}>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={inputStyle}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Price Range">
                <select
                  value={formData.priceRange}
                  onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as PriceRange })}
                  style={inputStyle}
                >
                  {PRICE_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Restaurant Description" icon={<FileText size={16} />}>
              <textarea
                required
                rows={4}
                placeholder="Tell customers what makes your restaurant special."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <Field label="Phone" icon={<Phone size={16} />}>
                <input
                  required
                  type="text"
                  placeholder="+81 90 1234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                />
              </Field>
              <Field label="Business Email" icon={<Mail size={16} />}>
                <input
                  required
                  type="email"
                  placeholder="hello@restaurant.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <Field label="Cuisine Tags">
                <input
                  type="text"
                  placeholder="Sushi, Omakase, Seafood"
                  value={formData.cuisines}
                  onChange={(e) => setFormData({ ...formData, cuisines: e.target.value })}
                  style={inputStyle}
                />
              </Field>
              <Field label="Opening Hours" icon={<Clock3 size={16} />}>
                <input
                  type="text"
                  placeholder="Mon-Fri 11:00-22:00, Sat-Sun 12:00-23:00"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <Field label="Card Image" icon={<ImageIcon size={16} />}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFiles({ ...selectedFiles, image: e.target.files?.[0] ?? null })}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    disabled={!selectedFiles.image || isUploading}
                    onClick={() => handleFileUpload('image', 'restaurants')}
                    style={secondaryButtonStyle}
                  >
                    Upload Card Image
                  </button>
                  <input
                    type="text"
                    placeholder="Or paste image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </Field>
              <Field label="Cover Image" icon={<ImageIcon size={16} />}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFiles({ ...selectedFiles, coverImage: e.target.files?.[0] ?? null })}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    disabled={!selectedFiles.coverImage || isUploading}
                    onClick={() => handleFileUpload('coverImage', 'restaurant-covers')}
                    style={secondaryButtonStyle}
                  >
                    Upload Cover Image
                  </button>
                  <input
                    type="text"
                    placeholder="Or paste image URL"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </Field>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={formData.deliveryAvailable}
                  onChange={(e) => setFormData({ ...formData, deliveryAvailable: e.target.checked })}
                />
                Delivery Available
              </label>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={formData.pickupAvailable}
                  onChange={(e) => setFormData({ ...formData, pickupAvailable: e.target.checked })}
                />
                Pickup Available
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading || isUploading ? <Loader2 size={20} className="animate-spin" /> : 'Register Restaurant'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

const secondaryButtonStyle: CSSProperties = {
  border: '1px solid var(--border-color)',
  padding: '0.8rem 1rem',
  borderRadius: 'var(--radius-md)',
  fontWeight: 600,
  backgroundColor: 'var(--card-bg)',
};
