# Contributing to SaberGuard HIPAA SRA Tool

Thank you for your interest in contributing to the SaberGuard HIPAA Security Risk Assessment Tool! We welcome contributions from the community.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in [GitHub Issues](https://github.com/saberguard/hipaa-sra-tool/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Submitting Code

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hipaa-sra-tool.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm run dev      # Test in development
   npm run build    # Ensure production build works
   npm run lint     # Check for linting errors
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "feat: Add telehealth control module"
   ```

   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Test additions or changes
   - `chore:` Build process or auxiliary tool changes

6. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

   Then open a PR on GitHub with:
   - Description of changes
   - Related issue number (if applicable)
   - Screenshots/videos (if UI changes)

## Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with hooks
- **Naming**: 
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
- **Files**: Match component names
- **Imports**: Organize with aliases (`@/...`)

### Accessibility

All contributions must maintain WCAG 2.1 AA compliance:
- Add ARIA labels to interactive elements
- Ensure keyboard navigation works
- Maintain color contrast ratios (4.5:1 minimum)
- Test with screen readers when possible

### Privacy & Security

This tool is **client-side only**. Never add features that:
- Send data to external servers
- Use tracking/analytics
- Require user accounts
- Store data outside localStorage

### Testing

- Manual test in multiple browsers
- Verify print/PDF export works
- Check responsive design on mobile
- Test dark/light theme switching
- Validate accessibility with keyboard navigation

## Control Module Development

To add a new control module:

1. Create file in `src/data/modules/`
   ```typescript
   import { Control } from "@/types/hipaa";

   export const yourModuleControls: Control[] = [
     {
       id: "module-001",
       title: "Control description",
       reference: "Regulation reference",
       type: "core",
       category: "technical",
       description: "Detailed guidance",
       status: "not-started",
       notes: "",
     },
     // ... more controls
   ];

   export const yourModuleInfo = {
     id: "your-module",
     name: "Your Module Name",
     version: "1.0",
     description: "What this module covers",
   };
   ```

2. Register in module loader (when implemented)

3. Add documentation in module file

4. Submit PR with:
   - Control definitions
   - Guidance documentation
   - Example use case
   - References to regulations

## Documentation

When adding features:
- Update README.md if user-facing
- Add JSDoc comments to functions
- Update IMPROVEMENT_PLAN_V2.md roadmap
- Include inline comments for complex logic

## Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on improving healthcare compliance

## Questions?

- Open a [GitHub Discussion](https://github.com/saberguard/hipaa-sra-tool/discussions)
- Email: support@saberguard.tech
- Visit: [saberguard.tech](https://saberguard.tech)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make HIPAA compliance accessible to all healthcare providers! 🙏
