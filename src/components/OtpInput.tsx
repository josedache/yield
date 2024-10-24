import { ComponentPropsWithoutRef } from "react";
import ReactOtpInput, { OTPInputProps } from "react-otp-input";

/**
 *
 * @param {OtpInputProps} props
 * @returns
 */
function OtpInput(props: OtpInputProps) {
  const { slotProps, ...restProps } = props as Required<OtpInputProps>;
  return (
    <ReactOtpInput
      renderSeparator={<span className="mx-2"></span>}
      renderInput={(props) => (
        <input
          {...props}
          placeholder="*"
          className="w-14 h-14 text-center outline-none border border-[#E5E7EB] rounded-lg bg-[#F9FAFB]"
          {...slotProps?.input}
        />
      )}
      {...restProps}
    />
  );
}

export default OtpInput;

export type OtpInputProps = {
  slotProps?: { input?: ComponentPropsWithoutRef<"input"> };
} & Partial<OTPInputProps>;
