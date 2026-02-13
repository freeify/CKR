"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { products } from "@/lib/mock-data"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [suggestions, setSuggestions] = React.useState<typeof products>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const router = useRouter()
    const suggestionsRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
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
            setIsMenuOpen(false)
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (productId: string) => {
        router.push(`/product/${productId}`)
        setShowSuggestions(false)
        setSearchQuery("")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ckr-black/95 backdrop-blur supports-[backdrop-filter]:bg-ckr-black/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-ckr-gold to-yellow-200 bg-clip-text text-transparent">
                            CKR
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/categories" className="text-sm font-medium text-white hover:text-ckr-gold transition-colors">
                        Categories
                    </Link>
                    <Link href="/deals" className="text-sm font-medium text-white hover:text-ckr-gold transition-colors">
                        Deals
                    </Link>
                    <Link href="/sell" className="text-sm font-medium text-white hover:text-ckr-gold transition-colors">
                        Sell with Us
                    </Link>
                    <Link href="/blog" className="text-sm font-medium text-white hover:text-ckr-gold transition-colors">
                        Blog
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-white hover:text-ckr-gold transition-colors">
                        About
                    </Link>
                </nav>

                {/* Search Bar (Desktop) */}
                <div className="hidden lg:flex items-center relative w-1/3 max-w-sm" ref={suggestionsRef}>
                    <form onSubmit={handleSearch} className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                            className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 pl-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-ckr-gold placeholder:text-gray-400"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </form>

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-ckr-black border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                            >
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion.id}
                                        onClick={() => handleSuggestionClick(suggestion.id)}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                                    >
                                        <div className="h-10 w-10 rounded bg-white/5 flex-shrink-0">
                                            <img src={suggestion.img} alt="" className="h-full w-full object-cover rounded" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{suggestion.name}</p>
                                            <p className="text-xs text-ckr-gold font-bold">R {suggestion.price.toLocaleString()}</p>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    onClick={handleSearch}
                                    className="w-full p-3 text-center text-xs text-gray-400 hover:text-ckr-gold hover:bg-white/5 transition-colors font-medium border-t border-white/10"
                                >
                                    See all results for "{searchQuery}"
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-white hover:text-ckr-gold p-2 lg:hidden">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </button>
                    <Link href="/cart" className="text-white hover:text-ckr-gold p-2 relative">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-ckr-gold text-[10px] font-bold text-ckr-black flex items-center justify-center">
                            0
                        </span>
                        <span className="sr-only">Cart</span>
                    </Link>
                    <button className="hidden md:flex text-white hover:text-ckr-gold p-2">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </button>
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/10 bg-ckr-black"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <div className="relative">
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 pl-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-ckr-gold"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                </form>
                                {/* Mobile Suggestions */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="mt-2 flex flex-col gap-2">
                                        {suggestions.map((suggestion) => (
                                            <button
                                                key={suggestion.id}
                                                onClick={() => handleSuggestionClick(suggestion.id)}
                                                className="flex items-center gap-3 p-2 bg-white/5 rounded-md text-left"
                                            >
                                                <div className="h-8 w-8 rounded bg-white/10 flex-shrink-0 overflow-hidden">
                                                    <img src={suggestion.img} alt="" className="h-full w-full object-cover" />
                                                </div>
                                                <span className="text-xs text-white truncate">{suggestion.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <nav className="flex flex-col gap-2">
                                <Link href="/categories" className="text-sm font-medium text-white hover:text-ckr-gold py-2">
                                    Categories
                                </Link>
                                <Link href="/deals" className="text-sm font-medium text-white hover:text-ckr-gold py-2">
                                    Deals
                                </Link>
                                <Link href="/sell" className="text-sm font-medium text-white hover:text-ckr-gold py-2">
                                    Sell with Us
                                </Link>
                                <Link href="/blog" className="text-sm font-medium text-white hover:text-ckr-gold py-2">
                                    Blog
                                </Link>
                                <Link href="/about" className="text-sm font-medium text-white hover:text-ckr-gold py-2">
                                    About
                                </Link>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
