// import {
//     DynamicRetrievalMode,
//     GoogleGenerativeAI,
//   } from "@google/generative-ai";
import { useState } from "react"

//google geminiの回答を受けるフォーム
//ボタンを押すと、google geminiの回答を受けて、表示する
export const GeminiForm: React.FC = () => {
    const [answer, setAnswer] = useState<string>('')

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/gemini`, {
              method: 'GET', // または 'POST' など、適切な HTTP メソッドを使用
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error status: ${response.status}`);
          }
          const data = await response.json();  
          if (data) {
              setAnswer(data);
          } else {
              console.error('No data received');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <button type="submit">Get Gemini Answer</button>
        </form>
        <pre>{answer}</pre>
    </div>
  )
}