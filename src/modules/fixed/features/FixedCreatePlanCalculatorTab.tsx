import { Typography } from "@mui/material";
import { FixedCreatePlanContentProps } from "../types/FixedCreatePlan";
import { formatNumberToCurrency } from "utils/number";
import { format } from "date-fns";

export default function FixedCreatePlanCalculatorTab(
  props: FixedCreatePlanContentProps
) {
  const { savingsDepositCalculator, formik } = props;
  const summary = [
    { title: "Plan Name", value: formik.values.name },
    {
      title: "Amount",
      value: `${formatNumberToCurrency(
        `${savingsDepositCalculator?.data?.depositAmount}` || ""
      )}`,
    },
    {
      title: "Duration",
      value: `${savingsDepositCalculator?.data?.depositPeriod} month${
        savingsDepositCalculator?.data?.depositPeriod > 1 ? "s" : ""
      }`,
    },
    {
      title: "Maturity Date",
      value: format(savingsDepositCalculator?.data?.maturityDate, "PP"),
    },
    {
      title: "Interest Expected",
      value: `${
        savingsDepositCalculator.data?.nominalAnnualInterestRate
      }% (${formatNumberToCurrency(
        String(savingsDepositCalculator.data?.expectedInterestAmount || "")
      )})`,
    },
    {
      title: "Total Payout",
      value: `${formatNumberToCurrency(
        `${savingsDepositCalculator?.data?.maturityAmount}` || ""
      )}`,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6  mb-8">
        {summary.map(({ title, value }) => (
          <div className="flex justify-between">
            <Typography className="text-neutral-600">{title}</Typography>
            <Typography className="font-semibold text-neutral-900">
              {value}
            </Typography>
          </div>
        ))}
      </div>
      <Typography
        variant="body2"
        className="text-center block text-neutral-500 px-2"
      >
        Note: There is a <b className="text-neutral-900">10%</b> Withholding Tax
        deduction on interest accrued{" "}
      </Typography>
    </div>
  );
}
