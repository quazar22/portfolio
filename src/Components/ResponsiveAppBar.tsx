import { useState, useEffect, useRef } from 'react';
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
import { getPageId } from '../pages';

import { pages } from '../pages';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props: { currentSection: string }) {
  const [showBar, setShowBar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const checkScroll = () => {
    let currentScrollPos = window.scrollY;
    
    const isShow = scrollPosition > currentScrollPos;
    setShowBar(isShow);
    setScrollPosition(currentScrollPos);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getAppbarLinkById = (id: string) => {
    return document.getElementById(id + "_link");
    //query selector for anchor tags with hrefs that start with #
    // return document.querySelector('a[href^="#"]');
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
            <StyledLink href={`#` + getPageId(page)} onClick={(event) => {
              event.preventDefault();
              console.log(event);
              // scroll to the section
              const targetElement = event.target as HTMLAnchorElement;
              // find the closest parent element with href attribute
              let a = targetElement.parentElement?.parentElement?.getAttribute('href');
              if (a) {
                const target = document.querySelector<HTMLElement>(a);
                if (target) {
                  const targetPosition = target.offsetTop;
                  const offsetPosition = targetPosition - 64;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }
              // close the drawer
              setMobileOpen(false);
            }}>
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
              <StyledLink key={page} id={getPageId(page) + "_link"} href={`#` + getPageId(page)} sx={{ ml: 2 }} variant='h5' fontWeight={"bold"}
                onClick={(event) => {
                  event.preventDefault();
                  // scroll to the section
                  const targetElement = event.target as HTMLAnchorElement;
                  let a = targetElement.getAttribute('href');
                  console.log(event);
                  if (a) {
                    const target = document.querySelector<HTMLElement>(a);
                    if (target) {
                      const targetPosition = target.offsetTop;
                      const offsetPosition = targetPosition - 64;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                      });
                    }
                  }
                }}
              >
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