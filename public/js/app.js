function checkIsConnected($q, $http, $rootScope, $location) {
    var deferred = $q.defer();

$http.get('/api/loggedin').success(function() {
    // Authenticated
    deferred.resolve();
}).error(function() {
    // Not Authenticated
    deferred.reject();
    $location.url('/login');
});

return deferred.promise;

}


function run($rootScope, $location){
	$rootScope.loginMessage = {};
	$rootScope.loginMessage.title = '';
	$rootScope.loginMessage.message = '';

	var path = function() { 
	return $location.path(); // route actuelle stocke ds path
	};// voit q onglet de navig est actif
	$rootScope.$watch(path, function(newVal, oldVal){
		$rootScope.activetab = newVal;
	});
}

function checkPassword() { //directive
	return { 
		require: 'ngModel', 
		link: function (scope, elem, attrs, ctrl) { 
			var firstPassword = '#' + attrs.checkPassword; 
			elem.add(firstPassword).on('keyup', function () { 
					scope.$apply(function () { 
						var v = elem.val() === $(firstPassword).val(); 
						ctrl.$setValidity('passwordMatch', v); 
					}); 
				}); 
		} 
	} 
}

angular.module('app', ['ngRoute'])
    .config(routes)
    .directive('checkPassword', checkPassword)
    .controller('mainController', mainController)
    .controller('signupController', signupController)
    .controller('loginController', loginController)
    .service('todoService', todoService)
    .service('loginService', loginService)
    .service('userService', userService)
    /*.factory('', )*/
    .run(run);// dernier lancé, chaque recherg p appel le run

