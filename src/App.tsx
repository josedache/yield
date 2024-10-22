import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default App;

export const Component = App;
