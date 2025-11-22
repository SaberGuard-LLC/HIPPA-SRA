import { useState, useEffect } from "react";
import { AssessmentHeader } from "@/components/AssessmentHeader";
import { HeroSection } from "@/components/HeroSection";
import { DashboardSummary } from "@/components/DashboardSummary";
import { ControlCategory } from "@/components/ControlCategory";
import { AssessmentData, Control, ControlStatus, DashboardStats } from "@/types/hipaa";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import {
  getStoredAssessment,
  autoSaveAssessment,
  exportToJSON,
  exportToCSV,
  importFromJSON,
  clearAssessment,
  generateAssessmentHash,
} from "@/utils/assessmentStorage";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(getStoredAssessment);
  const { toast } = useToast();

  useEffect(() => {
    // Apply theme
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Auto-save on data change
    autoSaveAssessment(assessmentData);
  }, [assessmentData]);

  const calculateStats = (): DashboardStats => {
    const total = assessmentData.controls.length;
    const complete = assessmentData.controls.filter((c) => c.status === "yes").length;
    const partial = assessmentData.controls.filter((c) => c.status === "partial").length;
    const incomplete = assessmentData.controls.filter(
      (c) => c.status === "no" || c.status === "not-started"
    ).length;

    const categoryStats: DashboardStats["categoryStats"] = {};
    ["administrative", "physical", "technical", "documentation"].forEach((cat) => {
      const catControls = assessmentData.controls.filter((c) => c.category === cat);
      categoryStats[cat] = {
        total: catControls.length,
        complete: catControls.filter((c) => c.status === "yes").length,
        partial: catControls.filter((c) => c.status === "partial").length,
        incomplete: catControls.filter(
          (c) => c.status === "no" || c.status === "not-started"
        ).length,
      };
    });

    return {
      totalControls: total,
      completeControls: complete,
      partialControls: partial,
      incompleteControls: incomplete,
      compliancePercentage: ((complete + partial * 0.5) / total) * 100,
      categoryStats,
    };
  };

  const handleStatusChange = (id: string, status: ControlStatus) => {
    setAssessmentData((prev) => ({
      ...prev,
      controls: prev.controls.map((c) => (c.id === id ? { ...c, status } : c)),
    }));
  };

  const handleNotesChange = (id: string, notes: string) => {
    setAssessmentData((prev) => ({
      ...prev,
      controls: prev.controls.map((c) => (c.id === id ? { ...c, notes } : c)),
    }));
  };

  const handleExport = () => {
  const exportMenu = document.createElement("div");

  // Add print:hidden so even if it were still in the DOM, it won't show up in the PDF
  exportMenu.className =
    "fixed inset-0 bg-black/50 flex items-center justify-center z-50 print:hidden";

  exportMenu.innerHTML = `
    <div class="bg-card p-6 rounded-lg max-w-md w-full mx-4">
      <h3 class="text-lg font-semibold mb-4">Export Assessment</h3>
      <div class="space-y-2">
        <button id="export-pdf" class="w-full p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          Export as PDF (Print)
        </button>
        <button id="export-json" class="w-full p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90">
          Export as JSON
        </button>
        <button id="export-csv" class="w-full p-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90">
          Export as CSV
        </button>
        <button id="export-cancel" class="w-full p-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/90">
          Cancel
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(exportMenu);

  // --- PDF export ---
  document.getElementById("export-pdf")?.addEventListener("click", () => {
    // Remove the modal BEFORE printing so it doesn't show up in the PDF
    document.body.removeChild(exportMenu);

    // Give the DOM a tiny moment to repaint before opening the print dialog
    setTimeout(() => {
      window.print();
    }, 50);
  });

  // --- JSON export ---
  document.getElementById("export-json")?.addEventListener("click", () => {
    const json = exportToJSON(assessmentData);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hipaa-sra-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    document.body.removeChild(exportMenu);
    toast({
      title: "Export Complete",
      description: "Assessment exported as JSON",
    });
  });

  // --- CSV export ---
  document.getElementById("export-csv")?.addEventListener("click", () => {
    const csv = exportToCSV(assessmentData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hipaa-sra-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    document.body.removeChild(exportMenu);
    toast({
      title: "Export Complete",
      description: "Assessment exported as CSV",
    });
  });

  // --- Cancel ---
  document.getElementById("export-cancel")?.addEventListener("click", () => {
    document.body.removeChild(exportMenu);
  });
};;

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const jsonString = event.target?.result as string;
          const imported = importFromJSON(jsonString);
          if (imported) {
            setAssessmentData(imported);
            toast({
              title: "Import Successful",
              description: "Assessment data has been imported",
            });
          } else {
            toast({
              title: "Import Failed",
              description: "Invalid JSON file format",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all assessment data? This cannot be undone.")) {
      clearAssessment();
      setAssessmentData(getStoredAssessment());
      toast({
        title: "Assessment Reset",
        description: "All data has been cleared",
      });
    }
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AssessmentHeader
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onExport={handleExport}
        onImport={handleImport}
        onReset={handleReset}
      />

      <HeroSection />

      <main className="container mx-auto px-4 py-12 space-y-16">
        <DashboardSummary stats={stats} />

        <div className="space-y-12">
          {(["administrative", "physical", "technical", "documentation"] as const).map(
            (category) => (
              <ControlCategory
                key={category}
                category={category}
                controls={assessmentData.controls.filter((c) => c.category === category)}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
              />
            )
          )}
        </div>

        <div className="relative text-center space-y-6 py-16 print:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
          <h2 className="text-3xl font-bold gradient-text">Ready to Export?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Export your assessment as a professional PDF for compliance documentation, or save as JSON/CSV
            for record-keeping and further analysis.
          </p>
          <Button 
            onClick={handleExport} 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow-lg transition-all text-base px-8 py-6 h-auto font-semibold"
          >
            <Download className="mr-2 h-5 w-5" />
            Export Assessment
          </Button>
        </div>

        <footer className="relative text-center py-12 space-y-4 border-t border-border/50">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <p className="text-sm text-muted-foreground">
            <strong className="gradient-text font-semibold">SaberGuard HIPAA SRA Tool v2.0</strong>
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Client-Side Only • Zero Tracking • Audit-Ready
          </p>
          <p className="text-sm text-muted-foreground">
            All data is stored locally in your browser. No information is sent to external servers.
          </p>
          <p className="mt-4 text-sm">
            Built for small HIPAA-regulated entities by{" "}
            <a
              href="https://saberguard.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary font-semibold transition-colors"
            >
              saberguard.tech
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
