/**
 * Cloudinary Image Upload & CDN Optimization Utility
 * Directly uploads images from browser to Cloudinary via Unsigned Upload Preset.
 * Zero server backend needed. Automatically serves WebP/AVIF via Cloudinary CDN.
 */

const CLOUDINARY_CLOUD_NAME =
  (import.meta.env["VITE_CLOUDINARY_CLOUD_NAME"] as string | undefined) || "btiqhkpk";

const CLOUDINARY_UPLOAD_PRESET =
  (import.meta.env["VITE_CLOUDINARY_UPLOAD_PRESET"] as string | undefined) || "VelzX-Shanmu";

const CLOUDINARY_API_KEY =
  (import.meta.env["VITE_CLOUDINARY_API_KEY"] as string | undefined) || "QdN_NnzSbUfissm9X3gtSzmYWcI";

export interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  error?: string;
}

/**
 * Checks whether Cloudinary environment variables are configured
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    CLOUDINARY_CLOUD_NAME &&
    CLOUDINARY_UPLOAD_PRESET &&
    !CLOUDINARY_CLOUD_NAME.includes("your-cloud-name") &&
    !CLOUDINARY_UPLOAD_PRESET.includes("your-upload-preset")
  );
}

/**
 * Upload an image file directly to Cloudinary
 * @param file The HTML5 File object from an <input type="file">
 * @param folder Optional folder in Cloudinary (defaults to 'shanmu_blog')
 */
export async function uploadImageToCloudinary(
  file: File,
  folder?: string
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    return {
      success: false,
      error:
        "Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local",
    };
  }

  if (!file.type.startsWith("image/")) {
    return {
      success: false,
      error: "Invalid file type. Please upload an image file (PNG, JPG, WEBP, SVG, GIF).",
    };
  }

  // Max 10MB file check
  if (file.size > 10 * 1024 * 1024) {
    return {
      success: false,
      error: "Image exceeds 10MB limit. Please upload a smaller file.",
    };
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  if (CLOUDINARY_API_KEY) {
    formData.append("api_key", CLOUDINARY_API_KEY);
  }

  if (folder) {
    formData.append("folder", folder);
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data.error?.message || "Failed to upload image to Cloudinary.";
      // Catch unsigned preset requirement to provide exact guidance
      if (errMsg.includes("unsigned uploads")) {
        return {
          success: false,
          error:
            "Cloudinary Preset 'VelzX-Shanmu' must be set to 'Unsigned' mode. In Cloudinary: Settings -> Upload -> Upload Presets -> Edit 'VelzX-Shanmu' -> change Signing Mode to 'Unsigned' -> Save.",
        };
      }
      return {
        success: false,
        error: errMsg,
      };
    }

    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes,
    };
  } catch (err: any) {
    console.error("Cloudinary upload failed:", err);
    return {
      success: false,
      error: err.message || "Network error while uploading to Cloudinary.",
    };
  }
}

/**
 * Generates an auto-optimized Cloudinary delivery URL with responsive quality and format
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  width: number = 1400,
  quality: string = "auto"
): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  // Inserts f_auto,q_auto,w_<width> into standard Cloudinary upload URL path
  return url.replace("/upload/", `/upload/f_auto,q_${quality},w_${width}/`);
}
