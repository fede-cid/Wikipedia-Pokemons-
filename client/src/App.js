import "./App.css";
import Cover from "./cover/Cover";

import React, { useState, useEffect } from "react";




function App() {
  const [scrollHeight, setScrollHeight] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [scrollHeight]);
  return (
    <div className="App">

      {/* <NavBar isScrolling={scrollHeight} /> */}
      <Cover />

    </div>
  );
}

export default App;
