import { Outlet } from "react-router-dom";

function Fixed() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Fixed;

export const Component = Fixed;
