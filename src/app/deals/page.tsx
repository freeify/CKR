import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DealsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-2 text-ckr-gold">Best Deals</h1>
            <p className="text-gray-400 mb-8">Unbeatable prices on high-quality resale items.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { id: 1, name: 'MacBook Pro', price: 'R 15,000', oldPrice: 'R 20,000', discount: '-25%', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500' },
                    { id: 2, name: 'iPhone 13', price: 'R 10,500', oldPrice: 'R 12,000', discount: '-12%', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500' },
                    { id: 3, name: 'Sony Headphones', price: 'R 3,500', oldPrice: 'R 4,500', discount: '-22%', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500' },
                    { id: 4, name: 'Canon Camera', price: 'R 8,000', oldPrice: 'R 9,500', discount: '-15%', img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=500' },
                    { id: 5, name: 'Gaming Monitor', price: 'R 4,200', oldPrice: 'R 5,500', discount: '-23%', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500' },
                    { id: 6, name: 'Smart Watch', price: 'R 2,500', oldPrice: 'R 3,200', discount: '-21%', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500' },
                    { id: 7, name: 'Bluetooth Speaker', price: 'R 1,200', oldPrice: 'R 1,800', discount: '-33%', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=500' },
                    { id: 8, name: 'iPad Air', price: 'R 9,000', oldPrice: 'R 11,000', discount: '-18%', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500' },
                ].map((item) => (
                    <Link href={`/product/${item.id}`} key={item.id} className="block bg-white/5 border border-white/10 rounded-lg overflow-hidden group hover:border-ckr-gold transition-colors">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 bg-ckr-gold text-ckr-black text-xs font-bold px-2 py-1 rounded">
                                {item.discount}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-ckr-gold transition-colors">{item.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl font-bold text-white">{item.price}</span>
                                <span className="text-sm text-gray-500 line-through">{item.oldPrice}</span>
                            </div>
                            <Button className="w-full">Add to Cart</Button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
