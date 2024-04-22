import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemAvatar, Avatar, Paper } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Icon } from "@iconify/react";
import Typography from "@mui/material/Typography";
import { useLocation, Link } from "react-router-dom";
import { handleTheme } from "../features/themeSlice";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ResponsiveDrawer({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const [drawerWidth, setDrawerWidth] = useState(
    window.innerWidth < 800 ? 270 : 70
  );

  const [open, setOpen] = useState(false);

  const handleDesktopDrawer = (state: string) => {
    switch (state) {
      case "open":
        !isLocked && setDrawerWidth(270);
        break;
      case "close":
        !isLocked && setDrawerWidth(70);
        break;
    }
  };

  useEffect(() => {
    isLocked ? setDrawerWidth(270) : null;
  }, [isLocked]);

  const drawerLists = [
    {
      name: "Dashboard",
      path: "/",
      icon: "mdi:view-dashboard",
    },
    {
      name: "Chat Bot",
      path: "/chat-bot",
      icon: "mdi:robot-excited-outline",
    },
    {
      name: "Info",
      path: "/info",
      icon: "mdi:information-slab-circle-outline",
    },
    {
      name: "Help",
      path: "/help",
      icon: "mdi:help-circle-outline",
    },
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const deleteChat = () => {
    localStorage.removeItem("chat");
    localStorage.removeItem("roboter");
    setOpen(false);
    window.location.reload();
  };

  const drawer = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Box>
          <List>
            <ListItem
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon>
                  <Icon icon="mdi:bug" fontSize={34}></Icon>
                </ListItemIcon>
                <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                  BUGLAND Ltd{" "}
                </Typography>
              </Box>
              <IconButton onClick={() => setIsLocked(!isLocked)}>
                <Icon
                  fontSize={20}
                  icon={isLocked ? "mdi:lock-outline" : "mdi:lock-open-outline"}
                ></Icon>
              </IconButton>
            </ListItem>
            <Divider sx={{ mt: 1 }}></Divider>
            {drawerLists.map((item, index) => (
              <ListItem disableGutters key={index}>
                <ListItemButton
                  sx={{
                    borderRadius: 3,
                    mx: 1,
                    backgroundColor:
                      isActive(item.path) && isDark
                        ? "#121212"
                        : isActive(item.path) && !isDark
                        ? "#cfcfcf"
                        : "transparent",
                  }}
                  component={Link}
                  to={item.path}
                >
                  <ListItemIcon>
                    <Icon icon={item.icon} fontSize={20}></Icon>
                  </ListItemIcon>
                  <ListItemText
                    sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    primary={item.name}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List>
            <Divider></Divider>
            <ListItem disableGutters sx={{ p: 1, ml: 1 }}>
              <ListItemAvatar>
                <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ whiteSpace: "nowrap" }}
                primary="John Doe"
                secondary="test@example.com"
              ></ListItemText>
              <IconButton>
                <Icon icon="mdi:settings-outline" fontSize={24}></Icon>
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );

  const deleteDialog = (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h5">Chatverlauf löschen?</Typography>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <DialogContentText>
            Sie sind dabei den Chatvelauf mit dem Chatbot permanent zu löschen{" "}
            <br /> Sind Sie sich sicher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="text"
            sx={{ width: "70px" }}
            color="secondary"
          >
            Nein
          </Button>
          <Button
            disableElevation
            onClick={deleteChat}
            sx={{ width: "70px" }}
            variant="contained"
            color="error"
          >
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            padding: 0,
            borderRadius: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            transition: "width 0.15s ease-in-out",
          }}
        >
          <Toolbar>
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Icon icon="mdi:hamburger-menu"></Icon>
            </IconButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Paper elevation={0}>
                <Typography variant="h6" noWrap component="div">
                  Gruppe II SE
                </Typography>
              </Paper>

              <Box>
                <IconButton onClick={() => dispatch(handleTheme())}>
                  <Icon
                    icon={isDark ? "mdi:moon-and-stars" : "mdi:weather-sunny"}
                  ></Icon>
                </IconButton>

                {location.pathname === "/chat-bot" && (
                  <IconButton onClick={() => setOpen(!open)}>
                    <Icon icon="mdi:delete-outline"></Icon>
                  </IconButton>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              // overflowX: 'hidden',
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                overflowX: "hidden",
                boxSizing: "border-box",
                width: drawerWidth,
                p: 0,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                overflowX: "hidden",
                borderRadius: 0,
                padding: 0,
                boxShadow: 0,
                border: "none",
                transition: "width 0.15s ease-in-out",
              },
            }}
            onMouseEnter={() => handleDesktopDrawer("open")}
            onMouseLeave={() => handleDesktopDrawer("close")}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            ml: { sm: `${drawerWidth}px` },
            position: "absolute",
            transition:
              " margin-left 0.15s ease-in-out,  width 0.15s ease-in-out",
            width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            // p:2,
            height: `calc(100% - 60px)`,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>

      {deleteDialog}
    </>
  );
}
