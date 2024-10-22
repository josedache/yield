import { DialogTitle, IconButton, Icon } from "@mui/material";
import clsx from "clsx";
import { Icon as Iconify } from "@iconify/react";

/**
 *
 * @param {DialogTitleXCloseButtonProps} props
 */
function DialogTitleXCloseButton(props: any) {
  const { children, onClose, className, ...other } = props;

  return (
    <DialogTitle className={clsx("", className)} {...other}>
      {children}
      {onClose ? (
        <IconButton
          className="absolute right-2 top-3"
          aria-label="close"
          onClick={onClose}
        >
          <Icon><Iconify icon="material-symbols:close" /></Icon>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default DialogTitleXCloseButton;

/**
 * @typedef {{onClose: Function} & DialogTitleXCloseButtonProps} DialogTitleXCloseButtonProps
 */
