
loginApp.controller('loginCtrl', ['$scope', '$http', ($scope, $http) => {

    $scope.login = () => {
        //i was trying doing service.
        // loginService.login({ email: $scope.email, password: $scope.password })
        //     .then(function (resp) {
        //         console.log(resp);
        //     })
        $http.post('/api/users/signin', { email: $scope.email, password: $scope.password }).then(r => {

            window.localStorage.setItem('token', r.data.token);
            console.log(r.data.token);

            $http.get('/api/users/currentUser').then(function (resp) {
                console.log(resp);
                $scope.user = resp.data;
            })
            console.log($scope.user)
        }, e => {
            console.log(e)
            // $scope.errorMessage = e.data.message;
        });

    }

    $scope.change = () => {

        $http.post('/api/users/requestPass', { newPassword: $scope.newPassword }).then(r => {
            $scope.change = r.data;
            console.log($scope.change)
            $scope.newPassword = "";

        }, e => {
            console.log(e)
        });

    }

}]);
