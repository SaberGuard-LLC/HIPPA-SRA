import { Control, ControlStatus } from "@/types/hipaa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlCardProps {
  control: Control;
  onStatusChange: (id: string, status: ControlStatus) => void;
  onNotesChange: (id: string, notes: string) => void;
}

export const ControlCard = ({
  control,
  onStatusChange,
  onNotesChange,
}: ControlCardProps) => {
  const statusButtons: { 
    status: ControlStatus; 
    label: string; 
    icon: any; 
    variant: "success" | "warning" | "destructive"
  }[] = [
    { status: "yes", label: "Yes", icon: CheckCircle2, variant: "success" },
    { status: "partial", label: "Partial", icon: AlertCircle, variant: "warning" },
    { status: "no", label: "No", icon: XCircle, variant: "destructive" },
  ];

  const getCardBorderClass = () => {
    switch (control.status) {
      case "yes":
        return "border-success/50 bg-success/5";
      case "partial":
        return "border-warning/50 bg-warning/5";
      case "no":
        return "border-destructive/50 bg-destructive/5";
      default:
        return "border-border";
    }
  };

  return (
    <Card className={`transition-all duration-300 hover-lift group ${getCardBorderClass()} print:break-inside-avoid`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant={control.type === "core" ? "default" : "secondary"}
                className={
                  control.type === "core"
                    ? "gradient-text border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 font-semibold"
                    : "bg-muted/50 font-medium"
                }
              >
                {control.type === "core" ? "⚡ Core" : "○ Supplemental"}
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 hover:text-primary">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">Control information</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm glass-strong">
                    <p className="text-sm leading-relaxed">
                      {control.description || "Additional guidance not available"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
              {control.title}
            </h3>

            <p className="text-xs text-muted-foreground font-mono">
              Ref: {control.reference}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2 print:hidden">
          {statusButtons.map(({ status, label, icon: Icon, variant }) => (
            <Button
              key={status}
              variant={control.status === status ? variant : "outline"}
              size="sm"
              onClick={() => onStatusChange(control.id, status)}
              aria-label={`Mark as ${label}`}
            >
              <Icon className="h-4 w-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>

        <div className="print:hidden">
          <label
            htmlFor={`notes-${control.id}`}
            className="text-sm font-medium mb-2 block"
          >
            Notes / Evidence (optional)
          </label>
          <Textarea
            id={`notes-${control.id}`}
            placeholder="Describe how this is met, list systems/evidence, or note planned actions..."
            value={control.notes}
            onChange={(e) => onNotesChange(control.id, e.target.value)}
            className="min-h-[80px] resize-none"
            aria-label="Control notes and evidence"
          />
        </div>

        {control.notes && (
          <div className="hidden print:block">
            <p className="text-xs font-medium mb-1">Notes:</p>
            <p className="text-xs text-muted-foreground whitespace-pre-wrap">
              {control.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
