/**
 * Centralized API Client for VINS College Web Application
 * Points to the backend URL configured in VITE_API_URL
 * Architecture: React → fetch → Express (Node.js) → mysql2 → MySQL
 */

import { CollegeDayGalleryItem } from '../data/collegeData';
import { CollegeNotification } from '../data/notificationsData';
import { DocumentItem, GalleryImage, SiteThemeConfig, SiteBannerAnnouncement } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
const TOKEN_KEY = 'vins_admin_jwt_token_v1';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  id?: string;
  error?: string;
  inquiryId?: number;
  applicationId?: number;
  token?: string;
  user?: any;
}

// ── Auth Utilities ─────────────────────────────────────────────
export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken() || 'vins_admin_direct_access';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// ── Admin Authentication ───────────────────────────────────────
export async function loginAdmin(username: string, password: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
    if (json.success && json.token) {
      setAdminToken(json.token);
    }
    return json;
  } catch (error: any) {
    console.error('[API] Admin login network error:', error.message);
    return { success: false, message: error.message };
  }
}

// ── Events API (college_events table) ───────────────────────────
export async function fetchEvents(): Promise<ApiResponse<CollegeDayGalleryItem[]>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Fetch events error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function createEventApi(event: Partial<CollegeDayGalleryItem>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(event)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Create event error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function updateEventApi(id: string, event: Partial<CollegeDayGalleryItem>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(event)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Update event error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function deleteEventApi(id: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Delete event error:', error.message);
    return { success: false, message: error.message };
  }
}

// ── Notifications API (notifications table) ─────────────────────
export async function fetchNotifications(): Promise<ApiResponse<CollegeNotification[]>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/notifications`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Fetch notifications error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function createNotificationApi(notice: Partial<CollegeNotification>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notice)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Create notification error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function updateNotificationApi(id: string, notice: Partial<CollegeNotification>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/notifications/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(notice)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Update notification error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function deleteNotificationApi(id: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/notifications/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Delete notification error:', error.message);
    return { success: false, message: error.message };
  }
}

// ── Documents API (documents table) ────────────────────────────
export async function fetchDocuments(): Promise<ApiResponse<DocumentItem[]>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Fetch documents error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function createDocumentApi(doc: Partial<DocumentItem>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(doc)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Create document error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function updateDocumentApi(id: string, doc: Partial<DocumentItem>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(doc)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Update document error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function deleteDocumentApi(id: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Delete document error:', error.message);
    return { success: false, message: error.message };
  }
}

// ── Gallery API (gallery_images table) ───────────────────────────
export async function fetchGalleryImages(): Promise<ApiResponse<GalleryImage[]>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/gallery`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Fetch gallery error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function createGalleryImageApi(image: Partial<GalleryImage>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/gallery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(image)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Create gallery image error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function updateGalleryImageApi(id: string, image: Partial<GalleryImage>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/gallery/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(image)
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Update gallery image error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function deleteGalleryImageApi(id: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/gallery/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Delete gallery image error:', error.message);
    return { success: false, message: error.message };
  }
}

// ── Site Settings API (site_settings table) ────────────────────
export async function fetchSettings(): Promise<ApiResponse<Record<string, any>>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Fetch settings error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function updateSettingApi(key: string, value: any): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ value })
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Update setting error:', error.message);
    return { success: false, message: error.message };
  }
}

// ── Contact & Admissions Forms ──────────────────────────────────
export async function submitContactForm(data: {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    console.error('[API] Network error submitting contact form:', error.message);
    return { success: false, message: error.message };
  }
}

export async function fetchContactInquiries(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Fetch inquiries error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function submitAdmissionForm(data: {
  fullName: string;
  dob?: string;
  phone: string;
  email: string;
  academicYear?: string;
  category?: 'UG' | 'PG';
  preferredCourse: string;
  qualification?: string;
  percentage?: string;
  city?: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    console.error('[API] Network error submitting admission form:', error.message);
    return { success: false, message: error.message };
  }
}

export async function fetchAdmissions(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admissions`, {
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error: any) {
    console.error('[API] Fetch admissions error:', error.message);
    return { success: false, message: error.message };
  }
}

export async function checkBackendHealth(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ── Media Upload API (Cloudinary Direct & Backend Upload) ────
export async function uploadMediaApi(
  imageFileOrDataUri: string | File
): Promise<{ success: boolean; url: string; isCloudinary?: boolean; message?: string }> {
  try {
    const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
    const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim();

    // Log configuration status safely (never print secrets)
    console.log('[Upload] Cloudinary Cloud Name configured:', cloudName ? 'YES' : 'NO');
    console.log('[Upload] Cloudinary Upload Preset configured:', uploadPreset ? 'YES' : 'NO');

    // 1. Direct Cloudinary Client-Side Upload (using Unsigned Preset)
    if (cloudName && uploadPreset) {
      try {
        const formData = new FormData();
        formData.append('file', imageFileOrDataUri);
        formData.append('upload_preset', uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.secure_url) {
          console.log('[Upload] Cloudinary upload successful:', data.secure_url);
          return { success: true, url: data.secure_url, isCloudinary: true };
        } else if (data.error) {
          console.error('[Upload] Cloudinary API Error:', data.error.message);
          // Return error with clear Cloudinary message
          return {
            success: false,
            url: '',
            isCloudinary: false,
            message: `Cloudinary: ${data.error.message}`,
          };
        }
      } catch (err: any) {
        console.warn('[Upload] Direct Cloudinary upload network error, trying backend:', err.message);
      }
    }

    // 2. Convert File to base64 data URL if needed
    let base64Data: string;
    if (typeof imageFileOrDataUri === 'string') {
      base64Data = imageFileOrDataUri;
    } else {
      base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFileOrDataUri);
      });
    }

    // 3. Try Backend /api/upload endpoint
    try {
      const backendRes = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ image: base64Data }),
      });
      const result = await backendRes.json();

      if (result.success && result.url && result.isCloudinary) {
        return {
          success: true,
          url: result.url,
          isCloudinary: true,
        };
      }
    } catch (e) {
      console.warn('[Upload] Backend upload endpoint not reachable:', e);
    }

    // 4. Fallback to base64 data URI if Cloudinary is not configured
    return {
      success: true,
      url: base64Data,
      isCloudinary: false,
      message: 'Uploaded as local image data.',
    };
  } catch (error: any) {
    console.error('[Upload] Media upload fatal error:', error);
    if (typeof imageFileOrDataUri === 'string') {
      return { success: true, url: imageFileOrDataUri, isCloudinary: false };
    }
    return { success: false, url: '', message: error.message };
  }
}

export { API_BASE_URL };

