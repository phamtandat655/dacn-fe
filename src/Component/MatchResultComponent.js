import React, { useEffect, useState } from 'react';
import axiosClient from '../util/axiosClient'; 
import { Box, Typography, Chip, Button, CircularProgress } from '@mui/material';

const MatchResultComponent = ({ jdData, cvData }) => {
  const [matchResult, setMatchResult] = useState(null);
  const [error, setError] = useState('');
  const [cvBase64, setCvBase64] = useState(null);
  const [loading, setLoading] = useState(false);  // Thêm state loading

  useEffect(() => {
    const file = cvData;
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setCvBase64(reader.result.split(',')[1]);  // Chỉ lấy phần base64
      };
      
      reader.readAsDataURL(file);
    }
  }, [cvData]);

  // Gửi dữ liệu JD và CV tới backend để so khớp
  const handleMatch = async () => {
    if (!jdData || !cvData) {
      setError('Vui lòng nhập đầy đủ thông tin công việc và upload CV trước khi so khớp.');
      return;
    }

    setLoading(true);  // Bắt đầu loading

    try {
      const payload = {
        title: jdData.title || '',
        description: jdData.description || '',
        keywords: jdData.keywords || '',
        cvBase64: cvBase64
      };

      console.log('Payload gửi đi:', payload);

      const response = await axiosClient.post('/api/match/matches', payload);
      console.log(response.data);
      setMatchResult(response.data); 
      setError('');
    } catch (err) {
      setError('Có lỗi xảy ra khi so khớp: ' + (err.response?.data?.message || err.message));
      console.error('Match error:', err.response?.data || err);
    } finally {
      setLoading(false);  // Kết thúc loading
    }
  };

  // Chuyển đổi chuỗi keywords thành mảng
  const matchedKeywordsArray = matchResult ? matchResult.matchedKeywords.split(',') : [];

  return (
    <Box sx={{ maxWidth: 500, padding: 2, marginLeft: 10, paddingBottom: 2 }}>
      <Typography variant="h5">Kết quả so khớp CV và JD</Typography>
      <Typography variant="body2" style={{ color: 'red' }} gutterBottom>
        *Lưu ý: phải tải lên đầy đủ thông tin công việc và file CV
      </Typography>

      <Button variant="contained" color="primary" onClick={handleMatch} sx={{ mt: 2 }}>
        Kiểm tra độ tương xứng
      </Button>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress /> {/* Hiển thị spinner khi đang loading */}
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2, mt: 1 }}>
          {error}
        </Typography>
      )}

      {matchResult && !loading && (
        <Box>
          <Typography variant="h6" marginTop={'15px'}>
            Độ phù hợp: {matchResult.matchPercentage}%
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Từ khóa trong JD:
          </Typography>
          <Box>
            {(jdData.keywords.split(',') || []).map((keyword, index) => (
              <Chip
                key={index}
                label={keyword.trim()}
                color={matchedKeywordsArray.includes(keyword.trim()) ? 'success' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Từ khóa khớp trong CV:
          </Typography>
          <Box>
            {matchedKeywordsArray.map((keyword, index) => (
              <Chip key={index} label={keyword} color="success" sx={{ m: 0.5 }} />
            ))}
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Nội dung CV:
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
            {matchResult.cvContent.substring(0, 200)}... (xem đầy đủ trong file PDF)
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MatchResultComponent;
