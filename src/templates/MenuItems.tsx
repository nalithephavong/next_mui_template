import * as React from 'react';
import { 
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader, 
} from '@mui/material';
import { 
    Dashboard as DashboardIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Layers as LayersIcon,
    Assignment as AssignmentIcon,
    Logout as LogoutIcon 
} from '@mui/icons-material';

interface MenuItemType {
  title: string;
  url: string;
  icon: JSX.Element;
}

const mainMenuList: MenuItemType[] = [
  { title: "Dashboard", url: "", icon: <DashboardIcon /> },
  { title: "Orders", url: "", icon: <ShoppingCartIcon /> },
  { title: "Customers", url: "", icon: <PeopleIcon /> },
  { title: "Reports", url: "", icon: <BarChartIcon /> },
  { title: "Integrations", url: "", icon: <LayersIcon /> },
  { title: "Sign Out", url: "/", icon: <LogoutIcon /> }
];

const secondaryMenuList: MenuItemType[] = [
  { title: "Current month", url: "", icon: <AssignmentIcon /> },
  { title: "Last quarter", url: "", icon: <AssignmentIcon /> },
  { title: "Year-end sale", url: "", icon: <AssignmentIcon /> },
];

const secondaryMenuListHeader = "Saved reports";

function getListItems(menuItems:MenuItemType[]) {
  const items = menuItems.map((item:MenuItemType, index) => {
    return (
      <ListItemButton href={item.url} key={index}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    );
  });

  return (
    <>{items}</>
  );
}

function getSecondaryListItems() {
  return (
    <>
      <ListSubheader component="div" inset>
        {secondaryMenuListHeader}
      </ListSubheader>
      {getListItems(secondaryMenuList)}
    </>
  );
}

export const mainMenuItems = getListItems(mainMenuList);
export const secondaryMenuItems = getSecondaryListItems();