import { useState } from "react";
import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

// localhost
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// ropsten
// const greeterAddress = "0xdC743fb62977B1b3b69459CA9797CDB01e733c31";

declare global {
  var ethereum: ethers.providers.ExternalProvider;
}

function App() {
  const [greeting, setGreetingValue] = useState("");

  async function requestAccount() {
    if (typeof window.ethereum === "undefined") return;
    if (!window.ethereum.request) return;

    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum === "undefined") return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

    try {
      const data = await contract.greet();
      console.log("Data:", data);
    } catch (err) {
      console.log("Error:", err);
    }
  }

  async function setGreeting() {
    if (typeof window.ethereum === "undefined") return;
    if (!greeting) return;

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

    const transaction = await contract.setGreeting(greeting);
    setGreetingValue("");

    await transaction.wait();
    fetchGreeting();
  }

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreeting}>Set Greeting</button>
      <input
        type="text"
        placeholder="New greeting"
        onChange={(event) => setGreetingValue(event.target.value)}
        value={greeting}
      />
    </div>
  );
}

export default App;
