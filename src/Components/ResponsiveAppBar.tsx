import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import StyledLink from './StyledLink';
import hexToRgbA from '../utils/hexToRgba';

const pages = ['About Me', 'Experience', 'Education', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const createPageId = (page: string) => page.toLowerCase().replace(" ", "");

const pageIds = pages.map(page => createPageId(page));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [showBar, setShowBar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const checkScroll = () => {
    const currentScrollPos = window.scrollY;
    const isShow = scrollPosition > currentScrollPos;
    setShowBar(isShow);
    setScrollPosition(currentScrollPos);
  };


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [currentSection, setCurrentSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [scrollPosition]);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {pages.map((page) => (
          <ListItem key={page}>
            <StyledLink href={`#`}>
              <ListItemText primary={page} sx={{ margin: "0" }} />
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }} justifyContent={"end"}>
      <AppBar position="fixed" style={{ top: showBar ? '0' : '-64px', transition: 'top 0.5s' }}
        sx={{
          // set background color to transparent
          // background: 'transparent',
          background: hexToRgbA(theme.palette.background.default, 0.5),
          backdropFilter: 'blur(8px)',
          // background: theme.palette.background.default,
          // remove box shadow
          boxShadow: 'none',
        }}
      >
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "end", pr: isMobile ? '0' : '4rem' }}>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                size='large'
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            pages.map((page) => (
              <StyledLink key={page} href={`#` + createPageId(page)} sx={{ ml: 2 }} variant='h5' fontWeight={"bold"}>
                {page}
              </StyledLink>
            ))
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <Drawer
          container={document.body}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              background: theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
}
export default ResponsiveAppBar;