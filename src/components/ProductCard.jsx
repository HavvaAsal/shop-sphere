import React from "react";

function ProductCard() {
    const products = [
        { id: 1, image: "/images/product-cover-5.jpg", title: "Graphic Design", subtitle: "English department" },
        { id: 2, image: "/images/product-cover-5 (1).jpg", title: "Graphic Design", subtitle: "English department" },
        { id: 3, image: "/images/product-cover-5 (2).jpg", title: "Graphic Design", subtitle: "English department" },
        { id: 4, image: "/images/product-cover-5 (3).jpg", title: "Graphic Design", subtitle: "English department" },
        { id: 5, image: "/images/product-cover-5 (4).jpg", title: "Graphic Design", subtitle: "English department" },
        { id: 6, image: "/images/product-cover-5 (5).jpg", title: "Graphic Design", subtitle: "English department" },
        { id: 7, image: "/images/product-cover-5 (6).jpg", title: "Graphic Design", subtitle: "English department" },
    ];

    return (
        <div className="bg-white p-6">
            {/***** Başlık Bölümü *****/}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
                <h3 className="text-lg font-semibold text-gray-700 mt-2">BESTSELLER PRODUCTS</h3>
                <p className="text-gray-600 text-sm mt-2">
                    Problems trying to resolve the conflict between
                </p>
            </div>

            {/***** Kartlar *****/}
            <div className="grid grid-cols-1 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow-sm bg-gray-100"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-auto rounded-md mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-800 text-center">
                            {product.title}
                        </h4>
                        <p className="text-sm text-gray-600 text-center">{product.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCard;
