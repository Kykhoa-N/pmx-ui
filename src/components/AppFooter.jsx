import {useEffect, useState} from "react";
import {apiGet} from "../utils";
import {AppBar, Typography, useTheme} from "@mui/material";
// NOTE: This import originally drew from Grid2 but was causing issues. Reverted to Grid. 
import Grid from "@mui/material/Grid";

export const AppFooter = () => {
    const theme = useTheme();
    const dims = theme.dimensions;

    {/*

        This code is used to fetch and display UI and API versions, but it uses Creat React App. This
        project is using Vite, so they're incompatible. This could be a big issue down the line, I'm pretty
        sure we're supposed to be using React. Look into this later.


    const [uiVersion, setUiVersion] = useState(null);
    const [apiVersion, setApiVersion] = useState(null);

    const fetchApiVersion = () => {
        setUiVersion(`${process.env.REACT_APP_UI_VERSION} (${process.env.REACT_APP_GIT_COMMIT_ID})`);
        apiGet(`version`, (data) => {
            setApiVersion(data.version);
        });
    };

    useEffect(() => {
        fetchApiVersion();
    }, []);

    */}

    return (
        <div style={{position: 'fixed', bottom: 0, left: 0, width: '100%'}}>
            <AppBar position="sticky" style={{height: dims.footerHeight}}>
                <Grid container justifyContent="center">

                    {/* <Typography>UI version: {uiVersion} - API version: {apiVersion}</Typography> */}
                    
                </Grid>
            </AppBar>
        </div>
    );
};