import React, { useState } from 'react';
import { TextField, Button, Chip, Box, Typography } from '@mui/material';

export const JdComponent = ({ onSubmit }) => {
  // State để quản lý dữ liệu form
  const [title, setTitle] = useState(''); // Tiêu đề JD
  const [description, setDescription] = useState(''); // Mô tả JD
  const [keywords, setKeywords] = useState([]); // Danh sách từ khóa
  const [keywordInput, setKeywordInput] = useState(''); // Input tạm thời cho từ khóa
  const [message, setMessage] = useState(''); // Thông báo sau khi submit
  const [savedJd, setSavedJd] = useState(null); // Lưu dữ liệu JD đã nhập
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái để thay đổi nút

  // Xử lý thêm từ khóa
  const handleAddKeyword = (e) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput(''); // Reset input sau khi thêm
    }
  };

  // Xử lý xóa từ khóa
  const handleDeleteKeyword = (keywordToDelete) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToDelete));
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jdData = { title, description, keywords: keywords.join(',') };

    // Gửi dữ liệu lên App qua prop onSubmit
    onSubmit(jdData);

    // Lưu dữ liệu để hiển thị kết quả
    setSavedJd(jdData);
    setMessage('Thông tin công việc đã được lưu!');
    setIsSubmitted(true); // Đổi trạng thái nút

    // Reset form (tùy chọn, nếu muốn giữ dữ liệu thì bỏ phần này)
    // setTitle('');
    // setDescription('');
    // setKeywords([]);

    // Uncomment nếu cần gửi lên backend
    // try {
    //   const response = await axios.post('http://localhost:8080/api/jobs', jdData);
    //   setMessage('JD đã được tạo thành công!');
    //   setSavedJd(jdData);
    //   setIsSubmitted(true);
    // } catch (error) {
    //   setMessage('Có lỗi xảy ra khi tạo JD: ' + error.message);
    // }
  };

  return (
    <Box sx={{ maxWidth: 600, padding: 2, paddingBottom: 2 }}>
      <Typography variant="h5" gutterBottom>
        Thông tin công việc
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Trường nhập tiêu đề */}
        <TextField
          label="Tiêu đề công việc"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        {/* Trường nhập mô tả */}
        <TextField
          label="Mô tả công việc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />

        {/* Trường nhập từ khóa */}
        <TextField
          label="Các kỹ năng quan trọng cần có (nhấn Enter để thêm)"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleAddKeyword}
          fullWidth
          margin="normal"
        />

        {/* Hiển thị danh sách từ khóa */}
        <Box sx={{ marginTop: 1 }}>
          {keywords.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              onDelete={() => handleDeleteKeyword(keyword)}
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>

        {/* Nút submit */}
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginTop: 2 }}
        >
          {isSubmitted ? 'Tải lại thông tin công việc' : 'Tải lên thông tin công việc'}
        </Button>
      </form>

      {/* Hiển thị thông báo */}
      {message && (
        <Typography color={message.includes('lỗi') ? 'error' : 'success'} sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}

      {/* Hiển thị kết quả đã nhập */}
      {savedJd && (
        <Box sx={{ marginTop: 4, padding: 2 }} border={"1px solid red"} borderRadius={"5px"}>
          <Typography variant="h6" gutterBottom>
            Kết quả thông tin công việc đã nhập:
          </Typography>
          <Typography variant="subtitle1">
            <strong>Tiêu đề:</strong> {savedJd.title}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Mô tả:</strong> {savedJd.description}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Từ khóa:</strong>
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            {savedJd.keywords.split(',').map((keyword, index) => (
              <Chip key={index} label={keyword} sx={{ margin: 0.5 }} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default JdComponent;