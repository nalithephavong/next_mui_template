import * as React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from '@mui/material/styles';
import { 
    CssBaseline,
    Box
} from '@mui/material';
import NavigationBar from '@/components/NavigationBar';
import SideBar from '@/components/SideBar';
import Copyright from '@/templates/Copyright';
import { AppConfig } from '@/templates/AppConfig';
import defaultTheme from './theme';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    notifications: string[];
}

const drawerWidth: number = 240;

export default function Layout(props:LayoutProps) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    return (
        <>
            <Helmet title={`${props.title} | ${AppConfig.title}`} />
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <NavigationBar {...props} 
                        open={open} 
                        toggleDrawer={toggleDrawer} 
                        drawerWidth={drawerWidth}
                    />
                    <SideBar 
                        open={open} 
                        toggleDrawer={toggleDrawer} 
                        drawerWidth={drawerWidth} 
                    />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        {props.children}
                        <Copyright />
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}