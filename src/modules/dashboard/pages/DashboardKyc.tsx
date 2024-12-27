import { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import useStepper from "hooks/useStepper";
import { useSnackbar } from "notistack";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  Icon,
  MenuItem,
  TextField,
  Typography,
  Link as MuiLink,
  FormHelperText,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { LoadingButton } from "@mui/lab";

import NumberTextField from "components/NumberTextField";
import { DASHBOARD } from "constants/urls";
import useAuthUser from "hooks/useAuthUser";
import { DashboardKycStep } from "../enums/DashboardKycStep";
import { userApi } from "apis/user-api";
import { transactionApi } from "apis/transaction-api";
import { getFormikTextFieldProps } from "utils/formik";
import useRtkQueryStatusCallbacks from "hooks/useRtkQueryStatusCallbacks";
import { removeEmptyProperties } from "utils/object";
import Countdown from "components/Countdown";

function DashboardKyc() {
  const { enqueueSnackbar } = useSnackbar();

  const authUser = useAuthUser();

  const [verifyUserClientKycMutation] =
    userApi.useVerifyUserClientKycMutation();

  const transactionOutwardBankListQueryResult =
    transactionApi.useGetTransactionOutwardBankListQuery(undefined);

  const [requestUserVoiceOtpMutation, requestUserVoiceOtpMutationResult] =
    userApi.useLazyRequestUserVoiceOtpQuery(undefined);

  const [sendOtpMutation, sendOtpMutationResult] =
    userApi.useSendUserOtpMutation();
  const [verifyOtpMutation] = userApi.useVerifyUserOtpMutation();
  const [countdownDate, setCountdownDate] = useState();

  const banks = transactionOutwardBankListQueryResult.data?.data;

  const normalizedBanks = useMemo(
    () =>
      banks?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, (typeof banks)[0]>),
    [banks]
  );

  const isBasicInformationCompleted =
    authUser?.firstname &&
    authUser?.lastname &&
    authUser?.bvn &&
    authUser?.mobileNo &&
    authUser?.email;

  const isIdentificationCompleted = authUser?.nin;
  const isAlternateNumberCompleted = authUser?.alternate_number;

  const isAccountDetailsCompleted =
    authUser?.bank_details?.accountnumber &&
    authUser?.bank_details?.accountname;

  const stepper = useStepper({
    initialStep: getEnumStepIndex(
      !isBasicInformationCompleted
        ? DashboardKycStep.BASIC_INFORMATION
        : !isIdentificationCompleted
        ? DashboardKycStep.IDENTIFICATION
        : !isAlternateNumberCompleted
        ? DashboardKycStep.ALTERNATE_PHONE_NUMBER
        : !isAccountDetailsCompleted
        ? DashboardKycStep.ACCOUNT_DETAILS
        : DashboardKycStep.SUCCESS
    ),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const formik = useFormik({
    initialValues: {
      bvn: authUser.bvn ?? "",
      nin: authUser?.nin ?? "",
      mobileNo: authUser?.mobileNo ?? "",
      emailAddress: authUser.email ?? "",
      firstname: authUser.firstname ?? "",
      lastname: authUser.lastname ?? "",
      alternateMobileNo: authUser.alternate_number ?? "",
      alternateMobileNoOtp: "",
      accountnumber: authUser.bank_details?.accountnumber ?? "",
      accountname: authUser.bank_details?.accountname ?? "",
      bankId: authUser.bank_details?.bankId ?? "",
      document: {
        file: null as File,
        type: "nin_slip",
        id_number: authUser?.nin ?? "",
      },
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ...{
        [DashboardKycStep.BASIC_INFORMATION]: {
          bvn: yup.string().label("BVN").length(11).required(),
          emailAddress: yup.string().label("Email Address").required(),
          firstname: yup.string().label("First Name").required(),
          lastname: yup.string().label("Last Name").required(),
        },
        [DashboardKycStep.IDENTIFICATION]: {
          document: yup.object({
            // file: yup
            //   .mixed()
            //   .label("Document")
            //   .test(
            //     "file",
            //     "Document is not a file",
            //     (value) => value instanceof File
            //   )
            //   .required(),
            id_number: yup.string().label("NIN").length(11).required(),
          }),
        },
        [DashboardKycStep.ALTERNATE_PHONE_NUMBER]: {
          alternateMobileNo: yup
            .string()
            .label("Alternate Phone Number")
            .length(11),
          alternateMobileNoOtp: yup.string().label("Otp"),
        },
        [DashboardKycStep.ACCOUNT_DETAILS]: {
          accountnumber: yup
            .string()
            .label("Account Number")
            .length(10)
            .required(),
          accountname: yup.string().label("Account Name").required(),
          bankId: yup.string().label("Bank").required(),
        },
      }[enumStep],
    }),
    onSubmit: async (values) => {
      try {
        switch (enumStep) {
          case DashboardKycStep.BASIC_INFORMATION: {
            const data = await verifyUserClientKycMutation({
              body: removeEmptyProperties({
                ...values,
                bankId: String(values.bankId),
                document: undefined,
              }),
            }).unwrap();
            enqueueSnackbar(
              data?.message || "Basic information updated Successfully!",
              {
                variant: "success",
              }
            );

            if (isAccountDetailsCompleted) {
              return stepper.go(getEnumStepIndex(DashboardKycStep.SUCCESS));
            }

            if (isIdentificationCompleted) {
              return stepper.go(
                getEnumStepIndex(DashboardKycStep.ACCOUNT_DETAILS)
              );
            }

            break;
          }
          case DashboardKycStep.IDENTIFICATION: {
            const data = await verifyUserClientKycMutation({
              body: removeEmptyProperties({
                nin: values.document.id_number,
              }),
            }).unwrap();
            enqueueSnackbar(
              data?.message || "Document uploaded successfully!",
              {
                variant: "success",
              }
            );
            break;
          }
          case DashboardKycStep.ALTERNATE_PHONE_NUMBER: {
            const data = await verifyOtpMutation({
              body: {
                channel: "alternate_number",
                otp: formik.values.alternateMobileNoOtp,
              },
            }).unwrap();
            enqueueSnackbar(
              data?.message || "Alternate Phone Number updated Successfully!",
              {
                variant: "success",
              }
            );

            break;
          }
          case DashboardKycStep.ACCOUNT_DETAILS: {
            const data = await verifyUserClientKycMutation({
              body: removeEmptyProperties({
                ...values,
                bankId: String(values.bankId),
                nin: values.document.id_number,
                document: undefined,
              }),
            }).unwrap();
            enqueueSnackbar(
              data?.message || "Account details updated Successfully!",
              {
                variant: "success",
              }
            );

            break;
          }
          default:
            break;
        }

        stepper.next();
      } catch (error) {
        const message = Array.isArray(error?.data?.message)
          ? error?.data?.message?.[0]
          : error?.data?.message;

        enqueueSnackbar(message || "Failed to update KYC", {
          variant: "error",
        });
      }
    },
  });

  const transactionOutwardNameEnquiryQueryResult =
    transactionApi.useGetTransactionOutwardNameEnquiryQuery(
      useMemo(
        () => ({
          params: {
            bankCode: normalizedBanks?.[formik.values.bankId]?.code,
            accountNumber: formik.values.accountnumber,
          },
        }),
        [formik.values.accountnumber, formik.values.bankId, normalizedBanks]
      ),
      {
        skip: !(
          formik.values.bankId &&
          formik.values.accountnumber &&
          formik.values.accountnumber?.length === 10
        ),
      }
    );

  const transactionOutwardNameEnquiry =
    transactionOutwardNameEnquiryQueryResult.data?.data;

  useRtkQueryStatusCallbacks(transactionOutwardNameEnquiryQueryResult, {
    onSuccess(queryResult) {
      formik.setFieldValue("accountname", queryResult.data?.data?.accountName);
    },
  });

  const handleSendOtp = async () => {
    try {
      const data = await sendOtpMutation({
        body: {
          channel: "alternate_number",
          user_id: String(authUser?.id),
          alternate_number: String(formik.values.alternateMobileNo),
        },
      }).unwrap();
      setCountdownDate(getCountdownDate());
      enqueueSnackbar(data?.message || "Verification Otp Sent", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.errors?.[0]?.defaultUserMessage || `OTP failed to send!`,
        {
          variant: "error",
        }
      );
    }
  };

  async function handleRequestVoiceOtp() {
    try {
      if (requestUserVoiceOtpMutationResult.isFetching) {
        return;
      }

      const data = await requestUserVoiceOtpMutation({
        params: { phone: formik.values.alternateMobileNo },
      }).unwrap();
      enqueueSnackbar(data?.message || "Voice Otp successfully sent", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Failed to send Voice Otp", {
        variant: "success",
      });
    }
  }

  const actionButtons = (
    <div className="flex justify-end gap-2">
      {[DashboardKycStep.ALTERNATE_PHONE_NUMBER].includes(enumStep) && (
        <LoadingButton
          fullWidth
          variant="outlined"
          className="max-w-[132px]"
          loading={formik.isSubmitting}
          loadingPosition="start"
          startIcon={<></>}
          onClick={() => {
            stepper.next();
          }}
        >
          Skip
        </LoadingButton>
      )}

      <LoadingButton
        fullWidth
        className="max-w-[132px]"
        disabled={
          enumStep !== DashboardKycStep.ALTERNATE_PHONE_NUMBER &&
          (!formik.isValid || !formik.dirty)
        }
        loading={formik.isSubmitting}
        loadingPosition="start"
        startIcon={<></>}
        onClick={formik.handleSubmit as any}
      >
        Save
      </LoadingButton>
    </div>
  );

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <div className="text-center">
          <Typography variant="h5" gutterBottom>
            Let’s get you started
          </Typography>
          <Typography color="textSecondary" className="mt-4">
            To get the best experience, we recommend you complete these
            onboarding steps.
          </Typography>
        </div>
        <div className="mt-8">
          {[
            {
              title: "Basic Information",
              completed: isBasicInformationCompleted,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="First Name"
                    placeholder="Enter First Name"
                    value={formik.values.firstname}
                    disabled
                    // {...getFormikTextFieldProps(formik, "firstname")}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    placeholder="Enter Last Name"
                    value={formik.values.lastname}
                    disabled
                    // {...getFormikTextFieldProps(formik, "lastname")}
                  />
                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="BVN"
                    placeholder="Enter a valid BVN"
                    {...(authUser.bvn
                      ? { value: formik.values.bvn, disabled: true }
                      : getFormikTextFieldProps(formik, "bvn"))}
                    // {...getFormikTextFieldProps(formik, "bvn")}
                  />
                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="Phone Number"
                    placeholder="Enter a valid Phone number"
                    value={formik.values.mobileNo}
                    disabled
                    // {...getFormikTextFieldProps(formik, "mobileNo")}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    placeholder="Enter a valid email address"
                    type="email"
                    {...(authUser.email
                      ? { value: formik.values.emailAddress, disabled: true }
                      : getFormikTextFieldProps(formik, "emailAddress"))}
                    // {...getFormikTextFieldProps(formik, "emailAddress")}
                  />
                  <div className="flex items-end">
                    <div className="flex-1">{actionButtons}</div>
                  </div>
                </div>
              ),
            },
            {
              title: "Identification",
              completed: isIdentificationCompleted,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="ID Type"
                    placeholder="NIN"
                    select
                    value={formik.values.document.type}
                    disabled
                    // {...getFormikTextFieldProps(formik, "document.type")}
                  >
                    {[{ name: "NIN", id: "nin_slip" }].map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="ID Number"
                    placeholder="Enter ID Number"
                    {...getFormikTextFieldProps(formik, "document.id_number")}
                  />
                  {/* <Dropzone
                    multiple={false}
                    maxSize={1024 * 1024 * 2}
                    accept={{
                      "image/*": [],
                      "application/pdf": [],
                    }}
                    onDropAccepted={(files) => {
                      const file = files[0];
                      formik.setFieldValue("document.file", file);
                    }}
                    onDropRejected={(fileRejection) => {
                      enqueueSnackbar(
                        fileRejection[0].errors?.[0].message || "File Rejected",
                        { variant: "error" }
                      );
                    }}
                    noClick
                  >
                    {({ getRootProps, getInputProps, open }) => (
                      <div className="md:col-span-2">
                        <Paper
                          {...getRootProps({
                            variant: "outlined",
                            onClick: open,
                            className: "p-4 bg-gray-100",
                          })}
                        >
                          <input {...getInputProps()} />
                          {formik.values.document?.file ? (
                            <div className="space-y-4">
                              <div className="flex items-start gap-2">
                                <Iconify
                                  icon="ion:document-text-outline"
                                  className="text-lg text-text-secondary mt-1"
                                />
                                <div>
                                  <Typography className="">
                                    {formik.values.document.file?.name}
                                  </Typography>
                                  <Typography color="textSecondary">
                                    2 MB
                                  </Typography>
                                </div>
                                <div className="flex-1" />
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    formik.setFieldValue("document.file", null);
                                  }}
                                  size="small"
                                  variant="soft"
                                  color="error"
                                  className="flex flex-end"
                                >
                                  <Iconify
                                    icon="material-symbols:delete-outline"
                                    className="text-lg text-error-dark"
                                  />
                                </IconButton>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <LinearProgress
                                    variant="determinate"
                                    value={100}
                                    className="rounded"
                                    color="success"
                                  />
                                </div>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  100%
                                </Typography>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-md flex flex-col items-center gap-2">
                              <Typography variant="h6">
                                Upload a file or drag and drop
                              </Typography>
                              <Typography>PNG, JPG, PDF up to 2MB</Typography>
                            </div>
                          )}
                        </Paper>

                        {!!formik.errors.document?.file && (
                          <Typography
                            color="error"
                            className="text-[10px] mt-[3px] text-center"
                          >
                            {formik.errors.document?.file as any}
                          </Typography>
                        )}
                      </div>
                    )}
                  </Dropzone> */}
                  <div />
                  <div className="flex items-end mt-4">
                    <div className="flex-1">{actionButtons}</div>
                  </div>
                </div>
              ),
            },
            {
              title: "Alternate Number (Optional)",
              completed: isAlternateNumberCompleted,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="Alternate Phone Number"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <Button
                            // variant="outlined"
                            size="small"
                            onClick={handleSendOtp}
                            disabled={sendOtpMutationResult.isLoading}
                          >
                            Verify
                          </Button>
                        ),
                      },
                    }}
                    placeholder="Alternate Phone Number"
                    {...getFormikTextFieldProps(formik, "alternateMobileNo")}
                  />

                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="Verification Code"
                    placeholder="848399"
                    disabled={!formik.values.alternateMobileNo}
                    {...getFormikTextFieldProps(formik, "alternateMobileNoOtp")}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <Countdown date={countdownDate}>
                            {(countdown) => {
                              const isCodeSent =
                                countdown.days ||
                                countdown.minutes ||
                                countdown.seconds ||
                                countdown.seconds;

                              return (
                                <>
                                  {isCodeSent ? (
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      className="text-center"
                                    >
                                      <Typography
                                        component="span"
                                        color="primary"
                                        className="font-semibold"
                                      >
                                        {countdown.minutes}:
                                        {countdown.seconds < 10
                                          ? `0${countdown.seconds}`
                                          : countdown.seconds}
                                      </Typography>
                                    </Typography>
                                  ) : (
                                    <div className="flex items-center justify-center">
                                      <Typography className="text-center">
                                        <ButtonBase
                                          disableRipple
                                          disabled={
                                            sendOtpMutationResult.isLoading
                                          }
                                          component={MuiLink}
                                          onClick={handleSendOtp as any}
                                          className="text-text-primary font-bold"
                                        >
                                          Resend
                                        </ButtonBase>
                                      </Typography>
                                    </div>
                                  )}
                                </>
                              );
                            }}
                          </Countdown>
                        ),
                      },
                    }}
                  />

                  <div className="col-span-2">
                    <FormHelperText className="text-center">
                      Dial{" "}
                      <MuiLink className="font-semibold cursor-pointer">
                        *5120*11#
                      </MuiLink>{" "}
                      on your number to get your OTP, or{" "}
                      <MuiLink
                        className="font-semibold cursor-pointer"
                        onClick={handleRequestVoiceOtp}
                      >
                        request a call
                      </MuiLink>
                      {requestUserVoiceOtpMutationResult.isFetching ? (
                        <CircularProgress size={10} className="ml-1" />
                      ) : null}
                      .
                    </FormHelperText>
                  </div>

                  <div />
                  <div className="flex items-end mt-4">
                    <div className="flex-1">{actionButtons}</div>
                  </div>
                </div>
              ),
            },
            {
              title: "Account Details",
              completed: isAccountDetailsCompleted,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="Bank Name"
                    placeholder="Select Bank"
                    select
                    {...getFormikTextFieldProps(formik, "bankId")}
                  >
                    {banks?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div className="space-y-2">
                    <NumberTextField
                      freeSolo
                      maskOptions={{ max: 10 }}
                      fullWidth
                      label="Account Number"
                      placeholder="Enter Account Number"
                      {...getFormikTextFieldProps(formik, "accountnumber")}
                    />
                    <>
                      {transactionOutwardNameEnquiryQueryResult.isFetching ? (
                        <Typography variant="body2">
                          Fetching Account details{" "}
                          <CircularProgress size={10} />
                        </Typography>
                      ) : transactionOutwardNameEnquiryQueryResult.isSuccess ? (
                        <div className="flex items-center gap-2 text-success-main">
                          <Iconify
                            icon="lets-icons:check-fill"
                            className="text-lg"
                          />
                          <Typography variant="body2" className="font-medium">
                            {transactionOutwardNameEnquiry?.accountName}
                          </Typography>
                        </div>
                      ) : transactionOutwardNameEnquiryQueryResult.isError ? (
                        <Typography variant="body2" color="error">
                          {
                            (
                              transactionOutwardNameEnquiryQueryResult.error as any
                            )?.data?.message
                          }
                        </Typography>
                      ) : null}
                    </>
                  </div>
                  <div />
                  <div className="flex items-end mt-4">
                    <div className="flex-1">{actionButtons}</div>
                  </div>
                </div>
              ),
            },
          ].map(({ title, content, completed }, index) => {
            return (
              <Accordion
                key={title}
                elevation={stepper.step === index ? 1 : 0}
                expanded={stepper.step === index}
                className={clsx(
                  stepper.step === index ? "border-neutral-50" : "border-none",
                  "rounded-lg mb-4"
                )}
                sx={{
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                  <div className="flex items-center gap-2">
                    <Icon
                      color={completed ? "primary" : "disabled"}
                      className="material-symbols-outlined-fill"
                    >
                      check_circle
                    </Icon>
                    <Typography
                      variant="h6"
                      className={clsx(
                        completed ? "text-neutral-500" : "",
                        stepper.step === index ? "font-semibold" : "font-normal"
                      )}
                    >
                      {title}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="pb-5">{content}</AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>

      <Dialog
        PaperProps={{ sx: { maxWidth: 400 } }}
        fullWidth
        open={enumStep === DashboardKycStep.SUCCESS}
      >
        <DialogContent className="space-y-8 max-w-md mx-auto py-10 flex justify-center flex-col items-center">
          <div className="flex justify-center text-6xl">
            <Icon
              fontSize="inherit"
              color="success"
              className="material-symbols-outlined-fill "
            >
              check_circle
            </Icon>
          </div>
          <Typography variant="h4" className="text-center mb-4 font-bold">
            Success!
          </Typography>
          <DialogContentText className="text-center">
            You’ve successfully completed your onboarding. Let’s start growing
            your wealth!
          </DialogContentText>
          <Button
            className="max-w-[255px]"
            size="large"
            fullWidth
            component={Link}
            to={DASHBOARD}
          >
            Go to Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const Component = DashboardKyc;

export default DashboardKyc;

function getEnumStepIndex(enumStep: DashboardKycStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  DashboardKycStep.BASIC_INFORMATION,
  DashboardKycStep.IDENTIFICATION,
  DashboardKycStep.ALTERNATE_PHONE_NUMBER,
  DashboardKycStep.ACCOUNT_DETAILS,
  DashboardKycStep.SUCCESS,
];

function getCountdownDate() {
  const date = new Date();
  date.setSeconds(date.getSeconds() + 60);
  return date;
}
