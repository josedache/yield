import { useFormik } from "formik";
import * as yup from "yup";
import useStepper from "hooks/useStepper";
import { useSnackbar } from "notistack";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Icon,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getFormikTextFieldProps } from "utils/formik";
import NumberTextField from "components/NumberTextField";
import Dropzone from "react-dropzone";
import { Icon as Iconify } from "@iconify/react";

function DashboardKyc() {
  const { enqueueSnackbar } = useSnackbar();
  const stepper = useStepper();

  const formik = useFormik({
    initialValues: {
      document: "",
    },
    validationSchema: yup.object({}),
    onSubmit: async () => {
      try {
        stepper.next();
      } catch (error) {
        enqueueSnackbar(error?.data?.message || "Failed to update KYC");
      }
    },
  });

  const actionButtons = (
    <div className="grid grid-cols-2 gap-2">
      <Button
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
      </Button>
      <Button size="large" onClick={formik.handleSubmit as any}>
        Save
      </Button>
    </div>
  );

  return (
    <>
      <div className="w-full max-w-xl mx-auto space-y-8">
        <div className="text-center">
          <Typography variant="h5" gutterBottom>
            Let’s get you started
          </Typography>
          <Typography color="textSecondary">
            To get the best experience, we recommend you complete these
            onboarding steps.
          </Typography>
        </div>
        <div className="">
          {[
            {
              title: "Basic Information",
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="First Name"
                    placeholder="Stephanie"
                    {...getFormikTextFieldProps(formik, "firstName")}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    placeholder="Takeme"
                    {...getFormikTextFieldProps(formik, "lastName")}
                  />
                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="BVN"
                    placeholder="22876543210"
                    {...getFormikTextFieldProps(formik, "bvn")}
                  />
                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="Phone Number"
                    placeholder="08012345678"
                    {...getFormikTextFieldProps(formik, "phoneNumber")}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    placeholder="stephanietakeme@yahoo.com"
                    type="email"
                    {...getFormikTextFieldProps(formik, "email")}
                  />
                  <div className="flex items-end">
                    <div className="flex-1">{actionButtons}</div>
                  </div>
                </div>
              ),
            },
            {
              title: "Identification",
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="ID Type"
                    placeholder="NIN"
                    select
                    {...getFormikTextFieldProps(formik, "idType")}
                  >
                    {[
                      { name: "NIN", id: "nin" },
                      { name: "ID Number", id: "idNumber" },
                    ].map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <NumberTextField
                    freeSolo
                    fullWidth
                    label="ID Number"
                    placeholder="Enter ID Number"
                    {...getFormikTextFieldProps(formik, "idNumber")}
                  />
                  <Dropzone
                    multiple={false}
                    accept={{
                      "image/*": [],
                      "application/pdf": [],
                    }}
                    onDropAccepted={(files) => {
                      const file = files[0];
                      formik.setFieldValue("document", file);
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
                            className: "p-4 bg-gray-100 ",
                          })}
                        >
                          <input {...getInputProps()} />
                          {formik.values.document ? (
                            <div className="space-y-4">
                              <div className="flex items-start gap-2">
                                <Iconify
                                  icon="ion:document-text-outline"
                                  className="text-lg text-text-secondary mt-1"
                                />
                                <div>
                                  <Typography className="">
                                    Steph’s Document 1.jpeg
                                  </Typography>
                                  <Typography color="textSecondary">
                                    1.2 MB
                                  </Typography>
                                </div>
                                <div className="flex-1" />
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    formik.setFieldValue("document", null);
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
                              <Typography>PNG, JPG, PDF up to 3MB</Typography>
                            </div>
                          )}
                        </Paper>

                        {!!formik.errors.document && (
                          <Typography
                            color="error"
                            className="text-[10px] mt-[3px] text-center"
                          >
                            {formik.errors.document}
                          </Typography>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  <div />
                  <div className="flex items-end mt-4">
                    <div className="flex-1">{actionButtons}</div>
                  </div>
                </div>
              ),
            },
            {
              title: "Account Details",
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="Bank Name"
                    placeholder="Select Bank"
                    select
                    {...getFormikTextFieldProps(formik, "bankId")}
                  >
                    {[{ name: "First Bank", id: "fb" }].map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div className="space-y-2">
                    <NumberTextField
                      freeSolo
                      fullWidth
                      label="Account Number"
                      placeholder="Enter Account Number"
                      {...getFormikTextFieldProps(formik, "accountNumber")}
                    />
                    <div className="flex items-center gap-2 text-success-main">
                      <Iconify
                        icon="lets-icons:check-fill"
                        className="text-lg"
                      />
                      <Typography variant="body2" className="font-medium">
                        Stephanie O. Takeme
                      </Typography>
                    </div>
                  </div>
                  <div />
                  <div className="flex items-end mt-4">
                    <div className="flex-1">{actionButtons}</div>
                  </div>
                </div>
              ),
            },
          ].map(({ title, content }, index) => {
            return (
              <Accordion key={title} expanded={stepper.step === index}>
                <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                  <div className="flex items-center gap-2">
                    <Icon
                      color={stepper.step > index ? "primary" : "disabled"}
                      className="material-symbols-outlined-fill"
                    >
                      check_circle
                    </Icon>
                    <Typography className="font-semibold">{title}</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>{content}</AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>

      <Dialog fullWidth open={stepper.step === 3}>
        <DialogContent className="space-y-8 max-w-md mx-auto">
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
          <Button size="large" fullWidth>
            Go to Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DashboardKyc;
