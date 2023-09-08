import { styled } from '@mui/material/styles';
import { 
    Drawer as MuiDrawer,
    Toolbar,
    List,
    Divider,
    IconButton,
    Link
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { mainMenuItems, secondaryMenuItems } from '../templates/MenuItems';
import { Logo } from '@/templates/Logo';

interface SideBarProps {
    open: boolean;
    toggleDrawer: () => void;
    drawerWidth: number;
}

export default function SideBar(props:SideBarProps) {
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: props.drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  return (
      <Drawer variant="permanent" open={props.open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <Link href="/"><Logo /></Link>
          <IconButton onClick={props.toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainMenuItems}
          <Divider sx={{ my: 1 }} />
          {secondaryMenuItems}
        </List>
      </Drawer>
  );
}