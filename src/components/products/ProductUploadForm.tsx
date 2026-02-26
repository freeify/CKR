"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadProduct } from "@/app/actions/product";
import { Loader2 } from "lucide-react";

export function ProductUploadForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(event.currentTarget);
        const result = await uploadProduct(formData);

        if (result.success) {
            setSuccess(true);
            (event.target as HTMLFormElement).reset();
            router.push('/products');
        } else {
            setError(result.error || "An error occurred.");
        }

        setLoading(false);
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-ckr-gold mb-6 text-center">List Your Item</h2>

            {success && (
                <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-lg mb-6 text-center font-medium">
                    Your item has been successfully listed!
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 text-center font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Item Title <span className="text-red-500">*</span></label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        placeholder="e.g. iPhone 14 Pro Max 256GB"
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">Asking Price (ZAR) <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R</span>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            required
                            placeholder="e.g. 15000"
                            className="w-full bg-black/50 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-2">Item Images <span className="text-red-500">*</span></label>
                    <input
                        id="images"
                        name="images"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        multiple
                        required
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-ckr-gold file:text-black hover:file:bg-ckr-gold/80 transition-colors cursor-pointer"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description / Condition</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="Describe the condition, included accessories, etc."
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ckr-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-colors mt-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Listing Item...
                        </>
                    ) : (
                        "List Item For Sale"
                    )}
                </button>
            </form>
        </div>
    );
}
