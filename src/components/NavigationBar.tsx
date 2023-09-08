import { useState } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { 
    Toolbar,
    IconButton,
    Typography,
    Badge
} from '@mui/material';
import { 
    Menu as MenuIcon,
    Notifications as NotificationsIcon 
} from '@mui/icons-material';
import NotificationsDialog from './NotificationsDialog';

interface NavigationBarProps {
  open: boolean;
  toggleDrawer: () => void;
  title: string;
  notifications: string[];
  drawerWidth: number;
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export default function NavigationBar (props:NavigationBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: props.drawerWidth,
      width: `calc(100% - ${props.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
      <AppBar position="absolute" open={props.open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(props.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            {props.title}
          </Typography>
          <IconButton color="inherit" onClick={() => setShowNotifications(true)}>
            <Badge badgeContent={props.notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
        <NotificationsDialog
          showDialog={showNotifications}
          setShowDialog={setShowNotifications}
          notifications={props.notifications}
        />
      </AppBar>
  )
}