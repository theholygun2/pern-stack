import supabase from './supabaseClient';

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET_NAME;

export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `products/${fileName}`;

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
