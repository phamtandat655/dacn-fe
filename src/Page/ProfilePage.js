import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axiosClient from '../util/axiosClient';
import JobItem from '../Component/JobItem';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobs, setJobs] = useState([]);
  const username = localStorage.getItem('username') || 'Người dùng';
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axiosClient.get('/auth/profile')
      .then(response => {
        setName(response.data.name || '');
        setEmail(response.data.email || '');
        setPhone(response.data.phone || '');
        setUserId(response.data.id);
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  useEffect(() => {
    if (userId) {
      axiosClient.get(`/api/jobs/user/${userId}`)
        .then(response => {
          console.log(response);
          setJobs(response.data);
        })
        .catch(error => console.error('Error fetching jobs:', error));
    }
  }, [userId]);

  const handleSave = () => {
    axiosClient.put('/auth/profile', { name, phone })
      .then(response => {
        alert('Cập nhật thông tin thành công!');
        localStorage.setItem('username', name);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  // Hàm cập nhật job từ JobItem
  const handleUpdateJob = (jobId, updatedJob) => {
    setJobs(jobs.map(job => (job.id === jobId ? updatedJob : job)));
  };

  // Hàm xóa job từ JobItem
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  return (
    <Box className="container mb-50" sx={{ marginTop: 10, maxWidth: 800, marginX: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Thông tin cá nhân
      </Typography>
      <Typography variant="h6" gutterBottom>
        Xin chào, {username}!
      </Typography>

      {/* Form thông tin cá nhân */}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        fullWidth
        sx={{ marginTop: 2, marginBottom: 4 }}
      >
        Lưu thông tin
      </Button>

      {/* Danh sách công việc */}
      <Typography variant="h4" align="center" gutterBottom>
      Danh sách công việc đã đăng
      </Typography>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <JobItem
            key={job.id}
            job={job}
            userId={userId}
            username={username}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
          />
        ))
      ) : (
        <Typography>Chưa có công việc nào được đăng.</Typography>
      )}
    </Box>
  );
};

export default ProfilePage;