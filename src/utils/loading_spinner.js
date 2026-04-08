import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

export const LoadingSpinner = ({ 
    message = 'Loading...', 
    size = 40 
}) => {
    const theme = useTheme();

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center"
            p={3}
        >
            <CircularProgress 
                size={size} 
                sx={{ color: theme.palette.primary.main, mb: 2 }}
            />
            {message && (
                <Typography 
                    variant="body2" 
                    color="textSecondary"
                    align="center"
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};


// Wrap Loading spineer with panel
export const LoadingPanel = ({ 
    loading, 
    children, 
    message = 'Loading...'
}) => {
    const theme = useTheme();

    if (loading) {
        return (
            <Box 
                sx={{
                    ...theme.palette.contentPanel,
                    padding: 3,
                    margin: 2,
                    borderRadius: 2,
                    minHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LoadingSpinner message={message} />
            </Box>
        );
    }

    return children;
};