const { calculateATS, extractImportantKeywords } = require("./ats");

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

exports.buildPrompt = (cv, jd, latex) => {
  const ats = calculateATS(cv, jd);
  const important = extractImportantKeywords(jd);
  const role = detectRole(jd);
  const verbs = getActionVerbs(role);

  return `
You are a senior ATS resume optimizer and recruiter.

STRICT RULES (DO NOT BREAK):
1. Do NOT change ANY LaTeX structure or commands
2. Only replace content inside existing sections
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

4. SUMMARY:
- Make it job-specific (2–3 lines max)

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

CV:
${cv}

LATEX TEMPLATE:
${latex}

OUTPUT FORMAT RULES:
- Return ONLY LaTeX
- No markdown
- No explanations
- No comments
`;
};