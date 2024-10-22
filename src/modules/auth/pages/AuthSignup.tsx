import { ButtonBase, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useStepper from "hooks/useStepper";
import { AuthSignupFormikValues } from "../types/AuthSignup";
import { AuthSignupStep } from "../enums/AuthSignupStep";
import AuthSignupBvn from "../features/AuthSignupBvn";
import AuthSignupBasicInformation from "../features/AuthSignupBasicInformation";
import AuthSignupCreatePassword from "../features/AuthSignupCreatePassword";
import { LoadingButton } from "@mui/lab";
import { SIGNIN } from "constants/urls";
import { Icon } from "@iconify/react/dist/iconify.js";

function AuthSignup() {
  const { enqueueSnackbar } = useSnackbar();

  const stepper = useStepper({
    initialStep: getEnumStepIndex(AuthSignupStep.BVN),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const formik = useFormik<AuthSignupFormikValues>({
    initialValues: {},
    validateOnBlur: true,
    validationSchema: yup.object().shape({}),
    onSubmit: async () => {
      try {
        return stepper.next();
      } catch {
        enqueueSnackbar("Error", { variant: "error" });
      }
    },
  });

  const contentProps = { formik, stepper, enumStep, getEnumStepIndex };

  const contents = [
    {
      title: "Signup",
      description: "Create an account on Yield using your BVN.",
      body: <AuthSignupBvn {...contentProps} />,
    },
    {
      title: "Signup",
      description: "Create an account on Yield using your BVN.",
      body: <AuthSignupBvn {...contentProps} />,
    },
    {
      title: "Basic Information",
      description: "Please, enter your basic information.",
      body: <AuthSignupBasicInformation {...contentProps} />,
    },
    {
      title: "Create Password",
      description:
        "Please, set a password to protect and have access to your account.",
      body: <AuthSignupCreatePassword {...contentProps} />,
    },
    {
      title: "Create Password",
      description:
        "Please, set a password to protect and have access to your account.",
      body: <AuthSignupCreatePassword {...contentProps} />,
    },
    {
      title: "Create Password",
      description:
        "Please, set a password to protect and have access to your account.",
      body: <AuthSignupCreatePassword {...contentProps} />,
    },
  ];

  const content = contents[stepper.step];

  const isFirstStep = enumStep === AuthSignupStep.BVN;
  const isSecondStep = enumStep === AuthSignupStep.BVN_VERIFICATION;

  return (
    <form
      onSubmit={formik.handleSubmit as any}
      className="h-full flex flex-col justify-center items-center"
    >
      <Paper className="w-full max-w-lg min-h-0 max-h-full overflow-auto">
        <div className="sticky top-0 z-10 bg-inherit p-8 pb-4">
          {enumStep === AuthSignupStep.CREATE_PASSWORD ? (
            <ButtonBase className="flex items-center gap-2 mb-4">
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
            {{
              [AuthSignupStep.BVN]: "Submit BVN",
              [AuthSignupStep.BVN_VERIFICATION]: "Submit BVN",
            }[enumStep] || "Continue"}
          </LoadingButton>

          {isFirstStep || isSecondStep ? (
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

export default AuthSignup;

export const Component = AuthSignup;

function getEnumStepIndex(enumStep: AuthSignupStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  AuthSignupStep.BVN,
  AuthSignupStep.BVN_VERIFICATION,
  AuthSignupStep.BASIC_INFORMATION,
  AuthSignupStep.CREATE_PASSWORD,
  AuthSignupStep.VERIFICATION,
  AuthSignupStep.SUCCESS,
];
