import { Outlet } from "react-router-dom";

function Flex() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Flex;

export const Component = Flex;
