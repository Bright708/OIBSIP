# AuthFlow - Client-Side Authentication System

## Objective

The objective of this project is to develop a secure, client-side authentication system featuring registration, login validation, SHA-256 password hashing, session state tracking, and an authorized user dashboard.

## Steps Performed

1. Designed a multi-view application interface containing dedicated views for user registration, login, and an authenticated dashboard panel.
2. Structured accessible form layouts using semantic HTML5, input types, custom alert components, and action triggers.
3. Styled authentication cards, input states, visual validation banners, and dashboard components using modern CSS3.
4. Implemented client-side cryptographic security using the Web Crypto API to hash user passwords with SHA-256 before storing or comparing credentials.
5. Added form validation rules to verify username availability, check password complexity, enforce terms acceptance, and display error messages.
6. Managed user registration data and current session status via browser localStorage, including logout functionality and route state toggling.

## Tools Used

- HTML5: Form controls, accessible structure, and alert components
- CSS3: Custom properties, responsive cards, input styling, and animations
- JavaScript (ES6): Asynchronous control flow, DOM manipulation, and view routing
- Web Crypto API: Native in-browser SHA-256 cryptographic hashing
- LocalStorage API: Secure client-side credential store and active session state
- Font Awesome: Form field indicators, status icons, and control badges

## Outcome

A secure, responsive client-side authentication workflow providing seamless registration, encrypted password verification, credential error handling, and protected dashboard access.
