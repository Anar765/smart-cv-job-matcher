interface StepsProp {
    step: string,
    title: string,
    description: string
}

export const steps: StepsProp[] = [
    {
        step: "01",
        title: "Upload Your CV",
        description: "Drag and drop or upload your CV in PDF format. We support all standard CV formats.",
    },
    {
        step: "02",
        title: "Add Job Description",
        description: "Paste the job description you are interested in. Our AI will analyze the requirements.",
    },
    {
        step: "03",
        title: "Get Results",
        description: "Receive detailed analysis with match score, skill gaps, and actionable suggestions.",
    },
];