import { AssessmentData, Control } from "@/types/hipaa";
import { hipaaControls } from "@/data/hipaaControls";

const STORAGE_KEY = "hipaa-sra-v2-data";
const AUTO_SAVE_DELAY = 1000; // 1 second debounce

let autoSaveTimeout: NodeJS.Timeout | null = null;

export const getStoredAssessment = (): AssessmentData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load assessment data:", error);
  }

  // Return default structure
  return {
    version: "2.0",
    assessmentDate: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    systems: [],
    controls: hipaaControls,
  };
};

export const saveAssessment = (data: AssessmentData): void => {
  try {
    data.lastModified = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save assessment data:", error);
  }
};

export const autoSaveAssessment = (data: AssessmentData): void => {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }

  autoSaveTimeout = setTimeout(() => {
    saveAssessment(data);
  }, AUTO_SAVE_DELAY);
};

export const exportToJSON = (data: AssessmentData): string => {
  return JSON.stringify(data, null, 2);
};

export const exportToCSV = (data: AssessmentData): string => {
  const headers = [
    "ID",
    "Category",
    "Type",
    "Title",
    "Reference",
    "Status",
    "Notes",
  ];

  const rows = data.controls.map((control) => [
    control.id,
    control.category,
    control.type,
    `"${control.title}"`,
    control.reference,
    control.status,
    `"${control.notes.replace(/"/g, '""')}"`,
  ]);

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};

export const importFromJSON = (jsonString: string): AssessmentData | null => {
  try {
    const data = JSON.parse(jsonString);
    // Basic validation
    if (data.version && data.controls && Array.isArray(data.controls)) {
      return data;
    }
  } catch (error) {
    console.error("Failed to import JSON:", error);
  }
  return null;
};

export const generateAssessmentHash = (data: AssessmentData): string => {
  // Create a snapshot hash for verification purposes
  const hashData = {
    date: data.assessmentDate,
    version: data.version,
    controlCount: data.controls.length,
    completedCount: data.controls.filter((c) => c.status === "yes").length,
  };

  return btoa(JSON.stringify(hashData));
};

export const clearAssessment = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
