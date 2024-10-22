import { ButtonBase, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useStepper from "hooks/useStepper";
import { AuthResetPasswordValues } from "../types/AuthResetPassword";
import { LoadingButton } from "@mui/lab";
import { SIGNIN } from "constants/urls";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AuthResetPasswordStep } from "../enums/AuthResetPasswordStep";
import NumberTextField from "components/NumberTextField";
import { getFormikTextFieldProps } from "utils/formik";
import OtpInput from "components/OtpInput";

function AuthResetPassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const stepper = useStepper({
    initialStep: getEnumStepIndex(AuthResetPasswordStep.REQUEST),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const formik = useFormik<AuthResetPasswordValues>({
    initialValues: {
      username: "",
      token: "",
    },
    validateOnBlur: true,
    validationSchema: yup.object().shape({}),
    onSubmit: async () => {
      try {
        if (isLastStep) {
          return navigate(SIGNIN);
        }
        return stepper.next();
      } catch {
        enqueueSnackbar("Error", { variant: "error" });
      }
    },
  });

  const contents = [
    {
      title: "Reset Password ",
      description: "",
      body: (
        <>
          <NumberTextField
            freeSolo
            fullWidth
            margin="normal"
            label="Phone Number"
            placeholder="Enter Phone Number"
            {...getFormikTextFieldProps(formik, "phoneNumber")}
          />
        </>
      ),
    },
    {
      title: "Reset Password ",
      description:
        "Please, enter the six(6) digit verification code sent to +23491******72 to reset your password.",
      body: (
        <>
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
        </>
      ),
    },
  ];

  const content = contents[stepper.step];

  const isFirstStep = enumStep === AuthResetPasswordStep.REQUEST;
  const isLastStep = enumStep === AuthResetPasswordStep.CHANGE;

  return (
    <form
      onSubmit={formik.handleSubmit as any}
      className="h-full flex flex-col justify-center items-center"
    >
      <Paper className="w-full max-w-lg min-h-0 max-h-full overflow-auto">
        <div className="sticky top-0 z-10 bg-inherit p-8 pb-4">
          {!isFirstStep ? (
            <ButtonBase
              className="flex items-center gap-2 mb-4"
              onClick={() => stepper.previous()}
            >
              <Icon icon="gravity-ui:arrow-left" fontSize={20} />
              <Typography>Back</Typography>
            </ButtonBase>
          ) : null}
          <Typography variant="h4" className="font-bold mb-4">
            {content?.title}
          </Typography>
          <Typography className="text-text-secondary">
            {content?.description}
          </Typography>
        </div>

        <div className="px-8">{content?.body}</div>

        <div className="sticky bottom-0 p-8 bg-inherit z-10 space-y-2">
          <LoadingButton
            type="submit"
            fullWidth
            size="large"
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
          >
            Continue
          </LoadingButton>

          {isFirstStep || isLastStep ? (
            <Typography color="textSecondary">
              Already have an account?{" "}
              <Typography
                color="primary"
                className="font-bold"
                component={Link}
                to={SIGNIN}
              >
                Log In
              </Typography>
            </Typography>
          ) : null}
        </div>
      </Paper>
    </form>
  );
}

export default AuthResetPassword;

export const Component = AuthResetPassword;

function getEnumStepIndex(enumStep: AuthResetPasswordStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  AuthResetPasswordStep.REQUEST,
  AuthResetPasswordStep.CHANGE,
];
