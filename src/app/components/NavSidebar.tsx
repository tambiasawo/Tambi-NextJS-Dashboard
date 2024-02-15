"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreIcon from "@mui/icons-material/MoreVert";
import { usePathname } from "next/navigation";
import {
  AccountCircle,
  Dashboard,
  Logout,
  ShoppingBag,
} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { logout } from "../actions";
import { useAuthContext } from "../utils/userContext";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Dashboard />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <GroupIcon />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <ShoppingBag />,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <PaidIcon />,
  },
];
const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const getBreadCrumbs = (pathname: string) => {
  const regex = /^[0-9a-zA-Z]{24}$/;

  const pathnameArray = pathname.split("/");
  let pathId = "";
  let capitalizedPath = "";
  let entity;

  const capitalizedArray = pathnameArray.map((path) => {
    if (path !== "") {
      if (regex.test(path)) pathId = path;
      capitalizedPath = path[0].toLocaleUpperCase() + path.substring(1);
      return capitalizedPath;
    }
  }); /* 

  if (pathnameArray?.includes("products")) {
    const entityPromise = getProduct(pathId)
      .then((result) => {
        console.log(result); // Access the resolved response here
        return result;
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        throw error; // Propagate the error if needed
      });

    entityPromise.then((resolvedEntity) => {
      console.log("Resolved entity:", resolvedEntity);
    });

    // You can also assign entityPromise to entity if needed
    entity = entityPromise;
  } else if (pathnameArray?.includes("/users")) {
    //await getUser(pathId)
  }
 */
  // console.log({ entity });

  return capitalizedArray.join(" > ").substring(3);
};

export default function NavSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const {
    user: { user },
  } = useAuthContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => logout()}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );
  const breadcrumbs = pathname === "/" ? "Dashboard" : getBreadCrumbs(pathname);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-softBg">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="!text-white !font-bold"
            sx={{ color: "white !important" }}
          >
            {breadcrumbs}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open} className="!bg-softBg">
        <DrawerHeader
          className="!bg-softBg flex !justify-between"
          sx={{ justifyContent: "space-between !important" }}
        >
          <div className="flex gap-4 sticky mt-1 items-center">
            <Avatar src={user.image ?? ""} alt="" />
            <section className="text-textColor">
              <h3 className="font-bold"> {user.name}</h3>
              <span className="text-sm">
                {user?.isAdmin ? "Administrator" : "User"}
              </span>
            </section>
          </div>
          <IconButton
            onClick={handleDrawerClose}
            className="!text-white hover:bg-mainBg absolute right-0 p-2"
            sx={{ color: "white !important" }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white !important" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white !important" }} />
            )}
          </IconButton>
        </DrawerHeader>
        {open ? <Divider /> : ""}
        <List className="!bg-softBg text-textColor h-screen">
          {menuItems.map((menuItem) => (
            <Link href={menuItem.path} className="w-full" key={menuItem.title}>
              <ListItem
                key={menuItem.title}
                disablePadding
                sx={{ display: "block", pt: 1.5 }}
              >
                <ListItemButton
                  className={`flex mb-1 py-3 rounded-xl hover:bg-mainBg`}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}

          <ListItemButton
            className={`flex mb-1 py-3 rounded-xl hover:bg-mainBg`}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => logout()}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white",
              }}
              className="hover:!cursor-pointer"
            >
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="w-[45%] sm:w-[80%] md:w-full"
      >
        <DrawerHeader />
        <Typography paragraph component="div">
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
