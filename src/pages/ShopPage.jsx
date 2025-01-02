import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { fetchCategories } from '../redux/actions/categoryActions';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector(state => state.products);
  const { items: categories, loading: categoriesLoading } = useSelector(state => state.categories);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25;

  useEffect(() => {
    dispatch(fetchProducts({
      offset: currentPage * itemsPerPage,
      limit: itemsPerPage
    }));
    dispatch(fetchCategories());
  }, [dispatch, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0); // Sayfa başına scroll
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
      {/* Kategoriler */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
        <div className="flex flex-wrap gap-4">
          {categories?.map(category => (
            <Link
              key={category.id}
              to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.code}/${category.id}`}
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Ürünler */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.products?.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
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
