import { Shield, Lock, FileCheck, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-b border-border">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-glow-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-glow-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container relative mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium">
            <Zap className="h-4 w-4 text-primary" />
            <span className="gradient-text font-semibold">Version 2.0 • Client-Side Only</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="gradient-text">HIPAA Compliance</span>
            <br />
            <span className="text-foreground">Made Simple</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional security risk assessment tool designed for small healthcare providers.
            No servers, zero tracking, audit-ready reports.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20 text-sm">
              <Shield className="h-4 w-4 text-success" />
              <span className="font-medium text-success-foreground">100% Client-Side</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm">
              <Lock className="h-4 w-4 text-primary" />
              <span className="font-medium">Zero Tracking</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-sm">
              <FileCheck className="h-4 w-4 text-accent" />
              <span className="font-medium">Audit-Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
