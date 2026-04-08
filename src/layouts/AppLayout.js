import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {AdminPanelSettings, Assignment, BarChart, Home, MoveUp, Remove, Summarize} from "@mui/icons-material";
import {isLoggedIn} from "../utils";
import {AppHeader} from "../components/AppHeader";
import {AppFooter} from "../components/AppFooter";
import {NavigationDrawer} from "../components/NavigationDrawer";
import {FiltersAccordion} from "../components/FiltersAccordion";
import {PricingAgentButton} from "../components/PricingAgentButton";

const theme = createTheme({
    palette: {
        background: {
            default: '#EFF0F475'
        },
        primary: {
            main: '#323D72'
        },
        secondary: {
            main: '#FFFFFF'
        },
        warning: {
            main: '#FF0000'
        },
        contentPanel: {
            backgroundColor: 'white',
            border: 'thin solid #323D7225',
            borderRadius: 7,
            boxShadow: '1px 1px #323D7250'
        },
        indicator: {
            red: '#E51040',
            orange: '#FFA500',
            yellow: '#BBBB00',
            green: '#308830',
            blue: '#000099',
            plot: {
                green: {
                    line: '#00770050',
                    fill: '#00FF0025'
                },
                blue: {
                    line: '#00009950',
                    fill: '#00009925'
                },
                bubble: {
                    blue: '#00009975',
                    red: '#99000475',
                    yellow: '#99990075',
                    green: '#00994C75'
                }
            },
            table: {
                red: '#FF000085',
                green: '#00660085',
                blue: '#00009985',
            }
        },
        status: {
            critical: '#f44336',
            warning: '#ff9800', 
            success: '#4caf50',
            info: '#2196f3',
            neutral: '#9e9e9e'
        },
        heatmap: {
            critical: {
                light: 'rgba(244, 67, 54, 0.3)',
                medium: 'rgba(244, 67, 54, 0.6)',
                dark: 'rgba(244, 67, 54, 0.9)'
            },
            warning: {
                light: 'rgba(255, 152, 0, 0.3)',
                medium: 'rgba(255, 152, 0, 0.6)', 
                dark: 'rgba(255, 152, 0, 0.9)'
            },
            success: {
                light: 'rgba(76, 175, 80, 0.3)',
                medium: 'rgba(76, 175, 80, 0.6)',
                dark: 'rgba(76, 175, 80, 0.9)'
            }
        },
        button: {
            green: '#30883050',
            blue: '#323D7250',
            lightblue: '#323D7210',
            gray: '#D3D3D3'
        },
        chatbot: {
            title: '#4ade80'
        }
    },
    dimensions: {
        headerHeight: 55,
        footerHeight: 40,
        navDrawerWidth: 220,
        contentWidth: 1550,
        smallPanelWidth: 460,
        smallPanelHeight: 350,
        normalPanelWidth: '100%'
    }
});

const navOptions = {
    dashboard: {label: 'Dashboard', icon: <Home/>, to: '/dashboard', isHome: true},
    audit: {
        label: 'Audit', icon: <BarChart/>, to: '/audit', subMenu: {
            auditProfile: {label: 'Profile', icon: <Remove/>, to: '/audit/profile'},
            auditTrends: {label: 'Trends', icon: <Remove/>, to: '/audit/trends'},
            auditDrivers: {label: 'Profit Drivers', icon: <Remove/>, to: '/audit/drivers'},
            auditLeaks: {label: 'Profit Leaks', icon: <Remove/>, to: '/audit/leaks'},
            auditOpportunity: {label: 'Opportunity', icon: <Remove/>, to: '/audit/opportunity'}
        }
    },
    optimize: {label: 'Optimize', icon: <MoveUp/>, to: '/optimize'},
    activate: {label: 'Activate', icon: <Assignment/>, to: '/activate'},
    reports: {
        label: 'Reports', icon: <Summarize/>, to: '/reports', subMenu: {
            reportsWaterfall: {label: 'Waterfall', icon: <Remove/>, to: '/reports/waterfall'},
            reportsKPI: {label: 'KPI', icon: <Remove/>, to: '/reports/kpi'}
        }
    },
    admin: {label: 'Admin', icon: <AdminPanelSettings/>, to: '/admin', adminOnly: true}
};

export const AppLayout = () => {
    const navigate = useNavigate();
    const [shouldRender, setShouldRender] = useState(false);
    const [currentNavOption, setCurrentNavOption] = useState(navOptions.dashboard);
    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(true);

    useEffect(() => {
        if (isLoggedIn()) {
            setShouldRender(true);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleNavigate = (toNavOption) => {
        setShowFilters(!toNavOption.adminOnly);
        setCurrentNavOption(toNavOption);
        navigate(toNavOption.to);
    };

    const handleNavigateToHome = () => {
        handleNavigate(navOptions.find(o => o.isHome));
    };

    const handleNavigateToAlerts = () => {
        setShowFilters(true);
        setCurrentNavOption(null);
        navigate('/alerts');
    };

    const handleNavigateToSettings = () => {
        setShowFilters(false);
        setCurrentNavOption(null);
        navigate('/settings');
    };

    return (
        shouldRender ?
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppHeader handleNavigateToHome={handleNavigateToHome} handleNavigateToAlerts={handleNavigateToAlerts} handleNavigateToSettings={handleNavigateToSettings}/>
                    <FiltersAccordion filters={filters} filtersSetter={setFilters} showFilters={showFilters}/>
                    <NavigationDrawer navOptions={navOptions} currentNavOption={currentNavOption} handleNavigate={handleNavigate} filters={filters} setFilters={setFilters}/>
                    <PricingAgentButton/>
                    <AppFooter/>
                </ThemeProvider>
            </div>
            :
            <div/>
    );
};
