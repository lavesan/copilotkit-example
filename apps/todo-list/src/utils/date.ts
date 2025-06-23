import { format, parseISO, endOfDay, startOfToday, addDays } from "date-fns";

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

// Process dates from Copilot inputs
export const processCopilotDate = (dateInput: string): string => {
  const today = startOfToday();

  switch (dateInput.toLowerCase()) {
    case "today":
      return endOfDay(today).toISOString();
    case "tomorrow":
      return endOfDay(addDays(today, 1)).toISOString();
    default:
      // Check if it's a full date-time format (YYYY-MM-DDTHH:mm)
      if (dateInput.includes("T")) {
        return new Date(dateInput).toISOString();
      }
      // For date-only format (YYYY-MM-DD), set to end of day
      return endOfDay(new Date(dateInput)).toISOString();
  }
};
