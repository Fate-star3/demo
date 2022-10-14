import React, { useMemo, useState } from 'react'

// useMemo是用来缓存计算属性的，它会在发现依赖未发生改变的情况下返回旧的计算属性值的地址。

// useMemo绝不是用的越多越好，缓存这项技术本身也需要成本。

// useMemo的使用场景之一是:只需要给拥有巨大计算量的计算属性缓存即可。

// useMemo的另一个使用场景是：当有计算属性被传入子组件，并且子组件使用了react.memo进行了缓存的时候,为了避免子组件不必要的渲染时使用
const App = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const treatCount = useMemo(() => {  //useMemo 返回的是一个值
    console.log('treatCount');
    return count1 + 10
  }, [count1])
  return (
    <div>
      treatCount:{treatCount} <br />
      {/* 当点击count1时，count1的值发生变化，导致重渲染，treatCount函数会执行一次 */}
      count:{count1}<button onClick={() => setCount1(count1 + 1)}>点击count1</button>
      {/* 当点击count2时 ，count2的值发生变化，导致重渲染，但treatCount函数并不会执行，因为依赖项count1的值并未改变*/}
      count:{count2}<button onClick={() => setCount2(count2 + 1)}>点击count2</button>
      <br />
      
    </div>
  )
}

export default App
