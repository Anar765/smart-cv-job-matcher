import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";
import {
  Target,
  Search,
  Lightbulb,
  BarChart3,
  Shield,
  Zap
} from "lucide-react";

interface FeatureCardProp {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    title: string,
    description: string
}

export const features: FeatureCardProp[] = [
    {
        icon: Target,
        title: "Match Score Analysis",
        description: "Get an instant compatibility score between your CV and any job description. Understand exactly where you stand.",
    },
    {
        icon: Search,
        title: "Skill Gap Detection",
        description: "Identify missing skills and qualifications that employers are looking for. Know what to improve before applying.",
    },
    {
        icon: Lightbulb,
        title: "AI Suggestions",
        description: "Receive personalized recommendations on how to enhance your CV and increase your chances of lanVisualize your skills distribution and see how your technical and soft skills compare to job requirements.ding the job.",
    },
    {
        icon: BarChart3,
        title: "Detailed Analytics",
        description: "Visualize your skills distribution and see how your technical and soft skills compare to job requirements.",
    },
    {
        icon: Shield,
        title: "Privacy First",
        description: "Your data is secure and never shared. All processing happens with enterprise-grade encryption.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Get comprehensive analysis results in seconds, not hours. Powered by advanced AI technology.",
    }
];