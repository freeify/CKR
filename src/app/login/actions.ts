"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    // HARDCODED ADMIN BYPASS
    if (data.email === 'emataranyika@gmail.com' && data.password === 'WANframe24!') {
        const cookieStore = await cookies();
        cookieStore.set('ckr_admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        revalidatePath("/", "layout");
        return redirect("/");
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return redirect("/login?error=Could not authenticate user");
    }

    revalidatePath("/", "layout");
    return redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { data: authData, error } = await supabase.auth.signUp({
        ...data,
        options: {
            // Provide the redirect URL for the email link
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        }
    });

    if (error) {
        return redirect("/login?error=" + error.message);
    }

    // Check if we need to verify email
    if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
        return redirect("/login?error=Email already in use. Please sign in.");
    }

    // If session is null, it means email confirmation is required
    if (!authData.session) {
        return redirect("/login?message=Check your email to continue sign in process");
    }

    revalidatePath("/", "layout");
    return redirect("/");
}

export async function logout() {
    const supabase = await createClient();

    // Clear admin bypass cookie if it exists
    const cookieStore = await cookies();
    cookieStore.delete('ckr_admin_session');

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Sign Out Error:", error);
    }

    revalidatePath("/", "layout");
    return redirect("/");
}
