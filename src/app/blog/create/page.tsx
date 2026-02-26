"use client";

import { useState } from "react";
import { uploadBlog } from "@/app/actions/blog";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";

export default function CreateBlogPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await uploadBlog(formData);

            if (!result.success) {
                setError(result.error || "An error occurred");
            }
            // The Server Action handles redirection on success
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 text-ckr-gold">Write a New Blog</h1>

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
                        required
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                        placeholder="e.g., How to authenticate luxury watches..."
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
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
                        Cover Image
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
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={handleImageChange}
                                required
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
                        rows={12}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                        placeholder="Write your article here..."
                    ></textarea>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-ckr-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                    >
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isLoading ? "Publishing..." : "Publish Blog"}
                    </button>
                </div>
            </form>
        </div>
    );
}
