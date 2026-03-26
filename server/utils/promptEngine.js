const { calculateATS, extractImportantKeywords } = require("./ats");

const FIXED_LATEX_TEMPLATE = `%% Exact replica of Anubhav Jaiswal's CV
\\documentclass[10pt, a4paper]{article}

\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}

\\usepackage[
  top=0.5in,
  bottom=0.5in,
  left=0.65in,
  right=0.65in
]{geometry}

\\usepackage{xcolor}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{tabularx}
\\usepackage{microtype}

\\definecolor{headingblue}{RGB}{44,45,146}
\\definecolor{linknavy}{RGB}{23,54,93}

\\hypersetup{colorlinks=true, urlcolor=linknavy, linkcolor=linknavy}

\\titleformat{\\section}
  {\\color{headingblue}\\fontsize{9.5pt}{11pt}\\selectfont\\scshape}
  {}{0em}{}
  [\\color{headingblue}\\titlerule]
\\titlespacing{\\section}{0pt}{8pt}{4pt}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

\\setlist[itemize]{leftmargin=1.4em, itemsep=1pt, parsep=0pt, topsep=2pt, label=\\textbullet}

\\newcommand{\\entryrow}[2]{%
  \\noindent\\begin{tabularx}{\\linewidth}{@{}X@{\\hspace{4pt}}r@{}}
    {\\color{headingblue}\\bfseries\\fontsize{8.5pt}{10pt}\\selectfont #1} &
    {\\fontsize{8.5pt}{10pt}\\selectfont #2}
  \\end{tabularx}\\par\\vspace{1pt}%
}

\\newcommand{\\instituterow}[2]{%
  \\noindent\\begin{tabularx}{\\linewidth}{@{}X@{\\hspace{4pt}}r@{}}
    {\\color{headingblue}\\bfseries\\fontsize{10pt}{12pt}\\selectfont #1} &
    {\\fontsize{8.5pt}{10pt}\\selectfont #2}
  \\end{tabularx}%
}

\\begin{document}

%% HEADER
{\\color{headingblue}\\bfseries\\fontsize{18pt}{22pt}\\selectfont Anubhav Jaiswal}\\par
\\vspace{3pt}
\\begin{tabularx}{\\linewidth}{@{}X@{}r@{}}
  {\\fontsize{8.5pt}{10pt}\\selectfont LinkedIn:~\\href{https://www.linkedin.com/in/anubhavxdev}{https://www.linkedin.com/in/anubhavxdev}} &
  {\\fontsize{8.5pt}{10pt}\\selectfont Email:~\\href{mailto:anubhavjaiswal1803@gmail.com}{anubhavjaiswal1803@gmail.com}} \\\\[1pt]
  {\\fontsize{8.5pt}{10pt}\\selectfont GitHub:~\\href{https://github.com/anubhavxdev}{https://github.com/anubhavxdev}} &
  {\\fontsize{8.5pt}{10pt}\\selectfont Mobile:~+91-7980921124}
\\end{tabularx}

%% SKILLS
\\section{Skills}
\\begin{itemize}
  \\item {\\color{headingblue}\\bfseries Languages}:\\enspace C++, Java, JavaScript, HTML and CSS
  \\item {\\color{headingblue}\\bfseries Frameworks}:\\enspace ReactJS, NodeJS, NextJS, ExpressJS, Tailwind CSS
  \\item {\\color{headingblue}\\bfseries Databases}:\\enspace MySQL, MongoDB
  \\item {\\color{headingblue}\\bfseries Tools/Platforms}:\\enspace Git, GitHub, Postman, Vercel, VS Code
  \\item {\\color{headingblue}\\bfseries Technical Skills}:\\enspace Data Structures and Algorithms (DSA), Object Oriented Programming (OOP)
  \\item {\\color{headingblue}\\bfseries Soft Skills}:\\enspace Continuous Learning, Consistency, Adaptability
\\end{itemize}

%% EXPERIENCE
\\section{Experience}

\\entryrow{Software Developer Intern \\textbar{} Division of Infotech, LPU}{Jan' 26 -- Present}
\\begin{itemize}
  \\item Developed and integrated user interfaces using React.js and Next.js for a scalable University Management System.
  \\item Collaborated with backend teams to integrate RESTful APIs, ensuring efficient data flow and seamless user experience.
  \\item Assisted in optimizing application performance through reusable components and efficient state management.
  \\item Translated product requirements into functional features while maintaining clean and modular code practices.
\\end{itemize}

\\vspace{5pt}
\\entryrow{Summer Trainee \\textbar{} Gokboru Pvt Tech Ltd}{Jun' 25 -- July' 25}
\\begin{itemize}
  \\item Built a full-stack MERN application (PicTrove) with emphasis on backend architecture and API development.
  \\item Designed and implemented RESTful APIs using Node.js and Express.js and developed MongoDB database schemas and optimized queries for efficient data handling.
  \\item Implemented secure authentication using JWT and role-based access control (RBAC).
\\end{itemize}

%% PROJECTS
\\section{Projects}

\\entryrow{Pic Trove \\textbar{} Event Photo Management Platform \\textbar{}~\\href{https://github.com/anubhavxdev}{\\textcolor{linknavy}{\\ensuremath{\\mathcal{P}}}}}{Sept' 25 -- Oct' 25}
\\begin{itemize}
  \\item Built a scalable full-stack MERN application with strong backend architecture, designing RESTful APIs using Node.js and Express.js for efficient data handling.
  \\item Implemented secure authentication using JWT and role-based access control (RBAC), along with optimized MongoDB schemas for high-performance queries.
  \\item Integrated AWS S3 for cloud storage and developed AI-based face recognition for automated photo organization and real-time delivery.
\\end{itemize}

\\vspace{5pt}
\\entryrow{EventOne \\textbar{} Event Management Platform \\textbar{}~\\href{https://github.com/anubhavxdev}{\\textcolor{linknavy}{\\ensuremath{\\mathcal{P}}}}}{July' 25 -- Aug' 25}
\\begin{itemize}
  \\item Engineered a scalable backend system with REST APIs supporting multi-role access (Admin, Organizer, Attendee) and secure RBAC-based authorization.
  \\item Integrated payment gateway and developed QR-based ticket generation and validation system ensuring secure and seamless event access.
  \\item Containerized the application using Docker and deployed with Cloudflare CDN, enhancing performance, scalability, and security.
\\end{itemize}

%% CERTIFICATES
\\section{Certificates}

\\begin{itemize}[itemsep=5pt]
  \\item GitHub Foundations \\textbar{} Github \\textbar{} \\href{https://github.com/anubhavxdev}{\\textcolor{linknavy}{Certificate}}
        \\hfill {\\fontsize{8.5pt}{10pt}\\selectfont Dec' 25}
  \\item Cloud Infrastructure 2024 Certified - Associate \\textbar{} Oracle \\textbar{} \\href{https://github.com/anubhavxdev}{\\textcolor{linknavy}{Certificate}}
        \\hfill {\\fontsize{8.5pt}{10pt}\\selectfont Nov' 25}
  \\item Red Hat System Administration 1 (RH 124) \\textbar{} Red Hat \\textbar{} \\href{https://github.com/anubhavxdev}{\\textcolor{linknavy}{Certificate}}
        \\hfill {\\fontsize{8.5pt}{10pt}\\selectfont Sep' 25}
\\end{itemize}

%% ACHIEVEMENTS
\\section{Achievements}

\\begin{itemize}
  \\item \\textbf{Winner -- AI/ML Track, InnovateX Hackathon (IIIT Kalyani):} Developed and deployed a machine learning solution addressing a real-world problem, demonstrating strong system design and execution skills.
  \\item \\textbf{Technical Lead -- AWS Cloud Community:} Led 10+ workshops on AWS cloud and system design concepts.
  \\item Solved \\textbf{200+ Data Structures and Algorithms} problems on \\textbf{LeetCode} and \\textbf{GeeksforGeeks}, strengthening problem solving and optimization skills.
\\end{itemize}

%% EDUCATION
\\section{Education}
\\vspace{4pt}
\\begin{itemize}[itemsep=8pt]

  \\item
    \\instituterow{Lovely Professional University}{Punjab, India}\\\\[1pt]
    {\\fontsize{8.5pt}{10pt}\\selectfont Bachelor of Technology \\hfill Aug' 23 -- Present}\\\\
    {\\fontsize{8.5pt}{10pt}\\selectfont Computer Science and Engineering: CGPA: 7.8}

  \\item
    \\instituterow{St Augustine Day's School}{Kolkata, India}\\\\[1pt]
    {\\fontsize{8.5pt}{10pt}\\selectfont Intermediate: PCM \\hfill Apr' 22 -- Mar' 23}\\\\
    {\\fontsize{8.5pt}{10pt}\\selectfont Percentage:\\quad 88}

\\end{itemize}

\\end{document}`;

const detectRole = (jd) => {
  const text = jd.toLowerCase();
  if (text.includes("react") || text.includes("frontend")) return "frontend";
  if (text.includes("node") || text.includes("backend")) return "backend";
  if (text.includes("aws") || text.includes("devops")) return "devops";
  return "general";
};

const getActionVerbs = (role) => {
  const verbs = {
    frontend: ["Developed", "Designed", "Optimized", "Implemented"],
    backend: ["Built", "Engineered", "Designed", "Scaled"],
    devops: ["Deployed", "Automated", "Monitored", "Optimized"],
    general: ["Led", "Managed", "Improved", "Executed"]
  };
  return verbs[role] || verbs.general;
};

exports.buildPrompt = (cv, jd) => {
  const ats = calculateATS(cv, jd);
  const important = extractImportantKeywords(jd);
  const role = detectRole(jd);
  const verbs = getActionVerbs(role);

  return `
You are a senior ATS resume optimizer and recruiter.

STRICT RULES (DO NOT BREAK):
1. Do NOT change ANY LaTeX structure or commands
2. Only replace content inside existing sections (text within \\item, \\entryrow, etc.)
3. Keep formatting EXACTLY same
4. Do NOT add new sections
5. Use bullet points only where already present

CONTENT RULES:
- Use strong action verbs: ${verbs.join(", ")}
- Add measurable impact (%, numbers, results)
- Each bullet should follow: Action + Skill + Result
- Keep bullets concise (max 18 words)

SECTION INSTRUCTIONS:

1. EXPERIENCE:
- Rewrite bullets with impact
- Add metrics (%, scale, performance)

2. PROJECTS:
- Highlight tech stack clearly
- Add problem + solution + result

3. SKILLS:
- Align strictly with JD keywords

EXAMPLE (GOOD BULLET):
❌ Built a web app
✅ Built scalable React application improving load time by 40%

Follow this style strictly.

JOB ROLE: ${role.toUpperCase()}

HIGH PRIORITY SKILLS (MUST INCLUDE):
${important.join(", ")}

PRIORITY KEYWORDS (MUST INCLUDE):
${ats.missingKeywords.slice(0, 15).join(", ")}

TOP SKILLS FROM JD:
${jd}

CV (plain text for context):
${cv}

LATEX TEMPLATE (edit content only, preserve all LaTeX commands):
${FIXED_LATEX_TEMPLATE}

OUTPUT FORMAT RULES:
- Return ONLY the complete LaTeX document
- No markdown
- No explanations
- No comments
`;
};