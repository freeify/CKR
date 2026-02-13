"use client"

import { useSearchParams } from "next/navigation"
import { products } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search as SearchIcon } from "lucide-react"
import { Suspense } from "react"

function SearchResults() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <SearchIcon className="h-8 w-8 text-ckr-gold" />
                <h1 className="text-3xl font-bold text-white whitespace-nowrap">
                    Results for <span className="text-ckr-gold">"{query}"</span>
                </h1>
                <div className="h-px bg-white/10 flex-1 ml-4" />
                <span className="text-gray-400 text-sm whitespace-nowrap">{filteredProducts.length} items found</span>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="block bg-white/5 border border-white/10 rounded-lg overflow-hidden group hover:border-ckr-gold transition-colors">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 bg-ckr-gold text-ckr-black text-xs font-bold px-2 py-1 rounded">
                                    {product.discount}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-ckr-gold transition-colors">{product.name}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xl font-bold text-white">R {product.price.toLocaleString()}</span>
                                    {product.oldPrice && (
                                        <span className="text-sm text-gray-500 line-through">R {product.oldPrice.toLocaleString()}</span>
                                    )}
                                </div>
                                <Button className="w-full">View Details</Button>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <SearchIcon className="h-10 w-10 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        We couldn't find any products matching your search. Try checking your spelling or using different keywords.
                    </p>
                    <Link href="/">
                        <Button variant="outline">Back to Homepage</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-12 min-h-screen text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ckr-gold mx-auto mb-4"></div>
                <p className="text-gray-400">Searching the kingdom...</p>
            </div>
        }>
            <SearchResults />
        </Suspense>
    )
}
