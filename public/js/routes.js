function routes($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainController',
			resolve: {
				connected: checkIsConnected // boolean true or flase si false renvoie vers login pr connecter, ajoute qd veut que utiisateur soit connecté, ds ttes les routes
			}
		})
		.when('/about', {
			templateUrl: 'views/about.html'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
        	controller: 'loginController'
		})
		.when('/signup', {
        	templateUrl: 'views/signup.html',
        	controller: 'signupController'
    	})
		.otherwise({
			redirectTo: '/'
		});

		$httpProvider.interceptors.push(function ($q, $location, $rootScope) { //$q promesse personnalisee , creer promesse library de promesse, $location rediriger vers p précise l'utilisateur, $httpprovider intercepte ttes les routes, 
   return {
       'request': function (config) {//methode requet et rep error
           config.headers = config.headers || {};
           if ($rootScope.token) {
               config.headers.authorization = $rootScope.token;// si qq ch ds rootscope met token ds entete, si connecte une fois reste connecte
           }
           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) {
               $location.path('/');
           }
           return $q.reject(response);
       }
   };
});
}