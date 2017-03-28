angular
        .module('homer')
        .factory('interceptorService', interceptorService);
function interceptorService($rootScope, $q) {
    return {
        request: function (config) {
            if (config.url.indexOf(Config.ENV.SERVER_URL + 'admin') === 0 && Config.ENV.USER.AUTH_TOKEN) {
                config.headers['X-Auth-Token'] = Config.ENV.USER.AUTH_TOKEN;
            }
            return config;
        },
        response: function (response) {
            
            return response;
        },
        responseError: function (response) {
            
            return $q.reject(response);
        }
    };
}
