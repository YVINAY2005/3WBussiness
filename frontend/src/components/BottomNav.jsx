import { Paper, BottomNavigation, BottomNavigationAction, Box, Fab } from '@mui/material';
import { Home, Assignment, Public, Leaderboard } from '@mui/icons-material';
import { useState } from 'react';

const BottomNav = () => {
  const [value, setValue] = useState(2); // Default to Social

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <Box sx={{ position: 'relative' }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ 
            height: 64, 
            bgcolor: '#1976d2',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: '#fff',
              },
            },
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Tasks" icon={<Assignment />} />
          <BottomNavigationAction disabled sx={{ width: 80, minWidth: 80, pointerEvents: 'none' }} />
          <BottomNavigationAction label="Social" icon={<Box />} sx={{ pointerEvents: 'none', visibility: 'hidden' }} />
          <BottomNavigationAction 
            label="Leaderboard" 
            icon={
              <Box sx={{ position: 'relative' }}>
                <Leaderboard />
                <Box sx={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  bgcolor: '#ff9800',
                  color: '#fff',
                  fontSize: '0.6rem',
                  borderRadius: '4px',
                  px: 0.3,
                  fontWeight: 'bold'
                }}>213</Box>
              </Box>
            } 
          />
        </BottomNavigation>

        {/* Centered Raised Social Button */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1001,
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              bgcolor: '#f4f7f9',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: -4.5,
              clipPath: 'circle(50% at 50% 50%)',
            }}
          >
            <Fab 
              color="primary" 
              sx={{ 
                width: 56, 
                height: 56, 
                boxShadow: 'none',
                bgcolor: '#1976d2',
                border: '4px solid #fff'
              }}
            >
              <Public />
            </Fab>
          </Box>
          <Box sx={{ color: '#fff', fontSize: '0.75rem', mt: 5, fontWeight: 500 }}>Social</Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BottomNav;
