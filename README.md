# 🌌 CosmosIQ Talent Solutions — Job Portal

**India's Premium AI-Powered Job Platform**  
Built with Hono + TypeScript + Cloudflare Workers

---

## 🚀 Live Portal URLs

| Page | Path |
|---|---|
| 🏠 Home | `/` |
| 💼 Browse Jobs | `/jobs` |
| 🔐 Login | `/login` |
| 📝 Sign Up | `/signup` |
| 🧑‍💼 Job Seeker Dashboard | `/dashboard` |
| 🏢 Employer Dashboard | `/employer` |
| 🧠 Admin Portal | `/admin` |
| ℹ️ About Us | `/about` |
| 📚 Blog | `/blog` |
| 🏢 Companies | `/companies` |
| 📞 Contact | `/contact` |
| 💡 Careers/Hiring | `/careers` |
| 📜 Terms | `/terms` |
| 🔒 Privacy | `/privacy` |
| 🔌 API — Jobs | `/api/jobs` |

---

## ✅ Implemented Features

### 🌐 Public Pages (15+ routes, all 200 OK)
- **Home**: Hero with AI search, Job Categories, Trending Jobs, Featured Employers, How It Works (3-step), AI Matching Banner, Testimonials, Newsletter, CTA
- **Jobs Listing**: Full search with filters (type, category, experience, salary), job cards with Apply, Pagination
- **Companies**: Company directory with industry, location, open jobs
- **Blog**: Featured post, article grid with categories, newsletter
- **About**: Mission/Vision, Stats, Leadership Team, Timeline, Awards
- **Careers**: Employer plans (Starter/Growth/Enterprise), Hiring process, Why CosmosIQ
- **Contact**: Form with captcha, office info, social links
- **Terms & Conditions**: 9 comprehensive sections
- **Privacy Policy**: 8 sections including PDPB 2023 compliance

### 🔐 Authentication
- Login (Email/Password + Google + LinkedIn)
- Signup (Job Seeker / Employer role selection)
- Forgot Password flow
- Password show/hide toggle

### 🧑‍💼 Job Seeker Dashboard
- Profile completion score (72%)
- Stats: Applications, Profile Views, Saved Jobs, Interviews
- Application Tracker (Pending/Shortlisted/Interview/Offer)
- AI Recommended Jobs (with match score %)
- Career Tools (Resume Builder, Skill Assessments, Interview Calendar)
- Sidebar: Profile, Skills, Saved Jobs, Job Alerts

### 🏢 Employer Dashboard
- Stats: Active Jobs, Applicants, Shortlisted, Hired
- Active Job Postings management
- Recent Applicants with AI Match score, Shortlist/Pass actions
- Post New Job form (full fields + document upload)
- Company Profile card
- Applicant trend chart (weekly bar chart)
- Plan info (Premium)

### 🧠 Admin Portal (Dark Theme)
- System stats (5M+ users, ₹1.2Cr MRR)
- User management table with actions
- Job moderation queue (Approve/Reject)
- Platform analytics with weekly trend chart
- System health status monitor
- Admin navigation menu
- Recent activity feed

### 🔌 REST API Endpoints
- `GET /api/jobs` — List/search jobs
- `GET /api/jobs/:id` — Single job details
- `POST /api/newsletter` — Subscribe
- `POST /api/contact` — Contact form

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Hono v4 + TypeScript |
| Runtime | Cloudflare Workers (Edge) |
| Build | Vite + @hono/vite-build |
| Dev Server | Wrangler Pages Dev + PM2 |
| Frontend | TailwindCSS CDN + FontAwesome |
| Fonts | Inter (Google Fonts) |

## 📁 Project Structure

```
src/
├── index.ts              # Main router (15+ routes + API)
├── data/index.ts         # Static demo data (Jobs, Companies, Blog, etc.)
├── components/
│   └── layout.ts         # Shared HTML layout with Navbar + Footer
└── pages/
    ├── home.ts            # Home page (Hero, Categories, Jobs, Testimonials)
    ├── jobs.ts            # Jobs listing + search + filters
    ├── auth.ts            # Login, Signup, Forgot Password
    ├── dashboard.ts       # Job Seeker dashboard
    ├── employer.ts        # Employer dashboard + Job posting form
    ├── misc.ts            # About, Blog, Careers, Contact, Companies, Legal
    └── admin.ts           # Admin portal (dark theme)
```

## 🛠️ Development

```bash
npm run build          # Build production bundle
pm2 start ecosystem.config.cjs  # Start dev server
pm2 logs cosmosiq --nostream    # Check logs
```

## 🚀 Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name cosmosiq-portal
```

---

**© 2025 CosmosIQ Talent Solutions — A Matriye Group Product**  
*Award-winning EdTech & HR Innovation from Pune, India*
