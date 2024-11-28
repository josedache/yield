import YieldVariant0Svg from "assets/svgs/yield-variant-0.svg?react";
import YieldVariant1Svg from "assets/svgs/yield-variant-1.svg?react";
import YieldVariant2Svg from "assets/svgs/yield-variant-2.svg?react";
import { ComponentPropsWithoutRef } from "react";

function Logo(props: LogoProps) {
  const { variant = "0", ...restProps } = props;

  const LogoSvg =  variant === "3"
  ? YieldVariant2Svg
  :[YieldVariant0Svg, YieldVariant1Svg][variant] ?? YieldVariant0Svg;

  return <LogoSvg {...restProps} />;
}

export default Logo;

export type LogoProps = { variant?: "1" | "2" | "3"} & ComponentPropsWithoutRef<
  typeof YieldVariant1Svg
>;
