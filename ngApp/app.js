var taskapp;
(function (taskapp) {
    angular.module('taskapp', ['ui.router', 'ngResource', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
            url: '/home',
            templateUrl: '/ngApp/views/home.html',
            controller: taskapp.Controllers.HomeController,
            controllerAs: 'controller'
        })
            .state('login', {
            url: '/',
            templateUrl: '/ngApp/views/login.html',
            controller: taskapp.Controllers.LoginController,
            controllerAs: 'controller'
        })
            .state('register', {
            url: '/register',
            templateUrl: '/ngApp/views/register.html',
            controller: taskapp.Controllers.RegisterController,
            controllerAs: 'controller'
        })
            .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
        });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    });
})(taskapp || (taskapp = {}));
