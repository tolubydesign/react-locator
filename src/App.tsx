import React, { Suspense } from 'react';
import './App.scss';
const Login = React.lazy(() => import("./shared/components/login/login"));

export default function App() {
  return (
    <div className="component">
      <Suspense fallback={<div className='flex justifty-center items-center'>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  );
}

