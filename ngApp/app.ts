namespace taskapp {

    angular.module('taskapp', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/ngApp/views/home.html',
                controller: taskapp.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('add', {
                url: '/add',
                templateUrl: '/ngApp/views/addTask.html',
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
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
