import React, { Suspense } from 'react';
import './App.scss';
const Login = React.lazy(() => import("./shared/components/login/login"));

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  );
}

