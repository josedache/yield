import {
  InputAdornment,
  Typography,
  Link as MuiLink,
  Dialog,
  DialogContent,
  ButtonBase,
  CircularProgress,
  Divider,
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
import { userApi } from "apis/user-api";
import { useSnackbar } from "notistack";

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
    isIgree,
    triggerIgree,
    iAgreeUserMutationResult,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const open = enumStep === AuthSignupStep.BVN_VERIFICATION && !isIgree;

  const dataRef = useDataRef({ formik });

  const [requestUserVoiceOtpMutation, requestUserVoiceOtpMutationResult] =
    userApi.useLazyRequestUserVoiceOtpQuery(undefined);

  async function handleRequestVoiceOtp() {
    try {
      if (requestUserVoiceOtpMutationResult.isFetching) {
        return;
      }

      const data = await requestUserVoiceOtpMutation({
        params: { phone: formik.values.phone },
      }).unwrap();
      enqueueSnackbar(data?.message || "Voice Otp successfully sent", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Failed to send Voice Otp", {
        variant: "success",
      });
    }
  }

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
      maxWidth="xs"
    >
      <DialogTitleXCloseButton
        onClose={() => stepper.previous()}
      ></DialogTitleXCloseButton>
      <DialogContent className="px-5 md:px-8 pb-8 md:pb-10">
        {iAgreeUserMutationResult.isLoading ? (
          <>
            <div className="flex flex-col items-center">
              <Typography variant="h5" className="text-center mb-4">
                Validating your KYC details.
              </Typography>
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <div>
              <Typography variant="h5" className="text-center mb-4">
                Verify BVN
              </Typography>
              <Typography color="textSecondary" className="text-center">
                Enter the six(6) digit verification code sent to {maskedPhone}{" "}
                to verify your BVN.
              </Typography>
            </div>
            <div className="mt-6 flex justify-center flex-col gap-2 items-center">
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
                      <div className="flex items-center justify-center">
                        <Typography className="text-center">
                          Didn’t receive code?{" "}
                          {isCodeSent ? (
                            <Typography
                              variant="body2"
                              color="primary"
                              className="text-center"
                            >
                              Resend OTP in{" "}
                              <Typography
                                component="span"
                                color="primary"
                                className=""
                              >
                                {countdown.minutes}:
                                {countdown.seconds < 10
                                  ? `0${countdown.seconds}`
                                  : countdown.seconds}
                              </Typography>
                            </Typography>
                          ) : (
                            <ButtonBase
                              disableRipple
                              color="primary"
                              disabled={
                                signupYieldUserMutationResult?.isLoading
                              }
                              component={MuiLink}
                              onClick={sendOtp}
                              className=""
                            >
                              Resend OTP
                            </ButtonBase>
                          )}
                        </Typography>
                        {/* {requestOtpMutationResult.isLoading && (
                <CircularProgress size={12} thickness={8} className="ml-1" />
              )} */}
                      </div>
                    </>
                  );
                }}
              </Countdown>
            </div>
            <div className="my-8 space-y-2">
              <Typography
                color="primary"
                className="text-center font-semibold cursor-pointer"
                onClick={triggerIgree}
              >
                I don’t have access to this phone number.
              </Typography>
              <Divider>OR</Divider>
              <Typography className="text-center">
                Dial <MuiLink className="font-semibold cursor-pointer">*5120#</MuiLink> on your
                number to get your OTP, <br />
                or{" "}
                <MuiLink
                  className="font-semibold cursor-pointer"
                  onClick={handleRequestVoiceOtp}
                >
                  request a call
                </MuiLink>
                {requestUserVoiceOtpMutationResult.isFetching ? (
                  <CircularProgress size={10} className="ml-1" />
                ) : null}
                .
              </Typography>
            </div>
            <LoadingButton
              type="submit"
              className="mt-6"
              fullWidth
              size="large"
              loading={formik.isSubmitting}
              disabled={!formik.isValid || !formik.values.otp}
              loadingPosition="end"
              endIcon={<></>}
            >
              Verify
            </LoadingButton>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
