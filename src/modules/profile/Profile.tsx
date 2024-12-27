import {
  Avatar,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import useAuthUser from "hooks/useAuthUser";
import useClipboard from "hooks/useClipboard";
import { Icon as Iconify } from "@iconify/react";
import { getAssetInfo } from "utils/file";
import { userApi } from "apis/user-api";
import { useSnackbar } from "notistack";
import Dropzone from "react-dropzone";
import { LoadingButton } from "@mui/lab";
import { transactionApi } from "apis/transaction-api";
import { useMemo, useState } from "react";

function Profile() {
  const authUser = useAuthUser();

  const clipboard = useClipboard();

  const { enqueueSnackbar } = useSnackbar();
  const [preferredOtpMode, setPreferredOtpMode] = useState(
    authUser.preffered_notification_channel || "bvn_phone"
  );

  const [uploadUserFileMutation, uploadUserFileMutationResult] =
    userApi.useUploadUserFileMutation();

  const transactionOutwardBankListQueryResult =
    transactionApi.useGetTransactionOutwardBankListQuery(undefined, {
      skip: !authUser.bank_details.bankId,
    });

  const [preferredOtpModeMutation, preferredOtpModeMutationResult] =
    userApi.usePreferredUserOtpNumberMutation();

  const banks = transactionOutwardBankListQueryResult.data?.data;

  const normalizedBanks = useMemo(
    () =>
      banks?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, (typeof banks)[0]>),
    [banks]
  );

  const handleChangePreferredOtpMode = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const data = await preferredOtpModeMutation({
        body: {
          channel: event.target.value as any,
        },
      }).unwrap();
      setPreferredOtpMode((event.target as HTMLInputElement).value);
      enqueueSnackbar(
        data?.message || "Preferred OTP mode updated successfully!",
        {
          variant: "success",
        }
      );
    } catch (error) {
      const message = Array.isArray(error?.data?.message)
        ? error?.data?.message?.[0]
        : error?.data?.message;
      enqueueSnackbar(message || "Failed to update Preferred OTP mode", {
        variant: "error",
      });
    }
  };

  async function handleSelfieUpdate(file: File) {
    try {
      const assetInfo = getAssetInfo(file);

      const data = await uploadUserFileMutation({
        body: {
          file: file,
          tier_level: authUser.kycLevel,
          title: file.name,
          type: "selfie",
          fileExtension: assetInfo.type,
          mimeType: assetInfo.mimeType,
        },
      }).unwrap();
      enqueueSnackbar(data?.message || "Selfied updated successfully!", {
        variant: "success",
      });
    } catch (error) {
      const message = Array.isArray(error?.data?.message)
        ? error?.data?.message?.[0]
        : error?.data?.message;

      enqueueSnackbar(message || "Failed to update selfie", {
        variant: "error",
      });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center flex-wrap gap-2">
        <Typography variant="h5">Profile</Typography>
        <div className="flex-1" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8 w-full lg:w-[65%]">
          <Paper variant="outlined">
            <div className="px-6 p-4 border-b">
              <Typography variant="h6" className="font-medium">
                Personal Information
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <TextField
                disabled
                label="First Name"
                value={authUser.firstname}
              />
              <TextField disabled label="Last Name" value={authUser.lastname} />
              <TextField disabled label="BVN" value={authUser.bvn} />
              <TextField disabled label="NIN" value={authUser.nin} />
              <TextField
                disabled
                label="Phone Number"
                value={authUser.mobileNo}
              />
              <TextField
                disabled
                label="Email Address"
                value={authUser.email}
              />

              <TextField
                disabled
                label="Alternative Phone Number"
                value={authUser.alternate_number}
              />
            </div>
          </Paper>
          <Paper variant="outlined">
            <div className="px-6 p-4 border-b">
              <Typography variant="h6" className="font-medium">
                Bank Account
              </Typography>
            </div>
            <div className="p-6">
              <Paper
                variant="outlined"
                className="inline-flex items-start gap-4 p-6 w-full max-w-[350px] overflow-hidden relative"
              >
                <IconButton
                  variant="soft"
                  color="primary"
                  shape="default"
                  disableRipple
                >
                  <Iconify
                    className="text-[#4B5563]"
                    icon="teenyicons:bank-outline"
                  />
                </IconButton>
                <div className="space-y-1">
                  <Typography className="font-bold">
                    {authUser?.bank_details?.accountname}
                  </Typography>

                  <Typography color="textSecondary">
                    {transactionOutwardBankListQueryResult?.isLoading ? (
                      <Skeleton />
                    ) : (
                      normalizedBanks?.[authUser.bank_details.bankId]?.name
                    )}
                  </Typography>

                  <div className="flex items-center gap-1">
                    <Typography variant="body1">
                      {authUser?.bank_details?.accountnumber}
                    </Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        clipboard.writeText(
                          String(authUser?.bank_details?.accountnumber)
                        )
                      }
                    >
                      <Iconify icon="material-symbols:file-copy-outline" />
                    </IconButton>

                    <svg
                      width="82"
                      height="100"
                      viewBox="0 0 82 134"
                      fill="none"
                      className="absolute right-0 bottom-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M56.5048 57.1503V120.973L56.5046 120.973V121.678C25.5277 121.409 0.5 96.1513 0.5 65.0301V0.502172C15.9057 0.636075 29.8377 6.9522 39.9554 17.0925C50.182 27.3422 56.5048 41.5039 56.5048 57.1503Z"
                        stroke="#042A2B"
                        strokeOpacity="0.1"
                      />
                      <path
                        d="M122.274 65.0308V65.1461C122.212 96.213 97.2047 121.41 66.2688 121.679V92.5979C66.2688 76.9519 72.5916 62.7896 82.8183 52.5358C92.9357 42.3918 106.868 36.0794 122.274 35.9455V65.0308ZM66.2688 171.141V122.72C91.7654 125.05 111.736 146.542 111.736 172.714C111.736 186.25 106.384 198.528 97.6938 207.556L96.8788 208.403H96.8948L61.6583 244.828L26.7679 208.762H26.7878L25.9529 207.911C22.6872 204.585 19.8796 200.804 17.6376 196.671C13.7752 189.553 11.5808 181.396 11.5808 172.718C11.5808 146.731 31.2647 125.359 56.5008 122.772V179.937V180.437H57.0008C62.1211 180.437 66.2688 176.271 66.2688 171.141Z"
                        stroke="#042A2B"
                        strokeOpacity="0.1"
                      />
                    </svg>
                  </div>
                </div>
              </Paper>
            </div>
          </Paper>

          <Paper variant="outlined">
            <div className="px-6 p-4 border-b">
              <Typography variant="h6" className="font-medium">
                Preferred OTP mode
              </Typography>
            </div>
            <div className="p-6">
              <RadioGroup
                row
                value={preferredOtpMode}
                onChange={handleChangePreferredOtpMode}
              >
                <FormControlLabel
                  disabled={preferredOtpModeMutationResult.isLoading}
                  value="alternate_number"
                  control={<Radio />}
                  label="Alternate Phone Number"
                />
                <FormControlLabel
                  value="bvn_phone"
                  control={<Radio />}
                  disabled={preferredOtpModeMutationResult.isLoading}
                  label="BVN Phone Number"
                />
              </RadioGroup>
            </div>
          </Paper>
        </div>
        <div className="w-full lg:w-[35%]">
          <Paper variant="outlined">
            <div className="px-6 p-4 border-b">
              <Typography variant="h6" className="font-medium">
                Your Photo
              </Typography>
            </div>
            <div className="p-6 flex flex-col items-center gap-6">
              <Avatar src={authUser?.avatar} className="w-24 h-24">
                {authUser?.firstname?.[0]}
                {authUser?.lastname?.[0]}
              </Avatar>
              <Typography color="textSecondary" className="text-center">
                Your profile photo personalizes your <br /> yield account
              </Typography>
              <div className="grid grid-cols-1 gap-2">
                {/* <LoadingButton
                  variant="outlined"
                  // disabled={uploadUserFileMutationResult.isLoading}
                  disabled
                  loadingPosition="end"
                  endIcon={<></>}
                >
                  Remove
                </LoadingButton> */}
                <Dropzone
                  multiple={false}
                  maxSize={1024 * 1024 * 2}
                  accept={{ "image/*": [] }}
                  onDropAccepted={(files) => {
                    const file = files[0];
                    handleSelfieUpdate(file);
                  }}
                  onDropRejected={(fileRejection) => {
                    enqueueSnackbar(
                      fileRejection[0].errors?.[0].message || "File Rejected",
                      { variant: "error" }
                    );
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <LoadingButton
                      {...getRootProps({
                        variant: "contained",
                        disabled: uploadUserFileMutationResult.isLoading,
                        loading: uploadUserFileMutationResult.isLoading,
                        loadingPosition: "end",
                        endIcon: <></>,
                      })}
                    >
                      <input {...getInputProps()} />
                      {authUser?.avatar ? "Update" : "Add Photo"}
                    </LoadingButton>
                  )}
                </Dropzone>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export const Component = Profile;

export default Profile;
