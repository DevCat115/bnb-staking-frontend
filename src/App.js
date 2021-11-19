import React from "react";
import { UseWalletProvider } from "use-wallet";

import Home from "./components/Home";
function App() {
  return (
    <UseWalletProvider
      chainId={4002}
      connectors={{
        portis: { dAppId: "horse" },
      }}
    >
      <Home />
    </UseWalletProvider>
  );
}

export default App;
