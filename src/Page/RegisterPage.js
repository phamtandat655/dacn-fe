import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const RegisterPage = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/auth/register', {
        name,
        email,
        phone,
        password,
      });
      onRegisterSuccess(); 
    } catch (error) {
      console.error('Register failed:', error.response?.data || error.message);
      alert('Đăng ký thất bại: ' + (error.response?.data?.message || 'Vui lòng kiểm tra lại thông tin!'));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, marginTop: 10 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Đăng ký
      </Typography>
      <TextField
        label="Họ và tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
      <Button variant="contained" onClick={handleRegister} fullWidth sx={{ marginTop: 2 }}>
        Đăng ký
      </Button>
    </Box>
  );
};

export default RegisterPage;