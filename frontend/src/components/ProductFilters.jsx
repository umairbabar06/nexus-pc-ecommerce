import { useState, useEffect } from 'react';
import { getProductFacets } from '../api';
import './ProductFilters.css';

const CATEGORY_LABELS = {
  cpu: 'CPU', gpu: 'Graphics Card', ram: 'RAM', mobo: 'Motherboard',
  hdd: 'HDD', ssd: 'SSD', psu: 'Power Supply', casing: 'PC Case',
  cooler: 'CPU Cooler', cooling_fans: 'Cooling Fan', adapters: 'Adapters',
  cables: 'Cables', cases: 'Phone Cases', custom_cases: 'Custom Cases',
  airbuds: 'Airbuds', airpods: 'Airpods', handsfree: 'Handsfree',
  headsets: 'Headsets', gaming_sets: 'Gaming Sets', power_banks: 'Power Banks',
  smart_watches: 'Smart Watches', speakers: 'Speakers', tripods: 'Tripods',
  watch_straps: 'Watch Straps', other: 'Other',
};

/**
 * Full filter sidebar driven by /api/products/facets.
 * Sections: Category → Brand → Price → In-Stock → Spec filters
 * All state lives in the URL (shareable, back-button friendly).
 */
const ProductFilters = ({ searchParams, updateFilters }) => {
  const [facets, setFacets]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [priceMin, setPriceMin]   = useState(searchParams.get('minPrice') || '');
  const [priceMax, setPriceMax]   = useState(searchParams.get('maxPrice') || '');

  // Derive current selections from URL
  const activeCategories = () => {
    const raw = searchParams.get('category');
    return raw ? raw.split(',').filter(Boolean) : [];
  };
  const activeBrands = () => {
    const raw = searchParams.get('brand');
    return raw ? raw.split(',').filter(Boolean) : [];
  };
  const activeSpecValues = (key) => {
    const raw = searchParams.get(`spec_${key}`);
    return raw ? raw.split(',').filter(Boolean) : [];
  };

  // Re-fetch facets whenever URL changes (category / search drives which specs appear)
  useEffect(() => {
    setLoading(true);
    const params = {};
    const cat = searchParams.get('category');
    const q   = searchParams.get('search');
    if (cat) params.category = cat;
    if (q)   params.search   = q;
    getProductFacets(params)
      .then((res) => setFacets(res.data))
      .catch(() => setFacets(null))
      .finally(() => setLoading(false));
  }, [searchParams.get('category'), searchParams.get('search')]);

  // Sync price inputs if URL changes externally
  useEffect(() => {
    setPriceMin(searchParams.get('minPrice') || '');
    setPriceMax(searchParams.get('maxPrice') || '');
  }, [searchParams]);

  // ── Toggle helpers ─────────────────────────────────────────────────────────
  const toggleListParam = (paramKey, value) => {
    const current = (searchParams.get(paramKey) || '')
      .split(',').filter(Boolean);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [paramKey]: next.length ? next.join(',') : undefined, page: undefined });
  };

  const toggleSpecValue = (key, value) => {
    const current = activeSpecValues(key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [`spec_${key}`]: next.length ? next.join(',') : undefined, page: undefined });
  };

  const applyPriceRange = () => {
    updateFilters({ minPrice: priceMin || undefined, maxPrice: priceMax || undefined, page: undefined });
  };

  const inStockOnly = searchParams.get('inStock') === 'true';
  const toggleInStock = () =>
    updateFilters({ inStock: inStockOnly ? undefined : 'true', page: undefined });

  // Active filter count (for the mobile badge)
  const activeCats    = activeCategories();
  const activeBrandList = activeBrands();
  const activeFilterCount =
    activeCats.length +
    activeBrandList.length +
    (facets?.filters || []).reduce((s, f) => s + activeSpecValues(f.key).length, 0) +
    (searchParams.get('minPrice') || searchParams.get('maxPrice') ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearAll = () => {
    const updates = { category: undefined, brand: undefined, minPrice: undefined, maxPrice: undefined, inStock: undefined, page: undefined };
    (facets?.filters || []).forEach((f) => { updates[`spec_${f.key}`] = undefined; });
    updateFilters(updates);
  };

  // ── Reusable checkbox group ─────────────────────────────────────────────────
  const CheckGroup = ({ title, items, isChecked, onToggle, labelKey = 'value', countKey = 'count' }) => {
    const [expanded, setExpanded] = useState(true);
    if (!items || items.length === 0) return null;
    const visible = expanded ? items : items.slice(0, 6);

    return (
      <div className="pf-group">
        <button className="pf-group-title pf-collapsible" onClick={() => setExpanded(!expanded)}>
          {title}
          <span className="pf-chevron">{expanded ? '▲' : '▼'}</span>
        </button>
        <div className="pf-options">
          {visible.map((item) => (
            <label className="pf-checkbox-row" key={String(item[labelKey])}>
              <input
                type="checkbox"
                checked={isChecked(String(item[labelKey]))}
                onChange={() => onToggle(String(item[labelKey]))}
              />
              <span className="pf-option-label">{item.label || item[labelKey]}</span>
              <span className="pf-count">({item[countKey]})</span>
            </label>
          ))}
          {items.length > 6 && (
            <button className="pf-show-more" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Show less' : `+${items.length - 6} more`}
            </button>
          )}
        </div>
      </div>
    );
  };

  // ── Main sidebar content ───────────────────────────────────────────────────
  const content = (
    <>
      <div className="pf-header">
        <h4>Filters</h4>
        {activeFilterCount > 0 && (
          <button className="pf-clear" onClick={clearAll}>Clear all ({activeFilterCount})</button>
        )}
      </div>

      {loading ? (
        <div className="pf-loading">Loading filters...</div>
      ) : (
        <>
          {/* ── Categories ───────────────────────────────────── */}
          {facets?.categories?.length > 0 && (
            <CheckGroup
              title="Category"
              items={facets.categories.map((c) => ({
                ...c,
                label: CATEGORY_LABELS[c.value] || c.value,
              }))}
              isChecked={(v) => activeCategories().includes(v)}
              onToggle={(v) => toggleListParam('category', v)}
            />
          )}

          {/* ── Brands ───────────────────────────────────────── */}
          {facets?.brands?.length > 0 && (
            <CheckGroup
              title="Brand"
              items={facets.brands}
              isChecked={(v) => activeBrands().includes(v)}
              onToggle={(v) => toggleListParam('brand', v)}
            />
          )}

          {/* ── Price range ──────────────────────────────────── */}
          {facets?.priceRange && facets.priceRange.max > 0 && (
            <div className="pf-group">
              <p className="pf-group-title">Price (PKR)</p>
              <div className="pf-price-row">
                <input
                  type="number"
                  placeholder={`Min ${Math.floor(facets.priceRange.min).toLocaleString()}`}
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="pf-price-input"
                />
                <span>–</span>
                <input
                  type="number"
                  placeholder={`Max ${Math.ceil(facets.priceRange.max).toLocaleString()}`}
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="pf-price-input"
                />
              </div>
              <button className="btn btn-outline pf-apply-btn" onClick={applyPriceRange}>
                Apply
              </button>
            </div>
          )}

          {/* ── In-stock toggle ──────────────────────────────── */}
          <div className="pf-group">
            <label className="pf-checkbox-row">
              <input type="checkbox" checked={inStockOnly} onChange={toggleInStock} />
              <span className="pf-option-label">In Stock Only</span>
            </label>
          </div>

          {/* ── Spec filters (category-specific) ─────────────── */}
          {(facets?.filters || []).map((filter) => (
            <CheckGroup
              key={filter.key}
              title={filter.label}
              items={filter.options}
              isChecked={(v) => activeSpecValues(filter.key).includes(v)}
              onToggle={(v) => toggleSpecValue(filter.key, v)}
            />
          ))}

          {!loading && (facets?.filters || []).length === 0 &&
           !facets?.brands?.length && (
            <p className="pf-empty">No additional filters for this selection.</p>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button className="pf-mobile-toggle btn btn-outline" onClick={() => setMobileOpen(true)}>
        Filters {activeFilterCount > 0 && <span className="pf-badge">{activeFilterCount}</span>}
      </button>

      {/* Desktop sidebar */}
      <aside className="pf-sidebar pf-desktop">{content}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="pf-drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div className="pf-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="pf-drawer-head">
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              <button className="pf-drawer-close" onClick={() => setMobileOpen(false)}>×</button>
            </div>
            {content}
            <button className="btn btn-primary pf-drawer-done" onClick={() => setMobileOpen(false)}>
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
