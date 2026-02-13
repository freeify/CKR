import { Shield, Target, TrendingUp, Truck, Users } from "lucide-react";

export default function AboutPage() {
    const strategies = [
        {
            title: "Build Trust & Credibility",
            description: "We maintain a 4.5+ rating across platforms by ensuring every product undergoes rigorous quality checks. We offer hassle-free returns to ensure your peace of mind.",
            icon: <Shield className="h-8 w-8 text-ckr-gold" />,
            goals: ["4.5+ Customer Ratings", "100% Quality Guarantee", "Easy Returns"]
        },
        {
            title: "Expand Product Range",
            description: "Our goal is to offer over 500+ products across electronics, home goods, and more by partnering with reliable suppliers and auctioneers.",
            icon: <TrendingUp className="h-8 w-8 text-ckr-gold" />,
            goals: ["500+ Active Products", "5+ Diverse Categories", "Verified Suppliers"]
        },
        {
            title: "Digital Dominance",
            description: "We are building the best online resale experience in South Africa, targeting 10k+ monthly visitors and a strong social media presence.",
            icon: <Target className="h-8 w-8 text-ckr-gold" />,
            goals: ["10k+ Monthly Visitors", "5k+ Social Followers", "Top SEO Rankings"]
        },
        {
            title: "Operational Excellence",
            description: "Streamlining logistics with partners like DHL to ensure your items reach you quickly and safely, no matter where you are.",
            icon: <Truck className="h-8 w-8 text-ckr-gold" />,
            goals: ["Fast Global Logistics", "Inventory Management", "Secure Courier Partners"]
        }
    ];

    return (
        <div className="bg-ckr-black text-white">
            {/* Mission Hero */}
            <section className="relative py-20 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Our <span className="text-ckr-gold">Vision</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        To become one of the best resale companies in South Africa by providing premium pre-owned goods with unmatched trust and transparency.
                    </p>
                </div>
            </section>

            {/* Strategies Grid */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Strategies & Goals</h2>
                    <p className="text-gray-400">How we are redefining the resale market.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {strategies.map((strategy, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-ckr-gold transition-all duration-300 group">
                            <div className="mb-6">{strategy.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-ckr-gold transition-colors">{strategy.title}</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {strategy.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {strategy.goals.map((goal, i) => (
                                    <span key={i} className="text-xs font-bold uppercase tracking-wider bg-ckr-gold/10 text-ckr-gold px-3 py-1 rounded-full">
                                        {goal}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white/5 border-t border-white/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Be part of the digital dominance. Follow us on our social platforms and stay updated with the best deals in South Africa.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#" className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-ckr-gold transition-colors">
                            Facebook
                        </a>
                        <a href="#" className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-ckr-gold transition-colors">
                            TikTok
                        </a>
                        <a href="#" className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-ckr-gold transition-colors">
                            Instagram
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
