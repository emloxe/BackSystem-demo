import React, { useState, useEffect } from "react";

const Login = (props) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log("每次都会执行");
  });
  useEffect(() => {
    console.log("只执行一次");
  }, []);
  useEffect(() => {
    console.log("count值发生了改变");
  }, [count]); //count发生改变,立即触发该生命周期

  
  return (
    <div>
      <h5>register</h5>
    </div>
  );
};

export default Login;
