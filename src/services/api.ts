/**
 * Centralized API Client for VINS College Web Application
 * Points to the backend URL configured in VITE_API_URL
 * Architecture: React → fetch → Express (Node.js) → mysql2 → MySQL
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
  inquiryId?: number;
  applicationId?: number;
}

export async function submitContactForm(data: {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
}): Promise<ApiResponse> {
  console.log('[API] Submitting contact form data to backend:', API_BASE_URL + '/api/contact');
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      console.log('[API] ✅ Contact form submitted successfully. MySQL insertId:', json.inquiryId);
    } else {
      console.error('[API] ❌ Contact form submission failed:', json.message, json.error);
    }
    return json;
  } catch (error: any) {
    console.error('[API] ❌ Network error submitting contact form:', error.message);
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
  console.log('[API] Submitting admission form data to backend:', API_BASE_URL + '/api/admissions');
  try {
    const res = await fetch(`${API_BASE_URL}/api/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      console.log('[API] ✅ Admission form submitted successfully. MySQL insertId:', json.applicationId);
    } else {
      console.error('[API] ❌ Admission form submission failed:', json.message, json.error);
    }
    return json;
  } catch (error: any) {
    console.error('[API] ❌ Network error submitting admission form:', error.message);
    return { success: false, message: error.message };
  }
}

export async function checkBackendHealth(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export { API_BASE_URL };
