import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResize } from '@/utils/resize'
import { useListen, useSize, useListen_ } from '@/utils/listen'
import UseState from '@/Hooks/useState'
import UseEffect from '@/Hooks/useEffect'
import UseLayoutEffect from '@/Hooks/useLayoutEffect'
import UseMemo from '@/Hooks/useMemo'
import UseImperativeHandle from '@/Hooks/useImperativeHandle'
import Demo from '@/Hooks/useReducer'
import { NewDeomo, MyContextProvider } from "@/Hooks/useContext"
import UseRef from '@/Hooks/useRef'
import UseCallback from '@/Hooks/useCallback'
import DOM from '@/Class/virtual3'
import FatherToSon from '@/componentsComment/FatherToSon'
import SonToFather from '@/componentsComment/SonToFather'
import Brother from '@/componentsComment/Brother'
import AcrossComponents from '@/componentsComment/AcrossComponents'
import Controlled from '@/controlledComponents/Controlled'
import Uncontrolled from '@/controlledComponents/Uncontrolled'
import Game from '@/ClassComponent'
import Main from '@/utils/drop'
import Drag from '@/utils/Drag'
function Home() {
  const resizeRef = useRef(null);
  // const { rect } = useListen(resizeRef)
  // const [rect,rectRef] = useListen_()
  // const size = useResize()
  // const state = useSize(document.body)
  const navigate = useNavigate()

  // console.log(size, rect);

  return (
    <>
      <button onClick={() => navigate('/mine')}>Mine</button>
      {/* <div className="resizebox" ref={rectRef}>
        useResize
        <div>width:{rect?.width}height:{rect?.height}</div>
      </div> */}
      {/* <div>
        试着拖动浏览器窗口 <br />
        实时渲染 -- width: {state.width} px, height: {state.height} px
      </div> */}

      {/* <UseState /><br/>
      <UseEffect size={size.width} /><br/>
      <UseLayoutEffect /><br/>
      <UseMemo  /><br/> */}
      {/* <UseCallback /><br /> */}
      {/* <UseImperativeHandle/><br/>
      <Demo /><br/> */}
      {/* <MyContextProvider>
        <NewDeomo />
      </MyContextProvider><br /> */}
      {/* <UseRef/>  */}

      {/* <DOM  />  */}
      {/* <FatherToSon/>
      <SonToFather/>
      <Brother/>
      <AcrossComponents/> */}
      {/* <Controlled/> */}
      {/* <Uncontrolled/> */}
      {/* <Game/> */}
      {/* <Input onChange />
      <Drop dataSource={[]} onDropSuccess={(newVal)=>{}}>
        {[].map(item => <p>{item}</p>)}
      </Drop> */}
      <Main />
      <Drag/>
    </>

  )
}

export default Home