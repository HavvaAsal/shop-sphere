import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchProducts } from '../redux/actions/productActions';
import { fetchCategories } from '../redux/actions/categoryActions';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Grid, List, ChevronDown } from 'lucide-react';

const ShopPage = () => {
  const { gender, categoryName, categoryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector(state => state.products);
  const { items: categories, loading: categoriesLoading } = useSelector(state => state.categories);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const itemsPerPage = 25;
  const [viewType, setViewType] = useState('grid');

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (categoryId) {
      queryParams.append('category', categoryId);
    }

    if (filter) {
      queryParams.append('filter', filter);
    }

    if (sort) {
      queryParams.append('sort', sort);
    }

    queryParams.append('offset', currentPage * itemsPerPage);
    queryParams.append('limit', itemsPerPage);

    dispatch(fetchProducts({
      queryString: queryParams.toString()
    }));
  }, [dispatch, categoryId, filter, sort, currentPage]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const topCategories = [...(categories || [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(0);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(0);
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
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">En Popüler Kategoriler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topCategories.map(category => {
            const gender = category.gender === 'k' ? 'kadin' : 'erkek';
            const categoryName = category.code.split(':')[1];
            
            return (
              <Link
                key={category.id}
                to={`/shop/${gender}/${categoryName}/${category.id}`}
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

      {categoryId && categories && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {categories.find(c => c.id.toString() === categoryId)?.title} Ürünleri
          </h2>
        </div>
      )}

      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="text-sm text-gray-600">
          Showing all {products?.products?.length || 0} results
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={filter}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={sort}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sıralama</option>
            <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating:asc">Puan: Düşükten Yükseğe</option>
            <option value="rating:desc">Puan: Yüksekten Düşüğe</option>
          </select>
        </div>
      </div>

      <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
        {products?.products?.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            viewType={viewType}
          />
        ))}
      </div>

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

      {(!products?.products || products.products.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          Bu kategoride ürün bulunamadı.
        </div>
      )}
    </div>
  );
};

export default ShopPage;
