// ScamLens AI Mock Data & Presets for Code Meet Hackathon

export const DEFAULT_ANALYSIS_DATA = {
  risk_level: "High",
  risk_score: 88,
  flagged_text: [
    {
      phrase: "Pay the registration fee today",
      reason: "Legitimate jobs and scholarships will never ask you to pay an upfront fee."
    },
    {
      phrase: "Congratulations! You are selected.",
      reason: "Generic greetings and unprompted selections are common phishing hooks."
    }
  ],
  checklist: [
    "Verify the sender's email domain matches the official company website.",
    "Do a web search for the exact message text to see if others reported it.",
    "Contact your college placement cell to verify this specific opportunity."
  ],
  category: "Fake Internship Offer",
  breakdown: {
    urgency: 92,
    financialDemand: 96,
    domainAuthenticity: 15,
    senderCredibility: 18
  },
  aiSummary: "This message exhibits classic predatory employment fraud characteristics. The combination of an unsolicited acceptance without an interview and an immediate demand for a registration fee is a 99% indicator of a fee-collection scam."
};

export const SAMPLE_PRESETS = [
  {
    id: "hackathon-primary",
    label: "🚨 Fake Tech Internship (Upfront Fee)",
    category: "Internship Scam",
    badge: "High Risk (88%)",
    text: "Dear Student,\n\nCongratulations! You are selected. We reviewed your profile on LinkedIn and selected you for our prestigious 2026 Software Development Virtual Internship Program at Apex Global Tech.\n\nStipend: $1,200/month. Flexible remote hours.\n\nTo confirm your slot and receive your onboarding welcome kit with corporate laptop, you must Pay the registration fee today ($49 refundable security deposit) before 6:00 PM or your seat will be given to the next candidate.",
    result: DEFAULT_ANALYSIS_DATA
  },
  {
    id: "scholarship-scam",
    label: "🎓 Unsolicited Merit Scholarship Scam",
    category: "Scholarship Scam",
    badge: "High Risk (92%)",
    text: "Dear Candidate,\n\nYou have been approved for the National STEM Merit Foundation Grant of $8,500! No GPA or essay required.\n\nTo disburse the grant funds directly into your student account, please submit your wire transfer routing details and pay the processing disbursement fee of $65 via cryptocurrency or gift card within 24 hours.",
    result: {
      risk_level: "High",
      risk_score: 92,
      flagged_text: [
        {
          phrase: "pay the processing disbursement fee of $65 via cryptocurrency or gift card",
          reason: "Real scholarship foundations never demand processing fees or payment in gift cards/crypto."
        },
        {
          phrase: "No GPA or essay required",
          reason: "Legitimate merit scholarships always have competitive academic or financial qualification criteria."
        },
        {
          phrase: "within 24 hours",
          reason: "Artificial time urgency prevents students from consulting parents, mentors, or financial aid officers."
        }
      ],
      checklist: [
        "Check your university financial aid office before responding to external grants.",
        "Verify if the scholarship foundation is registered on government or college registries.",
        "Never send cryptocurrency, wire transfers, or gift cards for grant disbursements."
      ],
      category: "Predatory Scholarship Scam",
      breakdown: {
        urgency: 95,
        financialDemand: 98,
        domainAuthenticity: 8,
        senderCredibility: 10
      },
      aiSummary: "High-probability financial grant fraud. Legitimate foundations disburse money to your institution or account without charging a wire fee or requesting gift cards."
    }
  },
  {
    id: "telegram-task",
    label: "📱 Telegram Part-time Task Scam",
    category: "Remote Job Scam",
    badge: "Medium Risk (65%)",
    text: "Hello! I am Sarah from HR Global Talent. We have an urgent remote part-time opening for college students. Earn $150 to $350 daily just by liking YouTube videos and rating hotel apps. No prior experience needed.\n\nJoin our official Telegram supervisor @HR_Global_Task to claim your welcome bonus and start working right now.",
    result: {
      risk_level: "Medium",
      risk_score: 65,
      flagged_text: [
        {
          phrase: "Earn $150 to $350 daily just by liking YouTube videos",
          reason: "Disproportionately high pay for minimal micro-tasks is the classic signature of task deposit scams."
        },
        {
          phrase: "Join our official Telegram supervisor",
          reason: "Scammers move targets to Telegram or WhatsApp where conversations cannot be tracked by campus job boards."
        }
      ],
      checklist: [
        "Avoid job offers that redirect conversations to Telegram or WhatsApp.",
        "Search online forums (e.g. Reddit r/scams) for 'YouTube rating task scam'.",
        "Never deposit personal money to unlock 'higher task commissions'."
      ],
      category: "Task-Based Ponzi Job",
      breakdown: {
        urgency: 70,
        financialDemand: 60,
        domainAuthenticity: 30,
        senderCredibility: 25
      },
      aiSummary: "Medium-to-High threat task scam. These schemes pay small sums at first to build trust, then demand escalating deposit tiers before freezing student funds."
    }
  },
  {
    id: "legitimate-offer",
    label: "✅ Authentic Campus Placement Invite",
    category: "Verified Opportunity",
    badge: "Low Risk (12%)",
    text: "Hi Alex,\n\nFollowing your application for the Summer 2026 Engineering Internship through our university portal (Job ID #8921), our campus recruiting team would like to invite you for a 45-minute technical interview via Microsoft Teams next Tuesday.\n\nYou can review the interview syllabus and select a time slot on our career portal using your @university.edu credentials. No payment or personal financial info is ever requested.\n\nBest regards,\nCampus Recruitment Team\ncareers@acmetech.com",
    result: {
      risk_level: "Low",
      risk_score: 12,
      flagged_text: [],
      checklist: [
        "Confirm your interview slot through the official campus career portal.",
        "Check that the email sender domain matches the official corporate domain (acmetech.com).",
        "Prepare with placement cell interview guidelines."
      ],
      category: "Authentic Campus Recruitment",
      breakdown: {
        urgency: 10,
        financialDemand: 0,
        domainAuthenticity: 95,
        senderCredibility: 96
      },
      aiSummary: "This message displays legitimate institutional recruitment standards: references a valid job ID, uses official corporate communications, and explicitly states no fees are involved."
    }
  }
];

export const MOCK_COMMUNITY_STATS = {
  scamsReported: "1,248",
  studentsProtected: "18,420",
  avgDetectionTime: "1.4s",
  flaggedDomains: "460+"
};

export const COMMON_SCAM_TYPES = [
  {
    title: "Upfront Training / Registration Fee Scam",
    icon: "CreditCard",
    frequency: "Very High",
    description: "Fraudulent recruiters offer an internship but claim you must pay for 'training modules', 'laptop insurance', or a 'refundable registration fee'.",
    goldenRule: "A legitimate employer pays YOU, never the other way around."
  },
  {
    title: "Fake Check & Equipment Advance Scam",
    icon: "DollarSign",
    frequency: "High",
    description: "Scammer sends a counterfeit cashier's check to 'purchase home office equipment' and asks you to wire back the surplus to their vendor before the check bounces.",
    goldenRule: "Never wire money back from an advance check."
  },
  {
    title: "Telegram Task & Like Scam",
    icon: "MessageSquare",
    frequency: "Extremely High",
    description: "Offers high daily wages ($200+) for rating apps or liking videos, then demands deposits to unlock 'VIP commission levels'.",
    goldenRule: "Real companies never recruit via random WhatsApp/Telegram DMs."
  },
  {
    title: "Unsolicited Scholarship Processing Fee",
    icon: "GraduationCap",
    frequency: "High",
    description: "Claims you won a thousands-dollar grant you never applied for, requiring bank routing credentials and a small tax or wire fee.",
    goldenRule: "Real scholarships never ask for money or gift card codes to disburse awards."
  }
];
