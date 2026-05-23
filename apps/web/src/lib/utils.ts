import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime12Hour(time24: string, isRTL: boolean): string {
  if (!time24) return '';
  // Check if it's already in 12-hour format
  if (time24.includes('AM') || time24.includes('PM') || time24.includes('ص') || time24.includes('م')) {
    return time24;
  }
  const parts = time24.split(':');
  if (parts.length < 2) return time24;
  const hoursStr = parts[0];
  const minutesStr = parts[1];
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr || '00';
  if (isNaN(hours)) return time24;
  
  const ampm = hours >= 12 
    ? (isRTL ? 'م' : 'PM') 
    : (isRTL ? 'ص' : 'AM');
    
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  const formattedHours = String(hours).padStart(2, '0');
  return `${formattedHours}:${minutes} ${ampm}`;
}
