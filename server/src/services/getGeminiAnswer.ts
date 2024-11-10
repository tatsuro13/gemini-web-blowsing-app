import {
    DynamicRetrievalMode,
    GoogleGenerativeAI,
  } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();
const apiKey: string = process.env.GEMINI_API_KEY as string;

// https://developers.googleblog.com/en/gemini-api-and-ai-studio-now-offer-grounding-with-google-search/
// https://ai.google.dev/gemini-api/docs/grounding?lang=node

export const getGeminiAnswer = async (question:string) => {
    console.log('getGeminiAnswer')
    console.log(question)
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

        // const prompt = {};
        const result = await model.generateContent(question)

        return result.response.text() 
        } catch (error) {
            console.error('Error generating content:', error);
            throw error;
        }
}