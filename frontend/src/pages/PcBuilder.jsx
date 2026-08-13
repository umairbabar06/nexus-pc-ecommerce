import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBuilderProducts, saveBuild, getBuildByShareId } from '../api';
import { useCart } from '../context/CartContext';
import { getAllWarnings, estimatePowerDraw, getCompatibilityFilters } from '../utils/compatibility';
import { getImageUrl } from '../utils/imageUrl';
import './PcBuilder.css';

const CATEGORIES = [
  { id: 'cpu', label: 'Processor', icon: '⚡' },
  { id: 'mobo', label: 'Motherboard', icon: '🔲' },
  { id: 'ram', label: 'Memory (RAM)', icon: '🧩' },
  { id: 'gpu', label: 'Graphics Card', icon: '🎮' },
  { id: 'ssd', label: 'Storage (SSD)', icon: '💾' },
  { id: 'hdd', label: 'Storage (HDD)', icon: '💿' },
  { id: 'psu', label: 'Power Supply', icon: '🔌' },
  { id: 'casing', label: 'Case / Chassis', icon: '🖥️' },
  { id: 'cooler', label: 'CPU Cooler', icon: '❄️' }
];



const PcBuilder = () => {
  const { platform, shareId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selections, setSelections] = useState({
    cpu: null, mobo: null, ram: null, gpu: null,
    ssd: null, hdd: null, psu: null, casing: null, cooler: null
  });
  
  const [activeSlot, setActiveSlot] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [warnings, setWarnings] = useState([]);
  const [estimatedPower, setEstimatedPower] = useState(50);
  const [buildName, setBuildName] = useState('My Custom Build');
  const [saving, setSaving] = useState(false);

  // Load shared build if ID exists
  useEffect(() => {
    if (shareId) {
      const fetchBuild = async () => {
        try {
          const res = await getBuildByShareId(shareId);
          if (res.data?.success) {
            const build = res.data.build;
            // Map components back to selections (populated product refs)
            const loadedSelections = {};
            CATEGORIES.forEach(cat => {
              const comp = build.components?.[cat.id];
              if (comp && comp.product) {
                // If product is populated (object), use it; otherwise build a minimal object
                const prod = typeof comp.product === 'object' ? comp.product : null;
                loadedSelections[cat.id] = prod ? { ...prod, name: comp.name || prod.name, price: comp.price || prod.price, image: comp.image || prod.image } : { _id: comp.product, name: comp.name, price: comp.price, image: comp.image };
              } else {
                loadedSelections[cat.id] = null;
              }
            });
            setSelections(loadedSelections);
            setBuildName(build.name || 'Shared Build');
            toast.success('Shared build loaded!');
          }
        } catch (error) {
          toast.error('Could not load shared build');
          navigate('/pc-builder');
        }
      };
      fetchBuild();
    }
  }, [shareId, navigate]);

  // Update compatibility and power whenever selections change
  useEffect(() => {
    setWarnings(getAllWarnings(selections));
    setEstimatedPower(estimatePowerDraw(selections));
  }, [selections]);

  const openSlotModal = async (catId) => {
    setActiveSlot(catId);
    setSearchQuery('');
    setLoading(true);
    try {
      const filters = getCompatibilityFilters(selections, catId);
      
      // Inject platform brand filter for CPU category
      if (catId === 'cpu' && platform) {
        filters.brand = platform.toLowerCase() === 'amd' ? 'AMD' : 'Intel';
      }

      const res = await getBuilderProducts({ category: catId, ...filters });
      setProducts(res.data?.products || []);
    } catch (error) {
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const closeSlotModal = () => {
    setActiveSlot(null);
    setProducts([]);
  };

  const selectProduct = (product) => {
    setSelections(prev => ({ ...prev, [activeSlot]: product }));
    closeSlotModal();
  };

  const clearSlot = (catId, e) => {
    e.stopPropagation();
    setSelections(prev => ({ ...prev, [catId]: null }));
  };

  const calculateTotal = () => {
    return Object.values(selections).reduce((total, item) => total + (item ? item.price : 0), 0);
  };

  const handleAddAllToCart = async () => {
    const items = Object.values(selections).filter(Boolean);
    if (items.length === 0) {
      toast.error('No components selected');
      return;
    }
    
    let added = 0;
    for (const item of items) {
      try {
        await addToCart(item._id, 1);
        added++;
      } catch (err) {
        console.error('Failed to add item to cart', err);
      }
    }
    if (added === items.length) {
      toast.success('All items added to cart!');
    } else {
      toast.success(`Added ${added}/${items.length} items to cart`);
    }
  };

  // Build the components payload for save/share
  const buildComponentsPayload = () => {
    const components = {};
    CATEGORIES.forEach(cat => {
      const sel = selections[cat.id];
      if (sel) {
        components[cat.id] = {
          product: sel._id,
          name: sel.name,
          price: sel.price,
          image: sel.image,
        };
      }
    });
    return components;
  };

  const handleSaveBuild = async () => {
    if (Object.values(selections).every(x => x === null)) {
      toast.error('Add some components before saving');
      return;
    }
    const name = window.prompt('Enter a name for your build:', buildName);
    if (!name) return;
    
    setSaving(true);
    try {
      const payload = {
        name,
        components: buildComponentsPayload(),
        totalPrice: calculateTotal(),
        estimatedWattage: estimatedPower,
        compatibilityStatus: warnings.some(w => w.type === 'error') ? 'incompatible' : warnings.some(w => w.type === 'warning') ? 'warnings' : 'compatible',
      };
      const res = await saveBuild(payload);
      if (res.data?.success) {
        setBuildName(name);
        toast.success('Build saved successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save build. Please login.');
    } finally {
      setSaving(false);
    }
  };

  const handleShareBuild = async () => {
    if (Object.values(selections).every(x => x === null)) {
      toast.error('Add some components before sharing');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: buildName,
        components: buildComponentsPayload(),
        totalPrice: calculateTotal(),
        estimatedWattage: estimatedPower,
        compatibilityStatus: warnings.some(w => w.type === 'error') ? 'incompatible' : warnings.some(w => w.type === 'warning') ? 'warnings' : 'compatible',
      };
      const res = await saveBuild(payload);
      if (res.data?.success && res.data.build?.shareId) {
        const shareUrl = `${window.location.origin}/pc-builder/share/${res.data.build.shareId}`;
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Share link copied to clipboard!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate share link. Please login.');
    } finally {
      setSaving(false);
    }
  };

  const psuCapacity = parseInt(selections.psu?.specs?.wattage || selections.psu?.name?.match(/\d+/)?.[0] || 0, 10) || 0;
  const powerMeterPercentage = psuCapacity > 0 ? Math.min(100, (estimatedPower / psuCapacity) * 100) : 0;
  let powerColor = 'var(--success)';
  if (powerMeterPercentage > 90) powerColor = 'var(--danger)';
  else if (powerMeterPercentage > 75) powerColor = 'var(--warning)';

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Navbar />
      <div className="pc-builder-page">
        <div className="builder-header">
          <div className="container">
            <h1 className="builder-title">
              Custom {platform ? (platform.toLowerCase() === 'amd' ? 'Ryzen' : 'Intel') : ''} PC Builder
            </h1>
            <p className="builder-subtitle">Build your dream {platform ? (platform.toLowerCase() === 'amd' ? 'AMD' : 'Intel') : ''} PC with real-time compatibility checks</p>
          </div>
        </div>

        <div className="container builder-container">
          <div className="builder-main">
            <div className="slots-card">
              {CATEGORIES.map(cat => (
                <div key={cat.id} className={`slot-row ${selections[cat.id] ? 'has-selection' : ''}`} onClick={() => openSlotModal(cat.id)}>
                  <div className="slot-icon">{cat.icon}</div>
                  <div className="slot-label">{cat.label}</div>
                  
                  {selections[cat.id] ? (
                    <>
                      <div className="slot-product">
                        <img src={getImageUrl(selections[cat.id].image)} alt={selections[cat.id].name} />
                        <div className="slot-product-info">
                          <span className="product-name">{selections[cat.id].name}</span>
                          <span className="product-brand">{selections[cat.id].brand}</span>
                        </div>
                      </div>
                      <div className="slot-price">PKR {selections[cat.id].price.toLocaleString()}</div>
                      <div className="slot-actions">
                        <button className="btn-icon" onClick={(e) => clearSlot(cat.id, e)} title="Remove">✕</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="slot-empty">No component selected</div>
                      <div className="slot-actions">
                        <button className="btn btn-outline btn-sm">Choose ▼</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="builder-sidebar">
            <div className="sidebar-card compat-card">
              <h3>Compatibility Check</h3>
              {warnings.length === 0 ? (
                <div className="compat-item success">
                  <span>✅</span> All selected components appear compatible.
                </div>
              ) : (
                warnings.map((w, i) => (
                  <div key={i} className={`compat-item ${w.type}`}>
                    <span>{w.type === 'error' ? '❌' : w.type === 'warning' ? '⚠️' : '✅'}</span>
                    {w.message}
                  </div>
                ))
              )}
            </div>

            <div className="sidebar-card power-card">
              <h3>Estimated Power</h3>
              <div className="power-stats">
                <span>{estimatedPower}W</span>
                <span>/ {psuCapacity || '?'}W</span>
              </div>
              <div className="power-meter-bg">
                <div className="power-meter-fill" style={{ width: `${psuCapacity ? powerMeterPercentage : 100}%`, backgroundColor: psuCapacity ? powerColor : 'var(--text-muted)' }}></div>
              </div>
              {!psuCapacity && <small className="text-muted mt-2 block">Select a PSU to see capacity</small>}
            </div>

            <div className="sidebar-card summary-card">
              <h3>Build Summary</h3>
              <div className="build-name-display">{buildName}</div>
              <div className="total-price">
                <span>Total:</span>
                <span>PKR {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="summary-actions">
                <button className="btn btn-primary w-full" onClick={handleAddAllToCart}>Add All to Cart</button>
                <div className="grid-2 mt-3">
                  <button className="btn btn-outline" onClick={handleSaveBuild} disabled={saving}>Save Build</button>
                  <button className="btn btn-outline" onClick={handleShareBuild} disabled={saving}>Share 🔗</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {activeSlot && (
        <div className="modal-overlay" onClick={closeSlotModal}>
          <div className="modal-content slot-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Select {CATEGORIES.find(c => c.id === activeSlot)?.label}</h2>
              <button className="close-btn" onClick={closeSlotModal}>✕</button>
            </div>
            
            <div className="modal-search">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="modal-body">
              {loading ? (
                <div className="loader-container"><div className="loader"></div></div>
              ) : filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map(p => (
                    <div key={p._id} className={`product-card ${selections[activeSlot]?._id === p._id ? 'selected' : ''}`}>
                      <div className="product-image">
                        <img src={getImageUrl(p.image)} alt={p.name} />
                      </div>
                      <div className="product-details">
                        <h4>{p.name}</h4>
                        <div className="price">PKR {p.price.toLocaleString()}</div>
                        {p.specs && (
                          <div className="specs-preview">
                            {Object.entries(p.specs).slice(0, 3).map(([k, v]) => (
                              <span key={k}>{v}</span>
                            ))}
                          </div>
                        )}
                        <button 
                          className="btn btn-primary btn-sm w-full mt-3"
                          onClick={() => selectProduct(p)}
                        >
                          {selections[activeSlot]?._id === p._id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">No products found matching compatibility requirements.</div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PcBuilder;
