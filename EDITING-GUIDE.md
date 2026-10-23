# Ronald Romeo Pule — Personal Portfolio Editing Guide (v0.8)

## 1. Start the website
1. Extract `ronald-romeo-pule-portfolio-v0.8.zip` into a normal folder, e.g. `Documents\TechnologicalCollective`.
2. Keep `index.html`, `about.html`, `projects.html`, `blog.html`, `vlog.html`, `contact.html`, `project.html`, `article.html`, `css`, `js`, and `assets` together.
3. Double-click `index.html` to preview the site in a browser. You do not need Python or a local server.
4. After changing a file, save it and refresh the browser. If the old version remains visible, use Ctrl+F5.

## 2. The one content file to learn first
Open `js/data.js` in VS Code or Notepad. Most routine updates belong here:
- `site`: your public name, role, organisation, email, GitHub, LinkedIn and YouTube links.
- `focusAreas`: the six clickable areas shown on the homepage and About page.
- `projects`: the projects and text shown on the project directory and individual case-study pages.
- `articles`: blog entries and the text shown on their individual pages.
- `videos`: YouTube video titles, descriptions and IDs.

You usually do not need to edit `js/site.js` or `css/style.css` just to add an article/project.

## 3. Update your personal details
In `site`, replace:
- `your.email@example.com` with an email address you are comfortable publishing.
- the empty `url` values with your full public profile URLs, e.g. `https://github.com/yourusername`.
- the placeholder profile `value` text with your public handle or channel name.

Keep a URL in quotes. If you do not want a profile shown yet, leave its `url` as an empty string. It will not create a fake link.

## 4. Add a project
Inside the `projects` array, copy an existing project object and paste it before the closing `]`. Give it a unique `id` using lowercase words and hyphens, for example `network-monitor`.
Fill in:
- `title`: project name
- `category`: grouping used by the project filters, e.g. `Cybersecurity`, `Software`, `Productivity`
- `status`: be honest, e.g. `Planning`, `In development`, `Prototype`, or `Completed`
- `featured`: set to `true` if you want it to be eligible for the homepage's three featured slots
- `areas`: related focus areas, used by search
- `summary`: 1–2 sentence description
- `role`, `tools`, and `sections`: your contribution, stack and case-study content

The detail page is generated automatically at `project.html?id=your-project-id`. Add screenshots only when they are real and safe to publish; do not show private data, credentials, tokens, customer information or sensitive forensic artefacts. Only publish verified results.

## 5. Add a blog article
Inside the `articles` array, copy an existing article object and change its unique `id`, `title`, `category`, `date`, `readTime`, `excerpt` and `sections`.
Use one of the existing focus categories if you want the article to appear when someone clicks that focus card:
- `Digital Forensics`
- `Cyber Threat Intelligence`
- `Programming`
- `Software Development`
- `Bug Bounty Hunting`
- `Cybersecurity`

Other categories such as `IT` are fine too. Each article section can contain:
- `heading`
- `paragraphs`: an array of text paragraphs
- optionally `bullets`: an array of list items

The blog list, search, category chips and individual article page update from this data. Starter articles are drafts: personalize them, check technical accuracy and add your own learning and examples before publication.

## 6. Add a YouTube video
Upload the video to YouTube, then copy the video ID from its URL.
Example: in `https://www.youtube.com/watch?v=AbCdEf12345`, the ID is `AbCdEf12345`.
Add an object to the `videos` array:
`{ title: "Project walkthrough", description: "What the video demonstrates.", videoId: "AbCdEf12345" }`
Save `data.js` and refresh `vlog.html`. The video itself is hosted by YouTube; the website only embeds it. You need an internet connection to load the embed.

## 7. Interactions already included
- Clickable navigation across dedicated pages.
- Mobile menu toggle on narrower screens.
- Dark/light theme toggle; the preference is remembered in the browser when storage is available.
- Search and category filters on Projects and Blog.
- Clickable focus-area cards that open the relevant blog category.
- Individual project and article pages generated from the content arrays.
- YouTube embeds on the vlog page.
- Contact/social links that activate only after you provide real URLs.
- Responsive layouts and reduced-motion support.

## 8. Keeping the design uncluttered
Use short summaries on cards, then put the depth on individual project/article pages. Feature no more than three projects on the homepage. The Projects page can hold many more entries because users can search and filter them. Use one strong screenshot per project rather than a wall of images. Keep draft or planned work labelled honestly.

## 9. Safety and credibility for cyber content
For digital forensics, use only evidence and data you are authorized to examine, and remove personal data from public screenshots. For bug bounty work, test only assets and methods explicitly authorized by the program. Avoid publishing credentials, exploit details that put real systems at risk, unreleased findings, or unsupported claims. Clearly distinguish lab demonstrations from real-world findings.

## 10. Free publishing
This site is static and needs no paid server or database. It can be deployed to a free static host such as GitHub Pages or Cloudflare Pages. The local preview is not the same as a published site: test links and embedded videos again after deploying. A custom domain is optional and normally costs money, so start with the free host-provided address.


## Personal-first branding
The site's main identity is Ronald Romeo Pule. The navigation puts your name first; "Director & Creator · The Technological Collective" appears as your professional affiliation. Update `site.name`, `site.role`, and `site.organization` in `js/data.js` if those details change.

## Complete your professional profile
Use `PROFESSIONAL-DETAILS-WORKSHEET.md` to gather your introduction, education, work experience, skills, training, projects and public links. We should check and personalize these facts before publication.


## Experience and skills (Version 0.5)
In `js/data.js`, the `experience` array populates the timeline on `about.html`. Update each role's `role`, `organization`, `period`, `type`, and `description` after confirming facts. The `education` array lists your Network Security and Computer Forensics degree; add the institution and graduation year when confirmed.

The `skills` array populates the technical toolkit. Every entry has `name`, `category`, and `note`. Add only tools you have actually used; the filters are generated from the category values automatically. We have listed technologies from our current conversation and previously discussed projects. Proficiency labels can be added when you decide how to rate your own experience.


## Editing the professional experience timeline
The role titles, organizations and date ranges on the About page are stored in the `experience` array in `js/data.js`. The currently supplied entries are: Office of the Ombudsman (September 2026–Present), ProtoSecure IT (March 2026–Present), Victorian Tutorials (April 2025–December 2026) and Solar AI (June 2022–December 2022). Edit `period` to update a date range and `description` to add verified responsibilities or accomplishments. Confirm whether you want to retain the “2 Years” label for Victorian Tutorials, since April 2025 to December 2026 is about 20 months by calendar dates.

## Headings and introductory copy
The large display headings use Title Case for a consistent visual style. The homepage and About introduction are written as professional positioning statements; role details appear in the Experience timeline further down the About page.


## Version 0.7 additions
- Edit the eight entries in `certifications` inside `js/data.js` to update certificate names, issuers, dates and categories.
- Edit each experience entry’s `responsibilities` list to match your actual duties. These are currently proposed draft bullets and are intentionally labelled as such on the About page. Remove any inaccurate bullet before publishing.
- The home page now leads with your personal professional focus, Cybersecurity & Digital Forensics, rather than placing The Technological Collective in the primary headline. The initiative remains part of your wider professional identity.


## Version 0.8 visual and practical improvements
- Refined responsive layout, spacing, cards, navigation, focus states and motion behaviour.
- Added the supplied email and two telephone numbers to the contact page as functional `mailto:` and `tel:` links.
- Empty social-profile placeholders are hidden until real profile URLs are supplied.
- Removed the inaccurate “2 Years” label from the Victorian Tutorials date range; the dates remain as provided.
- The site remains static and can be previewed locally without a server.
