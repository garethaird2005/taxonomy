import {
  Code2,
  GitMerge,
  Globe,
  LayoutDashboard,
  PenTool,
  Rocket,
  Search,
  type Icon,
} from "lucide-react"

// PLACEHOLDER COPY: every string in this file is starter copy. Replace prices,
// case studies and FAQs with real ones before launch.

export type Service = {
  id: string
  icon: Icon
  title: string
  summary: string
  points: string[]
}

export type CaseStudy = {
  title: string
  client: string
  category: "Dashboard" | "Automation" | "Website"
  summary: string
  result: string
  // Renders a visible "Sample" badge until a real project replaces it.
  sample?: boolean
}

export type Step = {
  icon: Icon
  title: string
  description: string
}

export type Plan = {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  featured?: boolean
}

export const heroStats = [
  { value: "2–6 wks", label: "Typical delivery" },
  { value: "Fixed", label: "Price, agreed up front" },
  { value: "90+", label: "Lighthouse score target" },
]

export const services: Service[] = [
  {
    id: "dashboards",
    icon: LayoutDashboard,
    title: "Dashboards",
    summary:
      "Every number that runs your business on one screen, live, and trusted by the whole team.",
    points: [
      "Connects Stripe, HubSpot, Xero, Sheets, SQL and more",
      "KPIs, targets and alerts that match how you work",
      "Secure sign-in with per-role access",
    ],
  },
  {
    id: "automations",
    icon: GitMerge,
    title: "Workflow automations",
    summary:
      "Hand the repetitive work to software so your people spend their time where it counts.",
    points: [
      "Lead routing, onboarding, invoicing and reporting",
      "AI-assisted steps where they genuinely save time",
      "Monitored runs with alerts when something needs a human",
    ],
  },
  {
    id: "websites",
    icon: Globe,
    title: "High-end websites",
    summary:
      "Fast, accessible, beautifully crafted sites that turn visitors into enquiries.",
    points: [
      "Bespoke design built on Next.js and modern components",
      "Edit your own content without breaking the layout",
      "SEO, analytics and performance built in from day one",
    ],
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
    sample: true,
  },
  {
    title: "Hands-free client onboarding",
    client: "Professional services firm",
    category: "Automation",
    summary:
      "Contracts, invoices, folders and welcome emails created the moment a deal closes.",
    result: "Around 10 hours of admin saved each week",
    sample: true,
  },
  {
    title: "Launch site for a product studio",
    client: "Design-led startup",
    category: "Website",
    summary:
      "A fast, animated marketing site with a CMS the team edits without a developer.",
    result: "Sub-second loads on mobile",
    sample: true,
  },
]

export const steps: Step[] = [
  {
    icon: Search,
    title: "Discover",
    description:
      "A short call to understand your goals, your tools and where time or money is leaking.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "A clear proposal and clickable designs, with a fixed price before any build starts.",
  },
  {
    icon: Code2,
    title: "Build",
    description:
      "Weekly demos so you see real progress, with secure, tested, production-ready code.",
  },
  {
    icon: Rocket,
    title: "Launch & support",
    description:
      "Go live with documentation and training, then optional ongoing care and improvements.",
  },
]

export const plans: Plan[] = [
  {
    name: "Automation",
    price: "From £1,500",
    cadence: "per workflow",
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
    price: "From £4,500",
    cadence: "per project",
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
    price: "From £2,500",
    cadence: "per dashboard",
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
