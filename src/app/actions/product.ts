"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadProduct(formData: FormData) {
    try {
        const supabase = await createClient();
        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        const images = formData.getAll("images") as File[];

        if (!title || !price || images.length === 0) {
            return { success: false, error: "Title, Price, and Image are required." };
        }

        // Diagnostic Check: If using placeholder, tell the user to set Vercel Env Vars
        if (process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
            return { success: false, error: "Config Error: NEXT_PUBLIC_SUPABASE_URL is missing in Vercel settings." };
        }

        const publicUrls: string[] = [];

        // 1. Upload all images to the 'images' bucket
        for (const image of images) {
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(fileName, image);

            if (uploadError) {
                console.error("Storage upload error:", uploadError);
                return { success: false, error: `Storage Error: ${uploadError.message}` };
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            publicUrls.push(publicUrl);
        }

        // 3. Insert into the database
        const { error: dbError } = await supabase
            .from('products')
            .insert({
                title,
                price: parseFloat(price),
                description,
                image_urls: publicUrls,
            });

        if (dbError) {
            console.error("Database insert error:", dbError);
            return { success: false, error: `Database Error: ${dbError.message}` };
        }

        revalidatePath("/products");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Upload process error:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function deleteProduct(id: string, imageUrls: string[]) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "You must be logged in to delete." };
        }
        // 1. Extract the filenames from the URLs to delete from storage
        const fileNames = imageUrls.map(url => {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }).filter(Boolean);

        if (fileNames.length > 0) {
            const { error: storageError } = await supabase.storage
                .from('images')
                .remove(fileNames);

            if (storageError) {
                console.error("Storage deletion error:", storageError);
            }
        }

        // 2. Delete the row from the database (RLS prevents deleting others' products)
        const { error: dbError } = await supabase
            .from('products')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (dbError) {
            console.error("Database deletion error:", dbError);
            return { success: false, error: "Failed to delete from database." };
        }

        revalidatePath("/products");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Delete process error:", error);
        return { success: false, error: "An unexpected error occurred during deletion." };
    }
}

export async function getProducts() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }

    return data;
}
