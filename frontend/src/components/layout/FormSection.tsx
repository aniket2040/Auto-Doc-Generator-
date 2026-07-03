import {
    Paper,
    Typography,
    Box,
} from "@mui/material";

interface FormSectionProps {

    title: string;

    children: React.ReactNode;

}

export default function FormSection({

    title,

    children,

}: FormSectionProps) {

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
            }}
        >

            <Typography
                variant="h5"
                gutterBottom
            >
                {title}
            </Typography>

            <Box component="div" sx={{ mt: 2 }}>

                {children}

            </Box>

        </Paper>

    );

}