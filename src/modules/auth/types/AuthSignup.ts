import { useFormik } from "formik";
import useStepper from "hooks/useStepper";
import { AuthSignupStep } from "../enums/AuthSignupStep";

export interface AuthSignupFormikValues {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  bvn: string;
  nin?: string;
  referal_code?: string;
  alternate_number?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
  igree?: boolean;
}

export interface AuthSignupStepContentDataRef {
  formik: ReturnType<typeof useFormik<AuthSignupFormikValues>>;
  stepper: ReturnType<typeof useStepper>;
  enumStep: AuthSignupStep;
  getEnumStepIndex: (enumStep: AuthSignupStep) => number;
  maskedPhone?: string;
  sendOtp: any;
  countdownDate: Date;
  signupYieldUserMutationResult: any;
  isIgree: any;
  setIgree: any;
  triggerIgree: any;
}

export type AuthSignupStepContentProps = AuthSignupStepContentDataRef;
