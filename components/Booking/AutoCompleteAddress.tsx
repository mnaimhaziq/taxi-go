"use client";
import React, { useContext, useEffect, useState } from "react";

export default function AutoCompleteAddress() {
  const [source, setSource] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  // const { sourceCordinates, setSourceCordinates } =
  //   useContext(SourceCordiContext);
  // const { destinationCordinates, setDestinationCordinates } = useContext(
  //   DestinationCordiContext
  // );

  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDistination] = useState<any>();

 

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source,destination]);

  const getAddressList = async () => {
    setAddressList([]);
    const query=sourceChange?source:destination;
    const res=await fetch('/api/search-address?q='+query,{
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result)
    setAddressList(result.data);
  };

  
  const onSourceAddressClick = (item: any) => {
    setSource(item.display_name);
    setAddressList([]);
    setSourceChange(false)
  };

  const onDestinationAddressClick=async(item:any)=>{
    setDistination(item.display_name);
    setAddressList([]);
    setDestinationChange(false)
   
}

  return (
    <div className=''>
    <div className='relative'>
        <label className='text-gray-400 text-[13px]'>Where From?</label>
        <input type="text"
            className='bg-white p-1 
            border-[1px] w-full 
            rounded-md outline-none
            focus:border-yellow-300 text-[14px]'
            value={source}
            onChange={(e)=>{
                setSource(e.target.value);
                setSourceChange(true)
            }}
        />

        {addressList&&sourceChange?
        <div className='shadow-md p-1 rounded-md
        absolute w-full bg-white z-20'>
        {addressList?.map((item:any,index:number)=>(
            <h2 key={index} className='p-3 hover:bg-gray-100
            cursor-pointer'
            onClick={()=>{onSourceAddressClick(item)}}
            >{item.display_name}</h2>
        ))}
       </div>:null}
    </div>
    <div className='relative'>
        <label className='text-gray-400 text-[13px]'>Where To?</label>
        <input type="text"
            className='bg-white p-1 
            border-[1px] w-full 
            rounded-md outline-none
            focus:border-yellow-300 text-[14px]'
            value={destination}
            onChange={(e)=>{setDistination(e.target.value);setDestinationChange(true)}}
        />

        {addressList&&destinationChange?
        <div className='shadow-md p-1 rounded-md
        absolute w-full bg-white'>
        {addressList?.map((item:any,index:number)=>(
            <h2 key={index} className='p-3 hover:bg-gray-100
            cursor-pointer'
            onClick={()=>{
                onDestinationAddressClick(item)}}
            >{item.display_name}</h2>
        ))}
       </div>:null}
    </div>
</div>
  );
}
