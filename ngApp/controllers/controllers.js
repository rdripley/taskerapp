var taskapp;
(function (taskapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(taskService, projectService, $state) {
                this.taskService = taskService;
                this.projectService = projectService;
                this.$state = $state;
                this.projects = this.projectService.getProjects();
                var token = window.localStorage['token'];
                if (token) {
                    this.payload = JSON.parse(window.atob(token.split('.')[1]));
                }
            }
            HomeController.prototype.getTasks = function (projectId) {
                var _this = this;
                this.projectService.getTasks(projectId).then(function (result) {
                    _this.tasks = result;
                });
            };
            HomeController.prototype.deleteTask = function (taskId) {
                var _this = this;
                if (this.payload.role === 'admin') {
                    this.taskService.removeTask(taskId);
                    this.$state.reload().then(function () {
                        _this.$state.current;
                    });
                }
                else {
                    alert('Denied! Admins only.');
                }
            };
            HomeController.prototype.deleteProject = function (projectId) {
                var _this = this;
                if (this.payload.role === 'admin') {
                    this.projectService.removeProject(projectId);
                    this.$state.reload().then(function () {
                        _this.$state.current;
                    });
                }
                else {
                    alert('Denied! Admins only.');
                }
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
            function EditTaskController(taskService, $stateParams, $state) {
                this.taskService = taskService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.taskId = $stateParams['id'];
            }
            EditTaskController.prototype.editTask = function () {
                var _this = this;
                this.task._id = this.taskId;
                this.taskService.saveTask(this.task);
                this.$state.reload().then(function () {
                    _this.$state.go('home');
                });
            };
            return EditTaskController;
        }());
        Controllers.EditTaskController = EditTaskController;
        angular.module('taskapp').controller('EditTaskController', EditTaskController);
        var AddProjectController = (function () {
            function AddProjectController(projectService, $state) {
                this.projectService = projectService;
                this.$state = $state;
            }
            AddProjectController.prototype.addProject = function () {
                var _this = this;
                this.projectService.saveProject(this.project);
                this.$state.reload().then(function () {
                    _this.$state.go('home');
                });
            };
            return AddProjectController;
        }());
        Controllers.AddProjectController = AddProjectController;
        angular.module('taskapp').controller('AddProjectController', AddProjectController);
        var EditProjectController = (function () {
            function EditProjectController(projectService, $stateParams, $state) {
                this.projectService = projectService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.projectId = $stateParams['id'];
            }
            EditProjectController.prototype.editProject = function () {
                var _this = this;
                console.log(this.projectId);
                this.project._id = this.projectId;
                this.projectService.saveProject(this.project);
                this.$state.reload().then(function () {
                    _this.$state.go('home');
                });
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
