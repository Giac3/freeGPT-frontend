import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className='w-full flex flex-row gap-4 items-center'>
        <div className='w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center'>
            <BsRobot className='w-6 h-6 text-gray-500 '/>
        </div>
        <motion.div 
        initial={{scale: 0}}
        animate={{scale:1}}
        transition={{duration:1, repeat: Infinity}}
        className='bg-white w-3 h-3 rounded-full shadow-md'></motion.div>
        <motion.div 
        initial={{scale: 0}}
        animate={{scale:1}}
        transition={{duration:1, repeat: Infinity}}
        className='bg-white w-3 h-3 rounded-full shadow-md'></motion.div>
        <motion.div 
        initial={{scale: 0}}
        animate={{scale:1}}
        transition={{duration:1, repeat: Infinity}}
        className='bg-white w-3 h-3 rounded-full shadow-md'></motion.div>

    </div>
  )
}

export default Loading
