import YieldVariant0Svg from "assets/svgs/yield-variant-0.svg?react";
import YieldVariant1Svg from "assets/svgs/yield-variant-1.svg?react";
import { ComponentPropsWithoutRef } from "react";

function Logo(props: LogoProps) {
  const { variant = "0", ...restProps } = props;

  const LogoSvg =
    [YieldVariant0Svg, YieldVariant1Svg][variant] ?? YieldVariant0Svg;

  return <LogoSvg {...restProps} />;
}

export default Logo;

export type LogoProps = { variant?: "1" | "2" } & ComponentPropsWithoutRef<
  typeof YieldVariant1Svg
>;
