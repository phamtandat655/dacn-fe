import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState(''); // Thay username bằng email
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email, // Gửi email thay vì username
        password,
      });
      const { token, user } = response.data; // Lấy token và user từ response
      localStorage.setItem('accessToken', token); // Lưu token
      localStorage.setItem('username', user.name); // Lưu tên người dùng
      onLoginSuccess(); // Chuyển hướng sau đăng nhập
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Đăng nhập thất bại: Thông tin không hợp lệ!');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, marginTop: 10 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Đăng nhập
      </Typography>
      <TextField
        label="Email" // Đổi label thành "Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} fullWidth>
        Đăng nhập
      </Button>
    </Box>
  );
};

export default LoginPage;