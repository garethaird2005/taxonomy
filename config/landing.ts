// PLACEHOLDER COPY: every string in this file is starter copy. Replace prices,
// case studies and FAQs with real ones before launch.

export type Service = {
  id: "dashboards" | "automations" | "websites"
  index: string
  title: string
  tagline: string
  heading: string
  description: string
  points: string[]
}

export type CaseStudy = {
  title: string
  client: string
  category: "Dashboard" | "Automation" | "Website"
  summary: string
  result: string
  // Seed for the card's generated landscape artwork.
  seed: number
  // Renders a visible "Sample" label until a real project replaces it.
  sample?: boolean
}

export type Plan = {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  featured?: boolean
}

export const tools = [
  "Stripe",
  "HubSpot",
  "Xero",
  "Google Sheets",
  "Slack",
  "Notion",
  "Airtable",
  "Shopify",
  "Salesforce",
  "QuickBooks",
  "Postgres",
  "Zapier",
  "Make",
  "Next.js",
]

export const services: Service[] = [
  {
    id: "dashboards",
    index: "01",
    title: "Dashboards",
    tagline: "Live numbers you can trust",
    heading: "See the whole business on one screen.",
    description:
      "Live numbers from your billing, CRM, accounts and database, with targets and alerts the whole team can trust.",
    points: [
      "Connects Stripe, HubSpot, Xero, Sheets, SQL and more",
      "KPIs, targets and alerts shaped around how you work",
      "Secure sign-in with access by role",
    ],
  },
  {
    id: "automations",
    index: "02",
    title: "Automations",
    tagline: "Busywork that runs itself",
    heading: "Hand the busywork to software.",
    description:
      "Onboarding, invoicing, reporting and lead routing run on their own, so your people spend their time where it counts.",
    points: [
      "End-to-end workflows across the tools you already use",
      "AI-assisted steps where they genuinely save time",
      "Monitored runs, with alerts when a human is needed",
    ],
  },
  {
    id: "websites",
    index: "03",
    title: "Websites",
    tagline: "Sites that win the work",
    heading: "A website worthy of your best work.",
    description:
      "Bespoke design and engineering that loads instantly, ranks well and turns visitors into enquiries.",
    points: [
      "Designed from scratch, built on Next.js",
      "Edit your own content without breaking the layout",
      "SEO, analytics and performance built in from day one",
    ],
  },
]

export const reasons = [
  {
    title: "One partner, three disciplines",
    description:
      "Data, automation and web, designed to work together instead of bolted on.",
  },
  {
    title: "Fixed price, no surprises",
    description:
      "A written quote before work starts, then a demo of real progress every week.",
  },
  {
    title: "Secure by default",
    description:
      "Least-privilege access, no credentials in code and sign-in on every dashboard.",
  },
  {
    title: "Accountable for outcomes",
    description:
      "Measured by the hours we save you and the enquiries we win, not hours billed.",
  },
]

export const commitments = [
  { value: "2–6 wks", label: "Typical delivery" },
  { value: "Fixed", label: "Price, agreed up front" },
  { value: "90+", label: "Lighthouse performance target" },
  { value: "1 day", label: "Reply to every enquiry" },
]

export const steps = [
  {
    title: "Discover",
    description:
      "A short call to understand your goals, your tools and where time or money is leaking.",
  },
  {
    title: "Design",
    description:
      "A clear proposal and clickable designs, with a fixed price before any build starts.",
  },
  {
    title: "Build",
    description:
      "Weekly demos of real progress, with secure, tested, production-ready code.",
  },
  {
    title: "Launch",
    description:
      "Go live with documentation and training, then optional care and improvements.",
  },
]

export const caseStudies: CaseStudy[] = [
  {
    title: "Revenue cockpit",
    client: "B2B SaaS company",
    category: "Dashboard",
    summary:
      "Billing, CRM and product data unified into one live view for the leadership team.",
    result: "Weekly reporting cut from a day to minutes",
    seed: 7,
    sample: true,
  },
  {
    title: "Hands-free client onboarding",
    client: "Professional services firm",
    category: "Automation",
    summary:
      "Contracts, invoices, folders and welcome emails created the moment a deal closes.",
    result: "Around 10 hours of admin saved each week",
    seed: 23,
    sample: true,
  },
  {
    title: "Launch site for a product studio",
    client: "Design-led startup",
    category: "Website",
    summary:
      "A fast, quietly animated marketing site the team edits without a developer.",
    result: "Sub-second loads on mobile",
    seed: 41,
    sample: true,
  },
]

export const plans: Plan[] = [
  {
    name: "Automation",
    price: "£1,500",
    cadence: "from, per workflow",
    description: "Remove a repetitive process end to end.",
    features: [
      "Process mapping session",
      "Build, test and monitoring",
      "Error alerts and runbook",
      "30 days of support",
    ],
  },
  {
    name: "Website",
    price: "£4,500",
    cadence: "from, per project",
    description: "A bespoke, high-performance site that sells for you.",
    features: [
      "Custom design and build",
      "CMS for your own edits",
      "SEO, analytics and hosting setup",
      "60 days of support",
    ],
    featured: true,
  },
  {
    name: "Dashboard",
    price: "£2,500",
    cadence: "from, per dashboard",
    description: "Live, trusted numbers for the decisions that matter.",
    features: [
      "Up to 5 connected data sources",
      "Custom KPIs, targets and alerts",
      "Role-based access",
      "30 days of support",
    ],
  },
]

export const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most automations ship in one to two weeks, dashboards in two to four, and websites in four to six. You get a timeline with the proposal.",
  },
  {
    question: "Do you work with the tools we already use?",
    answer:
      "Yes. The aim is to connect what you have rather than replace it, whether that is a CRM, accounting software, spreadsheets or a database.",
  },
  {
    question: "Who owns the work when it is finished?",
    answer:
      "You do. Code, designs, accounts and data all belong to you, with documentation so anyone can maintain it.",
  },
  {
    question: "Is our data kept secure?",
    answer:
      "Access is least-privilege by default, credentials are never stored in code, and dashboards sit behind secure sign-in.",
  },
  {
    question: "Can you support us after launch?",
    answer:
      "Every project includes a support period, and an optional monthly care plan covers updates, monitoring and small improvements.",
  },
]
