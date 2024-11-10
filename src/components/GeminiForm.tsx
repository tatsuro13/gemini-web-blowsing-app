import { useState } from "react"

//google geminiの回答を受けるフォーム
//ボタンを押すと、google geminiの回答を受けて、表示する
export const GeminiForm: React.FC = () => {
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit')
        try {
            const response = await fetch('http://localhost:2000/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question}),
            });
  
          if (!response.ok) {
              throw new Error(`HTTP error status: ${response.status}`);
          }
          const data = await response.json();

          if (data) {
              setAnswer(data.answer);
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
            <input type="text" placeholder="Ask Gemini" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <button type="submit">Get Gemini Answer</button>
        </form>
        <pre>{answer}</pre>
    </div>
  )
}