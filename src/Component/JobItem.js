import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import axiosClient from '../util/axiosClient';

const JobItem = ({ job, userId, username, onUpdateJob, onDeleteJob }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: job.title,
    description: job.description,
    keywords: job.keywords,
  });

  // Mở modal để sửa job
  const handleEditJob = () => {
    setFormData({
      title: job.title,
      description: job.description,
      keywords: job.keywords,
    });
    setOpenModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Thay đổi giá trị trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Cập nhật job
  const handleUpdateJob = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        keywords: formData.keywords,
        userId: userId,
      };
      const response = await axiosClient.put(`/api/jobs/${job.id}`, payload);
      onUpdateJob(job.id, response.data); // Gọi hàm từ parent để cập nhật danh sách
      handleCloseModal();
    } catch (error) {
      console.error('Error updating job:', error.response?.data || error);
      alert('Cập nhật job thất bại!');
    }
  };

  // Xóa job
  const handleDeleteJob = async () => {
    if (window.confirm('Bạn có chắc muốn xóa job này?')) {
      try {
        await axiosClient.delete(`/api/jobs/${job.id}`);
        onDeleteJob(job.id); // Gọi hàm từ parent để xóa khỏi danh sách
      } catch (error) {
        console.error('Error deleting job:', error.response?.data || error);
        alert('Xóa job thất bại!');
      }
    }
  };

  return (
    <>
      <Box sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">{job.title}</Typography>
        <Typography variant="body2">
          {job.description.substring(0, 200)}...
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary">
          Từ khóa: {job.keywords}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Người đăng: {job.user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Ứng tuyển gửi CV vào mail: {job.user.email}
        </Typography>
        {/* Hiển thị nút Sửa/Xóa nếu user trùng với người đăng nhập */}
        {job.user.name === username && (
          <Box sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditJob}
              sx={{ mr: 1 }}
            >
              Sửa
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteJob}
            >
              Xóa
            </Button>
          </Box>
        )}
      </Box>

      {/* Modal để sửa job */}
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
            Sửa Job
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
            onClick={handleUpdateJob}
            fullWidth
            sx={{ mt: 2 }}
          >
            Cập nhật
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default JobItem;