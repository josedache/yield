import { Paper, Typography } from "@mui/material";
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
import { userApi } from "apis/user-api";
import { useState } from "react";
import {
  CDL_IAGREE_INLINE_BASE_URL,
  CDL_IAGREE_INLINE_MODE,
} from "constants/env";
import useToggle from "hooks/useToggle";

function AuthSignup() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isIgree, _, setIgree] = useToggle();

  const [signupYieldUserMutation, signupYieldUserMutationResult] =
    userApi.useSignupYieldUserMutation();

  const signupInfo = signupYieldUserMutationResult.data?.data;

  const [verifyUserOtpMutation, verifyUserOtpMutationResult] =
    userApi.useVerifyUserOtpMutation();

  const signupVerifyInfo = verifyUserOtpMutationResult.data?.data;

  const [signupYieldSecondStageUserMutation] =
    userApi.useSignupYieldSecondStageUserMutation();

  const [createYieldUserPasswordMutation] =
    userApi.useCreateYieldUserPasswordMutation();

  const [iAgreeUserMutation, iAgreeUserMutationResult] =
    userApi.useIAgreeUserMutation();

  const igreeUserInfo = iAgreeUserMutationResult.data?.data;

  const stepper = useStepper({
    initialStep: getEnumStepIndex(AuthSignupStep.BVN),
  });

  const [countdownDate, setCountdownDate] = useState(getCountdownDate);

  const enumStep = STEPS_INDEX[stepper.step];

  const formik = useFormik<AuthSignupFormikValues>({
    initialValues: {
      firstName:
        signupVerifyInfo?.firstname ?? igreeUserInfo?.user?.firstname ?? "",
      lastName:
        signupVerifyInfo?.lastname ?? igreeUserInfo?.user?.lastname ?? "",
      phone: signupVerifyInfo?.phone ?? igreeUserInfo?.user?.phone ?? "",
      email: signupVerifyInfo?.email ?? igreeUserInfo?.user?.email ?? "",
      bvn: signupVerifyInfo?.bvn ?? igreeUserInfo?.user?.bvn ?? "",
      nin: signupVerifyInfo?.nin ?? igreeUserInfo?.user?.nin ?? "",
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
          password: yup
            .string()
            .label("Password")
            .trim()
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
          case AuthSignupStep.BVN: {
            await signupYieldUserMutation({
              body: { bvn: values.bvn },
            }).unwrap();
            setCountdownDate(getCountdownDate());
            enqueueSnackbar("OTP sent successfully!", {
              variant: "success",
            });
            break;
          }
          case AuthSignupStep.BVN_VERIFICATION: {
            await verifyUserOtpMutation({
              body: {
                otp: values.otp,
                channel: "phone",
              },
            }).unwrap();
            enqueueSnackbar("OTP verified successfully!", {
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
            await signupYieldSecondStageUserMutation({
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
            // enqueueSnackbar(
            //   data?.message || "Information saved successfully!",
            //   {
            //     variant: "success",
            //   }
            // );
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
      await signupYieldUserMutation({
        body: { bvn: formik.values.bvn },
      }).unwrap();
      setCountdownDate(getCountdownDate());
      enqueueSnackbar("OTP sent successfully!", {
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

  function triggerIgree() {
    const bvnVerificationInline = (window as any).BVNVerificationInline({
      bvn: formik.values.bvn,
      mode: CDL_IAGREE_INLINE_MODE,
      baseURL: CDL_IAGREE_INLINE_BASE_URL,
      onSuccess: async (data: any) => {
        try {
          await iAgreeUserMutation({
            body: {
              reference: data?.reference,
              bvn: data?.bvn ?? formik.values.bvn,
            },
          }).unwrap();
          stepper.next();
        } catch (error) {
          enqueueSnackbar(error?.message || "Failed to process IAgree", {
            variant: "error",
          });
        }
        setIgree(false);
      },
      onError: () => {
        // console.log("Error", error);
      },
      onClose: () => {
        setIgree(false);
      },
    });

    bvnVerificationInline.openIframe();
    setIgree(true);
  }

  const contentProps = {
    formik,
    stepper,
    enumStep,
    getEnumStepIndex,
    maskedPhone: signupInfo?.user?.phone,
    countdownDate,
    sendOtp,
    signupYieldUserMutationResult,
    iAgreeUserMutationResult,
    isIgree,
    setIgree,
    triggerIgree,
  };

  const contents = [
    {
      title: "Sign up",
      description: "Create an account on Yield using your BVN.",
      body: <AuthSignupBvn {...contentProps} />,
    },
    {
      title: "Sign up",
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
      <Paper className="w-full max-w-[455px] min-h-0 max-h-full overflow-auto">
        <div className="sticky top-0 z-10 bg-inherit p-5 md:p-8 pb-4">
          {/* {enumStep === AuthSignupStep.CREATE_PASSWORD ? (
            <ButtonBase className="flex items-center gap-2 mb-4">
              <Icon icon="gravity-ui:arrow-left" fontSize={20} />
              <Typography>Back</Typography>
            </ButtonBase>
          ) : null} */}
          <Typography variant="h4" className="font-bold mb-4">
            {content?.title}
          </Typography>
          <Typography className="text-text-secondary">
            {content?.description}
          </Typography>
        </div>

        <div className="px-5 md:px-8">{content?.body}</div>

        <div className="sticky bottom-0 p-5 md:p-8 bg-inherit z-10 space-y-4">
          <LoadingButton
            type="submit"
            fullWidth
            size="large"
            loading={formik.isSubmitting || iAgreeUserMutationResult.isLoading}
            disabled={!formik.isValid || !formik.dirty}
            loadingPosition="end"
            endIcon={<></>}
          >
            {{
              [AuthSignupStep.BVN]: "Submit BVN",
              [AuthSignupStep.BVN_VERIFICATION]: "Submit BVN",
            }[enumStep] || "Continue"}
          </LoadingButton>

          <Typography color="textSecondary" className="pt-6">
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
  date.setTime(date.getTime() + 1000 * 60 * 10);
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
