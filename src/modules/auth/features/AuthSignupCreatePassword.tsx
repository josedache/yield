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
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { AuthSignupStep } from "../enums/AuthSignupStep";
import { Link, useNavigate } from "react-router-dom";
import { SIGNIN } from "constants/urls";
import clsx from "clsx";

function AuthSignupCreatePassword(props: AuthSignupStepContentProps) {
  const { formik, enumStep } = props;

  const navigate = useNavigate();

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

      <Dialog fullWidth open={enumStep === AuthSignupStep.SUCCESS}>
        <DialogTitleXCloseButton
          onClose={() => navigate(SIGNIN)}
        ></DialogTitleXCloseButton>
        <DialogContent className="space-y-8 max-w-md mx-auto">
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
            You’ve successfully created a Yield profile. You can now sign in to
            complete your onboarding.
          </DialogContentText>
          <Button fullWidth component={Link} to={SIGNIN}>
            Signin
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthSignupCreatePassword;
