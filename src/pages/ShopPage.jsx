import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../redux/actions/productActions'
import { fetchCategories } from '../redux/actions/categoryActions'
import { Grid2x2, ListChecks, SlidersHorizontal, Loader } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'

const ShopPage = () => {
  const { gender, categoryName, categoryId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const items = useSelector(state => state.products.items)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)
  const total = useSelector(state => state.products.total)
  const topCategories = useSelector(state => state.categories.topCategories)
  const categoriesLoading = useSelector(state => state.categories.loading)
  
  // State tanımlamaları
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popularity')
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all'
  })
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [sortOption, setSortOption] = useState('');
  
  // Query parametrelerini oluştur
  const createQueryString = (params) => {
    const searchParams = new URLSearchParams();
    if (categoryId && categoryName) {
      searchParams.append('category', categoryId);
    }
    if (filterText) {
      searchParams.append('filter', filterText);
    }
    if (sortOption) {
      searchParams.append('sort', sortOption);
    }
    return searchParams.toString();
  };

  // Ürünleri getir ve URL'i güncelle
  const fetchFilteredProducts = () => {
    try {
      const queryString = createQueryString();
      dispatch(fetchProducts(queryString));
      
      // URL'i güncelle
      history.push({
        pathname: location.pathname,
        search: queryString ? `?${queryString}` : ''
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // İlk yüklemede kategorileri ve ürünleri getir
  useEffect(() => {
    dispatch(fetchCategories()); // Kategorileri yükle
  }, []); // Sadece bir kere çalışsın

  // URL parametreleri değiştiğinde ürünleri yeniden getir
  useEffect(() => {
    fetchFilteredProducts();
  }, [categoryId, filterText, sortOption]);

  // Geriye gitme işlemini dinle
  useEffect(() => {
    const unlisten = history.listen(() => {
      // URL değiştiğinde kategorileri tekrar yükle
      dispatch(fetchCategories());
    });

    return () => {
      unlisten(); // Cleanup
    };
  }, [history]);

  // Loading durumu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Ürünler yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-bold">Bir hata oluştu</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  // Ürün yoksa
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold">Henüz ürün bulunmuyor</h2>
        </div>
      </div>
    )
  }

  // Filtreleme ve sıralama işlemleri
  const filteredAndSortedProducts = items.filter(product => {
    // Gender kontrolü
    if (gender && product?.gender) {
      if (product.gender.toLowerCase() !== gender.toLowerCase()) {
        return false;
      }
    }

    // Kategori kontrolü
    if (categoryId) {
      return product?.categoryId === parseInt(categoryId);
    }

    // Metin araması
    if (filterText && product?.name) {
      if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    // Sıralama kontrolü
    if (sortOption) {
      const [field, direction] = sortOption.split(':');
      
      if (field === 'price') {
        const priceA = a?.price || 0;
        const priceB = b?.price || 0;
        return direction === 'asc' ? priceA - priceB : priceB - priceA;
      }
      
      if (field === 'rating') {
        const ratingA = a?.rating || 0;
        const ratingB = b?.rating || 0;
        return direction === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      }
    }
    
    // Varsayılan sıralama
    return (b?.popularity || 0) - (a?.popularity || 0);
  });

  // Pagination için ürünleri dilimle
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Categories */}
      {!loading && topCategories && topCategories.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popüler Kategoriler</h2>
            <Link to="/shop" className="text-blue-600 hover:text-blue-800">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {topCategories.map(category => (
              <Link
                key={category.id}
                to={`/shop/${category.gender}/${category.code}/${category.id}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative pt-[100%]">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                    <p className="text-white/80 text-sm">
                      {category.gender} • {category.rating} ★
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Filtre ve Sıralama Kontrolleri */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Arama Filtresi */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sıralama Seçenekleri */}
        <div className="w-full md:w-64">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sıralama</option>
            <option value="price:asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price:desc">Fiyat (Yüksekten Düşüğe)</option>
            <option value="rating:asc">Puan (Düşükten Yükseğe)</option>
            <option value="rating:desc">Puan (Yüksekten Düşüğe)</option>
          </select>
        </div>

        {/* Aktif Filtreleri Göster */}
        {(filterText || sortOption || categoryId) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {categoryName && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Kategori: {categoryName}
              </span>
            )}
            {filterText && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Arama: {filterText}
              </span>
            )}
            {sortOption && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Sıralama: {
                  sortOption === 'price:asc' ? 'Fiyat (↑)' :
                  sortOption === 'price:desc' ? 'Fiyat (↓)' :
                  sortOption === 'rating:asc' ? 'Puan (↑)' :
                  'Puan (↓)'
                }
              </span>
            )}
            <button
              onClick={() => {
                setFilterText('');
                setSortOption('');
                history.push('/shop');
              }}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>

      {/* Ürün Listesi */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Tüm Ürünler ({total || 0})
          </h2>
        </div>

        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-4 gap-4' 
            : 'flex flex-col space-y-4'}
        `}>
          {paginatedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border disabled:opacity-50"
          >
            Önceki
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md border disabled:opacity-50"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopPage
