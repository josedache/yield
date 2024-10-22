import { useFormik } from "formik";
import useStepper from "hooks/useStepper";
import { AuthSignupStep } from "../enums/AuthSignupStep";

export interface AuthSignupFormikValues {
  phoneNumber?: string;
  token?: string;
}

export interface AuthSignupStepContentDataRef {
  formik: ReturnType<typeof useFormik<AuthSignupFormikValues>>;
  stepper: ReturnType<typeof useStepper>;
  enumStep: AuthSignupStep;
  getEnumStepIndex: (enumStep: AuthSignupStep) => number;
}

export type AuthSignupStepContentProps = AuthSignupStepContentDataRef;
