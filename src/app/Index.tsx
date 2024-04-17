'use client'

import React, { useEffect, useState } from 'react'
import Loader from './Loader'

declare var RedPayPop : any

const Index = () => {

  const [email, setEmail] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(true)

  useEffect(() => {

    const timeOutInterval = setTimeout(
      () => setLoad(false), 2000
    )

    return () => clearTimeout(timeOutInterval)
  },[])

  const handleEmail = (event: any) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handleAmount = (event: any) => {
    event.preventDefault()
    setAmount(event.target.value * 100)
  }

  const handleSubmit = async () => {
    setLoad(true)

    try {
      const handler = await RedPayPop.setup({
        key: process.env.NEXT_PUBLIC_KEY,
        email: email,
        amount: amount,
  
        onClose: function(){
          console.log("Window Closed")
        },
  
        callback: function(res:any){
          console.log(res)
        }
      })
  
      handler.openIframe()
    } catch (error) {
      console.log(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    <div className='h-[100vh] bg-[#fffffe] flex items-center justify-center my-auto'>
      {
        load ? <Loader />
        :
        <form>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input 
            type="text" 
            placeholder="(e.g) JohnDoe@gmail.com" 
            className="input bg-white input-bordered w-[100vw] max-w-xs" 
            onChange={(e) => handleEmail(e)}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input 
            type="number" 
            placeholder="(e.g) 200" 
            min={100}
            className="input bg-white input-bordered w-[100vw] max-w-xs" 
            onChange={(e) => handleAmount(e)}
          />
        </label>

        <button type="submit" className='w-full bg-black text-white mt-3 py-3 rounded disabled:opacity-10' disabled={
          email === "" || amount === 0
        } onClick={handleSubmit}>Submit</button>
      </form>
      }
    </div>
  )
}

export default Index