# Healthy Habit Planner

## Purpose
Healthy Habit Planner is a client-side web application that allows users to create, track, and complete daily habits. The project focuses on accessible form design, client-side data persistence, and clean UI structure using vanilla HTML, CSS, and JavaScript.

All data is stored locally in the user’s browser, ensuring privacy and simplicity.

---

## Features Implemented
- Create new habits with validation
- View a list of active habits
- Mark habits as complete using checkboxes
- Automatic habit streak tracking
- Persistent data storage using `localStorage`
- Single-page application behavior (no page reloads)
- Manual export and import of habit data (JSON)
- Lightweight local “pseudo-auth” using a stored username

---

## Accessibility
Accessibility was considered throughout the application design:

- Semantic HTML elements (`header`, `nav`, `main`, `footer`)
- All form inputs include visible labels
- Keyboard navigation supported for forms and buttons
- Visible focus states for interactive elements
- Color contrast selected for readability

Screen reader testing was not performed, but the application uses semantic markup and ARIA-friendly patterns to support future accessibility audits.

---

## Data Storage
The application uses browser `localStorage` for all data persistence:
- Habit data is stored as JSON
- Username is stored locally to personalize the experience
- No external APIs or backend services are required

---

## Testing
- Manual testing was performed for all core functionality:
  - Adding habits
  - Toggling completion
  - Deleting habits
  - Data persistence across page reloads
  - Exporting and importing habit data
- Edge cases such as empty input submission were handled through validation

---

## Future Enhancements
The following features were intentionally scoped out of the current version to maintain stability, accessibility, and clarity of purpose:

- Habit detail view with descriptions and notes
- Dedicated settings view (themes, preferences)
- Dashboard charts and progress summaries
- Toast notifications for user feedback
- Calendar-based habit tracking
- Screen reader testing with NVDA or VoiceOver

These enhancements would be appropriate for a larger-scale or production version of the application.

---

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Browser `localStorage`

---

## Time Spent
Approximately **25–30 hours**.

---

## Final Note
This project demonstrates core front-end development principles including accessibility, state management, and client-side persistence, while intentionally limiting scope to deliver a complete and functional application.
