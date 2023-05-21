import {useEffect, useState} from "react";

const ChildCom=()=>{
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    let timer = setTimeout(()=>{
      setLoading(true)
    },300)
    return timer&&clearTimeout(timer);
  },[])
  return <>
    {loading&&<div>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab dignissimos, earum eum ex exercitationem explicabo harum incidunt ipsum maxime molestiae nihil non optio repellat sequi. Beatae cumque obcaecati sapiente.</p>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab dignissimos, earum eum ex exercitationem explicabo harum incidunt ipsum maxime molestiae nihil non optio repellat sequi. Beatae cumque obcaecati sapiente.</p>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab dignissimos, earum eum ex exercitationem explicabo harum incidunt ipsum maxime molestiae nihil non optio repellat sequi. Beatae cumque obcaecati sapiente.</p>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab dignissimos, earum eum ex exercitationem explicabo harum incidunt ipsum maxime molestiae nihil non optio repellat sequi. Beatae cumque obcaecati sapiente.</p>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab dignissimos, earum eum ex exercitationem explicabo harum incidunt ipsum maxime molestiae nihil non optio repellat sequi. Beatae cumque obcaecati sapiente.</p>
  </div>}
    </>
}
export default ChildCom;
