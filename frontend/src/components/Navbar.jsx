import { AppBar, Toolbar, Typography, Box, Badge, Avatar, IconButton, Container, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { NotificationsNone, Star, Logout } from '@mui/icons-material';
import { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    if (onLogout) onLogout();
  };
  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
            Social
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Points Badge */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: '#fff', 
              border: '1px solid #ff5252', 
              borderRadius: '20px', 
              px: 1, 
              py: 0.2 
            }}>
              <Typography sx={{ color: '#ff5252', fontWeight: 'bold', fontSize: '0.8rem', mr: 0.5 }}>100</Typography>
              <Star sx={{ color: '#ffd700', fontSize: '1rem' }} />
            </Box>

            {/* Currency Badge */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: '#e8f5e9', 
              border: '1px solid #4caf50', 
              borderRadius: '20px', 
              px: 1, 
              py: 0.2 
            }}>
              <Typography sx={{ color: '#4caf50', fontWeight: 'bold', fontSize: '0.8rem' }}>₹0.00</Typography>
            </Box>

            {/* Notification Bell */}
            <IconButton size="small" sx={{ color: '#666' }}>
              <Badge badgeContent={2} color="error" overlap="circular">
                <NotificationsNone />
              </Badge>
            </IconButton>

            {/* User Avatar with Progress Ring */}
            <Box sx={{ position: 'relative', display: 'inline-flex', cursor: 'pointer' }} onClick={handleClick}>
              <Avatar 
                src={user?.avatar || ""} 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 2px #4caf50' // Green ring for 30%
                }} 
              >
                {user?.username?.[0].toUpperCase()}
              </Avatar>
              <Box sx={{
                position: 'absolute',
                top: -8,
                right: -4,
                bgcolor: '#4caf50',
                color: '#fff',
                fontSize: '0.6rem',
                borderRadius: '50%',
                px: 0.5,
                border: '1px solid #fff'
              }}>
                30%
              </Box>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
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
              <MenuItem onClick={handleClose}>
                <Avatar src={user?.avatar || ""} /> {user?.username}
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
