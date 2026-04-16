import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  Clock3,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Leaf,
  Loader2,
  Pencil,
  Plus,
  Store,
  Tag,
  Trash2,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import {
  useAddMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useUpdateRestaurantMutation,
} from '../../redux/api/vendorApi';
import { useGetRestaurantByIdQuery, type MenuItem } from '../../redux/api/restaurantApi';
type PriceRange = '$' | '$$' | '$$$' | '$$$$';
interface RestaurantFormState {
  description: string;
  phone: string;
  email: string;
  address: string;
  coverImage: string;
  openingHours: string;
  cuisines: string;
  priceRange: PriceRange;
  deliveryAvailable: boolean;
  pickupAvailable: boolean;
  isActive: boolean;
}

const inputStyle: CSSProperties = {
  padding: '0.8rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-color)',
};

const checkboxLabelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontWeight: 600,
};

const emptyMenuForm = {
  name: '',
  price: '',
  description: '',
  category: 'Main Course',
  image: '',
  preparationTimeMinutes: '15',
  dietaryTags: '',
  ingredients: '',
  calories: '',
  spiceLevel: 'mild',
  isAvailable: true,
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ManageMenu() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: restaurant, isLoading: isLoadingResto } = useGetRestaurantByIdQuery(id!);
  const [addMenuItem, { isLoading: isAdding }] = useAddMenuItemMutation();
  const [updateMenuItem, { isLoading: isUpdatingItem }] = useUpdateMenuItemMutation();
  const [deleteMenuItem, { isLoading: isDeletingItem }] = useDeleteMenuItemMutation();
  const [updateRestaurant, { isLoading: isSavingRestaurant }] = useUpdateRestaurantMutation();

  const [menuForm, setMenuForm] = useState(emptyMenuForm);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [restaurantForm, setRestaurantForm] = useState<RestaurantFormState>({
    description: '',
    phone: '',
    email: '',
    address: '',
    coverImage: '',
    openingHours: '',
    cuisines: '',
    priceRange: '$$' as PriceRange,
    deliveryAvailable: true,
    pickupAvailable: true,
    isActive: true,
  });

  useEffect(() => {
    if (!restaurant) return;

    setRestaurantForm({
      description: restaurant.description ?? '',
      phone: restaurant.phone ?? '',
      email: restaurant.email ?? '',
      address: restaurant.address ?? '',
      coverImage: restaurant.coverImage ?? '',
      openingHours: (restaurant.openingHours ?? []).join(', '),
      cuisines: (restaurant.cuisines ?? []).join(', '),
      priceRange: (restaurant.priceRange ?? '$$') as PriceRange,
      deliveryAvailable: restaurant.deliveryAvailable ?? true,
      pickupAvailable: restaurant.pickupAvailable ?? true,
      isActive: restaurant.isActive ?? true,
    });
  }, [restaurant]);

  const resetMenuForm = () => {
    setMenuForm(emptyMenuForm);
    setEditingItemId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...menuForm,
      price: parseFloat(menuForm.price),
      preparationTimeMinutes: parseInt(menuForm.preparationTimeMinutes, 10),
      dietaryTags: menuForm.dietaryTags
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean),
      ingredients: menuForm.ingredients
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean),
      nutrition: {
        calories: menuForm.calories ? parseInt(menuForm.calories, 10) : undefined,
        spiceLevel: menuForm.spiceLevel as 'mild' | 'medium' | 'hot' | 'very-hot',
      },
    };

    try {
      if (editingItemId) {
        await updateMenuItem({
          restaurantId: id!,
          menuItemId: editingItemId,
          item: payload,
        }).unwrap();
      } else {
        await addMenuItem({
          restaurantId: id!,
          item: payload,
        }).unwrap();
      }

      setShowSuccess(true);
      resetMenuForm();
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to save menu item:', err);
      alert('Error saving menu item. Make sure you are the owner.');
    }
  };

  const handleRestaurantSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!restaurant?._id) return;

    try {
      await updateRestaurant({
        restaurantId: restaurant._id,
        body: {
          ...restaurant,
          ...restaurantForm,
          cuisines: restaurantForm.cuisines
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean),
          openingHours: restaurantForm.openingHours
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean),
        },
      }).unwrap();
      alert('Restaurant details updated.');
    } catch (err) {
      console.error('Failed to update restaurant:', err);
      alert('Error updating restaurant details.');
    }
  };

  const startEditingItem = (item: MenuItem) => {
    setEditingItemId(item._id ?? null);
    setMenuForm({
      name: item.name,
      price: String(item.price),
      description: item.description,
      category: item.category,
      image: item.image ?? '',
      preparationTimeMinutes: String(item.preparationTimeMinutes ?? 15),
      dietaryTags: (item.dietaryTags ?? []).join(', '),
      ingredients: (item.ingredients ?? []).join(', '),
      calories: item.nutrition?.calories ? String(item.nutrition.calories) : '',
      spiceLevel: item.nutrition?.spiceLevel ?? 'mild',
      isAvailable: item.isAvailable ?? true,
    });
  };

  const handleDelete = async (menuItemId: string) => {
    try {
      await deleteMenuItem({ restaurantId: id!, menuItemId }).unwrap();

      if (editingItemId === menuItemId) {
        resetMenuForm();
      }
    } catch (err) {
      console.error('Failed to delete menu item:', err);
      alert('Error deleting menu item.');
    }
  };

  if (isLoadingResto) {
    return <div style={{ textAlign: 'center', padding: '10rem' }}>Loading menu...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Navbar />

      <main className="container" style={{ padding: '3rem 1rem' }}>
        <button
          onClick={() => navigate('/vendor')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 600 }}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <form
          onSubmit={handleRestaurantSave}
          style={{
            backgroundColor: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Store size={20} />
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{restaurant?.name}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Restaurant settings and listing controls</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <input
              placeholder="Contact phone"
              value={restaurantForm.phone}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, phone: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Contact email"
              value={restaurantForm.email}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, email: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Address"
              value={restaurantForm.address}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, address: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Cover image URL"
              value={restaurantForm.coverImage}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, coverImage: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Cuisine tags"
              value={restaurantForm.cuisines}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisines: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Opening hours"
              value={restaurantForm.openingHours}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, openingHours: e.target.value })}
              style={inputStyle}
            />
          </div>

          <textarea
            rows={3}
            placeholder="Restaurant description"
            value={restaurantForm.description}
            onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={restaurantForm.priceRange}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, priceRange: e.target.value as PriceRange })}
              style={inputStyle}
            >
              {['$', '$$', '$$$', '$$$$'].map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={restaurantForm.deliveryAvailable}
                onChange={(e) => setRestaurantForm({ ...restaurantForm, deliveryAvailable: e.target.checked })}
              />
              Delivery
            </label>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={restaurantForm.pickupAvailable}
                onChange={(e) => setRestaurantForm({ ...restaurantForm, pickupAvailable: e.target.checked })}
              />
              Pickup
            </label>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={restaurantForm.isActive}
                onChange={(e) => setRestaurantForm({ ...restaurantForm, isActive: e.target.checked })}
              />
              Active listing
            </label>
            <button
              type="submit"
              disabled={isSavingRestaurant}
              style={{
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                padding: '0.85rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
              }}
            >
              {isSavingRestaurant ? 'Saving...' : 'Save Restaurant Details'}
            </button>
          </div>
        </form>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                {editingItemId ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Add dishes one by one with their own image, category, ingredients, and availability.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: 'var(--card-bg)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
              }}
            >
              <Field label="Item Name">
                <input
                  required
                  placeholder="Salmon Aburi Sushi"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  style={inputStyle}
                />
              </Field>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Field label="Price (JPY)" icon={<DollarSign size={14} />}>
                  <input
                    required
                    type="number"
                    placeholder="1200"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Category" icon={<Tag size={14} />}>
                  <input
                    required
                    placeholder="Starter, Main, Drink"
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Field label="Prep Time" icon={<Clock3 size={14} />}>
                  <input
                    type="number"
                    placeholder="15"
                    value={menuForm.preparationTimeMinutes}
                    onChange={(e) => setMenuForm({ ...menuForm, preparationTimeMinutes: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Dietary Tags" icon={<Leaf size={14} />}>
                  <input
                    placeholder="Vegetarian, Halal"
                    value={menuForm.dietaryTags}
                    onChange={(e) => setMenuForm({ ...menuForm, dietaryTags: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
              </div>

              <Field label="Description" icon={<FileText size={14} />}>
                <textarea
                  required
                  rows={3}
                  placeholder="Freshly torched salmon with spicy mayo..."
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </Field>

              <Field label="Image URL" icon={<ImageIcon size={14} />}>
                <input
                  placeholder="https://images.unsplash.com/..."
                  value={menuForm.image}
                  onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                  style={inputStyle}
                />
              </Field>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Field label="Ingredients">
                  <input
                    placeholder="Salmon, rice, soy, sesame"
                    value={menuForm.ingredients}
                    onChange={(e) => setMenuForm({ ...menuForm, ingredients: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Calories">
                  <input
                    type="number"
                    placeholder="420"
                    value={menuForm.calories}
                    onChange={(e) => setMenuForm({ ...menuForm, calories: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  value={menuForm.spiceLevel}
                  onChange={(e) => setMenuForm({ ...menuForm, spiceLevel: e.target.value })}
                  style={inputStyle}
                >
                  <option value="mild">Mild</option>
                  <option value="medium">Medium</option>
                  <option value="hot">Hot</option>
                  <option value="very-hot">Very Hot</option>
                </select>
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    checked={menuForm.isAvailable}
                    onChange={(e) => setMenuForm({ ...menuForm, isAvailable: e.target.checked })}
                  />
                  Available for order
                </label>
              </div>

              <button
                type="submit"
                disabled={isAdding || isUpdatingItem}
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
                  cursor: isAdding || isUpdatingItem ? 'not-allowed' : 'pointer',
                }}
              >
                {isAdding || isUpdatingItem ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : editingItemId ? (
                  <>
                    <Pencil size={20} /> Update Menu Item
                  </>
                ) : (
                  <>
                    <Plus size={20} /> Add to Menu
                  </>
                )}
              </button>

              {editingItemId && (
                <button
                  type="button"
                  onClick={resetMenuForm}
                  style={{ border: '1px solid var(--border-color)', padding: '0.95rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}
                >
                  Cancel Editing
                </button>
              )}

              {showSuccess && (
                <div style={{ backgroundColor: '#4caf5015', color: '#4caf50', padding: '0.8rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600 }}>
                  <CheckCircle size={18} /> Menu item saved successfully!
                </div>
              )}
            </form>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Current Menu</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {restaurant?.menuItems && restaurant.menuItems.length > 0 ? (
                restaurant.menuItems.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr auto',
                      gap: '1.5rem',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                    <div>
                      <h4 style={{ fontWeight: 700 }}>{item.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.description}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                        {item.category} • {item.preparationTimeMinutes ?? 15} min • {item.isAvailable ? 'Available' : 'Unavailable'}
                      </p>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-red)', marginTop: '0.4rem', display: 'block' }}>
                        ¥{item.price}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => startEditingItem(item)}
                        style={{ border: '1px solid var(--border-color)', padding: '0.65rem', borderRadius: 'var(--radius-sm)' }}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        disabled={isDeletingItem}
                        onClick={() => item._id && handleDelete(item._id)}
                        style={{ border: '1px solid #fecaca', color: '#b91c1c', padding: '0.65rem', borderRadius: 'var(--radius-sm)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
                  No items on the menu yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
