import React, { useEffect } from "react";
import { useAppContext } from "../Context/useAppContext";
function Test() {
  const { user } = useAppContext();
  useEffect(() => {
    console.log("Test component detected user change:", user);
  }, [user]);

  return <div>test</div>;
}

export default Test;
