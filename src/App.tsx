import { useState, useRef, type FormEvent, useEffect } from "react"
import './App.css'

function App() {
  const [messageList, setMessageList] = useState<string[]>([])
  const [textboxVal, setTextboxVal] = useState<string>("")
  const [sendEnabled, setSendEnabled] = useState(true)
  const messageEndRef = useRef<HTMLDivElement | null>(null)

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

  //scroll to end when a new message is sent
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList])

  return (
    <>
      <div className="max-w-[800px] mx-auto flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto p-4 w-full">
          {messageList.map((message, index) => {
            let isUser = index % 2 == 0
            return (
              <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div key={index} className={`w-fit max-w-[70%] rounded-lg px-3 py-2 ${isUser ? 'bg-blue-400' : 'bg-gray-200'}`}>
                  {message}
                </div>
              </div>
            )
          })}
          <div ref={messageEndRef} />
        </div>

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
