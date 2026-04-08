import React, {useState} from "react";
import {AppBar, Badge, Button, IconButton, ListItemIcon, Menu, MenuItem, useTheme} from "@mui/material";

// NOTE: This import originally drew from Grid2 but was causing issues. Reverted to Grid. 
import Grid from "@mui/material/Grid";
import {AccountCircle, Logout, Notifications, Settings} from "@mui/icons-material";
import {logout} from "../utils";
import logo from '../logo.png';
import { useNavigate } from "react-router-dom";

// All the logic for handleNavigation still has to be ported over.
export const AppHeader = ({handleNavigateToHome, handleNavigateToAlerts, handleNavigateToSettings}) => {
    const theme = useTheme();
    const dims = theme.dimensions;
    const navigate = useNavigate();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

    const handleOpenProfileMenu = (event) => {
        setProfileMenuAnchorEl(event.target);
        setProfileMenuOpen(true);
    };

    const handleCloseProfileMenu = () => {
        setProfileMenuOpen(false);
    };

    const handleSettingsClick = () => {
        setProfileMenuOpen(false);
        handleNavigateToSettings();
    };

    const handleLogOut = () => {
        setProfileMenuOpen(false);
        logout();
        navigate('/');
    };

    //TODO: only show alerts badge if there are alerts...
    return (
        <div style={{width: '100%'}}>
            <AppBar style={{height: dims.headerHeight}}>
                <Grid container>
                    <Grid size={2}>
            <Button style={{ marginLeft: 5, padding: 0}} onClick={handleNavigateToHome}>
                <img src={logo} alt="Profit Matrix" style={{ width: '300px', height: '60px', objectFit: 'contain' }} />
            </Button>
                    </Grid>
                    <Grid size={8}>
                    </Grid>
                    <Grid size={2}>
                        <div style={{marginTop: 10, textAlign: "right"}}>
                            <IconButton style={{color: "white", marginRight: 15}} onClick={handleNavigateToAlerts}>
                                <Badge badgeContent=" " color="warning">
                                    <Notifications/>
                                </Badge>
                            </IconButton>
                            <IconButton style={{color: "white", marginRight: 15}} onClick={handleOpenProfileMenu}>
                                <AccountCircle/>
                            </IconButton>
                            <Menu id="profile-menu" anchorEl={profileMenuAnchorEl} open={profileMenuOpen} onClose={handleCloseProfileMenu}>
                                <MenuItem onClick={handleSettingsClick}>
                                    <ListItemIcon>
                                        <Settings/>
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogOut}>
                                    <ListItemIcon>
                                        <Logout/>
                                    </ListItemIcon>
                                    Log out
                                </MenuItem>
                            </Menu>
                        </div>
                    </Grid>
                </Grid>
            </AppBar>
            <div style={{height: dims.headerHeight}}/>
        </div>
    );
};