var taskapp;
(function (taskapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(taskService) {
                this.taskService = taskService;
            }
            HomeController.prototype.getTasks = function () {
                var _this = this;
                this.taskService.getTasks(this.project).then(function (result) {
                    _this.tasks = result;
                });
            };
            HomeController.prototype.deleteTask = function (taskId) {
                this.taskService.removeTask(taskId);
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('taskapp').controller('HomeController', HomeController);
        var AddTaskController = (function () {
            function AddTaskController(projectService) {
                this.projectService = projectService;
            }
            AddTaskController.prototype.addTask = function () {
                this.projectService.saveTask(this.task);
            };
            return AddTaskController;
        }());
        Controllers.AddTaskController = AddTaskController;
        angular.module('taskapp').controller('AddTaskController', AddTaskController);
        var AddProjectController = (function () {
            function AddProjectController(projectService) {
                this.projectService = projectService;
            }
            AddProjectController.prototype.addProject = function () {
                this.projectService.saveProject(this.project);
            };
            return AddProjectController;
        }());
        Controllers.AddProjectController = AddProjectController;
        angular.module('taskapp').controller('AddProjectController', AddProjectController);
        var EditTaskController = (function () {
            function EditTaskController($uibModal, $http) {
                var _this = this;
                this.$uibModal = $uibModal;
                this.$http = $http;
                this.$http.get('/api/tasks')
                    .then(function (response) {
                    _this.project = response.data;
                });
            }
            EditTaskController.prototype.editTask = function (title, description, details, dueDate) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/editTask.html',
                    controller: 'EditDialogController',
                    controllerAs: 'modal',
                    resolve: {
                        title: function () { return title; },
                        description: function () { return description; },
                        details: function () { return details; },
                        dueDate: function () { return dueDate; }
                    },
                    size: 'sm'
                });
            };
            return EditTaskController;
        }());
        Controllers.EditTaskController = EditTaskController;
        angular.module('taskapp').controller('EditTaskController', EditTaskController);
        var EditTaskDialogController = (function () {
            function EditTaskDialogController($uibModalInstance, taskService, $stateParams) {
                this.$uibModalInstance = $uibModalInstance;
                this.taskService = taskService;
                this.$stateParams = $stateParams;
                this.taskId = $stateParams['id'];
            }
            EditTaskDialogController.prototype.ok = function () {
                var _this = this;
                this.task._id = this.taskId;
                this.taskService.saveTask(this.task).then(function () {
                    _this.$uibModalInstance.close();
                });
            };
            return EditTaskDialogController;
        }());
        Controllers.EditTaskDialogController = EditTaskDialogController;
        angular.module('taskapp').controller('EditTaskDialogController', EditTaskDialogController);
        var LoginController = (function () {
            function LoginController(userService, $window, $state) {
                this.userService = userService;
                this.$window = $window;
                this.$state = $state;
                this.userInfo = {};
            }
            LoginController.prototype.login = function () {
                if (this.isAdmin === true) {
                    this.userInfo.role = 'admin';
                    console.log(this.userInfo);
                    this.createSession();
                }
                else {
                    this.userInfo.role = 'guest';
                    console.log(this.userInfo);
                    this.createSession();
                }
            };
            LoginController.prototype.createSession = function () {
                var _this = this;
                this.userService.loginUser(this.userInfo).then(function (data) {
                    _this.$window.localStorage.setItem("token", JSON.stringify(data.token));
                    _this.$state.go('home');
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        angular.module('taskapp').controller('LoginController', LoginController);
        var RegisterController = (function () {
            function RegisterController(userService) {
                this.userService = userService;
            }
            RegisterController.prototype.signup = function () {
                this.userService.registerUser(this.user).then(function () {
                    alert('signup successful, please login');
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        angular.module('taskapp').controller('RegisterController', RegisterController);
    })(Controllers = taskapp.Controllers || (taskapp.Controllers = {}));
})(taskapp || (taskapp = {}));
