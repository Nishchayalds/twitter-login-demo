import React from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { FaTrophy } from 'react-icons/fa6'

const Rankcard = ({rank}:any) => {
  return (
    <div className='bg-[#212121] rounded-lg p-3 flex items-center gap-4 w-full'>
      <div className="bg-green rounded-full p-2 text-[#000] text-xl"><FaTrophy /></div>
      <div className="">
        <p className='fon text-sm'>Current Order</p>
        <p className='fon text-sm text-green'>{rank}</p>
      </div>
    </div>
  )
}

export default Rankcard
