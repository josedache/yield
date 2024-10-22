import { ListItemButton, ListItemButtonProps } from "@mui/material";

export default function SideMenuListItemButton(props: ListItemButtonProps) {
  const { children, ...rest } = props;
  return (
    <ListItemButton
      sx={{
        color: "GrayText",
        borderRadius: 2,
        padding: 1,
        "&.Mui-selected": {
          color: "primary.main",
          background: "primary.main",
        },
      }}
      {...rest}
    >
      {children}
    </ListItemButton>
  );
}
