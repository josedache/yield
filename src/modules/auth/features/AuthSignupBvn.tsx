import {
  InputAdornment,
  Typography,
  Link as MuiLink,
  Dialog,
  DialogContent,
  ButtonBase,
} from "@mui/material";
import { AuthSignupStepContentProps } from "../types/AuthSignup";
import { getFormikTextFieldProps } from "utils/formik";
import { AuthSignupStep } from "../enums/AuthSignupStep";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import OtpInput from "components/OtpInput";
import { LoadingButton } from "@mui/lab";
import NumberTextField from "components/NumberTextField";
import useCountdown from "hooks/useCountdown";
import { useEffect, useMemo } from "react";
import * as dfns from "date-fns";
import useDataRef from "hooks/useDataRef";
import NumberInput from "components/NumberInput";

function AuthSignupBvn(props: AuthSignupStepContentProps) {
  const { formik } = props;

  return (
    <>
      <div className="space-y-4">
        <NumberTextField
          freeSolo
          fullWidth
          margin="normal"
          label="Bank Verification Number"
          placeholder="Enter BVN"
          {...getFormikTextFieldProps(formik, "bvn")}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Typography>{formik.values.bvn?.length}/11</Typography>
                </InputAdornment>
              ),
            },
          }}
        />
        <Typography color="textSecondary">
          Dial <MuiLink>*560*0#</MuiLink> on your registered number to get your
          BVN.
        </Typography>
      </div>

      <AuthSignupBvnVerify {...props} />
    </>
  );
}

export default AuthSignupBvn;

function AuthSignupBvnVerify(props: AuthSignupStepContentProps) {
  const { formik, enumStep, stepper, maskedPhone } = props;

  const open = enumStep === AuthSignupStep.BVN_VERIFICATION;

  const countdown = useCountdown(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => dfns.addMinutes(new Date(), 5), [open])
  );

  const isCodeSent =
    countdown.days ||
    countdown.minutes ||
    countdown.seconds ||
    countdown.seconds;

  const dataRef = useDataRef({ formik });

  useEffect(() => {
    if (!open) {
      dataRef.current.formik.setFieldValue("otp", "");
    }
  }, [dataRef, open]);

  return (
    <Dialog
      component="form"
      onSubmit={formik.handleSubmit as any}
      fullWidth
      open={open}
    >
      <DialogTitleXCloseButton
        onClose={() => stepper.previous()}
      ></DialogTitleXCloseButton>
      <DialogContent className="space-y-8 max-w-md mx-auto">
        <div>
          <Typography variant="h5" className="text-center mb-4">
            Verify BVN
          </Typography>
          <Typography color="textSecondary" className="text-center">
            Please, enter the six(6) digit verification code sent to{" "}
            {maskedPhone} to verify your BVN.
          </Typography>
        </div>
        <div className="space-y-2">
          <OtpInput
            value={formik.values.otp}
            onChange={(otp) => {
              formik.setFieldValue("otp", otp);
            }}
            numInputs={6}
            shouldAutoFocus
            // inputType="password"
            slot={{ input: NumberInput }}
            slotProps={{
              input: {
                style: { opacity: formik.isSubmitting ? 0.5 : 1 },
                disabled: formik.isSubmitting,
              },
            }}
          />
          {isCodeSent ? (
            <Typography
              variant="body2"
              color="textSecondary"
              className="text-center"
            >
              Resend OTP in{" "}
              <Typography
                component="span"
                color="primary"
                className="font-semibold"
              >
                {countdown.minutes}:
                {countdown.seconds < 10
                  ? `0${countdown.seconds}`
                  : countdown.seconds}
              </Typography>
            </Typography>
          ) : (
            <div className="flex items-center justify-center">
              <Typography className="text-center">
                Didn’t receive code?{" "}
                <ButtonBase
                  disableRipple
                  // disabled={requestOtpMutationResult.isLoading}
                  // component={MuiLink}
                  // onClick={resendOtp}
                  className="underline text-text-primary font-bold"
                >
                  Send it again.
                </ButtonBase>
              </Typography>
              {/* {requestOtpMutationResult.isLoading && (
                <CircularProgress size={12} thickness={8} className="ml-1" />
              )} */}
            </div>
          )}
        </div>
        <Typography color="primary" className="text-center font-semibold">
          I don’t have access to this phone number.
        </Typography>
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          loading={formik.isSubmitting}
          loadingPosition="end"
          endIcon={<></>}
        >
          Verify
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
}
