import {
  Avatar,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useAuthUser from "hooks/useAuthUser";
import useClipboard from "hooks/useClipboard";
import { Icon as Iconify } from "@iconify/react";

function Profile() {
  const authUser = useAuthUser();

  const clipboard = useClipboard();

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
                    Credit Direct Limited
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
              <Avatar className="w-24 h-24" />
              <Typography color="textSecondary" className="text-center">
                Your profile photo personalizes your <br /> yield account
              </Typography>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outlined">Remove</Button>
                <Button variant="contained">Update</Button>
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
