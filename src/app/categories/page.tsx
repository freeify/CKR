import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold mb-6 text-ckr-gold">Browse by Category</h1>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Explore our wide range of premium pre-owned items. From electronics to home goods, we check every item for quality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Electronics', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500' },
                    { name: 'Home & Living', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=500' },
                    { name: 'Gaming', img: 'https://images.unsplash.com/photo-1593305841991-05c2e401f080?auto=format&fit=crop&q=80&w=500' },
                    { name: 'Jewelry', img: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=500' },
                    { name: 'Fashion', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=500' },
                    { name: 'Tools', img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=500' }
                ].map((category) => (
                    <Link href="/deals" key={category.name} className="block relative h-64 border border-white/10 rounded-lg overflow-hidden group hover:border-ckr-gold transition-colors cursor-pointer">
                        <img
                            src={category.img}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                            <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">{category.name}</h3>
                            <Button variant="outline" className="bg-black/50 border-white text-white hover:bg-ckr-gold hover:border-ckr-gold hover:text-ckr-black backdrop-blur-sm pointer-events-none">View Items</Button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
