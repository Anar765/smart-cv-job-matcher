import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function getGeminiAnalysis(file: File | null, jobDescription: string) {

    if(!file) {
        console.error("Provide your CV");
        return;
    }

    const base64Data = await fileToBase64(file);

    const prompt = `
        Analyze the following CV against this Job Description: ${jobDescription}.
        
        Return a JSON object with this exact structure:
        {
            "job": {
                "title": string,
                "company": string,
                "date": string
            },
            "compatibilityScore": number,
            "skillsSummary": {
                "matched": number,
                "missing": number
            },
            "cvKeywords": string[],
            "jdKeywords": string[],
            "matchingSkills": string[],
            "missingRequirements": string[],
            "suggestions": [
                {
                "type": "improvement" | "warning" | "positive",
                "title": string,
                "description": string,
                "actionLabel": string,
                "actionUrl": string
                }
            ],
            "summary": string
        }

        Rules:
        - Extract "title" and "company" from the job description.
        - If no date is provided, generate a realistic recent date (YYYY-MM-DD).
        - compatibilityScore must be 0-100.

        For the "suggestions":
        - Identify gaps like Cloud, DevOps, or specific frameworks.
        - Provide a helpful "actionLabel" (e.g., "View Certifications" or "Learn More").
        - Provide a relevant "actionUrl" (e.g., a documentation link or roadmap).
        - If the candidate is strong in an area, provide a positive suggestion on how to highlight it further.

        Strictly output valid JSON. No markdown.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: file.type
                            }
                        }
                    ]
                }
            ]
        });

        console.log(response.text);
        return response.text;
    } catch (error) {
        console.error("Analysis failed:", error);
    }
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1];
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
}

export default getGeminiAnalysis;