namespace taskapp.Services {
  export class TaskService {
    public TaskResource;

    public getTasks(project) {
      return this.TaskResource.query({tag: project}).$promise;
    }

    public saveTask(task) {
      return this.TaskResource.save(task);
    }

    public removeTask(taskId) {
      return this.TaskResource.remove({tag: taskId});
    }
    constructor(private $resource) {
      this.TaskResource = $resource('/api/tasks/:tag')
    }
  }
  angular.module('taskapp').service('taskService', TaskService);

  export class UserService {
    public LoginResource;
    public SignUpResource;

    public registerUser(userObj) {
      return this.SignUpResource.save(userObj).$promise;
    }

    public loginUser(userInfo) {
      return this.LoginResource.save(userInfo).$promise;
    }

    constructor(private $resource: ng.resource.IResourceService) {
      this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
      this.SignUpResource = this.$resource('/userRoutes/api/Register');
    }
  }
  angular.module('taskapp').service('userService', UserService);
}
