# LinkedIn Post — Task 2: Personal Portfolio

---

## POST (copy from below)

🎯 **Task 2 of my Web Development & Designing internship: a personal portfolio — my digital résumé.**

Same discipline as before: real content, no filler. What I actually built 👇

🔹 **Hero + profile card.** Name, role, live "Available for work" status, and a stat row — put my face and my positioning above the fold instead of making people scroll for it.

🔹 **About, Skills, Projects, Contact.** Clear section rhythm with a consistent heading pattern. The skills grid covers 13 items — HTML5, CSS3, JavaScript, React, Node, Tailwind, Supabase, Electron, Java, Git, Figma, UI/UX, responsive design — laid out as visual cards, not a wall of text.

🔹 **Real projects, real links.** CampusSpace, my portfolio, the Ghana Smart Courier & Dispatch Optimizer (GSCDO), and a Coinbase clone — each with a badge, description, and working GitHub link.

🔹 **Scroll animations done right.** An `IntersectionObserver` fades sections in as they enter the viewport, then **unobserves** them so nothing re-animates on scroll back. Staggered delays make the reveal feel choreographed rather than mechanical.

🔹 **Smooth scroll + consistent branding.** `scroll-behavior: smooth` on `html` for nav jumps, and a single CSS variable palette (`--primary`, `--bg`, `--text`, `--muted`) driving the whole design — so changing the accent colour is one line, not fifty.

🔹 **Responsive at three breakpoints.** Tuned at 1281px, 820px, and 520px, with `clamp()` on headings so type scales fluidly instead of jumping.

🔹 **Accessibility was baked in, not bolted on.** Semantic landmarks, `aria-label` on nav and social icons, descriptive `alt` text on the avatar, and `:focus-visible` states on every link and button so keyboard users can actually see where they are.

**Takeaway from this one:** consistency is the hard part. Anyone can style one section well — making four sections feel like one coherent product is the actual design work.

Vanilla HTML5 and CSS3, with a touch of vanilla JS for the scroll reveals. No frameworks. Fundamentals first. 💪

Thanks @Oasis Infobyte — on to Task 3. 🚀

#WebDevelopment #FrontendDevelopment #HTML5 #CSS3 #JavaScript #PortfolioWebsite #ResponsiveDesign #Internship #OasisInfobyte #OIBSIP #LearningInPublic

---

## Notes before you post

- **Replace `@Oasis Infobyte`** by typing `@` and selecting their real LinkedIn page from the dropdown — plain text won't notify them.
- **Attach a screenshot** of the hero section (it's your strongest visual) — or better, a short scroll-through clip so the scroll-reveal animations show up.
- **Put links in the first comment**, not the post body — LinkedIn suppresses reach on posts with outbound links. Your live portfolio URL and GitHub belong there.
- **One honest flag:** I mentioned accessibility because the `aria-label`, `alt`, and `:focus-visible` work is genuinely in your code. But if you want to claim more than that, I'd add a `prefers-reduced-motion` media query first — your fade-up animation currently runs regardless of user motion settings. Happy to add it if you want, it's about 5 lines.
