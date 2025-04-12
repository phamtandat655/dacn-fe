import axios from 'axios';

// Tạo Axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080', // URL backend Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header của mỗi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
    console.log('Token:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý response
axiosClient.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  (error) => {
    // Nếu lỗi 401 (token hết hạn hoặc không hợp lệ)
    if (error.response?.status === 401) {
      console.error('Token expired or invalid, redirecting to login...');
      // Xóa toàn bộ localStorage
      localStorage.clear();
      // Chuyển hướng về trang login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Trả về lỗi cho các trường hợp khác
    return Promise.reject(error);
  }
);

export default axiosClient;