import { Button } from "@/components/ui/button";
import { DollarSign, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

export default function SellPage() {
    const benefits = [
        {
            title: "Instant Quotes",
            description: "Get a fair market value for your items within 24 hours.",
            icon: <DollarSign className="h-6 w-6 text-ckr-gold" />
        },
        {
            title: "Secure Process",
            description: "Safe and transparent transactions guaranteed by Cash Kings Resale.",
            icon: <ShieldCheck className="h-6 w-6 text-ckr-gold" />
        },
        {
            title: "Fast Payment",
            description: "Receive your cash instantly once the deal is finalized.",
            icon: <Zap className="h-6 w-6 text-ckr-gold" />
        },
        {
            title: "Hassle-Free",
            description: "We handle the logistics. Simple, straightforward, royal treatment.",
            icon: <HeartHandshake className="h-6 w-6 text-ckr-gold" />
        }
    ];

    return (
        <div className="bg-ckr-black text-white min-h-screen">
            {/* Hero */}
            <section className="py-20 text-center container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-ckr-gold">Sell Like a King</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Turn your quality pre-owned goods into instant cash. We buy electronics, jewelry, home appliances, and more.
                </p>
            </section>

            {/* Benefits */}
            <section className="py-12 bg-white/5 border-y border-white/10">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6">
                            <div className="mb-4 p-3 bg-ckr-gold/10 rounded-full">{benefit.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                            <p className="text-sm text-gray-400">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-ckr-gold text-ckr-black">
                        <h2 className="text-3xl font-bold mb-6">Ready to Sell?</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="font-bold">01.</span>
                                <div>
                                    <p className="font-bold">Describe your item</p>
                                    <p className="text-sm opacity-80">Fill out the form with accurate details.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="font-bold">02.</span>
                                <div>
                                    <p className="font-bold">Get a Quote</p>
                                    <p className="text-sm opacity-80">Our team will review and offer a price.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="font-bold">03.</span>
                                <div>
                                    <p className="font-bold">Get Paid</p>
                                    <p className="text-sm opacity-80">Drop it off or we'll collect. Instant cash.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 md:p-12 md:w-1/2">
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">What are you selling?</label>
                                <input className="w-full bg-white/10 border border-white/20 rounded-md p-3 focus:ring-2 focus:ring-ckr-gold focus:outline-none placeholder:text-gray-500" placeholder="e.g. iPhone 13 Pro 256GB" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Condition</label>
                                    <select className="w-full bg-white/10 border border-white/20 rounded-md p-3 focus:ring-2 focus:ring-ckr-gold focus:outline-none appearance-none">
                                        <option className="bg-ckr-black">Like New</option>
                                        <option className="bg-ckr-black">Excellent</option>
                                        <option className="bg-ckr-black">Good</option>
                                        <option className="bg-ckr-black">Fair</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Expected Price (R)</label>
                                    <input className="w-full bg-white/10 border border-white/20 rounded-md p-3 focus:ring-2 focus:ring-ckr-gold focus:outline-none" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Your Contact Number</label>
                                <input className="w-full bg-white/10 border border-white/20 rounded-md p-3 focus:ring-2 focus:ring-ckr-gold focus:outline-none" placeholder="+27..." />
                            </div>
                            <Button className="w-full h-12 text-lg font-bold">Submit for Quote</Button>
                            <p className="text-center text-xs text-gray-500 italic">
                                By submitting, you agree to our terms of resale and quality inspection.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
