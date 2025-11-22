# Quick Start Guide - Exterview Resume Builder

This guide will help you get the application running locally in under 10 minutes.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **PostgreSQL** database ([Download](https://www.postgresql.org/download/) or use [Supabase](https://supabase.com/))
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

---

## Step 1: Clone and Install

```bash
# Clone the repository (or download the source code)
cd /path/to/project

# Install dependencies
npm install
```

**Expected output**: All dependencies installed successfully

---

## Step 2: Set Up Database

### Option A: Local PostgreSQL

```bash
# Create a new database
createdb resume_builder

# Or using psql
psql -U postgres
CREATE DATABASE resume_builder;
\q
```

### Option B: Supabase (Recommended for beginners)

1. Go to [supabase.com](https://supabase.com/)
2. Create a new project
3. Copy the connection string from Settings → Database
4. Use the "Connection Pooling" URL for better performance

---

## Step 3: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your favorite editor
nano .env  # or vim, code, etc.
```

**Required variables:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/resume_builder"
OPENAI_API_KEY="sk-proj-..."
```

**Tips:**
- For local PostgreSQL: `postgresql://postgres:password@localhost:5432/resume_builder`
- For Supabase: Use the connection pooling URL provided
- OpenAI API key starts with `sk-proj-` or `sk-`

---

## Step 4: Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

**Expected output**: 
- ✓ Prisma Client generated
- ✓ Migration applied successfully
- ✓ Database tables created

---

## Step 5: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 14.2.15
- Local:        http://localhost:3000
- Ready in 2.3s
```

---

## Step 6: Verify Installation

Open your browser and navigate to:

1. **Landing Page**: [http://localhost:3000](http://localhost:3000)
   - Should see the hero section with "Get Started" button

2. **Start Flow**: [http://localhost:3000/start](http://localhost:3000/start)
   - Should see 5 resume creation modes

3. **Test Manual Mode**:
   - Click "Create Manually"
   - Should redirect to `/editor?sessionId=...`
   - Should see empty editor with preview

---

## Troubleshooting

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Database connection fails

**Solution:**
- Check if PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL format
- Ensure database exists: `psql -l`
- Check firewall/network settings

### Issue: Prisma migration fails

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or manually drop and recreate
dropdb resume_builder
createdb resume_builder
npx prisma migrate dev
```

### Issue: OpenAI API errors

**Solution:**
- Verify API key is correct
- Check API key has credits: [platform.openai.com/usage](https://platform.openai.com/usage)
- Ensure no extra spaces in .env file
- Restart dev server after changing .env

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill
```

### Issue: Module not found errors

**Solution:**
```bash
# Ensure all dependencies are installed
npm install

# If using TypeScript, regenerate types
npm run build
```

---

## Testing the Application

### Test Upload Mode

1. Navigate to `/start/upload`
2. Upload a sample PDF resume
3. Verify text extraction works
4. Check if editor populates with data

### Test AI Prompt Mode

1. Navigate to `/start/prompt`
2. Enter: "I am a software engineer with 5 years of experience at Google"
3. Click "Generate Resume"
4. Verify AI generates structured data

### Test Editor

1. Create a manual resume
2. Fill in personal details
3. Add an experience entry
4. Verify preview updates in real-time
5. Wait 3 seconds and check autosave

### Test Templates

1. Navigate to `/design?sessionId=<your-session-id>`
2. Switch between templates
3. Change colors
4. Verify preview updates

---

## Next Steps

### For Development

1. **Read the Documentation**
   - [README.md](./README.md) - Full project overview
   - [TESTING.md](./TESTING.md) - Test cases
   - [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) - Feature status

2. **Explore the Code**
   - Start with `app/page.tsx` (landing page)
   - Check `app/start/` for creation modes
   - Review `components/editor/` for editor logic

3. **Make Changes**
   - All changes hot-reload automatically
   - Check browser console for errors
   - Use React DevTools for debugging

### For Production Deployment

1. **Set up production database**
   - Use managed PostgreSQL (Supabase, Railway, Neon)
   - Run migrations: `npx prisma migrate deploy`

2. **Configure environment variables**
   - Set all required variables in hosting platform
   - Use production OpenAI API key
   - Set NODE_ENV=production

3. **Deploy**
   - Vercel: `vercel`
   - Netlify: `netlify deploy`
   - Railway: `railway up`

4. **Post-deployment**
   - Test all flows in production
   - Monitor error logs
   - Set up analytics

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create and apply migration
npx prisma generate      # Regenerate Prisma Client
npx prisma db push       # Push schema without migration

# Debugging
npm run dev -- --turbo   # Use Turbopack (faster)
NODE_OPTIONS='--inspect' npm run dev  # Enable debugging
```

---

## Getting Help

- **Documentation**: Check README.md and other docs
- **Issues**: Search existing GitHub issues
- **Community**: Join Discord/Slack
- **Support**: Email support@exterview.com

---

## Success Checklist

- [ ] Dependencies installed
- [ ] Database created and connected
- [ ] Environment variables configured
- [ ] Migrations applied successfully
- [ ] Dev server running on localhost:3000
- [ ] Landing page loads without errors
- [ ] Can create a manual resume
- [ ] Editor loads and preview works
- [ ] Autosave triggers after edits

**If all checkboxes are checked, you're ready to develop! 🎉**

---

**Estimated Setup Time**: 5-10 minutes  
**Last Updated**: November 2025
