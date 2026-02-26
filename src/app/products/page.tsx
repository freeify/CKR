import { getProducts } from "@/app/actions/product";
import { ProductCard } from "@/components/products/ProductCard";

export const metadata = {
    title: "Shop User Listings - Cash Kings Resale",
    description: "Browse high-quality, pre-owned items listed by other users.",
};

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 min-h-[80vh]">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    User <span className="text-ckr-gold">Marketplace</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Discover incredible deals on premium items uploaded directly by members of our community.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl max-w-2xl mx-auto">
                    <p className="text-2xl font-bold text-gray-400 mb-4">No items listed yet!</p>
                    <p className="text-gray-500 mb-8">Be the first to list something and turn your pre-owned goods into cash.</p>
                    <a href="/sell" className="inline-block bg-ckr-gold text-black font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors">
                        Start Selling
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
