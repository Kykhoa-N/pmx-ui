import {Typography, useTheme, Box} from "@mui/material";

export const InsightsPanel = ({ is_insight = true, content, sx = {} }) => {

    const theme = useTheme();

    return (
        <Box sx={sx}>
            <Box sx={{ 
                backgroundColor: is_insight === true ? '#e3f2fd' : '#f8f9fa', 
                padding: 2, 
                borderRadius: 1, 
                border: is_insight === true ? '1px solid #bbdefb' : '1px solid #dee2e6'
            }}>
                <Typography variant="subtitle2" sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 'bold', 
                    mb: 1,
                    fontSize: '14px'
                }}>
                    { is_insight === true ? "Insights & Signals" : "Root Cause"}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                    {content}
                </Typography>
            </Box>
        </Box>
    )
};