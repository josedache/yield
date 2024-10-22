import { TextField, InputAdornment, Icon } from "@mui/material";


const CustomSearchTextfield = ({ ...props }) => {
    return (
        <TextField
            variant="outlined"
            size="small"
            className="w-[180px] md:w-[248px]"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon className="text-primary-main">search</Icon>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    )
}

export default CustomSearchTextfield;