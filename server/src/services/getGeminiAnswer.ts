import {
    DynamicRetrievalMode,
    GoogleGenerativeAI,
  } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();
const apiKey: string = process.env.GEMINI_API_KEY as string;
// https://developers.googleblog.com/en/gemini-api-and-ai-studio-now-offer-grounding-with-google-search/
// https://ai.google.dev/gemini-api/docs/grounding?lang=node

export const getGeminiAnswer = async (req: Request) => {
    console.log('getGeminiAnswer')
    console.log(req)
    try{
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel(
            {
                model: "models/gemini-1.5-pro-002",
                tools:[
                {
                    googleSearchRetrieval: {
                        dynamicRetrievalConfig:{
                            mode: DynamicRetrievalMode.MODE_DYNAMIC,
                            dynamicThreshold: 0.7,
                        }
                    }      
                }
            ],
        },
        {apiVersion: "v1beta"}
        )

        const prompt = "日本の首都は?"
        const result = await model.generateContent(prompt)

        return result.response.text() 
        } catch (error) {
            console.error('Error generating content:', error);
        }
}