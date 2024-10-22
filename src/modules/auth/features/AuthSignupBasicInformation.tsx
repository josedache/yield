import { getFormikTextFieldProps } from "utils/formik";
import { AuthSignupStepContentProps } from "../types/AuthSignup";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import NumberTextField from "components/NumberTextField";

function AuthSignupBasicInformation(props: AuthSignupStepContentProps) {
  const { formik } = props;

  return (
    <div>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        placeholder="Stephanie"
        {...getFormikTextFieldProps(formik, "firstName")}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        placeholder="Takeme"
        {...getFormikTextFieldProps(formik, "lastName")}
      />
      <TextField
        fullWidth
        margin="normal"
        label="BVN"
        placeholder="22876543210"
        {...getFormikTextFieldProps(formik, "bvn")}
      />
      <NumberTextField
        freeSolo
        fullWidth
        margin="normal"
        label="Phone Number"
        placeholder="Enter Phone Number"
        {...getFormikTextFieldProps(formik, "phoneNumber")}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email Address"
        placeholder="Enter Email Address"
        {...getFormikTextFieldProps(formik, "email")}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Referral Code (Optional)"
        placeholder="Enter Code"
        {...getFormikTextFieldProps(formik, "email")}
      />
      <div>
        <FormControlLabel
          label={
            <Typography>
              I agree to Yield’s Terms & Conditions and Privacy Policy
            </Typography>
          }
          control={<Checkbox />}
        />
        <FormControlLabel
          label="Click here to subscribe to our mailing list"
          control={<Checkbox />}
        />
      </div>
    </div>
  );
}

export default AuthSignupBasicInformation;
