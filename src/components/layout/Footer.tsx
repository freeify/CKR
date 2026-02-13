import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-ckr-black text-white border-t border-white/10">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-ckr-gold to-yellow-200 bg-clip-text text-transparent mb-4">
                            Cash Kings Resale
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Reselling like Kings. We provide high-quality pre-owned goods at unbeatable prices.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-ckr-gold">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-ckr-gold">Categories</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                            <li><Link href="/home" className="hover:text-white transition-colors">Home & Living</Link></li>
                            <li><Link href="/gaming" className="hover:text-white transition-colors">Gaming</Link></li>
                            <li><Link href="/jewelry" className="hover:text-white transition-colors">Jewelry</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-ckr-gold">Connect With Us</h4>
                        <div className="flex gap-4">
                            <Link href="https://facebook.com" className="hover:text-ckr-gold transition-colors">
                                <Facebook className="h-6 w-6" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="https://instagram.com" className="hover:text-ckr-gold transition-colors">
                                <Instagram className="h-6 w-6" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="https://twitter.com" className="hover:text-ckr-gold transition-colors">
                                <Twitter className="h-6 w-6" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="https://tiktok.com/@CashKingsResale" className="hover:text-ckr-gold transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                                </svg>
                                <span className="sr-only">TikTok</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Cash Kings Resale. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
