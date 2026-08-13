import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductFilters from '../components/ProductFilters';
import { getProducts, getCategories } from '../api';
import './Products.css';
import SEO from '../components/SEO';
import { getImageUrl } from '../utils/imageUrl';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentSort = searchParams.get('sort') || '';

  useEffect(() => {
    getCategories().then(res => setCategoriesList(res.data.categories || [])).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { page: currentPage, limit: 20 };
    if (currentCategory) params.category = currentCategory;
    if (currentSearch)   params.search   = currentSearch;
    if (currentSort)     params.sort     = currentSort;

    // Forward all filter params from the URL directly to the API
    for (const [key, value] of searchParams.entries()) {
      if (
        key === 'minPrice' || key === 'maxPrice' ||
        key === 'inStock'  || key === 'brand'    ||
        key.startsWith('spec_')
      ) {
        params[key] = value;
      }
    }

    getProducts(params)
      .then(res => {
        setProducts(res.data.products || []);
        setTotal(res.data.total || 0);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Merge one or more query-param updates at once (used for single filters
  // like category/sort, and for multi-key updates like price range).
  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') params.delete(key);
      else params.set(key, value);
    });
    if (!('page' in updates)) params.delete('page');
    setSearchParams(params);
  };

  const updateFilter = (key, value) => updateFilters({ [key]: value });

  const imgSrc = (img) => getImageUrl(img);

  return (
    <div className="page-wrapper">
      <SEO title="Products" description="Browse premium PC components — CPUs, GPUs, RAM, motherboards, and more at competitive prices." />
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>{currentCategory ? currentCategory.toUpperCase() : currentSearch ? `Search: "${currentSearch}"` : 'All Products'}</h2>
            <p>{total} products found</p>
            <div className="section-divider"></div>
          </div>

          <div className="products-filters">
            <div className="filter-tags">
              <button
                className={`btn btn-sm ${!currentCategory ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => updateFilters({ category: '' })}>
                All
              </button>
              {categories.map(cat => {
                const activeCats = currentCategory ? currentCategory.split(',') : [];
                const isActive = activeCats.includes(cat);
                return (
                  <button key={cat}
                    className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => updateFilters({ category: cat })}
                  >{cat.toUpperCase()}</button>
                );
              })}
            </div>
            <select className="form-input products-sort"
              value={currentSort} onChange={(e) => updateFilter('sort', e.target.value)}>
              <option value="">Sort: Default</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>

          <div className="products-layout">
            <ProductFilters
              searchParams={searchParams}
              updateFilters={updateFilters}
            />

            <div className="products-main">
              {loading ? (
                <div className="product-grid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="skeleton-card">
                      <div className="skeleton-image skeleton-shimmer" />
                      <div className="skeleton-info">
                        <div className="skeleton-line short skeleton-shimmer" />
                        <div className="skeleton-line skeleton-shimmer" />
                        <div className="skeleton-line medium skeleton-shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="product-grid">
                    {products.map((p) => (
                      <Link to={`/products/${p._id}`} key={p._id} className="product-card">
                        <div className="product-image">
                          <img src={imgSrc(p.image)} alt={p.name} loading="lazy" />
                        </div>
                        <div className="product-info">
                          <p className="product-category">{p.category}</p>
                          <h3 className="product-name">{p.name}</h3>
                          <p className="product-price">PKR {p.price?.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {totalPages > 1 && (() => {
                    const pages = [];
                    const delta = 2;
                    const left = Math.max(2, currentPage - delta);
                    const right = Math.min(totalPages - 1, currentPage + delta);

                    pages.push(1);
                    if (left > 2) pages.push('...');
                    for (let i = left; i <= right; i++) pages.push(i);
                    if (right < totalPages - 1) pages.push('...');
                    if (totalPages > 1) pages.push(totalPages);

                    const goTo = (p) => { updateFilter('page', p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

                    return (
                      <div className="pagination">
                        <button className="btn btn-sm btn-outline" disabled={currentPage === 1}
                          onClick={() => goTo(currentPage - 1)}>← Prev</button>
                        {pages.map((p, i) =>
                          p === '...' ? <span key={`dots-${i}`} className="pagination-dots">…</span> :
                          <button key={p}
                            className={`btn btn-sm ${p === currentPage ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => goTo(p)}>{p}</button>
                        )}
                        <button className="btn btn-sm btn-outline" disabled={currentPage === totalPages}
                          onClick={() => goTo(currentPage + 1)}>Next →</button>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="empty-state"><p>No products found.</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
