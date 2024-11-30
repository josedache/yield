import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import ContainerEdge from "../../../assets/svgs/edge.svg";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "../LandingPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFormikTextFieldProps } from "utils/formik";
import { formatNumberToCurrency } from "utils/number";
import { landingPageApi } from "apis/landingpage-api";
import { useEffect } from "react";
import { isEmpty } from "utils/object";
import { LANDING_PAGE_CALCULATOR_PRODUCT_ID } from "constants/env";


const YieldCalculator = () => {

  const [
    savingsFixedDepositCalculationMutation,
    savingsFixedDepositCalculationMutationResult,
  ] = landingPageApi.useLandingPageCalculatorMutation()

  const formik = useFormik({
    initialValues: {
      depositAmount: "140000",
      depositPeriod: 1,
      depositPeriodFrequencyId: "2",
      productId: LANDING_PAGE_CALCULATOR_PRODUCT_ID,
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      depositAmount: Yup.number()
        .required("Amount is required")
        .min(50000, `Amount must be greater than ${formatNumberToCurrency(`50000`)}`)
        .max(10000000, `Amount must be less than ${formatNumberToCurrency(`10000000`)}`),
        depositPeriod: Yup.number().min(1, "Please select a duration"),
    }),
    onSubmit: async (values) => {
      try {
         await savingsFixedDepositCalculationMutation({
          body: {
            depositAmount: Number(values.depositAmount),
            depositPeriod: String(values.depositPeriod),
            depositPeriodFrequencyId: values.depositPeriodFrequencyId,
            productId: String(values.productId),
          },
        }).unwrap();
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  });

  useEffect(() => {
    if ( isEmpty(formik.errors)) {
      formik.handleSubmit()
    }
  }, [formik.values.depositAmount, formik.values.depositPeriod]);

  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push({ id: i, month: `${i} ${i === 1 ? "Month" : "Months"}` });
  }

  const calculateYield = (depositAmount : number, depositPeriod : number) => {
    if (depositAmount > 10_000_000 || depositAmount < 50_000  ) {
      return {
        bankInterestEarned: 0,
      };
    }
    const bankInterestRate = 4;
    const bankInterestEarned = depositAmount * (bankInterestRate / 100) * (depositPeriod / 12);
    return {
      bankInterestEarned: bankInterestEarned.toFixed(2),
    };
  };
  const { depositAmount, depositPeriod} = formik.values;
  const {  bankInterestEarned } = calculateYield(
    parseFloat(depositAmount),
    depositPeriod
  );

  return (
    <div className=" flex flex-col lg:flex-row landingPagecontainer items-center justify-between mx-auto gap-8 xl:gap-14 px-4 md:px-16 lg:px-8 xl:px-5 py-14">
      <div className="flex flex-col gap-8 w-full lg:max-w-[50%]  md:aspect-cyyLeft  ">
        <Typography className="font-semibold text-3xl md:text-[44px] text-[#101828] text-center lg:text-start">
          Calculate your Yield
        </Typography>

        <div className="w-full flex flex-col px-6 pt-5 pb-3 rounded-lg bg-[#F3F4F6]">
          <FormControl fullWidth variant="standard">
            <InputLabel
              htmlFor="standard-adornment-amount"
              className="text-lg text-gray-700"
            >
              Yield Amount
            </InputLabel>
            <Input
              placeholder="140000"
              type="number"
              className="placeholder:text-primary-dark text-primary-dark font-semibold text-2xl   "
              id="standard-adornment-amount"
              {...getFormikTextFieldProps(formik, "depositAmount")}
              startAdornment={
                <InputAdornment position="start">
                  <span className="text-primary-dark font-semibold">₦</span>
                </InputAdornment>
              }
              sx={{
                "& input": {
                  py: "0.5rem",
                },
                "&::placeholder": {
                  color: "#055986",
                },
              }}
              disableUnderline
            />

            {formik.errors.depositAmount && (
              <p className="text-red-500 text-sm">
                {formik.errors.depositAmount}
              </p>
            )}
          </FormControl>
        </div>

        <div className="w-full flex flex-col px-4 pt-6 rounded-lg bg-[#F3F4F6]">
          <TextField
            select
            label="Duration"
            defaultValue={1}
            placeholder="Months"
            className="bg-transparent text-3xl text-primary-dark font-semibold"
            {...getFormikTextFieldProps(formik, "depositPeriod")}
            variant="outlined"
            slotProps={{
              select: {
                IconComponent: () => (
                  <KeyboardArrowDownRoundedIcon
                    style={{
                      fontSize: "2rem",
                      color: "#4B6531",
                      cursor: "pointer",
                    }}
                  />
                ),
              },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "16px", // Adjust the font size here
                color: "#6B7280",
                paddingLeft: "1rem", // You can also adjust the color if needed
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F3F4F6",
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                "& .MuiInputBase-input": {
                  color: "#4B6531",
                  fontSize: "1.6rem",
                  fontWeight: "600",
                  backgroundColor: "#F3F4F6",
                },
              },
            }}
          >
            <MenuItem value={1} disabled>
              Months
            </MenuItem>
            {months.map((month, index) => (
              <MenuItem key={index} value={month.id}>
                {month.month}
              </MenuItem>
            ))}
          </TextField>
        </div>
        { savingsFixedDepositCalculationMutationResult.isLoading ? (
          <Skeleton className="py-6 px-4 rounded-full bg-[#E5EEDC]" />
           ) : (
        <Typography className="rounded-full bg-[#E5EEDC] py-2 px-6 font-medium text-primary-dark text-xl ">
          {savingsFixedDepositCalculationMutationResult?.data?.data?.nominalAnnualInterestRate || 16}% per annum
        </Typography> )}
      </div>

      <div className="relative z-0 flex items-center justify-center w-full md:w-53 lg:w-[50%] py-6 px-6 sm:px-12 ">
        <img
          src={ContainerEdge}
          alt=""
          className="absolute top-0 -left-1 sm:-top-4 sm:-left-5 z-0 object-cover w-[81px] h-[70px] sm:w-auto sm:h-auto"
        />
        <img
          src={ContainerEdge}
          alt=""
          className=" absolute transform rotate-180 bottom-0 right-1 sm:-bottom-4 sm:-right-5 object-cover w-[81px] h-[70px] sm:w-auto sm:h-auto"
        />
        <div className="flex flex-col justify-between relative z-10 bg-white rounded-2xl py-8 md:py-16 px-5 md:px-10 w-full h-full shadow-sm border border-sky-300/50 overflow-x-scroll scrollbar-hidden">
          <Typography className="font-medium text-sm md:text-3xl text-blue-950">
            At Maturity, you’d have
          </Typography>

          { savingsFixedDepositCalculationMutationResult.isLoading ? (
          <Skeleton className="py-8 px-6 bg-neutral-200 " />
           ) : (
          <Typography className="font-semibold text-3xl md:text-5xl w-[90%] text-primary-dark mt-3 md:mt-6 overflow-x-scroll scrollbar-hidden">
            {formatNumberToCurrency(`${savingsFixedDepositCalculationMutationResult?.data?.data?.maturityAmount}`)}
          </Typography>
           ) }

          { savingsFixedDepositCalculationMutationResult.isLoading ? (
          <Skeleton className="py-6 px-4 bg-neutral-500 rounded-full " />
           ) : (
          <p className=" bg-neutral-500 py-1 px-4 my-5 text-white border rounded-full font-medium text-xs md:text-xl">
            {formatNumberToCurrency(`${ savingsFixedDepositCalculationMutationResult?.data?.data?.expectedInterestAmount}`)} {" "} earned in returns on Yield
          </p>
           )}

          { savingsFixedDepositCalculationMutationResult.isLoading ? (
          <Skeleton className="py-4 px-4 bg-neutral-200 rounded-full " />
           ) : (
          <Typography className="font-medium text-xs md:text-lg py-1 px-4 border rounded-full bg-neutral-200">
            *In a bank, you would’ve earned {formatNumberToCurrency(`${ bankInterestEarned}`)}
          </Typography> )}

          <Button
            fullWidth
            size="large"
            href="/signup"
            variant="contained"
            className="mt-8 md:mt-14 bg-primary-main text-xs md:text-lg font-medium "
          >
            Start Yielding Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YieldCalculator;
