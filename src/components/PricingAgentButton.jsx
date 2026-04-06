import {useState} from "react";
import {Fab, Tooltip, useTheme} from "@mui/material";
import {SmartToy} from "@mui/icons-material";
import {PricingAgentChat} from "./PricingAgentChat";

export const PricingAgentButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();

    return (
        <>
            {!isOpen && (
                <Tooltip title="Chat with Ava, Pricing Agent" placement="left">
                    <Fab
                        onClick={() => setIsOpen(true)}
                        sx={{
                            position: 'fixed',
                            bottom: 30,
                            right: 30,
                            width: 64,
                            height: 64,
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            zIndex: 1,
                            '&:hover': {
                                bgcolor: theme.palette.primary.main,
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        <SmartToy sx={{fontSize: 30}} />
                    </Fab>
                </Tooltip>
            )}
            
            {isOpen && <PricingAgentChat onClose={() => setIsOpen(false)} />}
        </>
    );
};
export default PricingAgentButton;


