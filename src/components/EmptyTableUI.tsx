import { Typography } from "@mui/material";
import clsx from "clsx";
import "./EmptyUI.css";
import { ComponentPropsWithoutRef } from "react";
// import EmptyTable from "assets/svgs/empty-state.svg?react";

/**
 *
 * @param {EmptyTableUIProps} props
 * @returns
 */
export function EmptyTableUI(props: EmptyTableUIProps) {
  const { className, ...rest } = props;
  return (
    <div className={clsx("EmptyUI", className)} {...rest}>
      <div className={clsx("EmptyUI__icon")}>
        <img src="" alt="no data icon" />
      </div>
      <Typography
        variant="h3"
        className={clsx("EmptyUI__text", "font-bold text-xl")}
      >
        You haven’t added an employer recently
      </Typography>
      <Typography
        variant="subtitle2"
        className={clsx("EmptyUI__text", "text-sm text-[#475467] p-2")}
      >
        Your recently added employers are displayed here. Search for any
        employer by using the <span className="font-semibold">Search By</span>{" "}
        field at the top.
      </Typography>
    </div>
  );
}

export default EmptyTableUI;

export type EmptyTableUIProps = ComponentPropsWithoutRef<"div">;
