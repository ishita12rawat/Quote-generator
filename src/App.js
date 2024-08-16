import React,{useState} from 'react'

export default function App() {
  const[quote,getquote]=useState('')
  const[loading,setloading]=useState(false)
  const fetchdata=async()=>{
 setloading(true)
    let url=`https://api.quotable.io/random`
    try{
 let data=await fetch(url)
 if(!data.ok){
  throw new Error('not found')
 }let parse=await data.json()
 getquote(parse)
    }catch(err){
      console.log(err)
    }finally {
      setloading(false);
  }}
  return (
    <>
    
    <div className="w-full min-h-screen bg-slate-800 ">
      <div className=''>
    <h1 className='text-4xl text-center text-white'>Quote Generator</h1>
    <div className='block mt-9 mx-6 p-4'>
      {quote && (
      <blockquote className='block rounded-lg text-3xl text-white'>
          <p>"{quote.content}"</p>
          <footer>- {quote.author}</footer>
        </blockquote>)}
    </div>
    <button onClick={fetchdata} className='block rounded-lg mx-6 p-4 mt-3 bg-blue-500 text-black'  disabled={loading}>{loading ?'loading....': 'Next.'}</button>
    </div>
    </div>
    </>
  )
}

