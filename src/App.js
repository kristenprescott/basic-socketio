import "./App.css";
import Room from "./views/Room";

function App() {
  return (
    <div className="App">
      <header className="App-header">SocketIO Chat</header>
      <p style={{ color: "white" }}>
        Open two windows at localhost:3000 and chat :)
      </p>
      <Room />
    </div>
  );
}

export default App;
