import { Button, ButtonProps, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon as Iconify } from "@iconify/react";

function BackButton(props: ButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      onClick={() => navigate(-1)}
      startIcon={
        <Icon className="text-primary-main">
          <Iconify icon="ic:baseline-arrow-back" />
        </Icon>
      }
      children="Back"
      {...props}
    />
  );
}

export default BackButton;
