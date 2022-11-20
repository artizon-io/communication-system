import { useState } from "react";
import Logo from "@assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "@assets/App.css";
import { Navbar } from '@artizon/react-common/navbar';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <>
      {/* <Navbar/> */}
      <div className="container">
        <h1>Communication System</h1>

        <div className="row">
          <a href="https://reactjs.org" target="_blank">
            <img src={Logo} alt="Logo" />
          </a>
        </div>

        <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <div className="row">
          <div>
            <input
              id="greet-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter a name..."
            />
            <button type="button" onClick={() => greet()}>
              Greet
            </button>
          </div>
        </div>
        <p>{greetMsg}</p>
      </div>
    </>
  );
}

export default App;
