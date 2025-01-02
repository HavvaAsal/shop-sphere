import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { fetchCategories } from '../redux/actions/categoryActions';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Grid, List, ChevronDown } from 'lucide-react';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector(state => state.products);
  const { items: categories, loading: categoriesLoading } = useSelector(state => state.categories);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25;
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({
      offset: currentPage * itemsPerPage,
      limit: itemsPerPage
    }));
    dispatch(fetchCategories());
  }, [dispatch, currentPage]);

  // En yüksek puanlı 5 kategoriyi al
  const topCategories = [...(categories || [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (productsError) {
    return <div className="container mx-auto p-4 text-red-600">Hata: {productsError}</div>;
  }

  const pageCount = Math.ceil((products?.total || 0) / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top 5 Kategoriler */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">En Popüler Kategoriler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topCategories.map(category => {
            const gender = category.gender === 'k' ? 'kadin' : 'erkek';
            const categoryName = category.code.split(':')[1];

            return (
              <Link
                key={category.id}
                to={`/shop/${gender}/${categoryName}`}
                className="group block aspect-[1/1]"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-lg text-white">
                        {category.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-white">
                          {category.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ürün Kontrolleri - Yeni Eklenen Kısım */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="text-sm text-gray-600">
          Showing all {products?.products?.length || 0} results
        </div>

        <div className="flex items-center gap-4">
          {/* View Type Toggles */}
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <button
              onClick={() => setViewType('grid')}
              className={`p-2 rounded ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`p-2 rounded ${viewType === 'list' ? 'bg-gray-100' : ''}`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <span className="text-sm">
                {sortBy === 'popularity' ? 'Popularity' : 
                 sortBy === 'newest' ? 'Newest' :
                 sortBy === 'price_low' ? 'Price: Low to High' :
                 'Price: High to Low'}
              </span>
              <ChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {[
                    { value: 'popularity', label: 'Popularity' },
                    { value: 'newest', label: 'Newest' },
                    { value: 'price_low', label: 'Price: Low to High' },
                    { value: 'price_high', label: 'Price: High to Low' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                        ${sortBy === option.value ? 'bg-gray-50' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Button */}
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
            Filter
          </button>
        </div>
      </div>

      {/* Ürünler */}
      <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
        {products?.products?.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            viewType={viewType}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <ReactPaginate
          previousLabel="Önceki"
          nextLabel="Sonraki"
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex gap-2"
          pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
          previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
          nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
          activeClassName="bg-blue-500 text-white"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>

      {/* Ürün bulunamadı mesajı */}
      {(!products?.products || products.products.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          Bu kategoride ürün bulunamadı.
        </div>
      )}
    </div>
  );
};

export default ShopPage;
