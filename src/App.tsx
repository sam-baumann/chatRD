import { useState, useRef, type FormEvent, useEffect } from "react"
import './App.css'

function App() {
  const [messageList, setMessageList] = useState<string[]>([])
  const [textboxVal, setTextboxVal] = useState<string>("")
  const [sendEnabled, setSendEnabled] = useState(true)
  const [showPlaceholder, setShowPlaceholder] = useState(false)
  const messageEndRef = useRef<HTMLDivElement | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (textboxVal.trim() !== "" && sendEnabled) {
      setMessageList(prev => [...prev, textboxVal]);
      setTextboxVal("")
      setSendEnabled(false)
      setShowPlaceholder(true)
      sendResponse();
    }
  }

  function createResponse() {
    let words = ["quack", "squeak"]
    let punctuation = ['?', '!', '', '!!!', '???', '‽']
    let getRandom = (arr: string[]) => {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    return getRandom(words) + getRandom(punctuation);
  }

  function sendResponse() {
    setTimeout(() => {
      setMessageList(prev => [...prev, createResponse()]);
      setSendEnabled(true)
      setShowPlaceholder(false)
    }, 500)
  }

  //scroll to end when a new message is sent
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList])

  return (
    <div className="dark:bg-gray-800">
      <div className="max-w-[800px] mx-auto flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto p-4 w-full">
          {messageList.length == 0 ?
            <div className="h-full flex items-center justify-center">
              <div className="text-3xl text-center dark:text-white">Start debugging!</div>
            </div>
            : null}
          {messageList.map((message, index) => {
            let isUser = index % 2 == 0
            return (
              <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div key={index} className={`w-fit max-w-[70%] rounded-lg px-3 py-2 ${isUser ? 'bg-blue-400 dark:bg-gray-600 dark:text-white' : 'bg-yellow-300'}`}>
                  {message}
                </div>
              </div>
            )
          })}
          {showPlaceholder ?
            <div className="text-5xl dark:text-white">...</div>
            : null}
          <div ref={messageEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border p-2 rounded flex flex-col gap-2 dark: border-gray-400">
          <input type="text" onChange={(e) => setTextboxVal(e.target.value)} value={textboxVal}
            className="w-full border rounded px-2 py-1 dark:border-gray-400 dark:text-white" 
            placeholder="Ask a question"/>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
