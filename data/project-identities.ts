import type { LucideIcon } from "lucide-react";
import {
    FileSpreadsheet,
    ReceiptText,
    Search,
    Trophy,
    TrendingUp,
    Workflow,
} from "lucide-react";

export type ProjectIdentity = {
    name: string;
    accent: string;
    icon: LucideIcon;
};

export const projectIdentities: Record<string, ProjectIdentity> = {
    "Market Research & Competitive Analysis": {
        name: "Market Research & Competitive Analysis",
        accent: "#60a5fa",
        icon: Search,
    },
    "Automated Balance Sheet Generator": {
        name: "Automated Balance Sheet Intelligence",
        accent: "#2dd4bf",
        icon: FileSpreadsheet,
    },
    "Automated Balance Sheet Intelligence": {
        name: "Automated Balance Sheet Intelligence",
        accent: "#2dd4bf",
        icon: FileSpreadsheet,
    },
    "Bank Operation Workflow Analysis": {
        name: "Bank Operation Workflow Analysis",
        accent: "#f59e0b",
        icon: Workflow,
    },
    "Economic Research Model": {
        name: "Economic Research Model",
        accent: "#a78bfa",
        icon: TrendingUp,
    },
    "Income Tax Return (ITR) Automation System": {
        name: "Income Tax Return (ITR) Automation System",
        accent: "#22d3ee",
        icon: ReceiptText,
    },
    "Sports Recommendation System": {
        name: "Sports Recommendation System",
        accent: "#fb7185",
        icon: Trophy,
    },
};

export const analyticsProjectIdentities = [
    projectIdentities["Market Research & Competitive Analysis"],
    projectIdentities["Automated Balance Sheet Intelligence"],
    projectIdentities["Bank Operation Workflow Analysis"],
] as const;

export const codingProjectIdentities = [
    projectIdentities["Economic Research Model"],
    projectIdentities["Income Tax Return (ITR) Automation System"],
    projectIdentities["Sports Recommendation System"],
] as const;

export function getProjectIdentity(title: string): ProjectIdentity {
    return projectIdentities[title] ?? {
        name: title,
        accent: "#94a3b8",
        icon: Search,
    };
}
