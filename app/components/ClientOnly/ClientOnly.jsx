"use client";

import { useEffect, useState } from "react";

const CLientOnly = ({ children }) => {
  const [isCLient, setisCLient] = useState(false);
  useEffect(() => {
    setisCLient(true);
  }, []);
  return <>{isCLient ? <div>{children}</div> : null}</>;
};

export default CLientOnly;
