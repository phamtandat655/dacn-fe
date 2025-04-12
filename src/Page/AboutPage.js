import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutPage = () => {
    return (
      <div>
        <Box className="container mb-50" marginTop={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Giới thiệu
          </Typography>
          <Typography variant="body1" paragraph>
            Chào mừng bạn đến với <strong>Trang tuyển dụng</strong> - nơi kết nối ứng viên với những cơ hội việc làm phù hợp nhất! 
            Chúng tôi sử dụng công nghệ AI tiên tiến để giúp bạn kiểm tra độ tương xứng giữa CV và JD, từ đó tối ưu hóa quá trình ứng tuyển.
          </Typography>
          <Typography variant="body1" paragraph>
            Mục tiêu của chúng tôi là đơn giản hóa việc tìm kiếm việc làm, giúp bạn tiết kiệm thời gian và nhanh chóng tìm được công việc mơ ước. 
            Đội ngũ của chúng tôi bao gồm các chuyên gia công nghệ và tuyển dụng, luôn sẵn sàng hỗ trợ bạn trên hành trình sự nghiệp.
          </Typography>
          <Typography variant="body1" paragraph>
            Hãy thử tính năng so khớp CV với JD ngay hôm nay và khám phá cơ hội đang chờ đợi bạn!
          </Typography>
        </Box>
      </div>
    );
};

export default AboutPage;