import {
  getFormikTextFieldProps,
  getFormikCheckFieldProps,
} from "utils/formik";
import { AuthSignupStepContentProps } from "../types/AuthSignup";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import NumberTextField from "components/NumberTextField";
import { userApi } from "apis/user-api";
import { useMemo } from "react";

function AuthSignupBasicInformation(props: AuthSignupStepContentProps) {
  const { formik } = props;

  const referralCodeUserQueryResult = userApi.useGetReferralCodeUserQuery(
    useMemo(
      () => ({ path: { referral_code: formik.values.referal_code } }),
      [formik.values.referal_code]
    ),
    { skip: !formik.values.referal_code }
  );

  const referralCodeUser = referralCodeUserQueryResult.data?.data;

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
      <div>
        <TextField
          fullWidth
          margin="normal"
          label="Referral Code (Optional)"
          placeholder="Enter Code"
          {...getFormikTextFieldProps(formik, "referal_code")}
        />
        <div className="flex items-center justify-end">
          {referralCodeUserQueryResult.isFetching ? (
            <div className="flex items-center gap-1 mb-2">
              <CircularProgress size={12} thickness={8} />
              <Typography variant="body2" color="primary" className="font-bold">
                Resolving Referral Code
              </Typography>
            </div>
          ) : referralCodeUserQueryResult.isError ? (
            // ||(!referralCodeUserQueryResult.isUninitialized &&
            // !referralCodeUserQueryResult.data)
            <Typography variant="body2" color="error" gutterBottom>
              {(referralCodeUserQueryResult.error as any)?.message ||
                "Invalid Referral Code"}
            </Typography>
          ) : referralCodeUser?.name && formik.values.referal_code ? (
            <div className="bg-mui-primary-lighter inline-block p-1 rounded-full mb-4">
              <Typography className="font-bold" variant="body2" color="primary">
                {referralCodeUser?.name}
              </Typography>
            </div>
          ) : null}
        </div>
      </div>
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
