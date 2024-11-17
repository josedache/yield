import { ComponentPropsWithoutRef } from "react";
import ReactOtpInput, { OTPInputProps } from "react-otp-input";

/**
 *
 * @param {OtpInputProps} props
 * @returns
 */
function OtpInput(props: OtpInputProps) {
  const { slot, slotProps, ...restProps } = props as Required<OtpInputProps>;

  const Input = slot?.input ?? "input";

  return (
    <ReactOtpInput
      renderSeparator={<span className="mx-1"></span>}
      renderInput={(props) => (
        <Input
          {...props}
          placeholder="*"
          className="w-full  h-[48px] md:h-14 text-center outline-none border border-[#E5E7EB] rounded-lg bg-[#F9FAFB]"
          {...slotProps?.input}
        />
      )}
      {...restProps}
    />
  );
}

export default OtpInput;

export type OtpInputProps = {
  slot?: { input?: any };
  slotProps?: { input?: ComponentPropsWithoutRef<"input"> };
} & Partial<OTPInputProps>;
