"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function CheckoutPage() {
    const [step, setStep] = React.useState(1)

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    return (
        <div className="min-h-screen bg-ckr-black py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/cart" className="flex items-center text-sm text-gray-400 hover:text-ckr-gold transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                        </Link>
                        <h1 className="text-2xl md:text-4xl font-bold text-white">Checkout</h1>
                        <div className="hidden md:flex items-center gap-2">
                            <div className={`h-2 w-12 rounded-full ${step >= 1 ? "bg-ckr-gold" : "bg-white/10"}`} />
                            <div className={`h-2 w-12 rounded-full ${step >= 2 ? "bg-ckr-gold" : "bg-white/10"}`} />
                            <div className={`h-2 w-12 rounded-full ${step >= 3 ? "bg-ckr-gold" : "bg-white/10"}`} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                                <Truck className="h-5 w-5 text-ckr-gold" /> Shipping Details
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm text-gray-400">First Name</label>
                                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="John" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-gray-400">Last Name</label>
                                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="Doe" />
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-sm text-gray-400">Street Address</label>
                                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="123 Royal Lane" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-gray-400">City</label>
                                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="Johannesburg" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-gray-400">Postal Code</label>
                                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="2000" />
                                                </div>
                                            </div>
                                            <Button onClick={nextStep} className="w-full mt-8 font-bold h-12">Continue to Payment</Button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                                <CreditCard className="h-5 w-5 text-ckr-gold" /> Payment Method
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-ckr-gold/10 border border-ckr-gold/30 rounded-xl flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-4 w-4 rounded-full bg-ckr-gold" />
                                                        <span className="text-white font-medium">Credit / Debit Card</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="w-8 h-5 bg-white/10 rounded" />
                                                        <div className="w-8 h-5 bg-white/10 rounded" />
                                                    </div>
                                                </div>
                                                <div className="space-y-4 pt-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm text-gray-400">Card Number</label>
                                                        <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="0000 0000 0000 0000" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-gray-400">Expiry Date</label>
                                                            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="MM/YY" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-gray-400">CVV</label>
                                                            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-ckr-gold focus:outline-none" placeholder="123" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 mt-8">
                                                <Button variant="outline" onClick={prevStep} className="flex-1 font-bold">Back</Button>
                                                <Button onClick={nextStep} className="flex-[2] font-bold h-12">Complete Order</Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12 space-y-6"
                                    >
                                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-500/20 text-green-500 mb-4">
                                            <CheckCircle2 className="h-10 w-10" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Order Confirmed!</h2>
                                        <p className="text-gray-400 max-w-sm mx-auto">
                                            Your order #CKR-8829 has been placed successfully.
                                            We'll send you an email with the tracking details shortly.
                                        </p>
                                        <Button asChild className="mt-8 px-12 h-12 font-bold">
                                            <Link href="/">Return to Home</Link>
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        {step < 3 && (
                            <div className="space-y-6">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <h3 className="font-bold text-white mb-6">Order Summary</h3>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex gap-4">
                                            <div className="h-16 w-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                                                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200" className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">Premium Product Name</p>
                                                <p className="text-xs text-gray-500">Qty: 1</p>
                                                <p className="text-sm font-bold text-ckr-gold mt-1">R 4,500</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 pt-6 border-t border-white/10">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Subtotal</span>
                                            <span className="text-white">R 4,500</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Shipping</span>
                                            <span className="text-white">R 150</span>
                                        </div>
                                        <div className="flex justify-between text-base font-bold pt-3 border-t border-white/10">
                                            <span className="text-white">Total</span>
                                            <span className="text-ckr-gold">R 4,650</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-ckr-gold/5 border border-ckr-gold/10 rounded-xl p-4 flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-ckr-gold" />
                                    <span className="text-xs text-gray-400">Secure encrypted checkout. Your data is protected by Kingly standards.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
