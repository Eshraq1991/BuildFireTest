loginApp
    .service('loginService', function ($http) {
        this.login = function (data) {
            return http.post('/api/users/signin', data).then(function (resp) {
                console.log(resp);
                return resp.data;
            })
        }
    });