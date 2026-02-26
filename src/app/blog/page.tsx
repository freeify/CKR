import Link from "next/link";
import { getBlogs } from "@/app/actions/blog";
import { PenSquare } from "lucide-react";

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-ckr-gold">Latest News & Tips</h1>
                <Link
                    href="/blog/create"
                    className="flex items-center gap-2 bg-ckr-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors"
                >
                    <PenSquare className="w-5 h-5" />
                    Write Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogs.map((post) => (
                    <Link href={`/blog/${post.id}`} key={post.id} className="block flex flex-col md:flex-row gap-6 bg-white/5 rounded-lg overflow-hidden border border-white/10 group hover:border-ckr-gold transition-colors">
                        <div className="w-full md:w-1/3 h-48 relative">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center">
                            <span className="text-ckr-gold text-sm font-bold mb-2">{post.category}</span>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-ckr-gold transition-colors">{post.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.content}</p>
                            <div className="flex justify-between items-center text-sm font-bold mt-auto">
                                <span className="hover:underline text-white">Read More</span>
                                <span className="text-gray-500 font-normal">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {blogs.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p>No blogs have been written yet. Be the first!</p>
                </div>
            )}
        </div>
    );
}
