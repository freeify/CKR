import { login, signup } from "./actions";

export const metadata = {
    title: "Login - Cash Kings Resale",
    description: "Sign in or create an account to start selling.",
};

export default async function LoginPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 min-h-[80vh] flex flex-col items-center justify-center">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your account or create a new one.</p>
                </div>

                {searchParams?.error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
                        {searchParams.error}
                    </div>
                )}
                {searchParams?.message && (
                    <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-lg text-sm mb-6 text-center">
                        {searchParams.message}
                    </div>
                )}

                <form className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ckr-gold focus:ring-1 focus:ring-ckr-gold transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            formAction={login}
                            className="w-full bg-ckr-gold text-black font-bold py-3 rounded-lg hover:bg-white transition-colors"
                        >
                            Log In
                        </button>
                        <button
                            formAction={signup}
                            className="w-full bg-transparent border border-ckr-gold text-ckr-gold font-bold py-3 rounded-lg hover:bg-ckr-gold hover:text-black transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
