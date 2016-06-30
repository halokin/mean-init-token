function loginService($http) {
	return {
		connect: function(user) {
			return $http.post('/api/login', user);
		}
	};
}