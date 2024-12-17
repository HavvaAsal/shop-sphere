import React from "react";
import Slider from "../components/Slider";
import ShopCard from "../components/ShopCard";
import ProductCard from "../components/ProductCard";
import ProductSlider from "../components/ProductSlider";

const HomePage = () => {
    const editorsPicks = [
        { title: "MEN", link: "/men" },
        { title: "WOMEN", link: "/women" },
        { title: "ACCESSORIES", link: "/accessories" },
        { title: "KIDS", link: "/kids" }
    ];

    const featuredProducts = [
        {
            title: "Graphic Design",
            subtitle: "English Department",
            images: [
                "/images/product-cover-5 (4).jpg",
                "/images/product-cover-5 (5).jpg",
                "/images/product-cover-5 (6).jpg"
            ],
            price: "$16.48"
        },
        {
            title: "Graphic Design",
            subtitle: "English Department",
            images: [
                "/images/product-cover-5 (5).jpg",
                "/images/product-cover-5 (6).jpg",
                "/images/product-cover-5 (4).jpg"
            ],
            price: "$16.48"
        },
        {
            title: "Graphic Design",
            subtitle: "English Department",
            images: [
                "/images/product-cover-5 (6).jpg",
                "/images/product-cover-5 (4).jpg",
                "/images/product-cover-5 (5).jpg"
            ],
            price: "$16.48"
        }
    ];

    return (
        <main className="flex-1">
            {/* Hero Slider */}
            <Slider />

            {/* Editor's Pick Section */}
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-center text-2xl font-bold mb-8">EDITOR'S PICK</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* MEN - Tam genişlik */}
                    <div className="md:col-span-2 h-[600px]">
                        <ShopCard
                            title="MEN"
                            link="/men"
                            type="category"
                        />
                    </div>
                    
                    {/* WOMEN - Tam genişlik */}
                    <div className="md:col-span-2 h-[600px]">
                        <ShopCard
                            title="WOMEN"
                            link="/women"
                            type="category"
                        />
                    </div>
                    
                    {/* ACCESSORIES - Yarım genişlik */}
                    <div className="md:col-span-2 h-[290px]">
                        <ShopCard
                            title="ACCESSORIES"
                            link="/accessories"
                            type="category"
                        />
                    </div>
                    
                    {/* KIDS - Yarım genişlik */}
                    <div className="md:col-span-2 h-[290px]">
                        <ShopCard
                            title="KIDS"
                            link="/kids"
                            type="category"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-gray-600 mb-2">Featured Products</p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">BESTSELLER PRODUCTS</h2>
                    <p className="text-gray-600 text-sm">
                        Problems trying to resolve the conflict between
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                        <ProductCard
                            key={number}
                            imageNumber={number}
                            title="Graphic Design"
                            subtitle="English Department"
                            price="16.48"
                        />
                    ))}
                </div>
            </section>

            {/* Product Slider Section */}
            <section className="py-16">
                <ProductSlider />
            </section>
        </main>
    );
};

export default HomePage;