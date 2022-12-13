import "./App.css";
import "antd/dist/reset.css";
import WhiteBoard from "./components/WhiteBoard/WhiteBoard";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  return (
    <>
      <WhiteBoard>
        <Toolbar />
      </WhiteBoard>
    </>
  );
}

export default App;
