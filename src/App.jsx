import { useState } from "react";
import ImageGallery from "./components/ImageGallery";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ImageGallery />{" "}
    </>
  );
}

export default App;
