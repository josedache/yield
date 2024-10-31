import {
  Avatar,
  IconButton,
  Paper,
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
import { useMemo } from "react";

function Profile() {
  const authUser = useAuthUser();

  const clipboard = useClipboard();

  const { enqueueSnackbar } = useSnackbar();

  const [uploadUserFileMutation, uploadUserFileMutationResult] =
    userApi.useUploadUserFileMutation();

  const transactionOutwardBankListQueryResult =
    transactionApi.useGetTransactionOutwardBankListQuery(undefined, {
      skip: !authUser.bank_details.bankId,
    });

  const banks = transactionOutwardBankListQueryResult.data?.data;

  const normalizedBanks = useMemo(
    () =>
      banks?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, (typeof banks)[0]>),
    [banks]
  );

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

      <div className="flex gap-8">
        <div className="flex-1 space-y-8">
          <Paper variant="outlined">
            <div className="px-6 p-4 border-b">
              <Typography variant="h6" className="font-medium">
                Personal Information
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <TextField label="First Name" value={authUser.firstname} />
              <TextField label="Last Name" value={authUser.lastname} />
              <TextField label="BVN" value={authUser.bvn} />
              <TextField label="NIN" value={authUser.nin} />
              <TextField label="Phone Number" value={authUser.mobileNo} />
              <TextField label="Email Address" value={authUser.email} />
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
                className="inline-flex items-start gap-4 p-6"
              >
                <IconButton
                  variant="soft"
                  color="primary"
                  shape="default"
                  disableRipple
                >
                  <Iconify icon="teenyicons:bank-outline" />
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
                  </div>
                </div>
              </Paper>
            </div>
          </Paper>
        </div>
        <div className="w-full md:w-1/3">
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
                      {authUser?.avatar ? "Update" : "Upload"}
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
