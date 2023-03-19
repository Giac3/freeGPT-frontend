import React, { useEffect, useState } from 'react'
import { FaUserAstronaut } from 'react-icons/fa'
import { BsRobot } from 'react-icons/bs'
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

type propBot = {
    content:string
}

const BotMessage = (obj:propBot) => {
    const [isCode, setIsCode] = useState(false)

    useEffect(() => {
        if (obj.content.includes("```")) {
            setIsCode(true)
        }
    }, [])

  return (
    <div className='w-full flex flex-row gap-4'>
        <div className='w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center'>
            <BsRobot className='w-6 h-6 text-gray-500 '/>
        </div>
        <div className='flex flex-col w-full'>
        {
            isCode ? obj.content.split("```").map((item, i) => {
                return i % 2 !== 0 ? <CopyBlock
                key={i}
                text={item}
                language={item.split("\n")[0]}
                showLineNumbers={false}
                theme={dracula}
              /> : <p key={i} className='w-full border-b-[2px]'>{item}</p>
                
            }) : <p className='w-full border-b-[2px]'>{obj.content}</p>
        }
        </div>
    </div>
  )
}

export default BotMessage
