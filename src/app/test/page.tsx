"use client";

import {useEffect, useState} from "react";

interface CardProps{
    title: string;
    color: string;
}

const Card = (props:CardProps)=>{
    return <div className={`${props.color}`}>{props.title}</div>
}

export default function Home(){
    const [count, setCount] = useState(0);
    const [counterOver20, setCounterOver20] = useState(false);

    useEffect(()=>{
        setCounterOver20(count>20);
    }, [count]);
    return(
        <div className="bg-blue-400 text-white">
            <Card color={"bg-green-500"} title={`Brojac: ${count}`}></Card>
            {/* <p className={"text-[32px]"} >Brojac: {count}</p> */}
            <button className={"bg-yellow-400"} onClick={()=>setCount(prev=>prev+1)}> Povecaj brojac</button>
            {counterOver20 && <Card color={"bg-red-400"} title={"Brojac je presao 20!"}></Card>}
        </div>
    );
}