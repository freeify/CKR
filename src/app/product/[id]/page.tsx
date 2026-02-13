import { Button } from "@/components/ui/button";
import { Star, Shield, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Mock data - in a real app this would fetch based on ID
    const product = {
        id,
        name: "Premium Product Name",
        price: "R 4,500",
        description: "This is a high-quality pre-owned item that has been thoroughly inspected. It comes with a 6-month warranty and is in excellent condition.",
        features: ["Mint Condition", "Verified Seller", "Original Packaging"],
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000"
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-ckr-gold mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-[400px] md:h-[500px]">
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center text-ckr-gold">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-2 text-gray-300">(24 reviews)</span>
                            </div>
                            <span className="text-gray-500">|</span>
                            <span className="text-green-500 font-medium">In Stock</span>
                        </div>
                    </div>

                    <div className="text-4xl font-bold text-ckr-gold">
                        {product.price}
                    </div>

                    <div className="prose prose-invert">
                        <p className="text-gray-300">{product.description}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {product.features.map(feature => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-ckr-gold" />
                                {feature}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button className="flex-1 text-base font-bold h-12">Add to Cart</Button>
                        <Button variant="outline" className="flex-1 text-base font-bold h-12">Make an Offer</Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <Shield className="h-8 w-8 text-ckr-gold" />
                            <div>
                                <h4 className="font-bold text-sm">6-Month Warranty</h4>
                                <p className="text-xs text-gray-500">Peace of mind included</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Truck className="h-8 w-8 text-ckr-gold" />
                            <div>
                                <h4 className="font-bold text-sm">Fast Delivery</h4>
                                <p className="text-xs text-gray-500">2-4 business days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
