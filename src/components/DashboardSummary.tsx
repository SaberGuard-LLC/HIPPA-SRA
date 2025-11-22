import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardStats } from "@/types/hipaa";
import { CheckCircle2, AlertCircle, XCircle, Circle } from "lucide-react";

interface DashboardSummaryProps {
  stats: DashboardStats;
}

export const DashboardSummary = ({ stats }: DashboardSummaryProps) => {
  return (
    <div className="space-y-8 print:break-after-page animate-slide-up">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold gradient-text">Compliance Dashboard</h2>
        <p className="text-muted-foreground text-lg">
          Track your HIPAA Security Rule compliance progress in real-time
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-success/30 glass hover-lift group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">Complete</CardTitle>
            <div className="p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success mb-1">
              {stats.completeControls}
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {((stats.completeControls / stats.totalControls) * 100).toFixed(1)}% of total controls
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning/30 glass hover-lift group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">Partial</CardTitle>
            <div className="p-2 rounded-lg bg-warning/10 group-hover:bg-warning/20 transition-colors">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning mb-1">
              {stats.partialControls}
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {((stats.partialControls / stats.totalControls) * 100).toFixed(1)}% of total controls
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive/30 glass hover-lift group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">Incomplete</CardTitle>
            <div className="p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive mb-1">
              {stats.incompleteControls}
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {((stats.incompleteControls / stats.totalControls) * 100).toFixed(1)}% of total controls
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-primary/30 hover-lift group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">Overall Progress</CardTitle>
            <div className="p-2 rounded-lg glass group-hover:shadow-glow transition-all">
              <Circle className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold gradient-text mb-2">
              {stats.compliancePercentage.toFixed(1)}%
            </div>
            <Progress value={stats.compliancePercentage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Category Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">Detailed progress across HIPAA control categories</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(stats.categoryStats).map(([category, catStats], index) => {
              const progress = (catStats.complete / catStats.total) * 100;
              return (
                <div 
                  key={category} 
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold capitalize">{category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground">
                        {catStats.complete}/{catStats.total}
                      </span>
                      <span className="text-xs font-bold text-primary">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2 group-hover:h-3 transition-all" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
