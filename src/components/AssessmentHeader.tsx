import { Button } from "@/components/ui/button";
import { Moon, Sun, FileDown, Upload, RotateCcw } from "lucide-react";
import logo from "@/assets/saberguard-logo.jpg";

interface AssessmentHeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onExport: () => void;
  onImport: () => void;
  onReset: () => void;
}

export const AssessmentHeader = ({
  isDarkMode,
  onToggleTheme,
  onExport,
  onImport,
  onReset,
}: AssessmentHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass-strong backdrop-blur-xl print:relative print:shadow-none">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="SaberGuard Security"
              className="h-10 w-auto hover-lift"
            />
            <div>
              <h1 className="text-2xl font-bold gradient-text tracking-tight">
                HIPAA Security Risk Assessment
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                v2.0 • Client-Side • Zero Tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleTheme}
              className="hover-glow"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onImport}
              className="hover-glow"
              aria-label="Import assessment"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="hover-glow"
              aria-label="Export assessment"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="hover-glow"
              aria-label="Reset assessment"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
