import {
  getFormikTextFieldProps,
  getFormikCheckFieldProps,
} from "utils/formik";
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
        value={formik.values.firstName}
        disabled
        // {...getFormikTextFieldProps(formik, "firstName")}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        placeholder="Takeme"
        value={formik.values.lastName}
        disabled
        // {...getFormikTextFieldProps(formik, "lastName")}
      />
      <TextField
        fullWidth
        margin="normal"
        label="BVN"
        placeholder="22876543210"
        value={formik.values.bvn}
        disabled
        // {...getFormikTextFieldProps(formik, "bvn")}
      />
      <NumberTextField
        freeSolo
        fullWidth
        margin="normal"
        label="Phone Number"
        placeholder="Enter Phone Number"
        value={formik.values.phone}
        disabled
        // {...getFormikTextFieldProps(formik, "phone")}
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
        {...getFormikTextFieldProps(formik, "referal_code")}
      />
      <div>
        <FormControlLabel
          label={
            <Typography>
              I agree to Yield’s{" "}
              <a
                className="text-[#4920AA]"
                href="https://www.creditdirect.ng/loan-agreement-terms-conditions/"
                target="_blank"
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                className="text-[#4920AA]"
                href="https://www.creditdirect.ng/privacy-policy/"
                target="_blank"
              >
                Privacy Policy
              </a>
            </Typography>
          }
          control={<Checkbox />}
          {...getFormikCheckFieldProps(formik, "igree")}
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
