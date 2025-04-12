import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core'; 
// Plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
// Import các file CSS
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core';
import { Box, Button, Typography } from '@mui/material';

export default function CheckJdComponent({ onCvUpload }) {
    // Tạo một instance của plugin
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    // Trạng thái lưu file PDF
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileUrl, setPdfFileUrl] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');

    // Trạng thái lưu file PDF sau khi submit
    const [viewPdf, setViewPdf] = useState(null);

    // Kiểm tra loại file hợp lệ
    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(selectedFile);
                    setPdfFileUrl(e.target.result);
                    setPdfFileError('');
                }
            } else {
                setPdfFile(null);
                setPdfFileUrl(null);
                setPdfFileError('Vui lòng chọn một file PDF hợp lệ');
            }
        } else {
            console.log('Vui lòng chọn file');
        }
    }

    // Xử lý khi nhấn nút UPLOAD
    const handlePdfFileSubmit = (e) => {
        e.preventDefault();
        if (pdfFileUrl !== null) {
            setViewPdf(pdfFileUrl);
            onCvUpload(pdfFile); // Gửi dữ liệu CV lên App
        } else {
            setViewPdf(null);
        }
    }

    return (
        <Box sx={{ margin: 'auto', padding: 2 }}>
            <form className='form-group' onSubmit={handlePdfFileSubmit}>
                <Typography variant="h5" gutterBottom>
                    Tải lên CV của bạn <span style={{ color: "red", fontSize: "15px" }}>(*Lưu ý: CV phải ở dạng PDF)</span> : 
                </Typography>
                <input type="file" className='form-control' required onChange={handlePdfFileChange} />
                {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ marginTop: 2 }}
                >
                    Tải lên và xem thử
                </Button>
            </form>
        
            <Typography textAlign={"center"} variant="h5" gutterBottom>
                PREVIEW
            </Typography>
            <div className='pdf-container'>
                {/* Hiển thị file PDF nếu có */}
                {viewPdf && 
                    <>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                            <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
                        </Worker>
                    </>
                }

                {/* Nếu không có file PDF nào được chọn */}
                {!viewPdf && <>Chưa có file PDF nào được chọn</>}
            </div>
        </Box>
    )
}
