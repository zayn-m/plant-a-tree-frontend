import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080/api'
	// http://localhost:8080/api
});

instance.interceptors.request.use(
	function(config) {
		config.headers['Authorization'] = 'Bearer '+localStorage.getItem('token');
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
);

export default instance;