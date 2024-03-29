import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MessageIcon from '@mui/icons-material/Message';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import {useNavigate} from 'react-router-dom';

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutServer = event => {
    
    console.log("Logging out from server");
    fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.text())
      .catch(error => console.log(error));
  };
  
  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.clear();
    logOutServer();
    localStorage.removeItem("isLoggedIn");
    props.authenticated();
    navigate('/');
  };
  
  const navigate = useNavigate();
  const handleProfileClick = () => {
    handleClose()
    navigate('/profile');
  }
  
  const handleAccountClick = () => {
    handleClose()
    navigate('/account');
  }
  
  const handleMyListingsClick = () => {
    handleClose()
    navigate('/my-listings');
  }

  const handleMessagesClick = () => {
    handleClose()
    navigate('/messages')
  }

  const handleRequestsClick = () => {
    handleClose()
    navigate('/requests')
  }
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 28, height: 28 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleAccountClick}>
          <Avatar /> Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMessagesClick}>
          <ListItemIcon>
            <MessageIcon fontSize="small" />
          </ListItemIcon>
          Messages
        </MenuItem>
        <MenuItem onClick={handleMyListingsClick}>
          <ListItemIcon>
            <WarehouseIcon fontSize="small" />
          </ListItemIcon>
          My Listings
        </MenuItem>
        <MenuItem onClick={handleRequestsClick}>
          <ListItemIcon>
            <RecentActorsIcon fontSize="small" />
          </ListItemIcon>
          My Requests
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
