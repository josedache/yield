import {
  InputAdornment,
  TextField,
  Typography,
  Link as MuiLink,
  Dialog,
  DialogContent,
} from "@mui/material";
import { AuthSignupStepContentProps } from "../types/AuthSignup";
import { getFormikTextFieldProps } from "utils/formik";
import { AuthSignupStep } from "../enums/AuthSignupStep";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import OtpInput from "components/OtpInput";
import { LoadingButton } from "@mui/lab";

function AuthSignupBvn(props: AuthSignupStepContentProps) {
  const { formik, enumStep, stepper } = props;

  return (
    <>
      <div className="space-y-4">
        <TextField
          fullWidth
          margin="normal"
          label="Bank Verification Number"
          placeholder="Enter BVN"
          {...getFormikTextFieldProps(formik, "bvn")}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Typography>0/11</Typography>
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

      <Dialog
        component="form"
        onSubmit={formik.handleSubmit as any}
        fullWidth
        open={enumStep === AuthSignupStep.BVN_VERIFICATION}
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
              Please, enter the six(6) digit verification code sent to
              +23491******72 to verify your BVN.
            </Typography>
          </div>
          <div className="space-y-2">
            <OtpInput
              value={formik.values.token}
              onChange={(token) => {
                formik.setFieldValue("token", token);
              }}
              numInputs={6}
              shouldAutoFocus
              // inputType="password"
              slotProps={{
                input: {
                  style: { opacity: formik.isSubmitting ? 0.5 : 1 },
                  disabled: formik.isSubmitting,
                },
              }}
            />
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
                1:00
              </Typography>
            </Typography>
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
    </>
  );
}

export default AuthSignupBvn;
