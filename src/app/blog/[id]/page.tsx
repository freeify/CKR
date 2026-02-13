import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Mock data - in a real app this would fetch based on ID
    const post = {
        id,
        title: "How to get the best value for your used electronics",
        category: "Tips & Tricks",
        author: "Cash Kings Team",
        date: "October 15, 2023",
        img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1000",
        content: `
      <p class="mb-4">Selling your used electronics can be a great way to make some extra cash, but getting the best possible price requires a little bit of effort. Here are our top tips for maximizing the value of your pre-owned gadgets.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">1. Keep the Original Packaging</h2>
      <p class="mb-4">Having the original box, manuals, and accessories can significantly increase the resale value of your item. It shows buyers that you've taken care of the product and provides a "like-new" unboxing experience.</p>

      <h2 class="text-2xl font-bold text-white mt-8 mb-4">2. Clean Your Device</h2>
      <p class="mb-4">First impressions matter. A clean, smudge-free screen and a dust-free body make your device look much newer. Use a microfiber cloth and appropriate cleaning solutions to spruce up your item before taking photos.</p>

      <h2 class="text-2xl font-bold text-white mt-8 mb-4">3. Take High-Quality Photos</h2>
      <p class="mb-4">Clear, well-lit photos from multiple angles build trust with potential buyers. Highlight any scratches or defects honestly – transparency prevents disputes later on.</p>

      <h2 class="text-2xl font-bold text-white mt-8 mb-4">4. Be Honest About Condition</h2>
      <p class="mb-4">Accurately describing the condition of your item is crucial. If there's a dent, mention it. Buyers appreciate honesty and are more likely to leave positive reviews if the item matches the description.</p>

      <p class="mt-8">At Cash Kings Resale, we inspect every item to ensure quality for our buyers and fair prices for our sellers. Ready to sell? Visit our 'Sell' page today!</p>
    `
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm text-gray-400 hover:text-ckr-gold mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>

            <div className="mb-8">
                <span className="text-ckr-gold font-bold text-sm uppercase tracking-wider">{post.category}</span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">{post.title}</h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-400 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" /> {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" /> {post.category}
                    </div>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden mb-12 border border-white/10">
                <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                />
            </div>

            <div
                className="prose prose-invert prose-lg max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Share this article</h3>
                <div className="flex gap-4">
                    {/* Social share placeholders */}
                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">Facebook</button>
                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">Twitter</button>
                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">WhatsApp</button>
                </div>
            </div>
        </div>
    );
}
