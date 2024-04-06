import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,config){
    const response =await fetch(url,config);
    const resData = response.json();
    console.log(!response.ok);
    if(!response.ok){
        throw new Error(resData.message || 'Something wend wrong, failed to send request.');
    }
    return resData;
    
}
export default function useHttp(url,config,initialData){
    const [isLoading,setLoading]=useState(false);
    const [error,setError]=useState();
    const [data,setData]=useState();
    
    
 const sendRequest=useCallback(async function sendrequest(){
    setLoading(true);
    try{
        const resData=await sendHttpRequest(url,config);
        setData(resData);
    }
    catch (error){
        
        setError(error.message||'Something wend wrong!');
    }
    setLoading(false);
 },[url,config])

 useEffect(
    ()=>{
        
        console.log(config);
        if(config &&(config.method==='GET' || !config.method) ||!config){
    sendRequest()}},[sendRequest]

 )
 return {
    data,
    isLoading,
    error,
 }

}