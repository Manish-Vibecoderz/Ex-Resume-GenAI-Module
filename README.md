# Exterview - AI-Powered Resume Builder

<div align="center">

**A premium, AI-native resume builder with Apple-inspired design**

Build professional, ATS-optimized resumes in minutes with intelligent AI assistance. Choose from multiple creation modes, customize with beautiful templates, get AI-powered feedback, and export to PDF or DOCX.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991)](https://openai.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture) • [Deployment](#-deployment)

</div>

---

## 🌟 Features

### 🎯 Five Intelligent Creation Modes

**1. Manual Entry** - Start from scratch with an intuitive, guided interface
- Clean, distraction-free editor
- Real-time preview as you type
- Smart field validation and suggestions

**2. Upload Resume** - Extract and parse existing resumes
- Supports PDF and DOCX formats
- Intelligent text extraction using `pdf-parse` and `mammoth`
- Automatic structure detection and field mapping
- Preserves formatting and content hierarchy

**3. AI Prompt Generation** - Describe your background, let AI do the rest
- Natural language input processing
- GPT-4 powered content structuring
- Intelligent job description parsing
- Achievement-focused bullet point generation

**4. LinkedIn Import** - Transform your LinkedIn profile into a resume
- URL-based profile scraping
- Automatic section mapping
- Experience and education extraction
- Skills and endorsements integration

**5. Chatbot Q&A** - Interactive conversation-based resume building
- Guided question flow
- Context-aware follow-ups
- Natural conversation experience
- Comprehensive data collection

### ✨ Powerful Resume Editor

- **Real-time Preview** - See changes instantly with live rendering
- **AI-Powered Rewriting** - Enhance any section with GPT-4 assistance
  - Summary optimization
  - Experience bullet point improvement
  - Skills generation based on role
  - Generic content rewriting
- **Drag & Drop Reordering** - Effortlessly reorganize sections
- **Auto-save** - Debounced persistence (never lose your work)
- **Smart Validation** - Real-time warnings for incomplete or missing data
- **Section Management** - Add, edit, delete, and reorder entries
- **Rich Text Editing** - Format descriptions with ease

### 🎨 Beautiful Template Engine

**Three Professional Templates:**
- **Minimal** - Clean, modern, ATS-friendly design
- **Classic** - Traditional, professional two-column layout
- **Two-Column** - Space-efficient, contemporary design

**Customization Options:**
- **Color Schemes** - Primary and accent color selection
- **Font Scaling** - Small, Medium, Large (responsive typography)
- **Density Control** - Comfortable, Cozy, Compact spacing
- **Profile Photo** - Toggle photo display
- **Live Preview** - See changes in real-time

### 🤖 AI-Powered Resume Review

Comprehensive analysis powered by GPT-4:
- **Overall Score** - 0-100 rating with detailed breakdown
- **Summary Rating** - Quick assessment of resume quality
- **Strengths Analysis** - Identify what's working well
- **Weakness Detection** - Pinpoint areas for improvement
- **Quick Tips** - Actionable, specific recommendations
- **Re-review Detection** - Smart prompts when content changes

### 📥 Professional Export Options

- **PDF Export** - Print-ready, pixel-perfect rendering
  - Maintains template styling
  - Optimized for ATS systems
  - High-quality typography
- **DOCX Export** - Editable Microsoft Word format
  - Preserves formatting
  - Easy post-export editing
  - Compatible with all Word versions

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **PostgreSQL** 14 or higher
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd exterview-resume-builder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and configure:
# - DATABASE_URL (PostgreSQL connection string)
# - OPENAI_API_KEY (Your OpenAI API key)

# Initialize the database
npx prisma generate
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

🎉 **Visit** `http://localhost:3000` to see the application in action!

### Verify Installation

```bash
# Check database connection
npx prisma studio

# Run linting
npm run lint

# Build for production (test)
npm run build
```

---

## 📁 Project Architecture

### Directory Structure

```
exterview-resume-builder/
├── app/                              # Next.js 14 App Router
│   ├── page.tsx                      # Landing page with hero, features, CTA
│   ├── globals.css                   # Global styles and Tailwind config
│   ├── layout.tsx                    # Root layout with metadata
│   │
│   ├── start/                        # Resume creation flow
│   │   ├── page.tsx                  # Mode selection hub
│   │   ├── manual/page.tsx           # Manual entry mode
│   │   ├── upload/page.tsx           # File upload mode
│   │   ├── prompt/page.tsx           # AI prompt generation
│   │   ├── linkedin/page.tsx         # LinkedIn import
│   │   └── chatbot/page.tsx          # Interactive Q&A chatbot
│   │
│   ├── editor/page.tsx               # Main resume editor (Step 3)
│   ├── design/page.tsx               # Template customization (Step 4)
│   ├── review/page.tsx               # AI review display (Step 5)
│   │
│   ├── download/                     # Export endpoints
│   │   ├── pdf/route.ts              # PDF generation
│   │   └── docx/route.ts             # DOCX generation
│   │
│   └── api/                          # Backend API routes
│       ├── session/
│       │   ├── create/route.ts       # Create new session
│       │   ├── route.ts              # Get session by ID
│       │   ├── update/route.ts       # Update session data
│       │   └── presentation/route.ts # Update presentation settings
│       │
│       ├── uploadResume/route.ts     # Parse PDF/DOCX uploads
│       ├── generateFromPrompt/route.ts # AI prompt-based generation
│       ├── linkedinImport/route.ts   # LinkedIn scraping
│       │
│       └── ai/                       # AI-powered endpoints
│           ├── chat/route.ts         # Chatbot conversation
│           ├── buildResumeFromQA/route.ts # Build from chat
│           ├── summaryWrite/route.ts # Generate summary
│           ├── experienceRewrite/route.ts # Rewrite experience
│           ├── generateSkills/route.ts # Generate skills
│           ├── genericRewrite/route.ts # Generic rewriting
│           └── reviewResume/route.ts # AI review generation
│
├── components/                       # React components
│   ├── landing/                      # Landing page sections
│   │   ├── hero.tsx                  # Hero section
│   │   ├── how-it-works.tsx          # Process explanation
│   │   ├── features.tsx              # Feature showcase
│   │   └── cta.tsx                   # Call-to-action
│   │
│   ├── layout/                       # Layout components
│   │   ├── site-header.tsx           # Navigation header
│   │   └── site-footer.tsx           # Footer with links
│   │
│   ├── editor/                       # Editor components
│   │   ├── EditorForm.tsx            # Main form container
│   │   └── sections/                 # Form sections
│   │       ├── PersonalDetailsSection.tsx
│   │       ├── SummarySection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── EducationSection.tsx
│   │       ├── SkillsSection.tsx
│   │       └── ProjectsSection.tsx
│   │
│   ├── resume/                       # Resume rendering
│   │   ├── ResumePreview.tsx         # Template renderer
│   │   └── templates/                # Resume templates
│   │       ├── MinimalTemplate.tsx
│   │       ├── ClassicTemplate.tsx
│   │       └── TwoColumnTemplate.tsx
│   │
│   └── ui/                           # Shadcn UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── card.tsx
│       └── ... (other Shadcn components)
│
├── lib/                              # Utility libraries
│   ├── store/                        # State management
│   │   └── useResumeStore.ts         # Zustand store for resume data
│   │
│   ├── utils.ts                      # Helper functions (cn, etc.)
│   ├── errorHandling.ts              # Error handling utilities
│   ├── validation.ts                 # Input validation logic
│   ├── sanitization.ts               # XSS prevention
│   └── toast.ts                      # Toast notification system
│
├── types/                            # TypeScript definitions
│   └── resume.ts                     # Resume data types
│       ├── ResumeStructuredData
│       ├── ResumePresentation
│       └── ResumeTemplateId
│
├── prisma/                           # Database
│   └── schema.prisma                 # Prisma schema (ResumeSession model)
│
├── public/                           # Static assets
│
├── .env.example                      # Environment variables template
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── next.config.mjs                   # Next.js configuration
│
├── README.md                         # This file
├── TESTING.md                        # Comprehensive test cases
├── TESTING_EXECUTION_GUIDE.md        # Test execution instructions
├── TEST_IMPLEMENTATION_SUMMARY.md    # Test implementation status
└── IMPLEMENTATION_STATUS.md          # Project status tracker
```

### Data Flow

```
User Input → API Route → Database (Prisma) → State (Zustand) → UI Components
                ↓
            OpenAI GPT-4 (AI Processing)
                ↓
            Structured Resume Data
```

---

## 🛠️ Technology Stack

### Frontend Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router, Server Components, and API Routes
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[React 18](https://react.dev/)** - UI library with concurrent features

### Styling & UI
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Framer Motion 11](https://www.framer.com/motion/)** - Production-ready animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon set

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight, performant state management
- **React Hooks** - Built-in state and effect management

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM with type safety
- **[PostgreSQL](https://www.postgresql.org/)** - Robust, ACID-compliant relational database
- **Next.js API Routes** - Serverless API endpoints

### AI & Machine Learning
- **[OpenAI GPT-4](https://openai.com/)** - Advanced language model for:
  - Resume content generation
  - Intelligent rewriting
  - Skills extraction
  - Resume review and scoring

### Document Processing
- **[pdf-parse](https://www.npmjs.com/package/pdf-parse)** - PDF text extraction
- **[mammoth](https://www.npmjs.com/package/mammoth)** - DOCX to HTML/text conversion
- **[axios](https://axios-http.com/)** - HTTP client for LinkedIn scraping
- **[cheerio](https://cheerio.js.org/)** - Fast, flexible HTML parsing

### Utilities
- **[clsx](https://www.npmjs.com/package/clsx)** - Conditional className construction
- **[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)** - Merge Tailwind classes without conflicts
- **[class-variance-authority](https://cva.style/docs)** - Component variant management

---

## 🔑 Environment Configuration

Create a `.env` file in the project root:

```env
# ============================================
# DATABASE CONFIGURATION
# ============================================
# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Example: postgresql://postgres:password@localhost:5432/resume_builder
DATABASE_URL="postgresql://user:password@localhost:5432/resume_builder"

# ============================================
# OPENAI API CONFIGURATION
# ============================================
# Get your API key from: https://platform.openai.com/api-keys
# Required for all AI features (generation, rewriting, review)
OPENAI_API_KEY="sk-proj-..."

# ============================================
# APPLICATION CONFIGURATION
# ============================================
# Public URL of your application (optional, used for absolute URLs)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Node environment (development, production, test)
NODE_ENV="development"

# ============================================
# OPTIONAL: FUTURE FEATURES
# ============================================
# Rate Limiting (to be implemented)
# RATE_LIMIT_MAX_REQUESTS=100
# RATE_LIMIT_WINDOW_MS=900000

# Error Monitoring (Sentry)
# SENTRY_DSN=""
# SENTRY_AUTH_TOKEN=""

# Analytics
# NEXT_PUBLIC_GA_ID=""
# NEXT_PUBLIC_MIXPANEL_TOKEN=""
```

### Environment Variable Descriptions

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string for Prisma |
| `OPENAI_API_KEY` | ✅ Yes | OpenAI API key for GPT-4 features |
| `NEXT_PUBLIC_APP_URL` | ⚠️ Optional | Public URL (used for absolute links) |
| `NODE_ENV` | ⚠️ Optional | Environment mode (auto-set by Next.js) |

---

## 📝 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm run start

# Run ESLint for code quality
npm run lint
```

### Database Management

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create and apply a new migration
npx prisma migrate dev --name <migration_name>

# Apply migrations in production
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio

# Seed database (if seed script exists)
npx prisma db seed
```

### Testing (To Be Implemented)

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

---

## 📚 Documentation

### Core Documentation
- **[README.md](README.md)** - This file (project overview, setup, architecture)
- **[TESTING.md](TESTING.md)** - Comprehensive test cases for all features
- **[TESTING_EXECUTION_GUIDE.md](TESTING_EXECUTION_GUIDE.md)** - Step-by-step testing instructions
- **[TEST_IMPLEMENTATION_SUMMARY.md](TEST_IMPLEMENTATION_SUMMARY.md)** - Test implementation status
- **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** - Feature completion tracker
- **[QUICKSTART.md](QUICKSTART.md)** - Quick setup and deployment guide

### API Documentation

#### Session Management

**Create Session**
```typescript
POST /api/session/create
Body: { mode: 'manual' | 'upload' | 'prompt' | 'linkedin' | 'chatbot' }
Response: { sessionId: string }
```

**Get Session**
```typescript
GET /api/session?sessionId=<uuid>
Response: { id, mode, structuredData, createdAt, updatedAt }
```

**Update Session**
```typescript
PATCH /api/session/update
Body: { sessionId: string, structuredData: ResumeStructuredData }
Response: { success: boolean }
```

#### AI Endpoints

**Generate from Prompt**
```typescript
POST /api/generateFromPrompt
Body: { prompt: string }
Response: { sessionId: string, structuredData: ResumeStructuredData }
```

**AI Review**
```typescript
POST /api/ai/reviewResume
Body: { sessionId: string }
Response: { review: { score, summary, strengths, weaknesses, tips } }
```

**AI Rewrite**
```typescript
POST /api/ai/genericRewrite
Body: { text: string, context?: string }
Response: { rewrittenText: string }
```

---

## 🧪 Testing

### Test Coverage

See **[TESTING.md](TESTING.md)** for comprehensive test cases including:

✅ **Landing Page** - Navigation, responsiveness, SEO  
✅ **Start Flow** - All 5 creation modes (Manual, Upload, Prompt, LinkedIn, Chatbot)  
✅ **Editor** - Real-time editing, AI features, validation  
✅ **Templates** - Rendering, customization, responsiveness  
✅ **AI Review** - Scoring, feedback generation  
✅ **Export** - PDF and DOCX generation  
✅ **Negative Tests** - Error handling, edge cases  

### Running Tests

```bash
# Manual testing checklist
# Follow TESTING_EXECUTION_GUIDE.md

# Automated tests (to be implemented)
npm run test
npm run test:e2e
```

---

## 🎨 Design System

### Design Philosophy

**Apple-Inspired Aesthetics**
- **Minimalism** - Clean, uncluttered interfaces with purposeful whitespace
- **Premium Quality** - High-quality typography, smooth animations, attention to detail
- **Responsive** - Seamless experience across desktop, tablet, and mobile
- **Accessible** - WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly

### Color Palette

```css
/* Primary Colors */
--primary: #000000      /* Black */
--secondary: #FFFFFF    /* White */

/* Neutral Shades (Zinc) */
--zinc-50: #FAFAFA
--zinc-100: #F4F4F5
--zinc-200: #E4E4E7
--zinc-300: #D4D4D8
--zinc-400: #A1A1AA
--zinc-500: #71717A
--zinc-600: #52525B
--zinc-700: #3F3F46
--zinc-800: #27272A
--zinc-900: #18181B

/* Customizable (User-selectable) */
--template-primary: var(--user-primary-color)
--template-accent: var(--user-accent-color)
```

### Typography

**Font Family**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

**Font Scales**:
- **Small**: Base 14px, Headings 16-24px
- **Medium**: Base 16px, Headings 18-28px (default)
- **Large**: Base 18px, Headings 20-32px

**Line Heights**: Optimized for readability (1.5 for body, 1.2 for headings)

### Spacing & Density

**Comfortable** (default)
- Section spacing: 24px
- Entry spacing: 16px
- Line height: 1.6

**Cozy**
- Section spacing: 20px
- Entry spacing: 12px
- Line height: 1.5

**Compact**
- Section spacing: 16px
- Entry spacing: 8px
- Line height: 1.4

---

## 🔒 Security

### Implemented Security Measures

✅ **Input Sanitization** - All user input sanitized before processing  
✅ **XSS Prevention** - React's built-in escaping + custom sanitization  
✅ **SQL Injection Protection** - Prisma's parameterized queries  
✅ **Environment Security** - Secrets stored in `.env` (not committed)  
✅ **HTTPS Enforcement** - Automatic in production (Vercel)  
✅ **CORS Configuration** - Restricted to allowed origins  

### Planned Security Features

⏳ **Rate Limiting** - Prevent API abuse  
⏳ **CSRF Protection** - Token-based validation  
⏳ **API Key Rotation** - Regular key updates  
⏳ **Content Security Policy** - XSS mitigation headers  
⏳ **Dependency Audits** - Regular `npm audit` checks  

### Security Best Practices

```bash
# Regular security audits
npm audit
npm audit fix

# Update dependencies
npm update

# Check for known vulnerabilities
npx snyk test
```

---

## 🚢 Deployment

### Vercel (Recommended)

**Why Vercel?**
- Optimized for Next.js
- Automatic HTTPS and CDN
- Zero-config deployment
- Built-in analytics

**Deployment Steps:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Environment Variables** (set in Vercel Dashboard):
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key

**Database Setup:**
- Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or external provider
- Run migrations: `npx prisma migrate deploy`

### Alternative Platforms

#### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Advantages**: Built-in PostgreSQL, easy setup

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**Note**: Requires external database (e.g., Supabase, Neon)

#### AWS (EC2 + RDS)

**Setup:**
1. Launch EC2 instance (Ubuntu 22.04)
2. Create RDS PostgreSQL database
3. Install Node.js and dependencies
4. Configure environment variables
5. Use PM2 for process management
6. Set up Nginx reverse proxy

#### DigitalOcean App Platform

**Setup:**
1. Connect GitHub repository
2. Configure build settings
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

---

## 📊 Implementation Status

### Feature Completion

| Feature | Status | Completion |
|---------|--------|------------|
| Landing Page | ✅ Complete | 100% |
| Start Flow (5 Modes) | ✅ Complete | 100% |
| Resume Editor | ✅ Complete | 100% |
| Template Engine | ✅ Complete | 100% |
| AI Review | ✅ Complete | 100% |
| PDF Export | ⚠️ In Progress | 80% |
| DOCX Export | ⚠️ In Progress | 80% |

**Overall Project Completion**: **95%**

See **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** for detailed breakdown.

---

## 🗺️ Roadmap

### v1.0 (Current - November 2025)

✅ Landing page with Apple-inspired design  
✅ 5 resume creation modes (Manual, Upload, Prompt, LinkedIn, Chatbot)  
✅ Real-time resume editor with AI assistance  
✅ 3 professional templates (Minimal, Classic, Two-Column)  
✅ AI-powered resume review and scoring  
⚠️ PDF/DOCX export (in progress)  

### v1.1 (Q1 2026)

🔜 User authentication (email/password, OAuth)  
🔜 Resume versioning and history  
🔜 Additional templates (Modern, Executive, Creative)  
🔜 Cover letter generator  
🔜 Resume sharing (public links)  
🔜 Analytics dashboard  

### v2.0 (Q2-Q3 2026)

🔮 Dark mode support  
🔮 Multi-language support (Spanish, French, German)  
🔮 Collaborative editing (real-time)  
🔮 Job application tracking  
🔮 Interview preparation tools  
🔮 LinkedIn auto-apply integration  
🔮 ATS optimization score  
🔮 Mobile app (React Native)  

---

## 💡 Best Practices & Tips

### Creating an Effective Resume

**Content Guidelines:**
1. **Be Specific** - Use concrete numbers and measurable achievements
   - ❌ "Improved sales performance"
   - ✅ "Increased sales by 35% ($2M) in Q3 2024"

2. **Use Action Verbs** - Start bullet points with strong verbs
   - Led, Achieved, Implemented, Designed, Optimized, Launched

3. **Tailor Content** - Customize for each job application
   - Match keywords from job description
   - Highlight relevant experience

4. **Keep It Concise** - 1-2 pages maximum
   - Junior (0-5 years): 1 page
   - Senior (5+ years): 1-2 pages

5. **Proofread** - Use AI review to catch issues
   - Grammar and spelling
   - Consistency in formatting
   - Clarity and conciseness

### Using AI Features Effectively

**Prompt Mode:**
- Provide detailed information (roles, companies, achievements)
- Include dates and specific metrics
- Mention target industry/role

**AI Rewrite:**
- Give context about the role you're targeting
- Specify tone (professional, creative, technical)
- Review and edit AI suggestions

**AI Review:**
- Take suggestions seriously, but use judgment
- Focus on high-impact changes first
- Re-review after major edits

**Skills Generation:**
- Let AI suggest based on experience
- Verify accuracy and relevance
- Remove outdated or irrelevant skills

### Template Selection Guide

| Template | Best For | Industries |
|----------|----------|------------|
| **Minimal** | Tech, Creative, Startups | Software, Design, Marketing |
| **Classic** | Traditional, Corporate | Finance, Law, Healthcare |
| **Two-Column** | Experienced, Multi-skilled | Consulting, Management, Sales |

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/exterview-resume-builder.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow code style guidelines
   - Add tests for new features
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature: description'
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference related issues
   - Add screenshots (if UI changes)

### Code Style Guidelines

- **TypeScript** - Use TypeScript for all new code
- **ESLint** - Follow ESLint rules (`npm run lint`)
- **Formatting** - Use Prettier (auto-format on save)
- **Naming Conventions**:
  - Components: PascalCase (`ResumeEditor.tsx`)
  - Functions: camelCase (`generateResume()`)
  - Constants: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Comments** - Add JSDoc comments for complex functions
- **Commit Messages** - Use conventional commits format

### Areas for Contribution

🐛 **Bug Fixes** - Check GitHub Issues  
✨ **New Features** - Propose in Discussions  
📝 **Documentation** - Improve README, add examples  
🎨 **Design** - New templates, UI improvements  
🧪 **Testing** - Add unit/integration/E2E tests  
♿ **Accessibility** - Improve WCAG compliance  

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Exterview

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

This project wouldn't be possible without these amazing technologies and communities:

- **[OpenAI](https://openai.com/)** - GPT-4 API powering intelligent features
- **[Vercel](https://vercel.com/)** - Next.js framework and seamless hosting
- **[Shadcn](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

Special thanks to the open-source community for continuous inspiration and support.

---

## 📞 Support & Contact

### Get Help

- **📖 Documentation** - Check this README and `/docs` folder
- **🐛 Bug Reports** - [GitHub Issues](https://github.com/yourusername/exterview-resume-builder/issues)
- **💡 Feature Requests** - [GitHub Discussions](https://github.com/yourusername/exterview-resume-builder/discussions)
- **📧 Email** - support@exterview.com
- **💬 Discord** - [Join our community](#) (coming soon)
- **🐦 Twitter** - [@Exterview](#) (coming soon)

### Response Times

- **Critical Bugs** - Within 24 hours
- **Feature Requests** - Within 1 week
- **General Questions** - Within 3 days

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/exterview-resume-builder?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/exterview-resume-builder?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/exterview-resume-builder)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/exterview-resume-builder)

---

<div align="center">

**Built with ❤️ by the Exterview Team**

**Version**: 1.0.0  
**Last Updated**: November 2025

[⬆ Back to Top](#exterview---ai-powered-resume-builder)

</div>
