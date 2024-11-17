import { FormHelperText, TextField, Typography } from "@mui/material";
import { useMemo } from "react";

import CurrencyTextField from "components/CurrencyTextField";
import { FixedCreatePlanContentProps } from "../types/FixedCreatePlan";
import { formatNumberToCurrency } from "utils/number";
import { getFormikTextFieldProps } from "utils/formik";
import FixedDurationSlider from "./FixedDurationSlider";

export default function FixedCreatePlanTab(props: FixedCreatePlanContentProps) {
  const { formik, savingsFixedProductInformation } = props;

  return (
    <>
      <TextField
        {...getFormikTextFieldProps(formik, "name")}
        fullWidth
        placeholder="Enter Plan name"
        label="Plan Name"
      />

      <div className="mt-4">
        <Typography variant="body2">Duration (Months)</Typography>
        <FormHelperText className="1">
          Move the slider to select the duration of your plan.{" "}
        </FormHelperText>
        <FixedDurationSlider
          className="1"
          slotProps={{
            thumb: ({ value }) => ({ value }),
          }}
          value={formik.values.depositPeriod}
          onChange={(_, value) => {
            formik.setFieldValue("depositPeriod", value);
          }}
          getAriaValueText={(value) => `${value}`}
          valueLabelDisplay="auto"
          step={1}
          min={savingsFixedProductInformation.data.min_period}
          max={savingsFixedProductInformation.data.max_period}
          marks={useMemo(() => {
            const steps = [];
            for (
              let index = savingsFixedProductInformation.data.min_period;
              index <= savingsFixedProductInformation.data.max_period;
              index += 1
            ) {
              steps.push({
                value: index,
                label: index,
              });
            }
            return steps;
          }, [savingsFixedProductInformation.data])}
        />
      </div>

      <CurrencyTextField
        className="mt-4"
        code="NGN"
        fullWidth
        label="Amount"
        placeholder="0.00"
        {...getFormikTextFieldProps(formik, "depositAmount")}
        maskOptions={{ thousandsSeparator: "," }}
      />
      <FormHelperText>
        Minimum amount to deposit:<span className="px-1"></span>
        {formatNumberToCurrency(
          `${savingsFixedProductInformation.data.min_deposit_amt}`
        )}
      </FormHelperText>
    </>
  );
}
