"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { products } from "@/lib/mock-data"
import { AnimatePresence } from "framer-motion"

export function Hero() {
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestions, setSuggestions] = useState<typeof products>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const router = useRouter()
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        if (value.trim().length >= 2) {
            const matches = products.filter(p =>
                p.name.toLowerCase().includes(value.toLowerCase()) ||
                p.category.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5)
            setSuggestions(matches)
            setShowSuggestions(true)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (productId: string) => {
        router.push(`/product/${productId}`)
        setShowSuggestions(false)
        setSearchQuery("")
    }

    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-ckr-black">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
            />

            {/* Search Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-ckr-black via-ckr-black/50 to-transparent z-0" />

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Cash Kings <span className="text-ckr-gold">Resale</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        South Africa's premium marketplace for high-quality electronics, home goods, and more.
                        Verified quality, unbeatable deals.
                    </p>
                </motion.div>

                <div className="relative max-w-xl mx-auto" ref={suggestionsRef}>
                    <motion.form
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        onSubmit={handleSearch}
                        className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 flex items-center shadow-2xl"
                    >
                        <Search className="ml-4 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="What are you looking for today?"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                            className="flex-1 bg-transparent border-none focus:outline-none px-4 text-white placeholder:text-gray-400 h-10"
                        />
                        <Button type="submit" className="rounded-full px-6">
                            Search
                        </Button>
                    </motion.form>

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-4 bg-ckr-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 text-left"
                            >
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion.id}
                                        onClick={() => handleSuggestionClick(suggestion.id)}
                                        className="w-full flex items-center gap-4 p-4 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
                                    >
                                        <div className="h-12 w-12 rounded-lg bg-white/5 flex-shrink-0">
                                            <img src={suggestion.img} alt="" className="h-full w-full object-cover rounded-lg" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-base font-bold text-white truncate">{suggestion.name}</p>
                                            <p className="text-sm text-ckr-gold font-bold">R {suggestion.price.toLocaleString()}</p>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    onClick={handleSearch}
                                    className="w-full p-4 text-center text-sm text-gray-400 hover:text-ckr-gold hover:bg-white/10 transition-colors font-bold border-t border-white/10"
                                >
                                    View all results for "{searchQuery}"
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex flex-col md:flex-row gap-4 justify-center"
                >
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> Secure Payment
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> Fast Shipping
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
