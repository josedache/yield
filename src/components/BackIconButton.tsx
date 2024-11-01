import { IconButton, IconButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon as Iconify } from "@iconify/react";

function BackIconButton(props: IconButtonProps) {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)} {...props}>
      <Iconify className="text-[24px]" icon="ic:baseline-arrow-back" />
    </IconButton>
  );
}

export default BackIconButton;
