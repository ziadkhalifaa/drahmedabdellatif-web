import { AppointmentStatus, AppointmentType, BlogPostStatus, UserRole } from './enums';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export interface Appointment {
  id: string;
  type: AppointmentType;
  patientId?: string;
  patient?: User;
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  notes?: string;
  meetingId?: string;
  meetingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  patient?: User;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  titleAr: string;
  titleEn: string;
  slugAr: string;
  slugEn: string;
  contentAr: string;
  contentEn: string;
  excerptAr?: string;
  excerptEn?: string;
  metaTitleAr?: string;
  metaTitleEn?: string;
  metaDescriptionAr?: string;
  metaDescriptionEn?: string;
  keywords?: string;
  categoryId?: string;
  category?: Category;
  tags?: Tag[];
  status: BlogPostStatus;
  featuredImage?: string;
  showOnHomepage?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slugAr: string;
  slugEn: string;
}

export interface Tag {
  id: string;
  nameAr: string;
  nameEn: string;
  slugAr: string;
  slugEn: string;
}

export interface Service {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  slug: string;
  icon: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}


export interface Testimonial {
  id: string;
  patientName: string;
  patientAvatar?: string;
  content: string;
  rating: number;
  isApproved: boolean;
  isVisible: boolean;
  isSuccessStory?: boolean;
  storyTitle?: string;
  storyTitleEn?: string;
  storyContent?: string;
  storyContentEn?: string;
  patientImages?: string[];
  patientCity?: string;
  treatmentType?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface HeroSlide {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  image: string;
  isPortrait: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Technique {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image?: string;
  order: number;
  isActive: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
