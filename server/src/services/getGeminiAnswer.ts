import {
    DynamicRetrievalMode,
    GoogleGenerativeAI,
  } from "@google/generative-ai";

export const getGeminiAnswer = async (req: Request) => {
    console.log('getGeminiAnswer')
    console.log(req)
    try{
        const apiKey: string = process.env.GEMINI_API_KEY as string;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel(
            {
                model: "model/gemini-1.5-pro-002",
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

        const prompt = "What is the capital of Japan?"
        const result = await model.generateContent(prompt)

        if (result.response && result.response.candidates && result.response.candidates.length > 0) {
            console.log(result.response.candidates[0].groundingMetadata);
            const groundingMetadata = result.response.candidates[0].groundingMetadata;
            return groundingMetadata ? JSON.stringify(groundingMetadata) : 'No answer found';
          } else {
            console.error('No candidates found in the response.');
          }
        } catch (error) {
            console.error('Error generating content:', error);
            }

}