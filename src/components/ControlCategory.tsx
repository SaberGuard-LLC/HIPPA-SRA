import { Control, ControlStatus } from "@/types/hipaa";
import { ControlCard } from "./ControlCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Building2, Server, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ControlCategoryProps {
  category: "administrative" | "physical" | "technical" | "documentation";
  controls: Control[];
  onStatusChange: (id: string, status: ControlStatus) => void;
  onNotesChange: (id: string, notes: string) => void;
}

const categoryConfig = {
  administrative: {
    name: "Administrative Safeguards",
    icon: ShieldCheck,
    description:
      "Policies and procedures designed to clearly show how the entity will comply with the HIPAA Security Rule.",
    reference: "164.308",
  },
  physical: {
    name: "Physical Safeguards",
    icon: Building2,
    description:
      "Physical measures, policies, and procedures to protect electronic information systems and related buildings and equipment.",
    reference: "164.310",
  },
  technical: {
    name: "Technical Safeguards",
    icon: Server,
    description:
      "Technology and the policy and procedures for its use that protect ePHI and control access to it.",
    reference: "164.312",
  },
  documentation: {
    name: "Policies, Procedures & Documentation",
    icon: FileText,
    description:
      "Requirements for documentation and ongoing review of security policies and procedures.",
    reference: "164.316",
  },
};

export const ControlCategory = ({
  category,
  controls,
  onStatusChange,
  onNotesChange,
}: ControlCategoryProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  const coreControls = controls.filter((c) => c.type === "core");
  const supplementalControls = controls.filter((c) => c.type === "supplemental");

  const completeCount = controls.filter((c) => c.status === "yes").length;
  const progress = (completeCount / controls.length) * 100;

  return (
    <section className="space-y-8 print:break-before-page animate-fade-in" id={category}>
      <Card className="relative overflow-hidden border-primary/30 hover-lift">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl glass-strong border border-primary/20 shadow-glow">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{config.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    Reference: {config.reference}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {config.description}
              </p>
            </div>

            <div className="text-right space-y-3">
              <div className="text-3xl font-bold gradient-text">
                {completeCount}/{controls.length}
              </div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                Controls Complete
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full glass-strong border border-primary/20">
                <span className="text-sm font-bold text-primary">{progress.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Progress value={progress} className="h-3" />
            <div className="flex gap-2">
              <Badge variant="outline" className="border-primary/20 font-semibold">
                ⚡ {coreControls.length} Core
              </Badge>
              <Badge variant="outline" className="border-muted font-medium">
                ○ {supplementalControls.length} Supplemental
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {coreControls.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Badge className="bg-gradient-primary text-white">Core Controls</Badge>
            <span className="text-sm text-muted-foreground">
              (Required by HIPAA Security Rule)
            </span>
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {coreControls.map((control) => (
              <ControlCard
                key={control.id}
                control={control}
                onStatusChange={onStatusChange}
                onNotesChange={onNotesChange}
              />
            ))}
          </div>
        </div>
      )}

      {supplementalControls.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Badge variant="secondary">Supplemental Controls</Badge>
            <span className="text-sm text-muted-foreground">
              (Addressable / Best Practices)
            </span>
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {supplementalControls.map((control) => (
              <ControlCard
                key={control.id}
                control={control}
                onStatusChange={onStatusChange}
                onNotesChange={onNotesChange}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
