import "./App.css";
import HangManDrawing from "./components/HangManDrawing/HangManDrawing";
import HangManWord from "./components/HangManWord/HangManWord";
import Keyboard from "./components/Keyboard/Keyboard";

const App = () => {
  return (
    <div className="app">
      <div className="heading">HangMan Game Win or Loss</div>
      <HangManDrawing />
      <HangManWord />
      <div
        style={{
          alignSelf: "stretch",
        }}
      >
        <Keyboard />
      </div>
    </div>
  );
};

export default App;
