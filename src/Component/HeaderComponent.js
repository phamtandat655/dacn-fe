import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  const username = localStorage.getItem('username');
  const isLoggedIn = !!username;

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#4A90E2' }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Trang tuyển dụng
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
            Trang chủ
          </Button>
          <Button color="inherit" component={Link} to="/upload" sx={{ marginRight: 2 }}>
            Kiểm tra độ tương đồng CV với JD bằng AI
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={{ marginRight: 2 }}>
            About
          </Button>

          {/* Hiển thị nút Login/Đăng ký hoặc Username */}
          {isLoggedIn ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                sx={{ marginRight: 2 }}
              >
                {username}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ marginRight: 2 }}>
                Đăng nhập
              </Button>
              <Button color="inherit" component={Link} to="/register" sx={{ marginRight: 2 }}>
                Đăng ký
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;