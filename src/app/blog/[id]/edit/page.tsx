"use client";

import { useState, useEffect, use } from "react";
import { updateBlog, getBlogById } from "@/app/actions/blog";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const [blogData, setBlogData] = useState<any>(null);

    useEffect(() => {
        async function fetchBlog() {
            const data = await getBlogById(id);
            if (!data) {
                setError("Blog not found");
                setIsLoading(false);
                return;
            }
            setBlogData(data);
            setImagePreview(data.image_url);
            setCurrentImageUrl(data.image_url);
            setIsLoading(false);
        }
        fetchBlog();
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // Revert back to the existing image if they cancel selection
            setImagePreview(currentImageUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // Pass along the existing image URL to the server action in case they didn't upload a new one
        if (currentImageUrl) {
            formData.append("currentImageUrl", currentImageUrl);
        }

        try {
            const result = await updateBlog(id, formData);

            if (!result.success) {
                setError(result.error || "An error occurred");
            } else {
                router.push(`/blog/${id}`);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-32 flex justify-center">
                <Loader2 className="w-12 h-12 text-ckr-gold animate-spin" />
            </div>
        );
    }

    if (!blogData) {
        return (
            <div className="container mx-auto px-4 py-32 text-center text-white">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
                <p>Could not load the blog for editing.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 text-ckr-gold">Edit Blog</h1>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-8">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-xl">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Blog Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={blogData.title}
                        required
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        defaultValue={blogData.category}
                        required
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors appearance-none"
                    >
                        <option value="">Select a category</option>
                        <option value="Tips & Tricks">Tips & Tricks</option>
                        <option value="Buying Guide">Buying Guide</option>
                        <option value="Authentication">Authentication</option>
                        <option value="Market Trends">Market Trends</option>
                        <option value="Investment">Investment</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cover Image (Leave empty to keep current)
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="image"
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-white/20 border-dashed rounded-lg cursor-pointer hover:border-ckr-gold bg-black/50 transition-colors relative overflow-hidden`}
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                                    <p className="mb-2 text-sm text-gray-400">
                                        <span className="font-semibold text-ckr-gold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                <p className="text-white font-bold drop-shadow-md bg-black/50 px-4 py-2 rounded">Change Image</p>
                            </div>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                        Blog Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        required
                        defaultValue={blogData.content}
                        rows={12}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                    ></textarea>
                </div>

                <div className="pt-4 border-t border-white/10 flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.push(`/blog/${id}`)}
                        className="flex-1 bg-transparent border border-white/20 text-white font-bold py-4 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-[2] bg-ckr-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                    >
                        {isSaving && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
