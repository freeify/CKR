"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadBlog(formData: FormData) {
    try {
        const supabase = await createClient();

        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const content = formData.get("content") as string;
        const image = formData.get("image") as File;

        if (!title || !category || !content || !image) {
            return { success: false, error: "Title, Category, Content, and Image are required." };
        }

        // 1. Upload the image to the 'images' bucket
        const fileExt = image.name.split('.').pop();
        const fileName = `blog_${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(fileName, image);

        if (uploadError) {
            console.error("Storage upload error:", uploadError);
            return { success: false, error: "Failed to upload image." };
        }

        // 2. Get the public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);

        // 3. Insert into the database
        const { error: dbError } = await supabase
            .from('blogs')
            .insert({
                title,
                category,
                content,
                image_url: publicUrl,
            });

        if (dbError) {
            console.error("Database insert error:", dbError);
            return { success: false, error: "Failed to save blog details." };
        }

        revalidatePath("/blog");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Upload process error:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function updateBlog(id: string, formData: FormData) {
    try {
        const supabase = await createClient();

        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const content = formData.get("content") as string;
        const image = formData.get("image") as File | null;

        if (!title || !category || !content) {
            return { success: false, error: "Title, Category, and Content are required." };
        }

        let imageUrl = formData.get("currentImageUrl") as string;

        // If a new image was uploaded, process it
        if (image && image.size > 0 && image.name !== 'undefined') {
            const fileExt = image.name.split('.').pop();
            const fileName = `blog_${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(fileName, image);

            if (uploadError) {
                console.error("Storage upload error:", uploadError);
                return { success: false, error: "Failed to upload new image." };
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            imageUrl = publicUrl;
        }

        // 3. Update the database record
        const { error: dbError } = await supabase
            .from('blogs')
            .update({
                title,
                category,
                content,
                image_url: imageUrl,
            })
            .eq('id', id);

        if (dbError) {
            console.error("Database update error:", dbError);
            return { success: false, error: "Failed to update blog details." };
        }

        revalidatePath("/blog");
        revalidatePath(`/blog/${id}`);

        return { success: true };
    } catch (error) {
        console.error("Update process error:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function getBlogs() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Failed to fetch blogs:", error);
        return [];
    }

    return data;
}

export async function getBlogById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Failed to fetch blog:", error);
        return null;
    }

    return data;
}
