import { useEffect, useRef, useState } from 'react'

import {  ChatCompletionRequestMessage } from 'openai'
import { BsSend } from 'react-icons/bs'
import UserMessage from './components/UserMessage'
import BotMessage from './components/BotMessage'
import Loading from './components/Loading'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaLock } from 'react-icons/fa'

function App() {
  const [chat, setChat] = useState<ChatCompletionRequestMessage[]>()
  const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [loading, setLoading] = useState(false)
  const finalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const getComp = async (messages:ChatCompletionRequestMessage[]) => {
    try {
      const body = {
        messages: messages
      }
      const res = await fetch("https://go-api-production-859d.up.railway.app/chatCompletion", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },        
        body: JSON.stringify(body) 
      })
      const data = await res.json()
      console.log(data)
      setChat((prev) => [...prev!, data])
      setLoading(false)
    } catch (error) {
      let reply:string = "Sorry there was an issue please try again"
      setChat((prev) => [...prev!, {"role": "assistant", "content": reply}])
      setLoading(false)
    }
  }
  
  
  const handleSendMessage = () => {
    setLoading(true)
    if (messageRef.current.value !== "") {
      let message = messageRef.current.value 
      if (chat!) {
        setChat((prev) => [...prev!, {"role": "user", "content": message}])
        let send: ChatCompletionRequestMessage[] = [...chat, {"role": "user", "content": message}]
        getComp(send)
      } else {
        setChat([{"role": "user", "content": message}])
        getComp([{"role": "user", "content": message}])
      }
    }
    messageRef.current.value = ""
  }

  useEffect(() => {
    if (finalRef.current!) {
      finalRef.current.scrollIntoView()
    }

  }, [chat])
  

  return (
    <div className="bg-gray-100 w-screen h-screen fixed flex items-center justify-center flex-col">
      <div className=' max-w-[800px] min-w-[350px] w-full h-10 mb-2'>
      <Select defaultValue='gpt-3.5-turbo'>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Model" />
        </SelectTrigger>
        <SelectContent >
          <div className='flex items-center justify-center opacity-40'>
          <FaLock className='ml-2'/>
          <SelectItem disabled className='pl-3' value="gpt-4"> gpt-4</SelectItem>
          </div>
          <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
          <div className='flex items-center justify-center opacity-40'>
          <FaLock className='ml-2'/>
          <SelectItem disabled className='pl-3' value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</SelectItem>
          </div>
        </SelectContent>
      </Select>
      </div>
      
      <div className='bg-gray-300 w-full max-w-[800px] min-w-[350px] h-[600px] rounded-md shadow-md p-2 flex flex-col gap-4 overflow-y-auto'>
        {
          chat! ? null : <h1 className=' w-full h-full flex items-center justify-center text-3xl text-gray-50 opacity-50'>FreeGPT</h1>  
        }
      
        {
          chat! ? chat.map((chats, i) => {
            return chats["role"] === "user" ? <div key={i} ref={ i === chat.length-1? finalRef : null}><UserMessage  content={chats["content"]}/></div> : <div key={i} ref={ i === chat.length-1? finalRef : null}><BotMessage  content={chats["content"]}/></div>
          }) : null
        }

        {
          loading! ? <Loading/> : null
        }
        
      </div>
      <div className='flex items-center justify-center shadow-sm pt-4 w-full max-w-[500px] min-w-[350px]'>
      <input placeholder='Type Something...' ref={messageRef} className=' w-full outline-none h-12 rounded-md rounded-tr-none rounded-br-none p-2'/>
      <button onClick={handleSendMessage} className='h-12 w-12 bg-gray-200 rounded-tr-md hover:bg-gray-300 duration-300 hover:text-white rounded-br-md flex items-center justify-center'>
        <BsSend className='w-5 h-5'/>
      </button>
      </div>
    </div>
  )
}

export default App
