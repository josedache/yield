import { Outlet } from "react-router-dom";

function Yield() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Yield;

export const Component = Yield;
