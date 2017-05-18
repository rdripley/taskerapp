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
            .state('addTask', {
            url: '/addTask',
            templateUrl: '/ngApp/views/addTask.html',
            controller: taskapp.Controllers.AddTaskController,
            controllerAs: 'controller'
        })
            .state('addProject', {
            url: '/addProject',
            templateUrl: '/ngApp/views/addProject.html',
            controller: taskapp.Controllers.AddTaskController,
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
            templateUrl: '/ngApp/views/notFound.html'
        });
        $locationProvider.html5Mode(true);
    });
})(taskapp || (taskapp = {}));
