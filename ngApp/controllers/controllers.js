var taskapp;
(function (taskapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(taskService, projectService) {
                this.taskService = taskService;
                this.projectService = projectService;
                this.projects = this.projectService.getProjects();
            }
            HomeController.prototype.getTasks = function () {
                var _this = this;
                this.projectService.getTasks(this.project).then(function (result) {
                    _this.tasks = result;
                });
            };
            HomeController.prototype.deleteTask = function (taskId) {
                this.taskService.removeTask(taskId);
            };
            HomeController.prototype.deleteProject = function (projectId) {
                this.projectService.removeProject(projectId);
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('taskapp').controller('HomeController', HomeController);
        var AddTaskController = (function () {
            function AddTaskController(taskService, projectService, $state) {
                this.taskService = taskService;
                this.projectService = projectService;
                this.$state = $state;
                this.projects = this.projectService.getProjects();
            }
            AddTaskController.prototype.addTask = function () {
                this.taskService.saveTask(this.task);
                this.$state.go('home');
            };
            return AddTaskController;
        }());
        Controllers.AddTaskController = AddTaskController;
        angular.module('taskapp').controller('AddTaskController', AddTaskController);
        var EditTaskController = (function () {
            function EditTaskController(taskService, $stateParams) {
                this.taskService = taskService;
                this.$stateParams = $stateParams;
                this.taskId = $stateParams['id'];
            }
            EditTaskController.prototype.editTask = function () {
                this.task._id = this.taskId;
                this.taskService.saveTask(this.task);
            };
            return EditTaskController;
        }());
        Controllers.EditTaskController = EditTaskController;
        angular.module('taskapp').controller('EditTaskController', EditTaskController);
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
        var EditProjectController = (function () {
            function EditProjectController(projectService, $stateParams) {
                this.projectService = projectService;
                this.$stateParams = $stateParams;
                this.projectId = $stateParams['id'];
            }
            EditProjectController.prototype.editProject = function () {
                console.log(this.projectId);
                this.project._id = this.projectId;
                this.projectService.saveProject(this.project);
            };
            return EditProjectController;
        }());
        Controllers.EditProjectController = EditProjectController;
        angular.module('taskapp').controller('EditProjectController', EditProjectController);
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
