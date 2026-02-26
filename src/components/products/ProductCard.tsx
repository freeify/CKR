"use client";

import Link from "next/link";

interface ProductCardProps {
    product: {
        id: string;
        title: string;
        description: string;
        price: number;
        image_urls: string[];
    };
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-ckr-gold transition-colors flex flex-col h-full relative">
            <div className="h-48 relative overflow-hidden bg-black/50">
                <Link href={`/product/${product.id}`} className="block w-full h-full">
                    <img
                        src={product.image_urls?.[0] || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=500'}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-ckr-gold transition-colors">{product.title}</h3>
                </Link>
                <p className="text-2xl font-black text-ckr-gold mb-3">R {product.price.toLocaleString()}</p>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                    {product.description || "No description provided."}
                </p>
                <button className="w-full bg-white/10 hover:bg-ckr-gold hover:text-black hover:border-ckr-gold border border-white/20 text-white font-bold py-2 rounded-lg transition-colors">
                    Contact Seller
                </button>
            </div>
        </div >
    );
}
