import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
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

const minAmount = 50_000;
const maxAmount = 10_000_000;

const YieldCalculator = () => {

  const formik = useFormik({
    initialValues: {
      amount: "140000",
      duration: 1,
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Amount is required")
        .min(50000, "Amount must be greater than 50000")
        .max(10000000, "Amount must be less than 10000000"),
      duration: Yup.number().min(1, "Please select a duration"),
    }),
    onSubmit: async () => {},
  });

  const months = [
    { id: 1, month: "1 Month" },
    { id: 2, month: "2 Months" },
    { id: 3, month: "3 Months" },
    { id: 4, month: "4 Months" },
    { id: 5, month: "5 Months" },
    { id: 6, month: "6 Months" },
    { id: 7, month: "7 Months" },
    { id: 8, month: "8 Months" },
    { id: 9, month: "9 Months" },
    { id: 10, month: "10 Months" },
    { id: 11, month: "11 Months" },
    { id: 12, month: "12 Months" },
  ];

  const getInterestRate = (month) => {
    if (month === 1) return 16;
    if (month === 2) return 17;
    if (month >= 3 && month <= 5) return 18;
    if (month >= 6 && month <= 8) return 19;
    if (month >= 9 && month <= 11) return 20;
    return 21; 
  };

  const calculateYield = (amount : number, duration : number) => {
    const interestRate = getInterestRate(duration);
    if (amount > maxAmount || amount < minAmount) {
      return {
        interestRate,
        earnedYield: 0,
        maturityAmount: 0,
        bankInterestEarned: 0,
      };
    }

    const interestEarned = amount * (interestRate / 100) * (duration / 12);
    const maturityAmount = amount + interestEarned;

    const bankInterestRate = 4;
    const bankInterestEarned =
      amount * (bankInterestRate / 100) * (duration / 12);

    return {
      interestRate,
      earnedYield: interestEarned.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2),
      bankInterestEarned: bankInterestEarned.toFixed(2),
    };
  };

  const { amount, duration } = formik.values;
  const { interestRate, earnedYield, maturityAmount, bankInterestEarned } =
    calculateYield(parseFloat(amount), duration);

  return (
    <div className=" flex flex-col lg:flex-row max-w-7xl items-center justify-between mx-auto gap-8 xl:gap-14 px-4 md:px-16 lg:px-8 xl:px-5 py-14">
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
              {...getFormikTextFieldProps(formik, "amount")}
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

            {formik.errors.amount && (
              <p className="text-red-500 text-sm">{formik.errors.amount}</p>
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
            {...getFormikTextFieldProps(formik, "duration")}
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

        <Typography className="rounded-full bg-[#E5EEDC] py-2 px-6 font-medium text-primary-dark text-xl ">
          {interestRate}% per annum
        </Typography>
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

          <Typography className="font-semibold text-3xl md:text-5xl w-[90%] text-primary-dark mt-3 md:mt-6 overflow-x-scroll scrollbar-hidden">
            {formatNumberToCurrency(`${maturityAmount}`)}
          </Typography>

          <p className=" bg-neutral-500 py-1 px-4 my-5 text-white border rounded-full font-medium text-xs md:text-xl">
          {formatNumberToCurrency(`${earnedYield}`)} earned in returns on Yield
          </p>

          <Typography className="font-medium text-xs md:text-lg py-1 px-4 border rounded-full bg-neutral-200">
            *In a bank, you would’ve earned {formatNumberToCurrency(`${bankInterestEarned}`)}
          </Typography>
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
