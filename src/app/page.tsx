import { Hero } from "@/components/home/Hero";
import Link from "next/link";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Hero />

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-ckr-gold">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Electronics', img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=500' },
            { name: 'Home & Living', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=500' },
            { name: 'Gaming', img: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&q=80&w=500' },
            { name: 'Jewelry', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=500' }
          ].map((category) => (
            <div key={category.name} className="relative h-48 overflow-hidden rounded-lg group cursor-pointer border border-white/10 hover:border-ckr-gold transition-colors">
              <img
                src={category.img}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-xl font-bold text-white group-hover:text-ckr-gold transition-colors">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose <span className="text-ckr-gold">Cash Kings Resale</span>?</h2>
            <p className="text-gray-400">The premium standard for pre-owned goods in South Africa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center group hover:bg-white/5 transition-colors rounded-xl">
              <div className="w-12 h-12 bg-ckr-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-ckr-gold/20 transition-colors">
                <ShieldCheck className="text-ckr-gold h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Quality</h3>
              <p className="text-gray-400">Every item is rigorously tested and checked by our experts before it reaches you.</p>
            </div>
            <div className="p-6 text-center group hover:bg-white/5 transition-colors rounded-xl">
              <div className="w-12 h-12 bg-ckr-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-ckr-gold/20 transition-colors">
                <Zap className="text-ckr-gold h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Logistics</h3>
              <p className="text-gray-400">Partnered with reliable couriers like DHL to ensure 2-4 day delivery.</p>
            </div>
            <div className="p-6 text-center group hover:bg-white/5 transition-colors rounded-xl">
              <div className="w-12 h-12 bg-ckr-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-ckr-gold/20 transition-colors">
                <HeartHandshake className="text-ckr-gold h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Royal Trust</h3>
              <p className="text-gray-400">Hassle-free returns and a dedicated support team to assist you at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="bg-ckr-black/50 py-12 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-ckr-gold">Deal of the Day</h2>
          <p className="text-gray-400 mb-8">Limited time offer on premium electronics.</p>
          <Link href="/product/deal-of-the-day" className="block relative h-96 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000"
              alt="Deal of the Day"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8 text-left">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-ckr-gold transition-colors">Premium Laptop - 2023 Model</h3>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-ckr-gold">R 12,999</span>
                <span className="text-xl text-gray-400 line-through">R 18,999</span>
                <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">SAVE 30%</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Top 5 Trending */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-ckr-gold">Top 5 Trending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { id: 1, name: 'Smart Watch', price: 'R 2,499', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300' },
            { id: 2, name: 'Headphones', price: 'R 1,899', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300' },
            { id: 3, name: 'Camera', price: 'R 8,499', img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=300' },
            { id: 4, name: 'Sneakers', price: 'R 3,299', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300' },
            { id: 5, name: 'Gaming Console', price: 'R 6,999', img: 'https://images.unsplash.com/photo-1481434051040-b7a638158b05?auto=format&fit=crop&q=80&w=300' },
          ].map((item) => (
            <Link key={item.id} href={`/product/${item.id}`} className="block bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col hover:border-ckr-gold transition-colors group">
              <div className="h-48 overflow-hidden relative">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4 flex-1">
                <h4 className="font-bold text-white mb-1 group-hover:text-ckr-gold transition-colors">{item.name}</h4>
                <p className="text-ckr-gold font-bold">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
