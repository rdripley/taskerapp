var taskapp;
(function (taskapp) {
    var Services;
    (function (Services) {
        var TaskService = (function () {
            function TaskService($resource) {
                this.$resource = $resource;
                this.TaskResource = $resource('/api/tasks/:tag');
            }
            TaskService.prototype.getTasks = function () {
                this.TaskResource.query();
            };
            TaskService.prototype.saveTask = function (task) {
                return this.TaskResource.save(task);
            };
            TaskService.prototype.removeTask = function (taskId) {
                return this.TaskResource.remove({ tag: taskId });
            };
            return TaskService;
        }());
        Services.TaskService = TaskService;
        angular.module('taskapp').service('taskService', TaskService);
        var ProjectService = (function () {
            function ProjectService($resource) {
                this.$resource = $resource;
                this.ProjectResource = $resource('/api/newProjects/:id');
            }
            ProjectService.prototype.getProjects = function () {
                return this.ProjectResource.query();
            };
            ProjectService.prototype.getTasks = function (projectId) {
                return this.ProjectResource.query({ id: projectId }).$promise;
            };
            ProjectService.prototype.saveProject = function (project) {
                return this.ProjectResource.save(project);
            };
            ProjectService.prototype.removeProject = function (projectId) {
                return this.ProjectResource.remove({ id: projectId });
            };
            return ProjectService;
        }());
        Services.ProjectService = ProjectService;
        angular.module('taskapp').service('projectService', ProjectService);
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
                this.SignUpResource = this.$resource('/userRoutes/api/Register');
            }
            UserService.prototype.registerUser = function (userObj) {
                return this.SignUpResource.save(userObj).$promise;
            };
            UserService.prototype.loginUser = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('taskapp').service('userService', UserService);
    })(Services = taskapp.Services || (taskapp.Services = {}));
})(taskapp || (taskapp = {}));
