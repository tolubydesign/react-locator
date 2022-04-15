import { Layout } from "../../../../core/layout/layout";
import React from "react";
import { useLocation } from 'react-router-dom';

export default function Province (props: any) {
  const location = useLocation();

  console.log(location.pathname);
  console.log("ROUTE", props);

  

  return (
    <Layout>
      <p>Province Component is working.</p>
    </Layout>
  )

}