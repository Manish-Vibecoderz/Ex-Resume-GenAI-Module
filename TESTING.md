# AI Resume Builder - Comprehensive Testing Guide

This document outlines all test cases for the AI Resume Builder application, organized by feature and flow.

---

## STEP 1 — LANDING PAGE

### Positive Test Cases

1. ✅ **Page loads with zero errors**
   - Navigate to `/`
   - Check browser console for errors
   - Verify all components render

2. ✅ **Hero section shows headline, subhead, and CTA**
   - Verify headline text is visible
   - Verify subheadline text is visible
   - Verify "Get Started" button is present and clickable

3. ✅ **"Get Started" scrolls or routes to `/start`**
   - Click "Get Started" button
   - Verify navigation to `/start` page

4. ✅ **All sections render properly**
   - Verify Hero section displays
   - Verify "How it Works" section displays
   - Verify Features section displays
   - Verify Footer displays with all links

5. ✅ **Mobile responsive layout works**
   - Test on iPhone 12 (390x844)
   - Test on iPhone 14 Pro Max (430x932)
   - Test on Android (various sizes)
   - Verify no horizontal scroll
   - Verify all content is readable

6. ✅ **All links in footer work correctly**
   - Click each footer link
   - Verify navigation or external link opens

7. ✅ **Fonts, spacing, and black-white theme render correctly**
   - Verify Inter font loads
   - Verify consistent spacing
   - Verify black/white/neutral color scheme

8. ✅ **SEO tags exist**
   - Check `<title>` tag
   - Check `<meta name="description">` tag
   - Check Open Graph tags (og:title, og:description, og:image)

9. ✅ **Landing page performs under 2 seconds on 4G**
   - Use Chrome DevTools Network throttling (Fast 3G)
   - Measure Time to Interactive (TTI)
   - Target: < 2 seconds

10. ✅ **CTA button is accessible**
    - Tab to button using keyboard
    - Verify focus ring is visible
    - Check ARIA labels exist
    - Test with screen reader

### Negative Test Cases

1. ⚠️ **Landing page fails to load scripts**
   - Block JavaScript in browser
   - Verify graceful fallback or error message

2. ⚠️ **Internet offline**
   - Disconnect network
   - Verify native offline message or custom fallback

3. ⚠️ **Missing assets (icons, images)**
   - Block image loading
   - Verify app doesn't break
   - Verify alt text displays

4. ⚠️ **Browser zoom set to 200%**
   - Set browser zoom to 200%
   - Verify layout is still readable
   - Verify no content overflow

5. ⚠️ **User clicks CTA repeatedly**
   - Rapidly click "Get Started" 10 times
   - Verify only one navigation occurs
   - Verify no duplicate sessions created

6. ⚠️ **Ad blockers enabled**
   - Enable uBlock Origin or similar
   - Verify UI still loads completely

7. ⚠️ **Disable JavaScript**
   - Disable JS in browser settings
   - Verify minimal fallback message displays

8. ⚠️ **Incomplete CSS build**
   - Remove Tailwind CSS file
   - Verify HTML structure remains intact

9. ⚠️ **Slow API (SEO pre-render)**
   - Throttle network to Slow 3G
   - Verify hydration doesn't break

10. ⚠️ **Wrong URL parameters appended**
    - Navigate to `/?random=123&test=abc`
    - Verify parameters are ignored safely

---

## STEP 2 — START FLOW (5 MODES)

### MODE 1 — MANUAL

#### Positive Test Cases

1. ✅ **Clicking "Manual" creates a new empty ResumeSession**
   - Click "Create Manually" card
   - Verify API call to `/api/session/create`
   - Verify session created in database

2. ✅ **Redirects to `/editor?sessionId=...`**
   - Verify URL contains `sessionId` parameter
   - Verify sessionId is valid UUID

3. ✅ **Session is stored in DB**
   - Check database for new ResumeSession record
   - Verify `mode` field is "manual"
   - Verify `structuredData` is empty object

4. ✅ **Page loads with empty fields**
   - Verify editor loads
   - Verify all form fields are empty

#### Negative Test Cases

1. ⚠️ **Database write failure**
   - Simulate DB connection error
   - Verify error toast displays
   - Verify user can retry

2. ⚠️ **Missing sessionId during redirect**
   - Manually navigate to `/editor` without sessionId
   - Verify redirect back to `/start`

3. ⚠️ **API returns malformed session**
   - Mock API to return invalid JSON
   - Verify fallback empty state loads

4. ⚠️ **Double-click CTA**
   - Rapidly double-click "Create Manually"
   - Verify only one session is created

---

### MODE 2 — UPLOAD RESUME

#### Positive Test Cases

1. ✅ **Upload PDF → Extracts clean text**
   - Upload valid PDF resume
   - Verify text extraction succeeds
   - Verify extracted text is readable

2. ✅ **Upload DOCX → Extracts clean text**
   - Upload valid DOCX resume
   - Verify text extraction succeeds
   - Verify extracted text is readable

3. ✅ **Parsed fields map correctly into structuredData**
   - Upload resume with all sections
   - Verify personalInfo extracted
   - Verify experience extracted
   - Verify education extracted
   - Verify skills extracted

4. ✅ **Redirect to editor with prefilled content**
   - Verify navigation to `/editor?sessionId=...`
   - Verify form fields are populated

5. ✅ **Large PDFs (up to 5 MB) still parse successfully**
   - Upload 4.9 MB PDF
   - Verify parsing completes
   - Verify no timeout errors

6. ✅ **Includes error banner if parsing incomplete**
   - Upload partially corrupted file
   - Verify editor loads
   - Verify warning banner displays

#### Negative Test Cases

1. ⚠️ **Upload unsupported file (JPG, PNG)**
   - Upload image file
   - Verify validation error displays
   - Verify "Please upload a PDF or DOCX file" message

2. ⚠️ **Upload empty PDF**
   - Upload 0-byte PDF
   - Verify error message displays
   - Verify no redirect occurs

3. ⚠️ **Malformed DOCX**
   - Upload corrupted DOCX file
   - Verify graceful error handling
   - Verify error message to user

4. ⚠️ **File upload cancellation**
   - Start upload, then cancel
   - Verify no errors thrown
   - Verify UI returns to initial state

5. ⚠️ **0 byte file**
   - Upload empty file
   - Verify immediate rejection
   - Verify error message

6. ⚠️ **Backend timeout**
   - Upload file, simulate slow API
   - Verify timeout error after 30s
   - Verify retry button appears

7. ⚠️ **User uploads 50 MB file**
   - Upload oversized file
   - Verify "File size exceeds 5MB limit" error

8. ⚠️ **API extraction returns dirty JSON**
   - Mock API to return malformed JSON
   - Verify sanitization occurs
   - Verify fallback values load

---

### MODE 3 — PROMPT-BASED

#### Positive Test Cases

1. ✅ **User enters text → AI generates structured resume**
   - Enter prompt: "I am a software engineer with 5 years of experience..."
   - Verify API call to `/api/generateFromPrompt`
   - Verify structured data returned

2. ✅ **Missing sections are auto filled**
   - Enter minimal prompt
   - Verify AI infers reasonable defaults

3. ✅ **Redirect to editor**
   - Verify navigation to `/editor?sessionId=...`
   - Verify form populated with AI-generated content

4. ✅ **Prompt under 200 chars still works**
   - Enter short prompt: "Software engineer at Google"
   - Verify resume generates successfully

5. ✅ **Prompt over 2000 chars still accepted**
   - Enter very long prompt (3000 chars)
   - Verify API accepts and processes

#### Negative Test Cases

1. ⚠️ **User submits empty text**
   - Click "Generate Resume" with empty textarea
   - Verify button is disabled
   - Verify validation message

2. ⚠️ **AI returns NULL**
   - Mock OpenAI to return null
   - Verify retry message displays

3. ⚠️ **AI hallucination returns wrong schema**
   - Mock API to return unexpected structure
   - Verify fallback mapping occurs
   - Verify editor still loads

4. ⚠️ **Network failure**
   - Disconnect network mid-request
   - Verify error message displays
   - Verify retry button appears

5. ⚠️ **Multiple rapid submissions**
   - Click "Generate Resume" 5 times rapidly
   - Verify debouncing prevents multiple API calls

---

### MODE 4 — LINKEDIN IMPORT

#### Positive Test Cases

1. ✅ **Valid LinkedIn URL → Page scrapes content**
   - Enter valid LinkedIn profile URL
   - Verify scraping attempt (may use fallback in demo)

2. ✅ **AI extracts sections reliably**
   - Verify personalInfo extracted
   - Verify experience extracted
   - Verify education extracted

3. ✅ **Mapped to structuredData correctly**
   - Verify all fields match schema

4. ✅ **Redirect to editor with filled sections**
   - Verify navigation to `/editor?sessionId=...`
   - Verify form populated

5. ✅ **Handles LinkedIn public profiles AND region-specific variants**
   - Test with linkedin.com/in/username
   - Test with linkedin.com/in/username/en
   - Test with linkedin.com/in/username/de

#### Negative Test Cases

1. ⚠️ **Invalid URL**
   - Enter "not-a-url"
   - Verify validation error: "Please enter a valid LinkedIn profile URL"

2. ⚠️ **Private profile**
   - Enter URL to private profile
   - Verify parsing fails cleanly
   - Verify error message to user

3. ⚠️ **LinkedIn HTML changes**
   - Mock changed HTML structure
   - Verify fallback to AI-based inference

4. ⚠️ **Network timeouts**
   - Simulate slow network
   - Verify timeout after 30s
   - Verify retry option

5. ⚠️ **AI extraction returns partial data**
   - Mock incomplete extraction
   - Verify partial data prefills
   - Verify warning to user

6. ⚠️ **Malicious URL**
   - Enter "javascript:alert(1)"
   - Verify URL sanitization
   - Verify rejection

---

### MODE 5 — CHATBOT Q&A

#### Positive Test Cases

1. ✅ **Chat interface loads**
   - Navigate to `/start/chatbot`
   - Verify chat UI displays
   - Verify initial bot message appears

2. ✅ **Bot asks the correct question sequence**
   - Answer first question
   - Verify bot asks follow-up
   - Verify logical question flow

3. ✅ **User input updates conversation state**
   - Send message
   - Verify message appears in chat
   - Verify conversation history maintained

4. ✅ **AI builds structured resume after enough answers**
   - Complete conversation
   - Verify `/api/ai/buildResumeFromQA` called
   - Verify session created

5. ✅ **Redirects to editor**
   - Verify navigation to `/editor?sessionId=...`
   - Verify form populated with chat-derived data

6. ✅ **Handles long-form text answers smoothly**
   - Enter 500-word answer
   - Verify chat displays correctly
   - Verify no UI breaks

#### Negative Test Cases

1. ⚠️ **AI endpoint failure**
   - Mock API failure
   - Verify error message in chat
   - Verify user can retry

2. ⚠️ **User sends blank messages**
   - Press send with empty input
   - Verify button is disabled
   - Verify no API call made

3. ⚠️ **User tries to skip required fields**
   - Answer "skip" to required question
   - Verify bot guides back

4. ⚠️ **Rapid message spam**
   - Send 10 messages in 1 second
   - Verify debouncing prevents spam
   - Verify only valid messages processed

5. ⚠️ **Session loss**
   - Refresh page mid-conversation
   - Verify conversation state recreated or restarted

---

## STEP 3 — RESUME EDITOR

### Positive Test Cases

1. ✅ **Editor loads with correct session data**
   - Navigate to `/editor?sessionId=<uuid>`
   - Verify API call to `/api/session?sessionId=...`
   - Verify data populates form

2. ✅ **All fields editable**
   - Edit personal details
   - Edit summary
   - Edit experience entries
   - Edit education entries
   - Edit skills
   - Verify all changes reflect in form

3. ✅ **Adding, deleting, reordering sections works**
   - Add new experience entry
   - Delete experience entry
   - Reorder experience entries
   - Verify changes persist

4. ✅ **AI rewrite buttons return updated fields**
   - Click "Rewrite with AI" on summary
   - Verify API call to `/api/ai/summaryWrite`
   - Verify updated text appears

5. ✅ **Preview updates in real time**
   - Edit field in form
   - Verify preview updates immediately

6. ✅ **Autosave triggers API and updates DB**
   - Edit field
   - Wait for autosave (debounced)
   - Verify API call to `/api/session/update`
   - Verify database updated

7. ✅ **Returning to editor restores latest state**
   - Edit resume
   - Navigate away
   - Return to `/editor?sessionId=...`
   - Verify latest changes loaded

8. ✅ **Editing multiple sections quickly does not break preview**
   - Rapidly edit 5 different fields
   - Verify preview updates correctly
   - Verify no race conditions

9. ✅ **Drag-and-drop reorder works across major browsers**
   - Test in Chrome, Safari, Firefox
   - Drag experience entry to new position
   - Verify reorder persists

### Negative Test Cases

1. ⚠️ **Missing or invalid sessionId**
   - Navigate to `/editor` without sessionId
   - Verify redirect to `/start`

2. ⚠️ **structuredData is corrupted**
   - Mock API to return invalid JSON
   - Verify safe empty state loads
   - Verify error message to user

3. ⚠️ **AI rewrite returns empty text**
   - Mock AI to return empty string
   - Verify rejection
   - Verify original text retained

4. ⚠️ **API update fails**
   - Simulate network error on save
   - Verify error toast displays
   - Verify retry option

5. ⚠️ **Preview renderer crashes**
   - Pass malformed data to preview
   - Verify fallback layout displays
   - Verify no white screen

6. ⚠️ **Multiple rapid rewrite clicks**
   - Click "Rewrite" 5 times rapidly
   - Verify queuing/throttling
   - Verify only latest result applies

7. ⚠️ **Editing deeply nested fields**
   - Edit nested project description
   - Verify preview updates
   - Verify no errors

8. ⚠️ **Deleting all experience entries**
   - Delete all experience items
   - Verify editor stays usable
   - Verify preview shows empty state

---

## STEP 4 — TEMPLATE & THEME ENGINE

### Positive Test Cases

1. ✅ **Template selection updates preview instantly**
   - Select "Minimal" template
   - Verify preview updates immediately
   - Select "Classic" template
   - Verify preview updates

2. ✅ **Theme changes (monochrome variants) apply live**
   - Change primary color
   - Verify preview updates
   - Change accent color
   - Verify preview updates

3. ✅ **Font-size / density controls work**
   - Change font scale to "lg"
   - Verify preview text size increases
   - Change density to "compact"
   - Verify spacing decreases

4. ✅ **Presentation saved to DB**
   - Change template
   - Verify API call to `/api/session/presentation`
   - Verify database updated

5. ✅ **Returning to `/design` reloads exact settings**
   - Change settings
   - Navigate away
   - Return to `/design?sessionId=...`
   - Verify settings restored

6. ✅ **Returning to `/editor` uses correct template**
   - Change template in `/design`
   - Navigate to `/editor`
   - Verify preview uses selected template

7. ✅ **Three templates render consistently across screens**
   - Test Minimal, Classic, Two-Column
   - Verify consistent rendering on desktop, tablet, mobile

8. ✅ **Two-column template respects layout rules**
   - Select two-column template
   - Verify left/right column layout
   - Verify content distribution

9. ✅ **No layout shifts when switching templates**
   - Switch between templates rapidly
   - Verify no cumulative layout shift (CLS)

### Negative Test Cases

1. ⚠️ **Invalid templateId**
   - Mock API to return invalid templateId
   - Verify default to "minimal"

2. ⚠️ **Missing presentation field**
   - Load session without presentation
   - Verify auto-create with defaults

3. ⚠️ **API update fails**
   - Simulate network error
   - Verify error toast displays

4. ⚠️ **Extreme font sizes (zoom)**
   - Set font scale to maximum
   - Verify layout doesn't break
   - Verify content remains readable

5. ⚠️ **Switching templates while autosave pending**
   - Edit field
   - Immediately switch template
   - Verify updates queue correctly

6. ⚠️ **Presentation JSON corrupted**
   - Mock corrupted presentation data
   - Verify reset to default

---

## STEP 5 — AI REVIEW + DOWNLOAD

### AI REVIEW

#### Positive Test Cases

1. ✅ **Hitting "Generate Review" triggers AI call**
   - Click "Generate Review"
   - Verify API call to `/api/ai/reviewResume`

2. ✅ **Review produces all fields**
   - Verify `score` (0-100)
   - Verify `summary` text
   - Verify `strengths` array
   - Verify `weaknesses` array
   - Verify `tips` array

3. ✅ **Review saved to DB**
   - Verify review object in `structuredData.review`

4. ✅ **UI displays review sections properly**
   - Verify score card displays
   - Verify strengths list displays
   - Verify weaknesses list displays
   - Verify tips list displays

5. ✅ **Regenerating updates values**
   - Click "Regenerate Review"
   - Verify new review replaces old

6. ✅ **Review reads updated resume data**
   - Edit resume
   - Generate review
   - Verify review reflects changes

7. ✅ **Review card animations load smoothly**
   - Verify fade-in animations
   - Verify no janky transitions

8. ✅ **Score displays correct numeric value**
   - Verify score is between 0-100
   - Verify score matches AI output

9. ✅ **Review prompts user to re-run if resume changed**
   - Generate review
   - Edit resume
   - Verify warning banner appears

#### Negative Test Cases

1. ⚠️ **AI returns invalid JSON**
   - Mock AI to return malformed JSON
   - Verify retry option
   - Verify fallback message

2. ⚠️ **AI returns inconsistent schema**
   - Mock AI to return unexpected fields
   - Verify defensive parsing
   - Verify safe defaults

3. ⚠️ **AI timeout**
   - Simulate slow AI response
   - Verify timeout after 60s
   - Verify retry option

4. ⚠️ **No internet**
   - Disconnect network
   - Verify local error toast

5. ⚠️ **Missing session**
   - Navigate to `/review` without sessionId
   - Verify redirect to `/start`

6. ⚠️ **Review object corrupted**
   - Mock corrupted review data
   - Verify "Regenerate required" message

7. ⚠️ **AI "score" out of range**
   - Mock score of 150
   - Verify clamping to 0-100

---

### DOWNLOAD (PDF / DOCX)

#### Positive Test Cases

1. ✅ **Clicking "Download PDF" generates correct file**
   - Click "Download PDF"
   - Verify PDF file downloads
   - Open PDF, verify content matches preview

2. ✅ **Clicking "Download Word" generates correct DOCX**
   - Click "Download Word"
   - Verify DOCX file downloads
   - Open DOCX, verify content

3. ✅ **PDF layout matches preview exactly**
   - Compare PDF to preview
   - Verify fonts match
   - Verify spacing matches
   - Verify colors match

4. ✅ **Word file contains all sections and formatting**
   - Open DOCX
   - Verify all sections present
   - Verify basic formatting preserved

5. ✅ **File downloads with correct name**
   - Verify filename: "Resume_FirstName_LastName.pdf"

6. ✅ **Export works across Chrome, Edge, Safari**
   - Test download in each browser
   - Verify file integrity

7. ✅ **Export uses latest template and theme**
   - Change template
   - Download PDF
   - Verify PDF uses new template

8. ✅ **Export works on mobile via share/download UI**
   - Test on iOS Safari
   - Test on Android Chrome
   - Verify download or share sheet appears

9. ✅ **PDF fonts and line spacing preserved**
   - Open PDF
   - Verify Inter font (or fallback)
   - Verify line-height matches preview

#### Negative Test Cases

1. ⚠️ **If session is missing**
   - Navigate to `/download/pdf` without sessionId
   - Verify error page or redirect

2. ⚠️ **Malformed structuredData**
   - Mock corrupted data
   - Verify fallback layout used

3. ⚠️ **Template rendering fails**
   - Mock template error
   - Verify default to minimal template

4. ⚠️ **PDF generator timeout**
   - Simulate slow PDF generation
   - Verify timeout message
   - Verify retry option

5. ⚠️ **DOCX generator receives null values**
   - Mock null fields
   - Verify sanitization
   - Verify empty strings used

6. ⚠️ **Browser blocks popups**
   - Enable popup blocker
   - Verify file stream download instead

7. ⚠️ **Download URL tampered**
   - Manually edit URL with invalid sessionId
   - Verify 403 or 404 error

8. ⚠️ **Missing fonts**
   - Block Google Fonts
   - Verify fallback to system sans-serif

9. ⚠️ **Large experience section (>100 bullets)**
   - Create resume with 150 experience items
   - Verify PDF paginates properly

---

## COMPLETE END-TO-END VALIDATION

### Positive E2E Flows

1. ✅ **Start Manual → Editor → Design → Review → Download**
   - Create manual resume
   - Fill all fields in editor
   - Customize in design
   - Generate review
   - Download PDF
   - Verify complete flow works

2. ✅ **Upload Resume → Editor → Design → Review → Download**
   - Upload PDF resume
   - Edit extracted data
   - Customize design
   - Generate review
   - Download PDF

3. ✅ **Prompt Based → Editor → Design → Review → Download**
   - Generate from prompt
   - Edit AI-generated content
   - Customize design
   - Generate review
   - Download PDF

4. ✅ **LinkedIn Import → Editor → Design → Review → Download**
   - Import from LinkedIn
   - Edit imported data
   - Customize design
   - Generate review
   - Download PDF

5. ✅ **Q&A Bot → Editor → Design → Review → Download**
   - Complete chatbot conversation
   - Edit generated resume
   - Customize design
   - Generate review
   - Download PDF

6. ✅ **User edits resume after review → Re-run Review → Download**
   - Generate review
   - Edit resume
   - Regenerate review
   - Download updated PDF

### Negative E2E Flows

1. ⚠️ **Step 2 starts but loses network mid-flow**
   - Start upload
   - Disconnect network
   - Verify error handling
   - Reconnect
   - Verify user can resume

2. ⚠️ **Editor session corrupted**
   - Load editor with corrupted session
   - Verify redirect to safe state

3. ⚠️ **Design template selected but preview not updating**
   - Select template
   - If preview fails, verify graceful fallback

4. ⚠️ **Review generated but resume modified afterward**
   - Generate review
   - Edit resume
   - Verify warning shows

5. ⚠️ **Download attempted without valid session**
   - Navigate to download URL without sessionId
   - Verify block and redirect

6. ⚠️ **User jumping between steps without saving**
   - Jump from editor to design to review rapidly
   - Verify no crashes
   - Verify autosave handles state

7. ⚠️ **Malicious input in fields**
   - Enter `<script>alert('xss')</script>` in field
   - Verify sanitization prevents injection

---

## Testing Checklist

### Manual Testing
- [ ] Test all positive cases for each step
- [ ] Test all negative cases for each step
- [ ] Test on Chrome, Safari, Firefox, Edge
- [ ] Test on iOS Safari and Android Chrome
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Test keyboard navigation
- [ ] Test with ad blockers enabled
- [ ] Test with JavaScript disabled
- [ ] Test with slow network (Slow 3G)
- [ ] Test with offline mode

### Automated Testing (Future)
- [ ] Set up Jest + React Testing Library
- [ ] Write unit tests for components
- [ ] Write integration tests for API routes
- [ ] Write E2E tests with Playwright
- [ ] Set up CI/CD pipeline

### Performance Testing
- [ ] Lighthouse audit (target: 90+ score)
- [ ] Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Bundle size analysis
- [ ] API response time monitoring

### Security Testing
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] SQL injection prevention (Prisma handles this)
- [ ] Rate limiting on API routes
- [ ] Input sanitization

---

## Bug Reporting Template

```markdown
### Bug Title
[Clear, concise title]

### Steps to Reproduce
1. Navigate to...
2. Click on...
3. Enter...
4. Observe...

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Screenshots
[If applicable]

### Environment
- Browser: [Chrome 120, Safari 17, etc.]
- OS: [macOS 14, Windows 11, iOS 17, etc.]
- Device: [Desktop, iPhone 14, etc.]

### Severity
- [ ] Critical (app crashes, data loss)
- [ ] High (major feature broken)
- [ ] Medium (feature partially works)
- [ ] Low (cosmetic issue)
```

---

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: All API routes
- **E2E Tests**: All critical user flows
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score 90+
- **Browser Compatibility**: Chrome, Safari, Firefox, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Android Chrome

---

## Notes

- This testing guide should be updated as new features are added
- All test cases should be reviewed and updated quarterly
- Critical bugs should be fixed within 24 hours
- High-priority bugs within 1 week
- Medium/Low bugs within 1 month
