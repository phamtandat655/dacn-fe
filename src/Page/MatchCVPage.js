import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import JdComponent from '../Component/JdComponent';
import MatchResultComponent from '../Component/MatchResultComponent';
import CheckJdComponent from '../Component/CheckJdComponent';

const MatchCVPage = () => {
    const [jdData, setJdData] = useState(null);
    const [cvData, setCvData] = useState(null);
  
    return (
      <Box className="container mb-50" marginTop={5}>
        <div className="header-title">
          <Typography variant="h5" align="center">
            Website kiểm tra độ tương xứng giữa CV và JD
          </Typography>
        </div>
        <div className="form-wrapper">
          <JdComponent onSubmit={(data) => setJdData(data)} />
          <MatchResultComponent jdData={jdData} cvData={cvData} />
        </div>
        <CheckJdComponent onCvUpload={(data) => setCvData(data)} />
      </Box>
    );
};

export default MatchCVPage;