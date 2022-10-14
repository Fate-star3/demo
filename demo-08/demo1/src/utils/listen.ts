import React, { useState, useEffect, useCallback, useRef } from 'react';

// 获取 DOM 节点的位置或是大小的基本方式是使用 callback ref。每当 ref 被附加到一个另一个节点，React 就会调用 callback。
// 当 ref 是一个对象时它并不会把当前 ref 的值的 变化 通知到我们。使用 callback ref 可以确保 即便子组件延迟显示被测量的节点 
// (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。

// 1.ref 属性接受一个回调函数，它在组件被加载或卸载时会立即执行。
// 2.当给 HTML 元素添加 ref 属性时，ref 回调接收了底层的 DOM 元素作为参数。
// 3.当给组件添加 ref 属性时，ref 回调接收当前组件实例作为参数。
// 4.当组件卸载的时候，会传入null
// 5.ref 回调会在componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行


export const useListen = (resizeRef: React.MutableRefObject<any>) => {
  const [rect, setRect] = useState('')

  const rectRef = () => {
    // ref
    setRect(resizeRef.current.getBoundingClientRect())
    // console.warn('resizeRef', resizeRef.current?.getBoundingClientRect())
  }

  useEffect(() => {
    window.addEventListener('resize', rectRef)
    return () => {
      window.removeEventListener('resize', rectRef)
    }
  }, [])

  return { rect }

}

export function useSize(ref: any) {
  /* state 用来存储 DOM 的宽和高 */
  const [state, setState] = useState(function () {
    return {
      width: ref.clientWidth,
      height: ref.clientHeight
    };
  });

  /* useEffect 里面来监听 DOM 的改变 */
  useEffect(function () {
    const targetElement = ref;

    /* DOM 改变 setState */
    const resizeObserver = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        });
      });
    });

    /* 观察 DOM */
    resizeObserver.observe(targetElement);
    return function () {
      /* componentUnDidMount取消观察 */
      resizeObserver.disconnect();
    };
  }, []);

  /* 最后返回结果 */
  return state;
};

export const useListen_ = () => {
  const [rect, setRect] = useState('')
  const demoRef = useRef<any>(null)
  // 将挂载阶段获取的Dom节点保存在ref上
  const rectRef = (node: any) => {
    demoRef.current = node
  }
  const handleResize = () => {
    setRect(demoRef.current.getBoundingClientRect())
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return [rect, rectRef]
}
