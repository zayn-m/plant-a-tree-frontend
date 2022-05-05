import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080/api'
	// baseUrl: 'https://plantatree-1.herokuapp.com/api'
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