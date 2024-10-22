import {
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  Paper,
  Popover,
  PopoverProps,
} from "@mui/material";
import { Column } from "@tanstack/react-table";
import usePopover from "hooks/usePopover";
import { ReactNode } from "react";

function ColumnVisibility(prop: ColumnVisibilityProps) {
  const {
    instance,
    children = defaultChildren,
    onClick,
    onClose,
    ...restProps
  } = prop;

  const popover = usePopover();

  function handleClose(event: any, reason: any) {
    onClose?.(event, reason);
    onClick?.(event);
    popover.togglePopover();
  }

  return (
    <>
      {typeof children === "function" ? children(popover) : children}
      <Popover
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClose={handleClose}
        {...restProps}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
          ...restProps?.anchorOrigin,
        }}
      >
        <Paper className="p-3 gap-6">
          {/* <div className="flex flex-row">
            <div className=" flex-1" />
            <Icon onClick={handleClose as any} className="cursor-pointer">
              close
            </Icon>
          </div> */}
          {instance
            .getAllLeafColumns()
            .map((column: Column<any>, index: number) => {
              if (index === 0) return null;

              return (
                <FormControlLabel
                  className="block"
                  key={column.id}
                  label={(column.columnDef.header || column.id) as string}
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                  control={<Checkbox />}
                />
              );
            })}
        </Paper>
      </Popover>
    </>
  );
}

export default ColumnVisibility;

const defaultChildren: Exclude<ColumnVisibilityProps["children"], ReactNode> = (
  props
) => {
  return (
    <div className="contents text-text-secondary">
      <Button
        startIcon={<Icon>view_column</Icon>}
        onClick={props.togglePopover}
        variant="outlined"
        color="inherit"
      >
        Columns
      </Button>
    </div>
  );
};

export type ColumnVisibilityProps = {
  instance: any;
  open?: boolean;
  children?:
    | ReactNode
    | ((popover: ReturnType<typeof usePopover>) => ReactNode);
} & Omit<PopoverProps, "children" | "open">;
