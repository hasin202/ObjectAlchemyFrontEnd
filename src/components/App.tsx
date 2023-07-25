import Page from "./page";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Page />
      <Analytics mode={"production"} />
    </>
  );
}

export default App;
