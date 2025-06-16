import { format, parseISO } from "date-fns";

export const formatDate = {
  // For task cards - compact format
  compact: (isoDate: string) => {
    const date = parseISO(isoDate);
    return format(date, "dd MMM HH:mm");
  },

  // For detailed views - full format with time
  full: (isoDate: string) => {
    const date = parseISO(isoDate);
    return format(date, "PPP 'at' p");
  },

  // For suggestions and deadlines - date only
  deadline: (isoDate: string) => {
    const date = parseISO(isoDate);
    return format(date, "PPP");
  },
};

// Helper to safely parse ISO strings
export const parseDate = (isoDate: string) => {
  try {
    return parseISO(isoDate);
  } catch (error) {
    console.error("Error parsing date:", error);
    return new Date(); // Fallback to current date
  }
};
