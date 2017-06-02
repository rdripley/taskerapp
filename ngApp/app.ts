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
            .state('addTask', {
                url: '/addTask',
                templateUrl: '/ngApp/views/addTask.html',
                controller: taskapp.Controllers.AddTaskController,
                controllerAs: 'controller'
            })
            .state('editTask', {
                url: '/editTask/:id',
                templateUrl: '/ngApp/views/editTask.html',
                controller: taskapp.Controllers.EditTaskController,
                controllerAs: 'controller'
            })
            .state('addProject', {
                url: '/addProject',
                templateUrl: '/ngApp/views/addProject.html',
                controller: taskapp.Controllers.AddProjectController,
                controllerAs: 'controller'
            })
            .state('editProject', {
                url: '/editProject/:id',
                templateUrl: '/ngApp/views/editProject.html',
                controller: taskapp.Controllers.EditProjectController,
                controllerAs: 'controller'
            })
            .state('editAccount', {
                url: '/editAccount/:id',
                templateUrl: '/ngApp/views/editAccount.html',
                controller: taskapp.Controllers.EditAccountController,
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


        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
