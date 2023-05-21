import {useEffect, useRef} from "react";
import  ChildCom from './components'
const TestPage =()=>{
  useEffect(()=>{
     let timer= setInterval(()=>{
        const ele = document.getElementById('iframe-content');
        const height = ele?.offsetHeight;
       // 将高度信息发送给父页面
        window.top?.postMessage(height, '*');
      },300)
    return ()=>timer&&clearInterval(timer);
    },[]);
  return <div id='iframe-content' style={{
    background:'red'
  }}>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias assumenda at beatae doloremque eius esse et fugit itaque, iure laborum omnis possimus quam reiciendis temporibus, tenetur voluptas voluptatem. Quasi?</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias assumenda at beatae doloremque eius esse et fugit itaque, iure laborum omnis possimus quam reiciendis temporibus, tenetur voluptas voluptatem. Quasi?</p>
    <ChildCom/>
  </div>
}

export default TestPage;
