import React from 'react'
import { FaUserAstronaut } from 'react-icons/fa'
import { BsRobot } from 'react-icons/bs'

type propUser = {
    content:string
}

const UserMessage = (obj:propUser) => {
  return (
    <div className='w-full flex flex-row gap-4'>
        <div className='w-10 h-10 bg-gray-500 rounded-md shadow-md flex items-center justify-center'>
            <FaUserAstronaut className='w-6 h-6 text-white'/>
        </div>
        <p className='w-full border-b-[2px]'>{obj.content}
        </p>
    </div>
  )
}

export default UserMessage
