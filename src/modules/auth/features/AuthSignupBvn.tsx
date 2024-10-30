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
import { useEffect } from "react";
import useDataRef from "hooks/useDataRef";
import NumberInput from "components/NumberInput";
import Countdown from "components/Countdown";
import {
  CDL_IAGREE_INLINE_BASE_URL,
  CDL_IAGREE_INLINE_MODE,
} from "constants/env";
import { useSnackbar } from "notistack";
import useToggle from "hooks/useToggle";

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
  const {
    formik,
    enumStep,
    stepper,
    maskedPhone,
    sendOtp,
    countdownDate,
    signupYieldUserMutationResult,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isIgree, _, setIgree] = useToggle();

  const open = enumStep === AuthSignupStep.BVN_VERIFICATION && !isIgree;

  const dataRef = useDataRef({ formik });

  useEffect(() => {
    if (!open) {
      dataRef.current.formik.setFieldValue("otp", "");
    }
  }, [dataRef, open]);

  function handleIgree() {
    const bvnVerificationInline = (window as any).BVNVerificationInline({
      bvn: formik.values.bvn,
      mode: CDL_IAGREE_INLINE_MODE,
      baseURL: CDL_IAGREE_INLINE_BASE_URL,
      onSuccess: async (data: any) => {
        try {
          console.log(data);
        } catch (error) {
          enqueueSnackbar(error?.message, {
            variant: "error",
          });
        }
        setIgree(false);
      },
      onError: (error) => {
        console.log("Error", error);
      },
      onClose: () => {
        setIgree(false);
        console.log("Closed");
      },
    });

    bvnVerificationInline.openIframe();
    setIgree(true);
  }

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
          <Countdown date={countdownDate}>
            {(countdown) => {
              const isCodeSent =
                countdown.days ||
                countdown.minutes ||
                countdown.seconds ||
                countdown.seconds;

              return (
                <>
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
                          disabled={signupYieldUserMutationResult?.isLoading}
                          component={MuiLink}
                          onClick={sendOtp}
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
                </>
              );
            }}
          </Countdown>
        </div>
        <Typography
          color="primary"
          className="text-center font-semibold cursor-pointer"
          onClick={handleIgree}
        >
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
