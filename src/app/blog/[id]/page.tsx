import { ArrowLeft, Calendar, User, Tag, PenSquare } from "lucide-react";
import Link from "next/link";
import { getBlogById } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = await getBlogById(id);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const cookieStore = await cookies();
    const isAdminSession = cookieStore.get('ckr_admin_session')?.value === 'true';
    const isAdmin = user?.email === 'emataranyika@gmail.com' || isAdminSession;

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm text-gray-400 hover:text-ckr-gold mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-ckr-gold font-bold text-sm uppercase tracking-wider">{post.category}</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">{post.title}</h1>
                </div>
                {isAdmin && (
                    <Link
                        href={`/blog/${post.id}/edit`}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold transition-colors border border-white/20"
                    >
                        <PenSquare className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit Blog</span>
                    </Link>
                )}
            </div>

            <div className="mb-8 border-b border-white/10 pb-8">
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Guest Author
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" /> {post.category}
                    </div>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden mb-12 border border-white/10">
                <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                />
            </div>

            <div
                className="prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-wrap"
            >
                {post.content}
            </div>

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
