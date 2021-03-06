function LandingPageController ($http, SERVER, $cookies) {
    let vm = this;

    vm.register = register;
    vm.login = login;

    function register (user) {
        console.log(user);
        $http.post(`${SERVER}/users`, user)
            .then(resp =>   {
                console.log(resp)
            })
            .catch(error => console.log(error));


    }
    function login (user) {
        return $http.post(`${SERVER}/login`, user).then(resp => {
            $cookies.put('access-token', resp.data.token);
            $cookies.put('user-id', resp.data.user.id);
            $http.defaults.headers.common['access-token'] = resp.data.token;
            return resp;
        });
    }
}

LandingPageController.$inject = ['$http', 'SERVER', '$cookies'];

export default LandingPageController;
