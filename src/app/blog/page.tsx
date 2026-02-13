import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-ckr-gold">Latest News & Tips</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { id: 1, title: 'How to get the best value for your used electronics', category: 'Tips & Tricks', img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=500' },
                    { id: 2, title: 'Top 5 trusted brands for second-hand appliances', category: 'Buying Guide', img: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=500' },
                    { id: 3, title: 'Why buying gold jewelry is a smart investment', category: 'Investment', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=500' },
                    { id: 4, title: 'Spotting the difference: Authentic vs Fake sneakers', category: 'Authentication', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=500' },
                ].map((post) => (
                    <Link href={`/blog/${post.id}`} key={post.id} className="block flex flex-col md:flex-row gap-6 bg-white/5 rounded-lg overflow-hidden border border-white/10 group hover:border-ckr-gold transition-colors">
                        <div className="w-full md:w-1/3 h-48 relative">
                            <img
                                src={post.img}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center">
                            <span className="text-ckr-gold text-sm font-bold mb-2">{post.category}</span>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-ckr-gold transition-colors">{post.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">Learn the secrets to maintaining your gadgets to ensure they hold their value over time...</p>
                            <span className="flex items-center text-sm font-bold hover:underline text-white">Read More</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
