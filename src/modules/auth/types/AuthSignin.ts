import { useFormik } from "formik";
import useStepper from "hooks/useStepper";

export interface AuthSigninFormikValues {
  username: string;
  password: string;
}

export interface AuthSigninStepContentDataRef {
  formik: ReturnType<typeof useFormik<AuthSigninFormikValues>>;
  stepper: ReturnType<typeof useStepper>;
}
