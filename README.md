# SaberGuard HIPAA Security Risk Assessment Tool v2.0

![SaberGuard Logo](src/assets/saberguard-logo.jpg)

**The only HIPAA SRA tool built specifically for small healthcare providers.**

**No Servers. Zero Tracking. Full Control.**

Perfect for small HIPAA-regulated entities, this browser-based assessment tool provides enterprise-grade compliance without the enterprise complexity. All data stays on your device—no sign-ups, no cloud storage, no hidden costs.

## Why v2.0?

- **Audit-Ready**: Complete HIPAA Security Rule coverage with clear Core vs Supplemental distinctions
- **Dual-Theme Design**: Professional dark mode + print-friendly light mode that auto-switches
- **Modular Architecture**: Add specialized control sets (Telehealth, Remote Work, Cloud) without rebuilding
- **Smart Reporting**: Export to PDF, JSON, or CSV with cryptographic snapshots for verification
- **Accessible to All**: WCAG 2.1 compliant with keyboard navigation and screen-reader support
- **Auto-Save**: Never lose progress with intelligent local storage

## Features

### Complete HIPAA Coverage

**Administrative Safeguards (164.308)** - 9 Controls
- Risk analysis and management
- Security official designation
- Workforce security procedures
- Access management
- Security training
- Contingency planning
- Periodic evaluations
- Business Associate Agreements

**Physical Safeguards (164.310)** - 4 Controls
- Facility access controls
- Workstation use policies
- Workstation security
- Device and media controls

**Technical Safeguards (164.312)** - 6 Controls
- Unique user IDs and MFA
- Audit logging and monitoring
- Integrity controls (anti-malware)
- Encryption in transit (TLS)
- Encryption at rest (addressable)
- Endpoint management (best practice)

**Documentation & Policies (164.316)** - 4 Controls
- Written policies and procedures
- Sanction policies
- Incident response plans
- Record retention requirements

### Smart Dashboard

Real-time compliance tracking with:
- Overall compliance percentage
- Category-level progress
- Status breakdown (Complete/Partial/Incomplete)
- Visual progress indicators

### Export Options

1. **PDF Export** - Print-optimized report with SaberGuard branding
2. **JSON Export** - Full data backup for migration
3. **CSV Export** - Spreadsheet analysis
4. **Verification Snapshot** - Timestamped hash for evidence

## Built for Small Providers, By Security Experts

Unlike bloated SaaS platforms charging thousands annually, SaberGuard's v2.0 tool is:
- **Free forever** with no feature gates
- **Privacy-first** with client-side only operation  
- **Compliance-ready** with immediate PDF export
- **Future-proof** with plug-and-play control modules

Perfect for:
- Solo practitioners
- Small clinics
- Dental offices
- Mental health providers
- Physical therapy practices
- Chiropractic offices
- Any HIPAA-covered entity

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/saberguard/hipaa-sra-tool.git

# Navigate to directory
cd hipaa-sra-tool

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Usage

1. **Start Assessment**: Open the tool in your browser
2. **Review Controls**: Go through each control category
3. **Mark Status**: Click Yes/Partial/No for each control
4. **Add Notes**: Document evidence and planned actions
5. **Track Progress**: Monitor the dashboard for completion
6. **Export Results**: Generate PDF report or export data

### Data Privacy

**All data is stored locally in your browser's localStorage.**
- No server-side storage
- No external API calls
- No user tracking
- No telemetry
- No cookies (except essential local storage)

Your assessment data never leaves your device unless you explicitly export it.

## Technology Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Beautiful, responsive design
- **Vite** - Lightning-fast build tool
- **shadcn/ui** - Accessible component library

## Roadmap

See [IMPROVEMENT_PLAN_V2.md](./IMPROVEMENT_PLAN_V2.md) for detailed enhancement plans.

### Phase 2 (Q1 2026)
- [ ] Wizard mode for guided assessments
- [ ] Telehealth control module
- [ ] Home office endpoints module
- [ ] Enhanced PDF generation with color coding
- [ ] Risk calculator with scoring

### Phase 3 (Q2 2026)
- [ ] High-contrast accessibility theme
- [ ] Evidence attachment system (local file references)
- [ ] Custom theme builder
- [ ] Multi-language support

### Phase 4 (Q3 2026)
- [ ] Additional compliance modules (GDPR, PCI-DSS)
- [ ] Mobile app wrapper
- [ ] Offline PWA capability
- [ ] Community plugin marketplace

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Accessibility

This tool meets WCAG 2.1 Level AA standards:
- Keyboard navigation throughout
- Screen reader compatible
- Sufficient color contrast (4.5:1 minimum)
- ARIA labels on all interactive elements
- Focus indicators on all controls

## License

MIT License - See [LICENSE](LICENSE) for details

## Support

- **Documentation**: [IMPROVEMENT_PLAN_V2.md](./IMPROVEMENT_PLAN_V2.md)
- **Issues**: [GitHub Issues](https://github.com/saberguard/hipaa-sra-tool/issues)
- **Website**: [saberguard.tech](https://saberguard.tech)
- **Email**: info@saberguard.tech

## Acknowledgments

Built with ❤️ by [SaberGuard Security](https://saberguard.tech) for the healthcare community.

Special thanks to:
- Small healthcare providers who inspired this tool
- The open-source community
- HIPAA compliance experts who reviewed the control set

---

**Disclaimer**: This tool is provided as-is for educational and compliance assistance purposes. While we strive for accuracy, users are responsible for ensuring their compliance with applicable regulations. Consult with qualified compliance professionals for official audits and legal advice.

---

© 2025 SaberGuard Security • MSSP for HIPAA Organizations
