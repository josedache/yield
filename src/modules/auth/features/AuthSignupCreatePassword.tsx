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
          placeholder="**********"
          {...getFormikTextFieldProps(formik, "password")}
        />
        <div className="space-y-1">
          {[
            { label: "Must be at least 8 characters long" },
            { label: "Must contain an uppercase and a lowercase letter (A,z)" },
            { label: "Must contain a number (0,1,2,3,4,5,6,7,8,9)" },
            { label: "Must contain a special characater (!,%,@,#, etc.)" },
          ].map(({ label }) => (
            <div className="flex items-center gap-2 text-primary-main">
              <Icon>check_circle</Icon>
              <Typography>{label}</Typography>
            </div>
          ))}
        </div>
        <PasswordTextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          placeholder="Pas$word99"
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
