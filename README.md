<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=200&section=header&text=AI%20Resume%20Tailor&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=The%20backend%20that%20gets%20you%20hired.%20No%20cap.&descSize=17&descAlignY=57&descFontColor=a78bfa" width="100%"/>

<br/>

**not your average resume tool. this one actually works.**

<br/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![LaTeX](https://img.shields.io/badge/LaTeX-008080?style=for-the-badge&logo=latex&logoColor=white)

<br/>

</div>

---

<div align="center">

## okay Real talk.

</div>

```
you applied to 47 jobs last month.

got 2 callbacks.

spent 6 hours "tailoring" resumes that were basically the same doc
with a different company name pasted at the top.

the ATS ate them all. silently. without hesitation.

this backend was built to fix that.
```

**AI Resume Tailor** is a production-grade SaaS backend that generates ATS-optimized resumes using Gemini AI, scores them, exports them as PDFs, and runs on a real coin-based payment system powered by Razorpay.

it's not a side project. it's a startup backend dressed as one.

---

<div align="center">

## the stack (no bloat, only facts)

</div>

<br/>

| Layer | Tech | Why |
|---|---|---|
| Runtime | Node.js + Express.js | fast, scalable, industry standard |
| Database | MongoDB + Mongoose | flexible schema for resume data |
| AI Engine | Google Gemini API | best-in-class generation quality |
| Payments | Razorpay | UPI + cards + wallets, built for India |
| PDF Export | LaTeX + `latexmk` | pixel-perfect, recruiter-ready output |
| Auth | JWT | stateless, secure, no session headaches |

---

<div align="center">

## what it actually does

</div>

<br/>

### AI Resume Generation — *drop your CV, paste the JD, get a tailored resume in seconds*

feeds your resume, the job description, and your LaTeX template into Gemini with a smart prompt that forces it to:

- inject ATS keywords from the JD directly
- swap weak verbs for strong ones ("worked on" → "engineered", "helped" → "led")
- add measurable metrics where they're missing
- keep your LaTeX structure completely intact

no hallucinated experience. no generic filler. targeted output only.

<br/>

### Prompt Optimization Engine — *the brain behind the brain*

before anything reaches Gemini, the prompt engine does its own analysis:

```
detects your target role  →  Frontend / Backend / DevOps / etc.
extracts JD keywords      →  maps them to resume sections
identifies gaps           →  flags what's missing vs. what's needed
builds the prompt         →  few-shot optimized for high-quality output
sends to Gemini           →  now the AI actually knows what to do
```

this is why the output doesn't sound like generic ChatGPT resume advice.

<br/>

### ATS Score API — *know your number before you apply*

```json
{
  "score": 84,
  "keyword_match": "79%",
  "matched": ["React", "Node.js", "REST API", "MongoDB", "AWS"],
  "missing": ["TypeScript", "Docker", "CI/CD", "Jest", "Redis"],
  "suggestions": [
    "Add TypeScript to skills — appears 6x in JD",
    "Mention Docker in at least one project bullet",
    "CI/CD experience is required, not preferred — address it explicitly"
  ]
}
```

no more guessing. hard numbers. specific fixes.

<br/>

### PDF Generation — *LaTeX → clean PDF → download → done*

converts your optimized LaTeX resume to a properly formatted PDF using `latexmk`. temp files are handled securely and cleaned up post-download. no leftover junk, no exposed paths.

<br/>

### Coin System + Razorpay Payments — *real monetization, real logic*

users buy coins. coins unlock generations. coins only deduct after a successful AI response. no charge for failures.

```
user buys 100 coins via Razorpay
         ↓
payment verified via signature check (no fake webhooks)
         ↓
coins credited to account atomically
         ↓
generate resume = spend coins
         ↓
only deducted if Gemini returns valid output
```

double-crediting protection built in. production-safe.

<br/>

### Auth + Security — *not an afterthought*

- JWT authentication on all protected routes
- rate limiting to block abuse
- input validation before anything hits the DB or AI
- secure temp file handling for LaTeX compilation

---

<div align="center">

## the full request flow

</div>

```
POST /api/generate/generate
         │
         ▼
  authMiddleware.js          ← is this token valid?
         │
         ▼
  rateLimiter.js             ← is this user spamming?
         │
         ▼
  generateController.js      ← does the user have coins?
         │
         ▼
  ats.js                     ← run ATS pre-analysis
         │
         ▼
  promptEngine.js            ← build optimized Gemini prompt
         │
         ▼
  gemini.js                  ← call Gemini API
         │
         ▼
  postProcess()              ← clean + validate output
         │
         ▼
  Resume.save()              ← store to MongoDB
  User.deductCoins()         ← only now, coins go
         │
         ▼
  return optimized resume    ← 200. you're welcome.
```

---

<div align="center">

## project structure

</div>

```
server/
│
├── controllers/
│   ├── authController.js       # register, login, token handling
│   ├── generateController.js   # resume generation + ATS scoring
│   ├── paymentController.js    # Razorpay order creation + verification
│   └── userController.js       # profile, coin balance, history
│
├── models/
│   ├── User.js                 # user schema + coin balance
│   ├── Resume.js               # resume history per user
│   └── Payment.js              # payment records + idempotency
│
├── routes/
│   ├── authRoutes.js
│   ├── generateRoutes.js
│   └── paymentRoutes.js
│
├── middleware/
│   ├── authMiddleware.js       # JWT verification
│   └── rateLimiter.js          # express-rate-limit config
│
├── utils/
│   ├── gemini.js               # Gemini API wrapper
│   ├── ats.js                  # ATS scoring engine
│   ├── promptEngine.js         # smart prompt builder
│   ├── pdfGenerator.js         # LaTeX → PDF pipeline
│   └── razorpay.js             # payment utils + signature verify
│
├── .env
├── app.js
└── server.js
```

---

<div align="center">

## API reference

</div>

<br/>

**Auth**

```
POST   /api/auth/register          →  create account
POST   /api/auth/login             →  get JWT token
```

**Resume**

```
POST   /api/generate/generate      →  generate tailored resume (costs coins)
POST   /api/generate/ats-score     →  score resume against JD (free)
POST   /api/generate/download-pdf  →  compile + download PDF
GET    /api/generate/history       →  past generated resumes
```

**Payments**

```
POST   /api/payment/create-order   →  create Razorpay order
POST   /api/payment/verify         →  verify signature + credit coins
```

---

<div align="center">

## setup

</div>

<br/>

**1. clone and install**

```bash
git clone https://github.com/anubhavxdev/ai-resume-tailor-backend.git
cd ai-resume-tailor-backend
npm install
```

**2. environment variables**

```bash
# create .env in root
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=something_long_and_random
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**3. install LaTeX** (required for PDF generation)

```bash
# macOS
brew install --cask mactex

# Ubuntu / Debian
sudo apt-get install texlive-full

# Windows
# install MiKTeX from https://miktex.org

# verify
latexmk -v
```

**4. run**

```bash
npm run dev
```

---

<div align="center">

## production checklist

</div>

<br/>

before you ship this, make sure you've handled:

- [ ] Razorpay webhooks for payment reliability (not just verify endpoint)
- [ ] MongoDB transactions for atomic coin operations
- [ ] Winston or Morgan for structured logging
- [ ] Nginx reverse proxy + PM2 process manager
- [ ] ATS result caching (Redis) — Gemini calls aren't free
- [ ] Environment secrets via AWS Secrets Manager or similar
- [ ] Health check endpoint for uptime monitoring
- [ ] Rate limiting tuned per route, not global

---

<div align="center">

## roadmap

</div>

<br/>

- [x] Gemini-powered resume generation
- [x] ATS scoring engine
- [x] Prompt optimization layer
- [x] LaTeX → PDF pipeline
- [x] Razorpay payment + coin system
- [x] JWT auth + rate limiting
- [ ] Resume improvement loop (generate → score → improve → repeat)
- [ ] Multi-step AI pipeline with intermediate validation
- [ ] AI resume feedback assistant (conversational)
- [ ] Analytics dashboard for usage + revenue
- [ ] React + Tailwind frontend
- [ ] Chrome extension for one-click JD import

---

<div align="center">

## what makes this different

most "AI resume" projects are a Gemini API call wrapped in a `POST /generate` route.

this one has a prompt engine, an ATS layer, a payment system, PDF compilation, and a coin economy — all wired together with proper middleware, error handling, and production-aware logic.

it's not built to look good in a portfolio.

**it's built to run in prod.**

<br/>

---

**Anubhav Jaiswal**
B.Tech CS · Lovely Professional University
Founder @ FounDev Studio · Tech Lead @ AWS Cloud Community · 2x Hackathon Winner

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-anubhavxdev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anubhavxdev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-anubhavxdev-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/anubhavxdev)
[![Portfolio](https://img.shields.io/badge/Portfolio-anubhavjaiswal.me-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://anubhavjaiswal.me)

<br/>

---

*if this hit different —*

[![Star this repo](https://img.shields.io/github/stars/anubhavxdev/ai-resume-tailor-backend?style=for-the-badge&color=a78bfa&label=star%20this%20repo)](https://github.com/anubhavxdev/ai-resume-tailor-backend)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer" width="100%"/>

</div>
