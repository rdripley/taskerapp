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
                if (this.payload.role === 'teamLead') {
                    this.taskService.removeTask(taskId);
                    this.$state.reload().then(function () {
                        _this.$state.current;
                    });
                }
                else {
                    alert('Denied! TeamLeads only.');
                }
            };
            HomeController.prototype.deleteProject = function (projectId) {
                var _this = this;
                if (this.payload.role === 'teamLead') {
                    this.projectService.removeProject(projectId);
                    this.$state.reload().then(function () {
                        _this.$state.current;
                    });
                }
                else {
                    alert('Denied! TeamLeads only.');
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
                var info = $stateParams['id'].split(',');
                this.taskTitle = info[1];
                this.taskDescription = info[2];
                this.taskDetails = info[3];
                this.taskDueDate = info[4];
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
                var info = $stateParams['id'].split(',');
                this.projectName = info[1];
            }
            EditProjectController.prototype.editProject = function () {
                var _this = this;
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
            function RegisterController(userService, $state) {
                this.userService = userService;
                this.$state = $state;
            }
            RegisterController.prototype.signup = function () {
                var _this = this;
                this.userService.registerUser(this.user).then(function () {
                    _this.$state.go('login');
                    alert('signup successful, please login');
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        angular.module('taskapp').controller('RegisterController', RegisterController);
    })(Controllers = taskapp.Controllers || (taskapp.Controllers = {}));
})(taskapp || (taskapp = {}));
