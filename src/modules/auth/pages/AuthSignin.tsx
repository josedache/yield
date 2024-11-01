import { Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { DASHBOARD, RESET_PASSWORD, SIGNUP } from "constants/urls";
import PasswordTextField from "components/PasswordTextField";
import { getFormikTextFieldProps } from "utils/formik";
import NumberTextField from "components/NumberTextField";
import { userApi } from "apis/user-api";

function AuthSignin() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loginUserMutation] = userApi.useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      phone: "",
      login_method: "password",
      channel: "yield",
      version: "1",
    },
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      phone: yup.string().label("Phone Number").required("${path} is required"),
      password: yup.string().label("Password").required("${path} is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginUserMutation({ body: values }).unwrap();
        enqueueSnackbar(data.message || "Login Successful", {
          variant: "success",
        });
        navigate(DASHBOARD);
      } catch (error: any) {
        enqueueSnackbar(error?.data?.message || "Failed to login", {
          variant: "error",
        });
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit as any}
      className="h-full flex flex-col justify-center items-center"
    >
      <Paper className="w-full max-w-lg min-h-0 max-h-full overflow-auto">
        <div className="sticky top-0 z-10 bg-inherit p-8 pb-4">
          <Typography variant="h4" className="font-bold mb-4">
            Welcome Back
          </Typography>
          <Typography className="text-text-secondary">
            Please, log back into your account to continue growing your yields.
          </Typography>
        </div>

        <div className="px-8">
          <NumberTextField
            freeSolo
            fullWidth
            margin="normal"
            label="Phone Number"
            placeholder="Enter Phone Number"
            {...getFormikTextFieldProps(formik, "phone")}
          />
          <PasswordTextField
            fullWidth
            margin="normal"
            label="Password"
            placeholder="**********"
            {...getFormikTextFieldProps(formik, "password")}
          />
        </div>

        <div className="sticky bottom-0 p-8 pt-4 bg-inherit z-10 space-y-8">
          <LoadingButton
            type="submit"
            fullWidth
            disabled={!formik.isValid || !formik.dirty}
            size="large"
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
          >
            Sign In
          </LoadingButton>

          <div className="space-y-2">
            <Typography color="textSecondary">
              I forgot my password.{" "}
              <Typography
                color="primary"
                className="font-bold"
                component={Link}
                to={RESET_PASSWORD}
              >
                Reset Password
              </Typography>
            </Typography>
            <Typography color="textSecondary">
              Don’t have an account?{" "}
              <Typography
                color="primary"
                className="font-bold"
                component={Link}
                to={SIGNUP}
              >
                Sign up
              </Typography>
            </Typography>
          </div>
        </div>
      </Paper>
    </form>
  );
}

export default AuthSignin;

export const Component = AuthSignin;
