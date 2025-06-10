import { useState, type FormEvent } from "react"
import './App.css'

function App() {
  const [messageList, setMessageList] = useState<string[]>([])
  const [textboxVal, setTextboxVal] = useState<string>("")
  const [sendEnabled, setSendEnabled] = useState(true)

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (textboxVal.trim() !== "" && sendEnabled) {
      setMessageList(prev => [...prev, textboxVal]);
      setTextboxVal("")
      setSendEnabled(false)
      sendResponse();
    }
  }

  function sendResponse() {
    setTimeout(() => {
      setMessageList(prev => [...prev, "quack!"]);
      setSendEnabled(true)
    }, 500)
  }

  return (
    <>
      <div className="max-w-[800px] mx-auto relative h-full">
        {messageList.map((message, index) => {
          return (
            <div key={index}>
              msg {index}: {message}
            </div>
          )
        })}

        <form onSubmit={handleSubmit} className="border p-2 rounded flex flex-col gap-2">
          <input type="text" onChange={(e) => setTextboxVal(e.target.value)} value={textboxVal}
            className="w-full border rounded px-2 py-1" />
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">send</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
