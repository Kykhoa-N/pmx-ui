import {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router";
import {isUserAdmin} from "../utils";

export const AdminLayout = () => {
    const [shouldRender, setShouldRender] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserAdmin()) {
            setShouldRender(true);
        } else {
            navigate('/home');
        }
    }, [navigate]);

    return (
        shouldRender ? <div><Outlet/></div> : <div/>
    );
};
