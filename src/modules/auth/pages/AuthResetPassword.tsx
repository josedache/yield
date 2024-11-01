import { ButtonBase, Paper, Typography, Icon } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useStepper from "hooks/useStepper";
import { AuthResetPasswordValues } from "../types/AuthResetPassword";
import { LoadingButton } from "@mui/lab";
import { SIGNIN } from "constants/urls";
import { Icon as Iconify } from "@iconify/react/dist/iconify.js";
import { AuthResetPasswordStep } from "../enums/AuthResetPasswordStep";
import NumberTextField from "components/NumberTextField";
import { getFormikTextFieldProps } from "utils/formik";
import OtpInput from "components/OtpInput";
import { userApi } from "apis/user-api";
import PasswordTextField from "components/PasswordTextField";
import NumberInput from "components/NumberInput";
import clsx from "clsx";

function AuthResetPassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [sendUserResetPasswordMutation] =
    userApi.useSendUserResetPasswordMutation();

  const [verifyUserResetPasswordMutation] =
    userApi.useVerifyUserResetPasswordMutation();

  const [resetPasswordMutation] = userApi.useResetPasswordMutation();

  const stepper = useStepper({
    initialStep: getEnumStepIndex(AuthResetPasswordStep.REQUEST),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const formik = useFormik<AuthResetPasswordValues>({
    initialValues: {
      identifier: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      ...{
        [AuthResetPasswordStep.REQUEST]: {
          identifier: yup.string().label("Phone Number").length(11).required(),
        },
        [AuthResetPasswordStep.VERIFY]: {
          otp: yup.string().label("OTP").required(),
        },
        [AuthResetPasswordStep.CHANGE]: {
          password: yup
            .string()
            .label("Password")
            .trim()
            .min(8, "Your password must be at least 8 characters long")
            .max(25)
            .matches(/^(?=.{8,})/, "Must Contain 8 Characters")
            .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase")
            .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase")
            .matches(/^(?=.*\d)/, "Must contain a number")
            .matches(/^(?=.*[@$!%*?&#%])/, "Must contain a special character")
            .required(),
          confirmPassword: yup
            .string()
            .label("Confirm Password")
            .oneOf([yup.ref("password")], "Passwords must match")
            .required(),
        },
      }[enumStep],
    }),
    onSubmit: async (values) => {
      try {
        switch (enumStep) {
          case AuthResetPasswordStep.REQUEST: {
            const data = await sendUserResetPasswordMutation({
              body: { identifier: values.identifier, device_id: "kdkdkdd" },
            }).unwrap();
            enqueueSnackbar(data?.message || "Password reset otp sent", {
              variant: "success",
            });
            break;
          }
          case AuthResetPasswordStep.VERIFY: {
            const data = await verifyUserResetPasswordMutation({
              body: {
                otp: values.otp,
                channel: values.identifier.includes("@") ? "email" : "phone",
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "OTP verified successfully!", {
              variant: "success",
            });
            break;
          }
          case AuthResetPasswordStep.CHANGE: {
            const data = await resetPasswordMutation({
              body: {
                password: values.password,
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "Password reset successful", {
              variant: "success",
            });

            return navigate(SIGNIN);
          }
          default:
            break;
        }

        return stepper.next();
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.message || "Failed to process password reset",
          {
            variant: "error",
          }
        );
      }
    },
  });

  const contents = [
    {
      title: "Reset Password",
      description: "Please, enter your phone number to reset your password.",
      body: (
        <>
          <NumberTextField
            freeSolo
            maskOptions={{ max: 11 }}
            fullWidth
            margin="normal"
            label="Phone Number"
            placeholder="Enter Phone Number"
            {...getFormikTextFieldProps(formik, "identifier")}
          />
        </>
      ),
    },
    {
      title: "Reset Password",
      description: `Please, enter the six(6) digit verification code sent to ${formik.values.identifier} to reset your password.`,
      body: (
        <>
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
        </>
      ),
    },
    {
      title: "Create Password",
      description:
        "Please, set a password to protect and have access to your account.",
      body: (
        <div className="space-y-4">
          <PasswordTextField
            fullWidth
            margin="normal"
            label="New Password"
            placeholder="Enter Password"
            {...getFormikTextFieldProps(formik, "password")}
          />
          <div className="space-y-1">
            {[
              {
                label: "Must be at least 8 characters long",
                test: (value: string) => value.length >= 8,
              },
              {
                label: "Must contain a number (0,1,2,3,4,5,6,7,8,9)",
                test: (value: string) => /\d/.test(value),
              },
              {
                label: "Must contain a lowercase letter (a-z)",
                test: (value: string) => /[a-z]/.test(value),
              },
              {
                label: "Must contain an uppercase letter (A-Z)",
                test: (value: string) => /[A-Z]/.test(value),
              },
              {
                label: "Must contain a special character (!,%,@,#, etc.)",
                test: (value: string) => /[!@#$%^&*]/.test(value),
              },
            ].map(({ label, test }) => (
              <div
                className={clsx(
                  "flex items-center gap-2",
                  test(formik.values.password)
                    ? "text-primary-main"
                    : "text-text-secondary"
                )}
              >
                <Icon>check_circle</Icon>
                <Typography>{label}</Typography>
              </div>
            ))}
          </div>
          <PasswordTextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            placeholder="Re-enter Password"
            {...getFormikTextFieldProps(formik, "confirmPassword")}
          />
        </div>
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
      <Paper className="w-full max-w-[455px] min-h-0 max-h-full overflow-auto">
        <div className="sticky top-0 z-10 bg-inherit p-8 pb-4">
          {!isFirstStep ? (
            <ButtonBase
              className="flex items-center gap-2 mb-4"
              onClick={() => stepper.previous()}
            >
              <Iconify icon="gravity-ui:arrow-left" fontSize={20} />
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
            disabled={
              !formik.isValid ||
              [
                formik.values.identifier.length < 11,
                formik.values.otp.length < 6,
                formik.values.confirmPassword !== formik.values.password ||
                  !formik.values.password ||
                  !formik.values.confirmPassword,
              ][stepper.step]
            }
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
  AuthResetPasswordStep.VERIFY,
  AuthResetPasswordStep.CHANGE,
];
