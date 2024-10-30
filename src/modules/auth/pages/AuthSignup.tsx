import { ButtonBase, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
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
import { userApi } from "apis/user-api";
import { useState } from "react";

function AuthSignup() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [signupYieldUserMutation, signupYieldUserMutationResult] =
    userApi.useSignupYieldUserMutation();

  const signupInfo = signupYieldUserMutationResult.data?.data;

  const [verifyUserOtpMutation, verifyUserOtpMutationResult] =
    userApi.useVerifyUserOtpMutation();

  const signupVerifyInfo = verifyUserOtpMutationResult.data?.data;

  const [createYieldUserPasswordMutation] =
    userApi.useCreateYieldUserPasswordMutation();

  const stepper = useStepper({
    initialStep: getEnumStepIndex(AuthSignupStep.BVN),
  });

  const [countdownDate, setCountdownDate] = useState(getCountdownDate);

  const enumStep = STEPS_INDEX[stepper.step];

  const formik = useFormik<AuthSignupFormikValues>({
    initialValues: {
      firstName: signupVerifyInfo?.firstname ?? "",
      lastName: signupVerifyInfo?.lastname ?? "",
      phone: signupVerifyInfo?.phone ?? "",
      email: signupVerifyInfo?.email ?? "",
      bvn: signupVerifyInfo?.bvn ?? "",
      nin: signupVerifyInfo?.nin ?? "",
      referal_code: "",
      alternate_number: signupVerifyInfo?.alternate_number ?? "",
      otp: "",
      password: "",
      confirmPassword: "",
      igree: false,
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      ...{
        [AuthSignupStep.BVN]: {
          bvn: yup.string().label("BVN").length(11).required(),
        },
        [AuthSignupStep.BVN_VERIFICATION]: {
          otp: yup.string().label("OTP").required(),
        },
        [AuthSignupStep.BASIC_INFORMATION]: {
          firstName: yup.string().label("First Name").required(),
          lastName: yup.string().label("Last Name").required(),
          phone: yup.string().label("Phone").required(),
          email: yup.string().label("Email").required(),
          bvn: yup.string().label("BVN").required(),
          // nin: yup.string().label("NIN").optional(),
          referal_code: yup.string().label("referal_code").optional(),
          alternate_number: yup.string().label("alternate_number").optional(),
        },
        [AuthSignupStep.CREATE_PASSWORD]: {
          password: yup.string().label("Password").trim().max(40).required(),
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
          case AuthSignupStep.BVN: {
            const data = await signupYieldUserMutation({
              body: { bvn: values.bvn },
            }).unwrap();
            enqueueSnackbar(data?.message || "OTP sent", {
              variant: "success",
            });
            break;
          }
          case AuthSignupStep.BVN_VERIFICATION: {
            const data = await verifyUserOtpMutation({
              body: {
                otp: values.otp,
                channel: "phone",
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "OTP verified successfully!", {
              variant: "success",
            });
            break;
          }
          case AuthSignupStep.BASIC_INFORMATION: {
            if (!values.igree) {
              enqueueSnackbar(`Read and accept terms and conditions`, {
                variant: "warning",
              });
              return;
            }
            const data = await signupYieldUserMutation({
              body: {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                email: values.email,
                bvn: values.bvn,
                nin: values.nin,
                referal_code: values.referal_code,
                alternate_number: values.alternate_number,
              },
            }).unwrap();
            enqueueSnackbar(
              data?.message || "Information saved successfully!",
              {
                variant: "success",
              }
            );
            break;
          }
          case AuthSignupStep.CREATE_PASSWORD: {
            const data = await createYieldUserPasswordMutation({
              body: {
                password: values.password,
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "Password created successful", {
              variant: "success",
            });
            break;
          }
          case AuthSignupStep.SUCCESS: {
            return navigate(SIGNIN);
          }
          default:
            break;
        }

        return stepper.next();
      } catch (error: any) {
        const message = (
          Array.isArray(error?.data?.message)
            ? error?.data?.message?.[0]
            : error?.data?.message
        ) as string;

        if (message?.toLowerCase().includes("user already exists")) {
          enqueueSnackbar(message, { variant: "warning" });
          return navigate(SIGNIN);
        }

        enqueueSnackbar(message || "Failed to process flow", {
          variant: "error",
        });
      }
    },
  });

  const sendOtp = async () => {
    try {
      const data = await signupYieldUserMutation({
        body: { bvn: formik.values.bvn },
      }).unwrap();
      setCountdownDate(getCountdownDate());
      enqueueSnackbar(data?.message || "Otp Sent", {
        variant: "error",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.errors?.[0]?.defaultUserMessage || `OTP failed to send!`,
        {
          variant: "error",
        }
      );
    }
  };

  const contentProps = {
    formik,
    stepper,
    enumStep,
    getEnumStepIndex,
    maskedPhone: signupInfo?.user?.phone,
    countdownDate,
    sendOtp,
    signupYieldUserMutationResult,
  };

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
  ];

  const content = contents[stepper.step];

  // const isFirstStep = enumStep === AuthSignupStep.BVN;
  // const isSecondStep = enumStep === AuthSignupStep.BVN_VERIFICATION;

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

        <div className="sticky bottom-0 p-8 bg-inherit z-10 space-y-4">
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
        </div>
      </Paper>
    </form>
  );
}

export default AuthSignup;

export const Component = AuthSignup;

function getCountdownDate() {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 5);
  return date;
}

function getEnumStepIndex(enumStep: AuthSignupStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  AuthSignupStep.BVN,
  AuthSignupStep.BVN_VERIFICATION,
  AuthSignupStep.BASIC_INFORMATION,
  AuthSignupStep.CREATE_PASSWORD,
  AuthSignupStep.SUCCESS,
];
