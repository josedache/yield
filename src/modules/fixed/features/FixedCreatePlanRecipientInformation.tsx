import { FixedCreatePlanContentProps } from "../types/FixedCreatePlan";
// import { getFormikTextFieldProps } from "utils/formik";
import { TextField, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";

export default function FixedCreatePlanRecipientInformation(
  props: FixedCreatePlanContentProps
) {
  const { recipientUserDetails } = props;

  return (
    <>
      <div className="space-y-4 my-4">
        <div>
          <TextField
            fullWidth
            label="Recipient’s Phone Number"
            // {...getFormikTextFieldProps(formik, "recipientPhoneNumber")}
            value={recipientUserDetails?.phone}
          />
          <div className="text-success-main flex items-center gap-1 mt-1">
            <Iconify
              color="inherit"
              icon="material-symbols:check-circle-rounded"
            />
            <Typography variant="caption" className="font-medium">
              {recipientUserDetails?.first_name}{" "}
              {recipientUserDetails?.last_name}
            </Typography>
          </div>
        </div>
        <TextField
          fullWidth
          label="Recipient’s First Name"
          // {...getFormikTextFieldProps(formik, "recipientFirstName")}
          value={recipientUserDetails?.first_name}
        />
        <TextField
          fullWidth
          label="Recipient’s Last Name"
          // {...getFormikTextFieldProps(formik, "recipientLastName")}
          value={recipientUserDetails?.last_name}
        />
        <TextField
          fullWidth
          label="Gender"
          // {...getFormikTextFieldProps(formik, "recipientGender")}
          value={recipientUserDetails?.gender}
          // select
        >
          {/* {[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ].map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))} */}
        </TextField>
      </div>
    </>
  );
}
