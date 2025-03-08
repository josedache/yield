import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { FixedCreatePlanContentProps } from "../types/FixedCreatePlan";
import { getFormikTextFieldError, getFormikTextFieldProps } from "utils/formik";
import NumberTextField from "components/NumberTextField";

export default function FixedCreatePlanRecipientSelect(
  props: FixedCreatePlanContentProps
) {
  const { formik, recipientUserDetailsError } = props;

  return (
    <>
      <Typography className="font-medium">
        Is this Yield for you or someone else?
      </Typography>
      <RadioGroup
        {...getFormikTextFieldProps(formik, "type")}
        row
        className="justify-between"
      >
        <FormControlLabel
          value="personal"
          control={<Radio />}
          label="For myself"
        />
        <FormControlLabel
          value="gift"
          control={<Radio />}
          label="For someone else"
        />
      </RadioGroup>

      {formik.values.type === "gift" ? (
        <>
          <NumberTextField
            freeSolo
            fullWidth
            margin="normal"
            label="Recipient’s Phone Number"
            {...getFormikTextFieldProps(
              formik,
              "phone",
              recipientUserDetailsError
                ? recipientUserDetailsError?.message
                : "Phone number must be tied to recipient’s Yield account"
            )}
            error={
              getFormikTextFieldError(formik, "phone") ||
              !!recipientUserDetailsError
            }
          />
          {/* {recipientUserDetailsError ? (
            <Typography variant="body2" className="text-error-main">
              {recipientUserDetailsError?.message}
            </Typography>
          ) : (
            <Typography variant="body2" className="text-text-secondary">
              Phone number must tied to recipient’s Yield account
            </Typography>
          )} */}
        </>
      ) : null}
    </>
  );
}
