import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Modal } from '@mui/material';
import axiosClient from '../util/axiosClient';
import JobItem from '../Component/JobItem';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
  });
  const username = localStorage.getItem('username');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axiosClient.get('/auth/profile')
      .then(response => {
        setUserId(response.data.id);
      })
      .catch(error => console.error('Error fetching profile:', error));

    axiosClient.get('/api/jobs')
      .then(response => {
        console.log(response);
        setJobs(response.data);
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleOpenModal = () => {
    setFormData({ title: '', description: '', keywords: '' });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateJob = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        keywords: formData.keywords,
        userId: userId,
      };
      const response = await axiosClient.post('/api/jobs', payload);
      setJobs([...jobs, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating job:', error.response?.data || error);
      alert('Thêm job thất bại!');
    }
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
    <Box className="container mb-50" sx={{ marginTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Danh sách việc làm
      </Typography>
      {username && (
        <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mb: 2 }}>
          Thêm job
        </Button>
      )}
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
        <Typography>Đang tải danh sách việc làm...</Typography>
      )}

      {/* Modal để thêm job */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Thêm Job Mới
          </Typography>
          <TextField
            label="Tiêu đề"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mô tả"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Từ khóa (cách nhau bằng dấu phẩy)"
            name="keywords"
            value={formData.keywords}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateJob}
            fullWidth
            sx={{ mt: 2 }}
          >
            Thêm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default HomePage;