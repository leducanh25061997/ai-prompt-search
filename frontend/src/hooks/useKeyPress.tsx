import React, { useState } from "react";

const useKeyPress = function(targetKey: string) {
    const [keyPressed, setKeyPressed] = useState(false);
  
    const downHandler = (event: any) => {
        if (event?.key === targetKey) {
            setKeyPressed(true);
        }
    }
  
    const upHandler = (event: any) => {
        if (event.key === targetKey) {
            setKeyPressed(false);
        }
    };
  
    React.useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
  
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    });
  
    return keyPressed;
};

export default useKeyPress;