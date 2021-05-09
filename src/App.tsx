import { useState } from "react";
import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

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
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState(0);

  async function requestAccount() {
    if (typeof window.ethereum === "undefined") return;
    if (!window.ethereum.request) return;

    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalance() {
    if (typeof window.ethereum === "undefined") return;
    if (!window.ethereum.request) return;

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    const balance = await contract.balanceOf(account);
    console.log("Balance:", balance.toString());
  }

  async function sendCoins() {
    if (typeof window.ethereum === "undefined") return;

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
    const transaction = await contract.transfer(userAccount, amount);
    await transaction.wait();
    console.log(`Sent ${amount} coins to ${userAccount}`);
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
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          type="text"
          placeholder="New greeting"
          onChange={(ev) => setGreetingValue(ev.target.value)}
          value={greeting}
        />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          type="text"
          placeholder="Account ID"
          onChange={(ev) => setUserAccount(ev.target.value)}
          value={userAccount}
        />
        <input
          type="text"
          placeholder="Amount"
          onChange={(ev) => setAmount(Number.parseInt(ev.target.value, 10))}
          value={amount}
        />
      </div>
    </div>
  );
}

export default App;
