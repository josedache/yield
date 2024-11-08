import PasswordTextField from "components/PasswordTextField";
import { AuthSignupStepContentProps } from "../types/AuthSignup";
import { getFormikTextFieldProps } from "utils/formik";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Icon,
  Typography,
} from "@mui/material";
import { AuthSignupStep } from "../enums/AuthSignupStep";
import { Link } from "react-router-dom";
import { SIGNIN } from "constants/urls";
import clsx from "clsx";

function AuthSignupCreatePassword(props: AuthSignupStepContentProps) {
  const { formik, enumStep } = props;

  return (
    <>
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

      <Dialog
        fullWidth
        maxWidth="xs"
        open={enumStep === AuthSignupStep.SUCCESS}
      >
        <DialogContent className="space-y-8 max-w-md pb-10 pt-10 mx-auto flex justify-center flex-col items-center">
          <div className="flex justify-center text-6xl">
            <Icon
              fontSize="inherit"
              color="success"
              className="material-symbols-outlined-fill "
            >
              check_circle
            </Icon>
          </div>
          <Typography variant="h4" className="text-center mb-4 font-bold">
            Success!
          </Typography>
          <DialogContentText className="text-center">
            You’ve successfully created your Yield profile. You can now sign in
            to complete your onboarding.
          </DialogContentText>
          <Button
            className="max-w-[255px]"
            fullWidth
            component={Link}
            to={SIGNIN}
          >
            Sign In
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthSignupCreatePassword;
