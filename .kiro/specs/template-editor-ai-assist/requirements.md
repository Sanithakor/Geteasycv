# Requirements: CV Builder Template Editor + AI Assist

## Overview
Enable users to select and edit resume templates directly within the CV builder, with AI-powered field-level content optimization that adapts suggestions to the selected template's style and context.

---

## Functional Requirements

### FR1: Template Selection & Loading
**Priority:** High  
**Status:** Required

- **FR1.1** Display a template library/picker showing all available templates with thumbnails, names, and categories
- **FR1.2** Allow users to select any template from the library
- **FR1.3** Upon selection, load the template's structure, styling, and default content into the current editor workspace
- **FR1.4** Replace the current working content with the selected template while preserving the editor session
- **FR1.5** Support filtering templates by category (Professional, Minimal, Creative, etc.)
- **FR1.6** Show template metadata: isPremium status, ATS-friendly badge, rating, download count

### FR2: In-Place Template Editing
**Priority:** High  
**Status:** Required

- **FR2.1** Enable direct editing of all template fields (personal info, experience, education, skills, projects, etc.)
- **FR2.2** Support editing template layout settings (colors, fonts, spacing)
- **FR2.3** Keep users in the same editor view after template selection (no navigation away)
- **FR2.4** Provide real-time preview updates as users edit fields
- **FR2.5** Support undo/redo for all template and content changes
- **FR2.6** Auto-save draft changes at regular intervals

### FR3: AI Field Assistant
**Priority:** High  
**Status:** Required

- **FR3.1** Display a small, unobtrusive AI button/icon beneath each editable text field
- **FR3.2** On AI button click, analyze the current field value + surrounding template context
- **FR3.3** Send field content and template metadata to AI service for context-aware rewrite
- **FR3.4** Return an optimized suggestion that matches the selected template's style and tone
- **FR3.5** Display the AI suggestion in a review interface (side-by-side or inline preview)
- **FR3.6** Allow users to accept, reject, or manually edit the AI suggestion
- **FR3.7** Apply accepted suggestion to the field and update live preview
- **FR3.8** Limit AI suggestions to individual fields (do not rewrite multiple fields simultaneously)
- **FR3.9** Show loading state while AI processes the request
- **FR3.10** Handle AI service errors gracefully with user-friendly error messages

### FR4: Data Persistence
**Priority:** High  
**Status:** Required

- **FR4.1** Store all resume drafts in the database with associations to:
  - User ID
  - Active template ID
  - Field-level content (personal, experience, education, skills, etc.)
  - Last modified timestamp
- **FR4.2** Save template selection changes to the resume record
- **FR4.3** Track version history for major changes
- **FR4.4** Support saving current edited template as a new reusable template entry
- **FR4.5** Persist AI-suggested changes when accepted by user
- **FR4.6** Implement conflict resolution for concurrent edits (if applicable)

### FR5: Template Publishing & Management
**Priority:** Medium  
**Status:** Required

- **FR5.1** Allow users to save their edited template as a personal template
- **FR5.2** Enable admins to publish user templates as public/reusable templates
- **FR5.3** Version control for template updates (track major vs. minor changes)
- **FR5.4** Preview template before publishing
- **FR5.5** Set template metadata (name, category, premium status, ATS-friendly flag)

### FR6: Live Preview & Visual Feedback
**Priority:** High  
**Status:** Required

- **FR6.1** Show real-time preview of the resume as users edit fields
- **FR6.2** Update preview immediately when template is switched
- **FR6.3** Highlight active/selected field in the preview
- **FR6.4** Support zoom in/out on preview
- **FR6.5** Show before/after comparison when reviewing AI suggestions
- **FR6.6** Render preview using actual template renderer (not static mock)

---

## Non-Functional Requirements

### NFR1: Performance
**Priority:** High

- Template selection and loading must complete within 2 seconds
- AI field suggestions must return within 5 seconds under normal load
- Live preview updates must render within 500ms of field changes
- Support concurrent editing by multiple users without data loss

### NFR2: Usability
**Priority:** High

- AI button must be discoverable but not distracting
- Template picker must be visually clear with adequate thumbnails
- Editor interface must follow existing CV builder design patterns
- Support keyboard shortcuts for common actions (undo, save, AI assist)
- Provide clear visual feedback for all actions (saving, loading, AI processing)

### NFR3: Reliability
**Priority:** High

- Implement auto-save to prevent data loss
- Handle AI service failures gracefully without blocking user workflow
- Validate all field inputs before saving
- Ensure template switching does not corrupt existing content
- Maintain data integrity during concurrent template updates

### NFR4: Security
**Priority:** High

- Validate user permissions before allowing template editing
- Sanitize AI-generated content before rendering
- Prevent XSS attacks in template content fields
- Rate-limit AI assistant calls per user (prevent abuse)
- Ensure draft content is only accessible to the owner

### NFR5: Scalability
**Priority:** Medium

- Cache template definitions to reduce database load
- Implement pagination for template library
- Queue AI requests to manage backend load
- Optimize preview rendering for large resumes

### NFR6: Accessibility
**Priority:** Medium

- AI button must be keyboard accessible
- Template picker must support screen readers
- Editor fields must have proper ARIA labels
- Preview must have sufficient color contrast
- Support high contrast mode

---

## User Stories

### US1: Template Selection
**As a** resume builder user  
**I want to** browse and select from available resume templates  
**So that** I can choose a design that fits my professional style

**Acceptance Criteria:**
- Template library displays all available templates with thumbnails
- Templates can be filtered by category
- Selected template loads into the editor immediately
- Current content is replaced with template structure

### US2: Field Editing
**As a** resume builder user  
**I want to** edit individual fields in my selected template  
**So that** I can customize my resume content

**Acceptance Criteria:**
- All text fields are editable in place
- Changes reflect in real-time preview
- Undo/redo works for all edits
- Changes are auto-saved

### US3: AI Content Optimization
**As a** resume builder user  
**I want to** get AI-powered suggestions to improve specific fields  
**So that** my content is optimized for the selected template style

**Acceptance Criteria:**
- AI button appears under each editable field
- Clicking AI button sends field content for analysis
- AI returns context-aware suggestion matching template tone
- User can review, accept, or reject the suggestion
- Accepted suggestions update the field immediately

### US4: Template Customization
**As a** resume builder user  
**I want to** customize and save my edited template  
**So that** I can reuse my personalized template for future resumes

**Acceptance Criteria:**
- Users can save edited templates as personal templates
- Saved templates appear in user's template library
- Template metadata (name, category) is customizable
- Saved templates persist across sessions

### US5: Draft Management
**As a** resume builder user  
**I want to** have my work automatically saved  
**So that** I don't lose progress if I close the editor

**Acceptance Criteria:**
- Changes are auto-saved every 30 seconds
- Draft status indicator shows last save time
- Refreshing the page loads the latest draft
- Users can manually trigger save

---

## Business Rules

### BR1: Template Access
- Free users can access basic templates
- Premium templates require active subscription
- Admins can access all templates regardless of subscription

### BR2: AI Usage Limits
- Free tier: 10 AI assists per month
- Pro tier: 100 AI assists per month
- Premium tier: unlimited AI assists
- AI credits reset on subscription renewal date
- Show remaining AI credits in UI

### BR3: Template Versioning
- Major template changes increment version number
- Minor changes (typo fixes, color tweaks) are patch updates
- Users editing published templates create new versions
- Original template remains available

### BR4: Content Validation
- Required fields must have content before publishing
- Email fields must be valid email format
- Phone numbers should follow international format
- URLs must be valid and accessible
- Dates must be logical (start before end)

### BR5: Auto-Save Behavior
- Auto-save triggers after 30 seconds of inactivity
- Manual save available via Ctrl+S or Save button
- Show "Saving..." indicator during save operation
- Show "All changes saved" when complete
- Queue saves if user continues editing

---

## Dependencies & Constraints

### Technical Dependencies
- **AI Service:** Integration with OpenAI API or similar LLM service for content suggestions
- **Database:** PostgreSQL with Prisma ORM (existing)
- **State Management:** Zustand (existing `builderStore.ts`)
- **UI Framework:** React + Next.js (existing)
- **Styling:** Tailwind CSS (existing)

### External Constraints
- AI service must be available and responsive
- Database must support JSON storage for template configurations
- Browser must support modern JavaScript (ES6+)

### Assumptions
- Users have basic familiarity with resume editing
- Template renderer component already exists (`TemplateRenderer`)
- Sample CV data available for template previews
- Authentication and authorization already implemented

---

## Success Metrics

### Engagement Metrics
- **Template Switch Rate:** % of users who try multiple templates per session
- **AI Assist Usage:** Average number of AI assists used per resume
- **Draft Save Rate:** % of sessions that result in saved drafts
- **Template Customization:** % of users who customize templates vs. use defaults

### Quality Metrics
- **AI Acceptance Rate:** % of AI suggestions accepted by users
- **Template Load Time:** Average time to load template into editor
- **Auto-Save Success Rate:** % of auto-saves that complete successfully
- **Error Rate:** % of AI requests that fail

### Business Metrics
- **Conversion Rate:** % of free users who upgrade after using AI assist
- **Resume Completion Rate:** % of resumes that move from draft to published
- **User Retention:** % of users who return after first template edit session

---

## Out of Scope

The following items are explicitly **not** included in this feature:

- ❌ Multi-user collaborative editing (real-time co-editing)
- ❌ AI-generated entire resume from scratch (only field-level optimization)
- ❌ Template marketplace for buying/selling templates
- ❌ Mobile native app support (web only for now)
- ❌ Video tutorials or interactive onboarding
- ❌ Integration with LinkedIn or other job platforms
- ❌ Cover letter generation or editing
- ❌ Resume scoring or ATS compatibility checking
- ❌ Export to formats other than PDF (PDF only)
- ❌ Advanced analytics dashboard for template performance

---

## Open Questions

1. **Q:** Should AI suggestions consider the user's entire resume context or just the specific field?  
   **A:** _Needs clarification from stakeholders_

2. **Q:** What happens to user's existing content when they switch templates?  
   **A:** _Proposed: Map existing content to new template structure, prompt user if data loss possible_

3. **Q:** Should we support custom CSS for template editing?  
   **A:** _Needs technical feasibility assessment_

4. **Q:** How should we handle template updates after users have already used them?  
   **A:** _Proposed: Users' resumes remain on the version they selected, option to upgrade manually_

5. **Q:** Should the AI assistant support multiple languages?  
   **A:** _Needs product decision and AI service capability verification_

6. **Q:** What's the fallback experience if AI service is unavailable?  
   **A:** _Proposed: Disable AI buttons with explanation, allow normal editing to continue_

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-08-07 | System | Initial requirements document |
