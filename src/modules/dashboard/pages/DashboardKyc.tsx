import { useFormik } from "formik";
import * as yup from "yup";
import useStepper from "hooks/useStepper";
import { useSnackbar } from "notistack";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  Icon,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getFormikTextFieldProps } from "utils/formik";
import NumberTextField from "components/NumberTextField";
// import Dropzone from "react-dropzone";
import { Icon as Iconify } from "@iconify/react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { DASHBOARD } from "constants/urls";
import useAuthUser from "hooks/useAuthUser";
import { DashboardKycStep } from "../enums/DashboardKycStep";
import { userApi } from "apis/user-api";
// import { getAssetInfo } from "utils/file";
import { LoadingButton } from "@mui/lab";
import { transactionApi } from "apis/transaction-api";
import { useMemo } from "react";
import useRtkQueryStatusCallbacks from "hooks/useRtkQueryStatusCallbacks";
import { removeEmptyProperties } from "utils/object";

function DashboardKyc() {
  const { enqueueSnackbar } = useSnackbar();

  const authUser = useAuthUser();

  const [verifyUserClientKycMutation] =
    userApi.useVerifyUserClientKycMutation();
  // const [uploadUserFileMutation] = userApi.useUploadUserFileMutation();

  const transactionOutwardBankListQueryResult =
    transactionApi.useGetTransactionOutwardBankListQuery(undefined);

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

  const isAccountDetailsCompleted =
    authUser?.bank_details?.accountnumber &&
    authUser?.bank_details?.accountname;

  const stepper = useStepper({
    initialStep: getEnumStepIndex(
      !isBasicInformationCompleted
        ? DashboardKycStep.BASIC_INFORMATION
        : !isIdentificationCompleted
        ? DashboardKycStep.IDENTIFICATION
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
      // dateOfBirth: "",
      // gender: "",
      mobileNo: authUser?.mobileNo ?? "",
      emailAddress: authUser.email ?? "",
      firstname: authUser.firstname ?? "",
      lastname: authUser.lastname ?? "",
      // middlename: "",
      // addressId: "",
      // typeId: 36,
      // addressLine1: "",
      // addressLine2: "",
      // addressLine3: "",
      // stateProvinceId: "",
      // stateName: "",
      // city: "",
      // countryId: "",
      // countryName: "",
      accountnumber: authUser.bank_details?.accountnumber ?? "",
      accountname: authUser.bank_details?.accountname ?? "",
      bankId: authUser.bank_details?.bankId ?? "",
      // is_bvn_validated: true,
      // is_mobile_no_validated: true,
      // is_email_validated: true,
      // is_nin_validated: true,
      // is_client_identifier_validated: "",
      // isActive: true,
      document: {
        file: null as File,
        type: "nin_slip",
        id_number: authUser?.nin ?? "",
        // date_of_issue: '',
        // country_of_issue: '',
        // expiry_date: ''
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
            // const assetInfo = getAssetInfo(values.document.file);

            // const data = await uploadUserFileMutation({
            //   body: {
            //     file: values.document.file,
            //     tier_level: authUser.kycLevel,
            //     title: values.document.file.name,
            //     type: values.document.type,
            //     fileExtension: assetInfo.type,
            //     mimeType: assetInfo.mimeType,
            //     details: {
            //       id_number: values.document.id_number,
            //     },
            //   },
            // }).unwrap();
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

  // if (
  //   isBasicInformationCompleted &&
  //   isIdentificationCompleted &&
  //   isAccountDetailsCompleted
  // ) {
  //   return <Navigate to={DASHBOARD} replace />;
  // }

  const actionButtons = (
    <div className="flex justify-end gap-2">
      {/* <Button
        variant="outlined"
        size="large"
        onClick={() => {
          if (!stepper.step) {
          } else {
            stepper.previous();
          }
        }}
      >
        {stepper.step ? "Previous" : "Edit"}
      </Button> */}
      <LoadingButton
        fullWidth
        className="max-w-[132px]"
        disabled={!formik.isValid || !formik.dirty}
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
  DashboardKycStep.ACCOUNT_DETAILS,
  DashboardKycStep.SUCCESS,
];
