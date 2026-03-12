// ===== MOCK DATA =====
const JOBS = [
  {
    id: 1, title: "Senior Frontend Developer", company: "NovaTech", companyInit: "N",
    location: "San Francisco, CA", type: "Full-time", salary: "$120K - $160K",
    category: "tech", posted: "2 days ago",
    description: "We are looking for a seasoned Frontend Developer to join our dynamic team and help build the next generation of web applications. You will work closely with designers and backend engineers to deliver pixel-perfect, performant user interfaces.",
    skills: ["React", "TypeScript", "Next.js", "CSS", "GraphQL"],
    experience: "5+ years", hours: "9 AM - 5 PM (Flexible)", leave: "20 days PTO + holidays",
    gradient: "linear-gradient(135deg, #6C3CE1, #8B5CF6)"
  },
  {
    id: 2, title: "Product Designer", company: "DesignCraft", companyInit: "D",
    location: "New York, NY", type: "Full-time", salary: "$100K - $140K",
    category: "design", posted: "1 day ago",
    description: "Join DesignCraft as a Product Designer and shape the future of digital experiences. You'll lead the design process from concept to launch, creating beautiful and intuitive interfaces that delight millions of users.",
    skills: ["Figma", "Prototyping", "User Research", "Design Systems", "UI/UX"],
    experience: "3+ years", hours: "Flexible", leave: "Unlimited PTO",
    gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)"
  },
  {
    id: 3, title: "Data Scientist", company: "Analytica", companyInit: "A",
    location: "Remote", type: "Remote", salary: "$130K - $170K",
    category: "tech", posted: "3 days ago",
    description: "Analytica is seeking a talented Data Scientist to extract actionable insights from complex datasets. You will build predictive models, conduct statistical analyses, and collaborate with cross-functional teams to drive data-informed decisions.",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
    experience: "4+ years", hours: "Flexible", leave: "25 days PTO",
    gradient: "linear-gradient(135deg, #10B981, #34D399)"
  },
  {
    id: 4, title: "Marketing Manager", company: "BrightEdge", companyInit: "B",
    location: "Austin, TX", type: "Full-time", salary: "$90K - $120K",
    category: "marketing", posted: "5 days ago",
    description: "BrightEdge needs a strategic Marketing Manager to drive growth across digital channels. You'll develop campaigns, analyze performance metrics, and manage a team of creative marketers to amplify our brand presence.",
    skills: ["SEO", "Content Strategy", "Google Ads", "Analytics", "Social Media"],
    experience: "4+ years", hours: "9 AM - 6 PM", leave: "18 days PTO + holidays",
    gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)"
  },
  {
    id: 5, title: "DevOps Engineer", company: "CloudMatrix", companyInit: "C",
    location: "Seattle, WA", type: "Full-time", salary: "$140K - $180K",
    category: "tech", posted: "1 day ago",
    description: "CloudMatrix is hiring a DevOps Engineer to automate and optimize our cloud infrastructure. You'll implement CI/CD pipelines, manage Kubernetes clusters, and ensure high availability of our platform serving millions of users.",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    experience: "5+ years", hours: "Flexible", leave: "22 days PTO",
    gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)"
  },
  {
    id: 6, title: "Financial Analyst", company: "WealthFlow", companyInit: "W",
    location: "Chicago, IL", type: "Full-time", salary: "$85K - $110K",
    category: "finance", posted: "4 days ago",
    description: "WealthFlow is seeking a Financial Analyst to support strategic decision-making through financial modeling and analysis. You'll work with leadership to provide insights on investments, budgets, and growth opportunities.",
    skills: ["Financial Modeling", "Excel", "SQL", "Tableau", "Risk Analysis"],
    experience: "3+ years", hours: "8 AM - 5 PM", leave: "15 days PTO + holidays",
    gradient: "linear-gradient(135deg, #EF4444, #F87171)"
  },
  {
    id: 7, title: "UX Researcher", company: "PixelPulse", companyInit: "P",
    location: "Remote", type: "Remote", salary: "$95K - $125K",
    category: "design", posted: "6 hours ago",
    description: "PixelPulse is looking for a UX Researcher to uncover deep user insights that drive product innovation. You'll plan and conduct user studies, synthesize findings, and present actionable recommendations to design and product teams.",
    skills: ["User Interviews", "Usability Testing", "Survey Design", "Analytics", "Figma"],
    experience: "2+ years", hours: "Flexible", leave: "20 days PTO",
    gradient: "linear-gradient(135deg, #EC4899, #F472B6)"
  },
  {
    id: 8, title: "Backend Engineer", company: "NovaTech", companyInit: "N",
    location: "San Francisco, CA", type: "Full-time", salary: "$130K - $170K",
    category: "tech", posted: "3 days ago",
    description: "Join NovaTech's backend team to build scalable APIs and microservices that power our platform. You'll design database schemas, optimize performance, and work with cutting-edge technologies in a fast-paced environment.",
    skills: ["Node.js", "PostgreSQL", "Redis", "gRPC", "System Design"],
    experience: "4+ years", hours: "9 AM - 5 PM (Flexible)", leave: "20 days PTO + holidays",
    gradient: "linear-gradient(135deg, #6C3CE1, #8B5CF6)"
  },
  {
    id: 9, title: "Content Strategist", company: "BrightEdge", companyInit: "B",
    location: "Remote", type: "Part-time", salary: "$50K - $70K",
    category: "marketing", posted: "2 days ago",
    description: "BrightEdge is seeking a part-time Content Strategist to develop and execute content plans across multiple platforms. Create compelling narratives that resonate with our audience and drive engagement metrics.",
    skills: ["Content Writing", "SEO", "Social Media", "CMS", "Analytics"],
    experience: "2+ years", hours: "20 hrs/week (Flexible)", leave: "10 days PTO",
    gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)"
  }
];

const COMPANIES = [
  { name: "NovaTech", init: "N", industry: "Technology", rating: 4.8, reviews: 245, openJobs: 12, gradient: "linear-gradient(135deg, #6C3CE1, #8B5CF6)" },
  { name: "DesignCraft", init: "D", industry: "Design Agency", rating: 4.6, reviews: 189, openJobs: 6, gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)" },
  { name: "Analytica", init: "A", industry: "Data & AI", rating: 4.9, reviews: 312, openJobs: 8, gradient: "linear-gradient(135deg, #10B981, #34D399)" },
  { name: "BrightEdge", init: "B", industry: "Marketing", rating: 4.5, reviews: 156, openJobs: 5, gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)" },
  { name: "CloudMatrix", init: "C", industry: "Cloud Services", rating: 4.7, reviews: 278, openJobs: 10, gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
  { name: "WealthFlow", init: "W", industry: "FinTech", rating: 4.4, reviews: 134, openJobs: 4, gradient: "linear-gradient(135deg, #EF4444, #F87171)" },
  { name: "PixelPulse", init: "P", industry: "Creative Tech", rating: 4.7, reviews: 201, openJobs: 7, gradient: "linear-gradient(135deg, #EC4899, #F472B6)" },
  { name: "EduSpark", init: "E", industry: "EdTech", rating: 4.3, reviews: 98, openJobs: 3, gradient: "linear-gradient(135deg, #A855F7, #C084FC)" }
];
