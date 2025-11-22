// HIPAA Control Types and Data Structures

export type ControlStatus = "yes" | "partial" | "no" | "not-started";
export type ControlType = "core" | "supplemental";

export interface Control {
  id: string;
  title: string;
  reference: string;
  type: ControlType;
  category: "administrative" | "physical" | "technical" | "documentation";
  description?: string;
  status: ControlStatus;
  notes: string;
  evidenceLinks?: string[];
}

export interface ControlCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalControls: number;
  coreControls: number;
  supplementalControls: number;
}

export interface AssessmentData {
  version: string;
  assessmentDate: string;
  lastModified: string;
  organization?: string;
  assessor?: string;
  systems: string[];
  controls: Control[];
}

export interface DashboardStats {
  totalControls: number;
  completeControls: number;
  partialControls: number;
  incompleteControls: number;
  compliancePercentage: number;
  categoryStats: {
    [key: string]: {
      total: number;
      complete: number;
      partial: number;
      incomplete: number;
    };
  };
}
