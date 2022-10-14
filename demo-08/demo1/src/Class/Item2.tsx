import React, { useEffect, useRef } from 'react'


const Item2 = (props: { index: any; cachePosition: any; key: any }) => {
  const { index, cachePosition } = props
  const node = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    cachePosition(node, index)
   
  }, [])
  

  return (
    <div>
      <div className='list-item' style={{ height: '60px' }} ref={node} >
        <p>${index} eligendi voluptatem quisquam</p>
        <p>Modi autem fugiat maiores. Doloremque est sed quis qui nobis. Accusamus dolorem aspernatur sed rem.</p>
      </div>
    </div>
  )
}

export default Item2