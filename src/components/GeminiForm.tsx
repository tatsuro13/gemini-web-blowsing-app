// import {
//     DynamicRetrievalMode,
//     GoogleGenerativeAI,
//   } from "@google/generative-ai";
import { useState } from "react"

//google geminiの回答を受けるフォーム
//ボタンを押すと、google geminiの回答を受けて、表示する
// https://developers.googleblog.com/en/gemini-api-and-ai-studio-now-offer-grounding-with-google-search/
// https://ai.google.dev/gemini-api/docs/grounding?lang=node

export const GeminiForm: React.FC = () => {
    const [answer, setAnswer] = useState<string>('')
    // const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    // console.log('submit')
    // try{
    //     const apiKey: string = import.meta.env.VITE_GEMINI_API_KEY as string;
    //     const genAI = new GoogleGenerativeAI(apiKey);
    //     const model = genAI.getGenerativeModel(
    //         {
    //             model: "model/gemini-1.5-pro-002",
    //             tools:[
    //             {
    //                 googleSearchRetrieval: {
    //                     dynamicRetrievalConfig:{
    //                         mode: DynamicRetrievalMode.MODE_DYNAMIC,
    //                         dynamicThreshold: 0.7,
    //                     }
    //                 }      
    //             }
    //         ],
    //     },
    //     {apiVersion: "v1beta"}
    //     )
        
    //     const prompt = "What is the capital of Japan?"
    //     const result = await model.generateContent(prompt)

    //     if (result.response && result.response.candidates && result.response.candidates.length > 0) {
    //         console.log(result.response.candidates[0].groundingMetadata);
    //         const groundingMetadata = result.response.candidates[0].groundingMetadata;
    //         setAnswer(groundingMetadata ? JSON.stringify(groundingMetadata) : 'No answer found');
    //       } else {
    //         console.error('No candidates found in the response.');
    //       }
    //     } catch (error) {
    //       console.error('Error generating content:', error);
    //     }
    //   };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')
        const response = await fetch(`${import.meta.env.VITE_API_URL}/hello`)
        const data = await response.json()
        console.log(data)
        setAnswer(data.message)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <button type="submit">Get Gemini Answer</button>
        </form>
        <p>{answer}</p>
    </div>
  )
}