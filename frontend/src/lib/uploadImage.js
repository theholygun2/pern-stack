import supabase from './supabaseClient';

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET_NAME;

export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`; // e.g., 1751149362423-bb.jpg

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME) // make sure this is "product-images"
    .upload(fileName, file, {
      contentType: file.type, // e.g., "image/jpeg"
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error.message);
    throw error;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
