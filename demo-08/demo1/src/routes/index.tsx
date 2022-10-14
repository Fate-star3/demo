// 独立配置文件 
import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home'
const Mine = lazy(() => import('@/pages/Mine'))
// const Error = lazy(() => import('@/components/error'))

const RoutesConfig = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/mine" element={<Mine />}></Route>
            {/* 专门处理url错误的路由 */}
            {/* <Route path="*" element={<Navigate to='/404' replace={true} />} > </Route> */}
            {/* <Route path="/404" element={<Error />} > </Route> */}
        </Routes>
    )
}

export default RoutesConfig