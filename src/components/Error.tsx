import {Box, Typography} from "@mui/material";

const styles = {
    box: {
        marginTop: "20%",
        textAlign: "center",
        color: "red",
        fontSize: "30px"
    }
}
//move to constants
const DEFAULT_TEXT = `
    Error!
    Please check your internet connection and try again
`

export const ErrorMessage = ({text}: any) => (
    <Box sx={styles.box}>
        <Typography>
            {text ? text : DEFAULT_TEXT}
        </Typography>
    </Box>
)