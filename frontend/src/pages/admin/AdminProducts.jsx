import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import AdminNav from '../../components/AdminNav';
import {
  adminGetProducts,
  adminAddProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminGetRecycleBin,
  adminRestoreProduct,
  adminPermanentDeleteProduct,
  adminBulkDeleteProducts,
  adminEmptyRecycleBin,
  adminBulkRestoreProducts,
} from '../../api';
import { getImageUrl } from '../../utils/imageUrl';
import './AdminProducts.css';

const CATEGORIES = [
  { value: 'cpu', label: 'CPU' },
  { value: 'gpu', label: 'Graphics Card' },
  { value: 'ram', label: 'RAM' },
  { value: 'mobo', label: 'Motherboard' },
  { value: 'hdd', label: 'HDD' },
  { value: 'ssd', label: 'SSD' },
  { value: 'psu', label: 'Power Supply' },
  { value: 'casing', label: 'PC Case' },
  { value: 'cooler', label: 'CPU Cooler' },
  { value: 'cooling_fans', label: 'Cooling Fan' },
  { value: 'adapters', label: 'Adapters' },
  { value: 'cables', label: 'Cables' },
  { value: 'cases', label: 'Phone Cases' },
  { value: 'custom_cases', label: 'Customized Cases' },
  { value: 'airbuds', label: 'Airbuds' },
  { value: 'airpods', label: 'Airpods' },
  { value: 'handsfree', label: 'Handsfree' },
  { value: 'headsets', label: 'Headsets' },
  { value: 'gaming_sets', label: 'Gaming Sets' },
  { value: 'power_banks', label: 'Power Banks' },
  { value: 'smart_watches', label: 'Smart Watches' },
  { value: 'speakers', label: 'Speakers' },
  { value: 'tripods', label: 'Tripods' },
  { value: 'watch_straps', label: 'Watch Straps' },
  { value: 'other', label: 'Other' },
];

const categoryLabel = (value) => CATEGORIES.find((c) => c.value === value)?.label || value;
const imgSrc = (image) => getImageUrl(image);

// Mirrors backend/config/filterConfig.js — category-specific spec fields
// shown in the Add/Edit form, so products actually get the attributes
// the storefront's filter sidebar depends on (socket, ramType, wattage, etc).
const SPEC_FIELDS = {
  cpu: [{ key: 'socket', label: 'Socket' }, { key: 'brand', label: 'Brand' }, { key: 'cores', label: 'Cores' }],
  gpu: [{ key: 'brand', label: 'Brand' }, { key: 'vram', label: 'VRAM' }, { key: 'chipset', label: 'Chipset' }],
  ram: [{ key: 'ramType', label: 'Memory Type' }, { key: 'capacity', label: 'Capacity' }, { key: 'speed', label: 'Speed (MHz)' }],
  ssd: [{ key: 'capacity', label: 'Capacity' }, { key: 'interface', label: 'Interface' }],
  hdd: [{ key: 'capacity', label: 'Capacity' }],
  mobo: [{ key: 'socket', label: 'Socket' }, { key: 'formFactor', label: 'Form Factor' }],
  psu: [{ key: 'wattage', label: 'Wattage' }, { key: 'efficiency', label: 'Efficiency Rating' }],
  casing: [{ key: 'formFactor', label: 'Form Factor' }],
  cooler: [{ key: 'coolerType', label: 'Cooler Type' }, { key: 'socket', label: 'Socket Support' }],
  cooling_fans: [{ key: 'size', label: 'Fan Size' }],
};
const specFieldsForCategory = (category) => [{ key: 'color', label: 'Color' }, ...(SPEC_FIELDS[category] || [])];

const emptyForm = {
  name: '', category: 'cpu', price: '', stock: '', description: '', isFeatured: false,
};

const AdminProducts = () => {
  const [view, setView] = useState('active'); // 'active' | 'recycle'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ── Checkbox / bulk select state (active products) ──
  const [selected, setSelected] = useState(new Set());
  // ── Checkbox / bulk select state (recycle bin) ──
  const [recycleSel, setRecycleSel] = useState(new Set());

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [specValues, setSpecValues] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toastMsg, setToastMsg] = useState('');



  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const loadActive = useCallback(() => {
    setLoading(true);
    setSelected(new Set()); // clear selection on reload
    adminGetProducts({ search: search || undefined, category: categoryFilter || undefined, page, limit: 12 })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => showToast('Failed to load products'))
      .finally(() => setLoading(false));
  }, [search, categoryFilter, page]);

  const loadRecycleBin = useCallback(() => {
    setLoading(true);
    setSelected(new Set());
    setRecycleSel(new Set());
    adminGetRecycleBin()
      .then((res) => setProducts(res.data.products))
      .catch(() => showToast('Failed to load recycle bin'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (view === 'active') loadActive();
    else loadRecycleBin();
  }, [view, loadActive, loadRecycleBin]);

  // ── Active products checkbox helpers ──
  const allSelected = products.length > 0 && selected.size === products.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(products.map(p => p._id)));
  };

  const toggleOne = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // ── Recycle bin checkbox helpers ──
  const allRecycleSel = products.length > 0 && view === 'recycle' && recycleSel.size === products.length;
  const someRecycleSel = recycleSel.size > 0 && !allRecycleSel;

  const toggleAllRecycle = () => {
    if (allRecycleSel) setRecycleSel(new Set());
    else setRecycleSel(new Set(products.map(p => p._id)));
  };

  const toggleOneRecycle = (id) => {
    setRecycleSel(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // ── Bulk delete (active products → recycle bin) ──
  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!window.confirm(`Move ${selected.size} product(s) to the recycle bin?`)) return;
    try {
      await adminBulkDeleteProducts([...selected]);
      showToast(`${selected.size} product(s) moved to recycle bin`);
      loadActive();
    } catch { showToast('Bulk delete failed'); }
  };

  // ── Bulk restore (recycle bin → active) ──
  const handleBulkRestore = async () => {
    if (recycleSel.size === 0) return;
    if (!window.confirm(`Restore ${recycleSel.size} product(s)?`)) return;
    try {
      await adminBulkRestoreProducts([...recycleSel]);
      showToast(`${recycleSel.size} product(s) restored`);
      loadRecycleBin();
    } catch { showToast('Bulk restore failed'); }
  };

  // ── Empty entire recycle bin ──
  const handleEmptyRecycleBin = async () => {
    if (!window.confirm('Permanently delete ALL products in the recycle bin? This cannot be undone.')) return;
    try {
      const res = await adminEmptyRecycleBin();
      showToast(res.data.message || 'Recycle bin emptied');
      loadRecycleBin();
    } catch {
      showToast('Failed to empty recycle bin');
    }
  };

  // ── Modal helpers ──
  const openAddModal = () => {
    setEditingId(null); setForm(emptyForm); setSpecValues({}); setImageFile(null); setImagePreview(null); setError(''); setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || '', category: product.category || 'cpu',
      price: product.price ?? '', stock: product.stock ?? '',
      description: product.description || '', isFeatured: !!product.isFeatured,
    });
    setSpecValues(product.specs || {});
    setImageFile(null); setImagePreview(imgSrc(product.image)); setError(''); setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) { setError('Name and price are required.'); return; }
    setSaving(true); setError('');
    const fd = new FormData();
    fd.append('name', form.name.trim()); fd.append('category', form.category);
    fd.append('price', form.price); fd.append('stock', form.stock || 0);
    fd.append('description', form.description); fd.append('isFeatured', form.isFeatured);

    // Only send spec keys relevant to the selected category (+ color),
    // and only if the admin actually filled them in.
    const relevantKeys = specFieldsForCategory(form.category).map((f) => f.key);
    const specsToSend = {};
    relevantKeys.forEach((key) => {
      if (specValues[key]) specsToSend[key] = specValues[key];
    });
    fd.append('specs', JSON.stringify(specsToSend));

    if (imageFile) fd.append('image', imageFile);
    try {
      if (editingId) { await adminUpdateProduct(editingId, fd); showToast('Product updated'); }
      else { await adminAddProduct(fd); showToast('Product added'); }
      setModalOpen(false); loadActive();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Move "${product.name}" to the recycle bin?`)) return;
    try { await adminDeleteProduct(product._id); showToast('Moved to recycle bin'); loadActive(); }
    catch { showToast('Failed to delete product'); }
  };

  const handleRestore = async (product) => {
    try { await adminRestoreProduct(product._id); showToast('Product restored'); loadRecycleBin(); }
    catch { showToast('Failed to restore product'); }
  };

  const handlePermanentDelete = async (product) => {
    if (!window.confirm(`Permanently delete "${product.name}"? This cannot be undone.`)) return;
    try { await adminPermanentDeleteProduct(product._id); showToast('Product permanently deleted'); loadRecycleBin(); }
    catch { showToast('Failed to delete product'); }
  };



  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>Manage Products</h2>
            <p>Add, edit, and remove products from your store</p>
            <div className="section-divider"></div>
          </div>

          <AdminNav />

          {/* ── Toolbar ── */}
          <div className="ap-toolbar">
            <div className="ap-toolbar-tabs">
              <button className={`ap-tab${view === 'active' ? ' active' : ''}`}
                onClick={() => { setView('active'); setPage(1); }}>
                All Products
              </button>
              <button className={`ap-tab${view === 'recycle' ? ' active' : ''}`}
                onClick={() => setView('recycle')}>
                Recycle Bin
              </button>
            </div>

            {view === 'active' && (
              <div className="ap-toolbar-filters">
                <input type="text" placeholder="Search products..." value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="ap-input" />
                <select value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }} className="ap-input">
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <button className="btn btn-primary ap-add-btn" onClick={openAddModal}>+ Add Product</button>
              </div>
            )}

            {/* Empty Recycle Bin button */}
            {view === 'recycle' && products.length > 0 && (
              <button className="btn ap-empty-bin-btn" onClick={handleEmptyRecycleBin}>
                🗑 Empty Recycle Bin ({products.length})
              </button>
            )}
          </div>



          {/* Bulk restore bar — shown when items selected in recycle bin */}
          {view === 'recycle' && recycleSel.size > 0 && (
            <div className="ap-bulk-restore-bar">
              <span>{recycleSel.size} product{recycleSel.size > 1 ? 's' : ''} selected</span>
              <div className="ap-bulk-actions">
                <button className="btn btn-outline btn-sm" onClick={() => setRecycleSel(new Set())}>Deselect All</button>
                <button className="btn btn-sm ap-bulk-restore-btn" onClick={handleBulkRestore}>↩ Restore Selected</button>
              </div>
            </div>
          )}

          {/* Bulk Action Bar (shown when items are selected in active view) ── */}
          {/* Bulk delete bar — active products */}
          {view === 'active' && selected.size > 0 && (
            <div className="ap-bulk-bar">
              <span>{selected.size} product{selected.size > 1 ? 's' : ''} selected</span>
              <div className="ap-bulk-actions">
                <button className="btn btn-outline btn-sm" onClick={() => setSelected(new Set())}>
                  Deselect All
                </button>
                <button className="btn btn-sm ap-bulk-delete-btn" onClick={handleBulkDelete}>
                  🗑 Move to Recycle Bin
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="spinner-container"><div className="spinner"></div></div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>{view === 'active' ? 'No products found.' : 'Recycle bin is empty.'}</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="admin-table-wrap card ap-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      {/* Select-all checkbox column header */}
                      {(view === 'active' || view === 'recycle') && (
                        <th className="ap-check-col">
                          <input
                            type="checkbox"
                            className="ap-checkbox"
                            checked={view === 'active' ? allSelected : allRecycleSel}
                            ref={el => { if (el) el.indeterminate = view === 'active' ? someSelected : someRecycleSel; }}
                            onChange={view === 'active' ? toggleAll : toggleAllRecycle}
                          />
                        </th>
                      )}
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} className={selected.has(p._id) || recycleSel.has(p._id) ? 'ap-row-selected' : ''}>
                        {/* Row checkbox */}
                        {view === 'active' && (
                          <td className="ap-check-col">
                            <input type="checkbox" className="ap-checkbox" checked={selected.has(p._id)} onChange={() => toggleOne(p._id)} />
                          </td>
                        )}
                        {view === 'recycle' && (
                          <td className="ap-check-col">
                            <input type="checkbox" className="ap-checkbox" checked={recycleSel.has(p._id)} onChange={() => toggleOneRecycle(p._id)} />
                          </td>
                        )}
                        <td><img className="ap-thumb" src={imgSrc(p.image)} alt={p.name} /></td>
                        <td className="ap-name-cell">
                          {p.name}
                          {p.isFeatured && <span className="badge badge-warning ap-featured-badge">Featured</span>}
                        </td>
                        <td><span className="ap-category-badge">{categoryLabel(p.category)}</span></td>
                        <td className="order-amount">PKR {p.price?.toLocaleString()}</td>
                        <td>{p.stock}</td>
                        <td>
                          {view === 'active' ? (
                            <div className="ap-actions">
                              <button className="ap-icon-btn" onClick={() => openEditModal(p)}>Edit</button>
                              <button className="ap-icon-btn ap-danger" onClick={() => handleDelete(p)}>Delete</button>
                            </div>
                          ) : (
                            <div className="ap-actions">
                              <button className="ap-icon-btn" onClick={() => handleRestore(p)}>Restore</button>
                              <button className="ap-icon-btn ap-danger" onClick={() => handlePermanentDelete(p)}>Delete Forever</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="ap-mobile-list">
                {products.map((p) => (
                  <div key={p._id} className={`ap-mobile-card card ${selected.has(p._id) || recycleSel.has(p._id) ? 'ap-row-selected' : ''}`}>
                    {view === 'active' && (
                      <input type="checkbox" className="ap-checkbox ap-mobile-checkbox"
                        checked={selected.has(p._id)} onChange={() => toggleOne(p._id)} />
                    )}
                    {view === 'recycle' && (
                      <input type="checkbox" className="ap-checkbox ap-mobile-checkbox"
                        checked={recycleSel.has(p._id)} onChange={() => toggleOneRecycle(p._id)} />
                    )}
                    <img className="ap-mobile-thumb" src={imgSrc(p.image)} alt={p.name} />
                    <div className="ap-mobile-info">
                      <p className="ap-mobile-name">
                        {p.name}
                        {p.isFeatured && <span className="badge badge-warning ap-featured-badge">Featured</span>}
                      </p>
                      <p className="ap-mobile-meta">
                        <span className="ap-category-badge">{categoryLabel(p.category)}</span>
                        <span className="order-amount">PKR {p.price?.toLocaleString()}</span>
                        <span className="ap-mobile-stock">Stock: {p.stock}</span>
                      </p>
                      {view === 'active' ? (
                        <div className="ap-actions">
                          <button className="ap-icon-btn" onClick={() => openEditModal(p)}>Edit</button>
                          <button className="ap-icon-btn ap-danger" onClick={() => handleDelete(p)}>Delete</button>
                        </div>
                      ) : (
                        <div className="ap-actions">
                          <button className="ap-icon-btn" onClick={() => handleRestore(p)}>Restore</button>
                          <button className="ap-icon-btn ap-danger" onClick={() => handlePermanentDelete(p)}>Delete Forever</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {view === 'active' && totalPages > 1 && (
                <div className="ap-pagination">
                  <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
                  <span>Page {page} of {totalPages}</span>
                  <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="ap-modal-overlay" onClick={closeModal}>
          <div className="ap-modal card" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? 'Edit Product' : 'Add Product'}</h3>

            <form onSubmit={handleSubmit} className="ap-form">
              <div className="ap-form-row">
                <div className="ap-image-upload">
                  {imagePreview
                    ? <img src={imagePreview} alt="preview" />
                    : <span className="ap-image-placeholder">No image</span>}
                  <label className="ap-upload-label">
                    Choose Image
                    <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                  </label>
                </div>

                <div className="ap-form-fields">
                  <label>Product Name
                    <input type="text" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="ap-input" required />
                  </label>

                  <div className="ap-form-grid">
                    <label>Category
                      <select value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })} className="ap-input">
                        {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </label>
                    <label>Price (PKR)
                      <input type="number" min="0" value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="ap-input" required />
                    </label>
                    <label>Stock
                      <input type="number" min="0" value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })} className="ap-input" />
                    </label>
                  </div>
                </div>
              </div>

              {specFieldsForCategory(form.category).length > 0 && (
                <p className="ap-specs-title">Specifications (used for storefront filters)</p>
              )}
              <div className="ap-form-grid ap-spec-grid">
                {specFieldsForCategory(form.category).map(({ key, label }) => (
                  <label key={key}>{label}
                    <input
                      type="text"
                      value={specValues[key] || ''}
                      onChange={(e) => setSpecValues({ ...specValues, [key]: e.target.value })}
                      className="ap-input"
                      placeholder={label}
                    />
                  </label>
                ))}
              </div>

              <label>Description
                <textarea rows={3} value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} className="ap-input" />
              </label>

              <label className="ap-checkbox-row">
                <input type="checkbox" checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                Feature this product on the homepage
              </label>

              {error && <p className="ap-error">{error}</p>}

              <div className="ap-modal-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMsg && <div className="ap-toast">{toastMsg}</div>}
    </div>
  );
};

export default AdminProducts;
