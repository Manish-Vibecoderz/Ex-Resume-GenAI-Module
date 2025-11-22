# Manual Testing Execution Guide

**Purpose**: Step-by-step instructions for manually testing all features  
**Time Required**: ~2-3 hours for complete testing  
**Prerequisites**: Application running locally on http://localhost:3000

---

## 🎯 Testing Workflow

### Before You Start

1. **Set Up Test Environment**
   ```bash
   # Ensure dev server is running
   npm run dev
   
   # Open Prisma Studio to monitor database
   npx prisma studio
   
   # Open browser DevTools (F12)
   # - Console tab for errors
   # - Network tab for API calls
   # - Application tab for localStorage
   ```

2. **Prepare Test Data**
   - Sample PDF resume (< 5MB)
   - Sample DOCX resume (< 5MB)
   - LinkedIn profile URL (your own or public)
   - Test prompt text

3. **Create Testing Checklist**
   - Print or open this document
   - Check off items as you test
   - Note any bugs in separate document

---

## TEST SUITE 1: Landing Page (15 minutes)

### 1.1 Initial Load
- [ ] Navigate to http://localhost:3000
- [ ] Check console for errors (should be 0)
- [ ] Verify page loads in < 2 seconds
- [ ] All images load correctly
- [ ] Fonts render correctly (Inter)

### 1.2 Hero Section
- [ ] Headline is visible and readable
- [ ] Subheadline is visible
- [ ] "Get Started" button is present
- [ ] Button has hover effect
- [ ] Click "Get Started" → redirects to `/start`

### 1.3 Sections
- [ ] "How It Works" section displays
- [ ] Features section displays
- [ ] Footer displays with all links
- [ ] All section animations work

### 1.4 Responsive Design
- [ ] Resize browser to mobile width (375px)
- [ ] Verify no horizontal scroll
- [ ] All content is readable
- [ ] Navigation works on mobile
- [ ] Test on actual mobile device (optional)

### 1.5 Accessibility
- [ ] Tab through all interactive elements
- [ ] Focus rings are visible
- [ ] Press Enter on "Get Started" button
- [ ] Check with screen reader (optional)

### 1.6 SEO
- [ ] View page source
- [ ] Verify `<title>` tag exists
- [ ] Verify `<meta name="description">` exists
- [ ] Check Open Graph tags (og:title, og:description)

**Expected Result**: All checkboxes checked, 0 console errors

---

## TEST SUITE 2: Start Flow - Manual Mode (10 minutes)

### 2.1 Navigate to Start
- [ ] Click "Get Started" from landing page
- [ ] Verify URL is `/start`
- [ ] See 5 mode cards displayed

### 2.2 Manual Mode
- [ ] Click "Create Manually" card
- [ ] See loading spinner
- [ ] Redirect to `/editor?sessionId=<uuid>`
- [ ] Verify sessionId is valid UUID format

### 2.3 Editor Loads
- [ ] Editor page loads
- [ ] Left panel shows empty form
- [ ] Right panel shows empty preview
- [ ] No console errors

### 2.4 Database Verification
- [ ] Open Prisma Studio
- [ ] Navigate to ResumeSession table
- [ ] Find the new session
- [ ] Verify `mode` = "manual"
- [ ] Verify `structuredData` = {}

**Expected Result**: Session created, editor loads with empty state

---

## TEST SUITE 3: Start Flow - Upload Mode (20 minutes)

### 3.1 Navigate to Upload
- [ ] Go to `/start`
- [ ] Click "Upload Resume" card
- [ ] Verify URL is `/start/upload`

### 3.2 File Upload UI
- [ ] See upload dropzone
- [ ] Hover over dropzone (border changes)
- [ ] See "Click or drag file to upload" text

### 3.3 Upload PDF (Positive)
- [ ] Click dropzone or drag PDF file
- [ ] See file name and size display
- [ ] Click "Upload & Continue"
- [ ] See "Processing..." loading state
- [ ] Wait for redirect to `/editor?sessionId=<uuid>`

### 3.4 Verify Extraction
- [ ] Check if personal details populated
- [ ] Check if experience entries populated
- [ ] Check if education entries populated
- [ ] Check if skills populated
- [ ] Verify preview shows extracted data

### 3.5 Upload DOCX (Positive)
- [ ] Go back to `/start/upload`
- [ ] Upload DOCX file
- [ ] Verify extraction works
- [ ] Verify redirect to editor

### 3.6 Invalid File Type (Negative)
- [ ] Go to `/start/upload`
- [ ] Try to upload JPG or PNG
- [ ] Verify error message: "Please upload a PDF or DOCX file"
- [ ] Verify no redirect occurs

### 3.7 Oversized File (Negative)
- [ ] Try to upload file > 5MB
- [ ] Verify error message: "File size exceeds 5MB limit"

### 3.8 Empty File (Negative)
- [ ] Create empty PDF (0 bytes)
- [ ] Try to upload
- [ ] Verify error message

**Expected Result**: PDF and DOCX parse correctly, invalid files rejected

---

## TEST SUITE 4: Start Flow - Prompt Mode (15 minutes)

### 4.1 Navigate to Prompt
- [ ] Go to `/start`
- [ ] Click "Generate with AI" card
- [ ] Verify URL is `/start/prompt`

### 4.2 Prompt UI
- [ ] See textarea for prompt
- [ ] See info card with instructions
- [ ] "Generate Resume" button is disabled (empty input)

### 4.3 Enter Prompt (Positive)
- [ ] Type: "I am a software engineer with 5 years of experience at Google. I worked on search algorithms and led a team of 5 engineers."
- [ ] Verify button is now enabled
- [ ] Click "Generate Resume"
- [ ] See "Generating Draft..." loading state
- [ ] Wait for redirect (may take 10-30 seconds)

### 4.4 Verify AI Generation
- [ ] Check editor loads
- [ ] Verify personal details inferred
- [ ] Verify experience entry created
- [ ] Verify skills generated
- [ ] Check preview renders

### 4.5 Empty Prompt (Negative)
- [ ] Go to `/start/prompt`
- [ ] Leave textarea empty
- [ ] Verify button is disabled

### 4.6 Very Short Prompt (Edge Case)
- [ ] Enter: "Software engineer"
- [ ] Click "Generate Resume"
- [ ] Verify AI still generates something

### 4.7 Very Long Prompt (Edge Case)
- [ ] Paste 3000+ character text
- [ ] Click "Generate Resume"
- [ ] Verify AI processes it

**Expected Result**: AI generates structured resume from prompt

---

## TEST SUITE 5: Start Flow - LinkedIn Mode (15 minutes)

### 5.1 Navigate to LinkedIn
- [ ] Go to `/start`
- [ ] Click "Import LinkedIn" card
- [ ] Verify URL is `/start/linkedin`

### 5.2 LinkedIn UI
- [ ] See LinkedIn icon
- [ ] See URL input field
- [ ] "Import Profile" button is disabled

### 5.3 Valid URL (Positive)
- [ ] Enter: "https://www.linkedin.com/in/satyanadella"
- [ ] Click "Import Profile"
- [ ] See "Importing Profile..." loading state
- [ ] Wait for redirect (may take 20-40 seconds)

### 5.4 Verify Import
- [ ] Check if data extracted
- [ ] Note: May use fallback/mock data if scraping blocked

### 5.5 Invalid URL (Negative)
- [ ] Go to `/start/linkedin`
- [ ] Enter: "not-a-url"
- [ ] Click "Import Profile"
- [ ] Verify error: "Please enter a valid LinkedIn profile URL"

### 5.6 Non-LinkedIn URL (Negative)
- [ ] Enter: "https://google.com"
- [ ] Verify error message

**Expected Result**: Valid LinkedIn URLs processed (may use fallback)

---

## TEST SUITE 6: Start Flow - Chatbot Mode (20 minutes)

### 6.1 Navigate to Chatbot
- [ ] Go to `/start`
- [ ] Click "Chat with AI" card
- [ ] Verify URL is `/start/chatbot`

### 6.2 Chat UI
- [ ] See initial bot message
- [ ] See input field at bottom
- [ ] See send button

### 6.3 Conversation Flow (Positive)
- [ ] Type your name, press Enter
- [ ] Wait for bot response
- [ ] Answer next question
- [ ] Continue conversation (5-10 messages)
- [ ] Eventually bot should finish and redirect

### 6.4 Verify Resume Built
- [ ] Check editor loads with chat-derived data
- [ ] Verify personal details filled
- [ ] Verify experience entries created

### 6.5 Empty Message (Negative)
- [ ] Try to send empty message
- [ ] Verify button is disabled

### 6.6 Long Message (Edge Case)
- [ ] Type 500-word answer
- [ ] Verify chat displays correctly

**Expected Result**: Chatbot conversation builds resume

---

## TEST SUITE 7: Resume Editor (30 minutes)

### 7.1 Load Editor
- [ ] Create manual resume or use existing session
- [ ] Verify editor loads
- [ ] See left panel (form) and right panel (preview)

### 7.2 Personal Details
- [ ] Enter full name → preview updates
- [ ] Enter email → preview updates
- [ ] Enter phone → preview updates
- [ ] Enter location → preview updates
- [ ] Enter LinkedIn URL → preview updates
- [ ] Enter website URL → preview updates

### 7.3 Summary Section
- [ ] Enter professional summary
- [ ] Verify preview updates
- [ ] Click "Rewrite with AI" (if implemented)
- [ ] Verify AI rewrites summary

### 7.4 Experience Section
- [ ] Click "Add Experience"
- [ ] Fill in job title, company, dates
- [ ] Enter description
- [ ] Verify preview shows new entry
- [ ] Click "Rewrite with AI" on description
- [ ] Verify AI improves description
- [ ] Add second experience entry
- [ ] Try to reorder entries (drag-and-drop)
- [ ] Delete an entry

### 7.5 Education Section
- [ ] Click "Add Education"
- [ ] Fill in degree, school, dates
- [ ] Verify preview updates
- [ ] Add second education entry
- [ ] Delete an entry

### 7.6 Skills Section
- [ ] Add skill: "JavaScript"
- [ ] Add skill: "React"
- [ ] Add skill: "Node.js"
- [ ] Verify preview shows skills
- [ ] Delete a skill
- [ ] Click "Generate Skills" (if implemented)

### 7.7 Projects Section (if implemented)
- [ ] Add project
- [ ] Fill in name, description, URL
- [ ] Verify preview updates

### 7.8 Auto-save
- [ ] Edit any field
- [ ] Wait 3 seconds
- [ ] Check Network tab for PATCH request
- [ ] Verify "Saved" indicator (if implemented)
- [ ] Refresh page
- [ ] Verify changes persisted

### 7.9 Real-time Preview
- [ ] Type in any field
- [ ] Verify preview updates as you type (debounced)
- [ ] No lag or errors

### 7.10 Error Handling
- [ ] Disconnect internet
- [ ] Try to edit field
- [ ] Verify error message on save failure
- [ ] Reconnect internet
- [ ] Verify retry works

**Expected Result**: All editor features work, autosave persists data

---

## TEST SUITE 8: Template & Theme Engine (20 minutes)

### 8.1 Navigate to Design
- [ ] From editor, navigate to `/design?sessionId=<your-session-id>`
- [ ] Verify design page loads
- [ ] See template options
- [ ] See theme controls

### 8.2 Template Switching
- [ ] Select "Minimal" template
- [ ] Verify preview updates instantly
- [ ] Select "Classic" template
- [ ] Verify preview changes
- [ ] Select "Two-Column" template
- [ ] Verify layout changes

### 8.3 Color Customization
- [ ] Change primary color to blue
- [ ] Verify preview updates
- [ ] Change accent color to gray
- [ ] Verify preview updates

### 8.4 Font Scale
- [ ] Select "Small" font scale
- [ ] Verify text size decreases
- [ ] Select "Large" font scale
- [ ] Verify text size increases

### 8.5 Density Control
- [ ] Select "Compact" density
- [ ] Verify spacing decreases
- [ ] Select "Comfortable" density
- [ ] Verify spacing increases

### 8.6 Profile Photo Toggle
- [ ] Toggle "Show Profile Photo" on
- [ ] Verify placeholder appears (if no photo)
- [ ] Toggle off
- [ ] Verify photo disappears

### 8.7 Persistence
- [ ] Make several design changes
- [ ] Navigate away
- [ ] Return to `/design?sessionId=<same-id>`
- [ ] Verify all settings restored

### 8.8 Editor Integration
- [ ] Make design changes
- [ ] Navigate to `/editor?sessionId=<same-id>`
- [ ] Verify preview uses selected template

**Expected Result**: All design controls work, settings persist

---

## TEST SUITE 9: AI Review (15 minutes)

### 9.1 Navigate to Review
- [ ] From editor, navigate to `/review?sessionId=<your-session-id>`
- [ ] Verify review page loads

### 9.2 Generate Review
- [ ] Click "Generate Review" button
- [ ] See loading state
- [ ] Wait for AI response (10-30 seconds)

### 9.3 Review Display
- [ ] Verify overall score displays (0-100)
- [ ] Verify score is reasonable
- [ ] See summary text
- [ ] See strengths list (3-5 items)
- [ ] See weaknesses list (3-5 items)
- [ ] See tips list (3-5 items)

### 9.4 Review Quality
- [ ] Read strengths - are they accurate?
- [ ] Read weaknesses - are they helpful?
- [ ] Read tips - are they actionable?

### 9.5 Regenerate Review
- [ ] Click "Regenerate Review"
- [ ] Verify new review generated
- [ ] Compare to previous (should be different)

### 9.6 Change Detection
- [ ] Generate review
- [ ] Navigate to editor
- [ ] Make changes to resume
- [ ] Return to review page
- [ ] Verify warning to regenerate (if implemented)

### 9.7 Preview Integration
- [ ] Verify right panel shows resume preview
- [ ] Verify preview is read-only

**Expected Result**: AI generates helpful review with score and suggestions

---

## TEST SUITE 10: Download (15 minutes)

### 10.1 PDF Download
- [ ] Navigate to `/download/pdf?sessionId=<your-session-id>`
- [ ] Verify PDF starts downloading
- [ ] Open PDF file
- [ ] Verify all sections present
- [ ] Verify formatting matches preview
- [ ] Verify fonts render correctly
- [ ] Check for any layout issues

### 10.2 DOCX Download
- [ ] Navigate to `/download/docx?sessionId=<your-session-id>`
- [ ] Verify DOCX starts downloading
- [ ] Open DOCX in Microsoft Word
- [ ] Verify all sections present
- [ ] Verify basic formatting preserved
- [ ] Check for any issues

### 10.3 Template Consistency
- [ ] Change template in `/design`
- [ ] Download PDF
- [ ] Verify PDF uses selected template

### 10.4 Cross-Browser Testing
- [ ] Test download in Chrome
- [ ] Test download in Safari
- [ ] Test download in Firefox
- [ ] Verify all work correctly

### 10.5 Mobile Download (Optional)
- [ ] Open on mobile device
- [ ] Try to download PDF
- [ ] Verify download or share sheet appears

### 10.6 Error Handling
- [ ] Try `/download/pdf` without sessionId
- [ ] Verify error message or redirect
- [ ] Try with invalid sessionId
- [ ] Verify error handling

**Expected Result**: PDF and DOCX download correctly with all content

---

## TEST SUITE 11: End-to-End Flows (45 minutes)

### 11.1 E2E Flow: Manual → Download
- [ ] Start from landing page
- [ ] Click "Get Started"
- [ ] Select "Create Manually"
- [ ] Fill in all sections in editor
- [ ] Navigate to `/design`
- [ ] Customize template and colors
- [ ] Navigate to `/review`
- [ ] Generate AI review
- [ ] Download PDF
- [ ] Download DOCX
- [ ] Verify entire flow works

### 11.2 E2E Flow: Upload → Download
- [ ] Start from `/start`
- [ ] Upload PDF resume
- [ ] Edit extracted data in editor
- [ ] Customize design
- [ ] Generate review
- [ ] Download PDF
- [ ] Verify flow works

### 11.3 E2E Flow: Prompt → Download
- [ ] Start from `/start/prompt`
- [ ] Enter detailed prompt
- [ ] Edit AI-generated resume
- [ ] Customize design
- [ ] Generate review
- [ ] Download PDF
- [ ] Verify flow works

### 11.4 E2E Flow: LinkedIn → Download
- [ ] Start from `/start/linkedin`
- [ ] Import LinkedIn profile
- [ ] Edit imported data
- [ ] Customize design
- [ ] Generate review
- [ ] Download PDF
- [ ] Verify flow works

### 11.5 E2E Flow: Chatbot → Download
- [ ] Start from `/start/chatbot`
- [ ] Complete conversation
- [ ] Edit generated resume
- [ ] Customize design
- [ ] Generate review
- [ ] Download PDF
- [ ] Verify flow works

**Expected Result**: All 5 E2E flows complete successfully

---

## TEST SUITE 12: Error Scenarios (30 minutes)

### 12.1 Network Errors
- [ ] Start editing resume
- [ ] Disconnect internet
- [ ] Try to save
- [ ] Verify error message
- [ ] Reconnect internet
- [ ] Verify retry works

### 12.2 Invalid Session
- [ ] Navigate to `/editor?sessionId=invalid-uuid`
- [ ] Verify redirect to `/start` or error page

### 12.3 Missing Session
- [ ] Navigate to `/editor` without sessionId
- [ ] Verify redirect to `/start`

### 12.4 Corrupted Data
- [ ] (Advanced) Manually corrupt session data in DB
- [ ] Try to load editor
- [ ] Verify graceful fallback

### 12.5 API Failures
- [ ] (Advanced) Mock AI API failure
- [ ] Try to generate review
- [ ] Verify error handling

### 12.6 Large Content
- [ ] Add 50+ experience entries
- [ ] Verify editor doesn't crash
- [ ] Verify preview renders (may be slow)
- [ ] Verify PDF generates

### 12.7 Rapid Actions
- [ ] Rapidly click "Add Experience" 10 times
- [ ] Verify no crashes
- [ ] Rapidly switch templates
- [ ] Verify no errors

**Expected Result**: All errors handled gracefully, no crashes

---

## 📊 Test Results Template

After completing all tests, fill out this summary:

### Overall Results
- **Total Test Cases**: ___
- **Passed**: ___
- **Failed**: ___
- **Blocked**: ___
- **Pass Rate**: ___%

### Critical Issues Found
1. 
2. 
3. 

### High Priority Issues
1. 
2. 
3. 

### Medium Priority Issues
1. 
2. 
3. 

### Low Priority Issues
1. 
2. 
3. 

### Browser Compatibility
- [ ] Chrome - All tests pass
- [ ] Safari - All tests pass
- [ ] Firefox - All tests pass
- [ ] Edge - All tests pass

### Device Compatibility
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Performance Notes
- Average page load time: ___ seconds
- Average API response time: ___ ms
- Any lag or jank: ___

### Recommendations
1. 
2. 
3. 

---

## 🐛 Bug Report Template

For each bug found, create a report:

```markdown
### Bug #___: [Title]

**Severity**: Critical / High / Medium / Low

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**:


**Actual Behavior**:


**Screenshots**:
[Attach if applicable]

**Environment**:
- Browser: 
- OS: 
- Screen size: 

**Console Errors**:
```
[Paste any console errors]
```

**Additional Notes**:

```

---

## ✅ Sign-Off

After completing all tests:

**Tester Name**: _______________  
**Date**: _______________  
**Time Spent**: ___ hours  
**Overall Assessment**: Pass / Fail / Conditional Pass  

**Ready for Production?**: Yes / No / With Fixes  

**Signature**: _______________

---

**Testing Guide Version**: 1.0  
**Last Updated**: November 2025
