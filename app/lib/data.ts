export const user = {
  name: "Emir",
  fullName: "Emir Ayaz",
  email: "reostraemir@gmail.com",
  plan: "Pro" as const,
};

export const apiKey = {
  value: "hog_sk_live_3a91e2c5b7f4d8a6c2b9aebf",
  masked: "hog_sk_live_••••••••••••••••aebf",
};

export const mcpConfig = `{
  "mcpServers": {
    "hog": {
      "command": "npx",
      "args": ["-y", "hog-mcp"],
      "env": { "HOG_API_KEY": "$HOG_API_KEY" }
    }
  }
}`;

export const credits = {
  balance: "$120.42",
  lastToppedUp: "Apr 28",
  availableUntil: "May 28",
};

export const homeMetrics = {
  calls7d: { value: "12,483", delta: "+12.4% vs previous week", trend: "up" as const },
  creditBalance: { value: "$120.42", caption: "Last topped up Apr 28" },
  p95Latency: { value: "142 ms", delta: "+18ms vs last week", trend: "down" as const },
} as const;

export type Credential = {
  label: string;
  environment: "Production" | "Staging" | "Development" | "QA";
  apiKey: string;
  created: string;
  lastUsed: string;
};

export const credentials: Credential[] = [
  {
    label: "Dashboard",
    environment: "Production",
    apiKey: "hog_sk_live_••••••••••••••••aebf",
    created: "2023-11-12",
    lastUsed: "2024-06-05",
  },
  {
    label: "User Profile",
    environment: "Staging",
    apiKey: "hog_sk_live_••••••••••••••••aebf",
    created: "2024-01-18",
    lastUsed: "2024-05-30",
  },
  {
    label: "Analytics",
    environment: "Development",
    apiKey: "hog_sk_live_••••••••••••••••aebf",
    created: "2023-12-05",
    lastUsed: "2024-04-15",
  },
  {
    label: "Payments",
    environment: "Production",
    apiKey: "hog_sk_live_••••••••••••••••aebf",
    created: "2024-02-22",
    lastUsed: "2024-06-01",
  },
  {
    label: "Notifications",
    environment: "QA",
    apiKey: "hog_sk_live_••••••••••••••••aebf",
    created: "2023-10-09",
    lastUsed: "2024-05-20",
  },
  {
    label: "Settings",
    environment: "Staging",
    apiKey: "hog_sk_live_••••••••••••••••aebf",
    created: "2024-03-10",
    lastUsed: "2024-05-28",
  },
  {
    label: "Reports",
    environment: "Development",
    apiKey: "hog_sk_live_••••••••••••••••aebf",
    created: "2023-09-25",
    lastUsed: "2024-04-30",
  },
];

export const usageMetrics = {
  calls7d: { value: "12,483", delta: "+12.4% vs previous week", trend: "up" as const },
  successRate: { value: "99.4%", delta: "0.2pts vs last period", trend: "up" as const },
  avgLatency: { value: "142 ms", delta: "+18ms vs last week", trend: "down" as const },
  creditsUsed: { value: "4,820", caption: "≈ $24.18" },
} as const;

export type EndpointBreakdownItem = {
  label: string;
  description?: string;
  calls: string;
  unitCredits: string;
  credits: string;
};

export type EndpointRow = {
  endpoint: string;
  calls: string;
  success: string;
  avgLatency: string;
  p95: string;
  credits: string;
  breakdown?: EndpointBreakdownItem[];
};

export const endpointRows: EndpointRow[] = [
  {
    endpoint: "/enrichments",
    calls: "1,243",
    success: "99.8%",
    avgLatency: "128 ms",
    p95: "204 ms",
    credits: "3,729",
    breakdown: [
      {
        label: "/enriched-phone",
        description: "Phone number lookup",
        calls: "1,243",
        unitCredits: "1.5 cr",
        credits: "1,864",
      },
      {
        label: "/enriched-email",
        description: "Email verification & enrichment",
        calls: "1,243",
        unitCredits: "1.0 cr",
        credits: "1,243",
      },
      {
        label: "/company-data",
        description: "Employer match",
        calls: "1,243",
        unitCredits: "0.5 cr",
        credits: "622",
      },
    ],
  },
  {
    endpoint: "/deep-research",
    calls: "812",
    success: "99.4%",
    avgLatency: "38.2 s",
    p95: "61.4 s",
    credits: "42,224",
    breakdown: [
      {
        label: "/enriched-phone",
        description: "Avg. 2× per research run",
        calls: "1,624",
        unitCredits: "10 cr",
        credits: "16,240",
      },
      {
        label: "/enriched-email",
        description: "Avg. 2× per research run",
        calls: "1,624",
        unitCredits: "10 cr",
        credits: "16,240",
      },
      {
        label: "/company-data",
        description: "Employer & industry context",
        calls: "812",
        unitCredits: "6 cr",
        credits: "4,872",
      },
      {
        label: "/web-search",
        description: "Open web research",
        calls: "812",
        unitCredits: "4 cr",
        credits: "3,248",
      },
      {
        label: "LLM synthesis",
        description: "Model compute & summarization",
        calls: "812",
        unitCredits: "2 cr",
        credits: "1,624",
      },
    ],
  },
  {
    endpoint: "/people-search",
    calls: "604",
    success: "98.9%",
    avgLatency: "212 ms",
    p95: "418 ms",
    credits: "276",
    breakdown: [
      {
        label: "Search index",
        description: "Identity graph lookup",
        calls: "604",
        unitCredits: "0.30 cr",
        credits: "181",
      },
      {
        label: "Result hydration",
        description: "Attach profile fields",
        calls: "604",
        unitCredits: "0.16 cr",
        credits: "95",
      },
    ],
  },
];

export const recentRequests = [
  { time: "14:23:42", endpoint: "/enrichments", calls: "1,243", credits: "8" },
  { time: "14:18:11", endpoint: "/deep-research", calls: "812", credits: "42" },
  { time: "14:02:55", endpoint: "/people-search", calls: "604", credits: "4" },
  { time: "14:02:55", endpoint: "/people-search", calls: "604", credits: "4" },
  { time: "14:02:55", endpoint: "/people-search", calls: "604", credits: "4" },
];

export const statusBreakdown = [
  { label: "2xx success", pct: 95.2, color: "var(--success)" },
  { label: "4xx client error", pct: 3.6, color: "var(--warning)" },
  { label: "5xx server error", pct: 1.2, color: "var(--error)" },
];

export const spendingSummary = [
  { label: "Lifetime spend", value: "$4,441.90" },
  { label: "Period spend", value: "$1,203.30" },
  { label: "Remaining", value: "$120.42" },
];

export const creditPackages = [
  { name: "Basic", price: "$10", credits: "1,538 cr", buyLink: "https://buy.stripe.com/demo_basic" },
  { name: "Starter", price: "$20", credits: "3,200 cr", buyLink: "https://buy.stripe.com/demo_starter" },
  { name: "Growth", price: "$50", credits: "8,333 cr", buyLink: "https://buy.stripe.com/demo_growth" },
  { name: "Pro", price: "$100", credits: "16,949 cr", buyLink: "https://buy.stripe.com/demo_pro" },
  { name: "Scale", price: "$250", credits: "43,478 cr", buyLink: "https://buy.stripe.com/demo_scale" },
];

export const customCheckoutBase = "https://buy.stripe.com/demo_custom";

export type Invoice = {
  name: string;
  date: string;
  amount: string;
  status: "Completed" | "Failed";
};

export const invoices: Invoice[] = [
  { name: "INV-003", date: "2024-04-10", amount: "$1,250.00", status: "Completed" },
  { name: "INV-002", date: "2024-04-12", amount: "$980.50", status: "Completed" },
  { name: "INV-001", date: "2024-04-15", amount: "$1,100.00", status: "Failed" },
];

export const callsLineData = [
  { date: "May 5", calls: 1200 },
  { date: "May 6", calls: 740 },
  { date: "May 7", calls: 260 },
  { date: "May 8", calls: 980 },
  { date: "May 9", calls: 1480 },
  { date: "May 10", calls: 420 },
  { date: "May 11", calls: 380 },
];

export const activityData = [
  { date: "May 5", success: 6.8, failed: 2.6 },
  { date: "May 6", success: 4.9, failed: 5.5 },
  { date: "May 7", success: 1.8, failed: 0.4 },
  { date: "May 8", success: 6.4, failed: 4.6 },
  { date: "May 9", success: 7.3, failed: 2.7 },
  { date: "May 10", success: 2.1, failed: 3.6 },
  { date: "May 11", success: 2.4, failed: 3.2 },
];
