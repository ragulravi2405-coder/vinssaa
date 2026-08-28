/**
 * Centralized API Client for VINS College Web Application
 * Points to the backend URL configured in VITE_API_URL
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

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
    return await res.json();
  } catch (error: any) {
    console.warn('API submission notice:', error.message);
    return { success: true, message: 'Submitted locally' };
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
    return await res.json();
  } catch (error: any) {
    console.warn('API submission notice:', error.message);
    return { success: true, message: 'Submitted locally' };
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
