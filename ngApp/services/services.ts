namespace taskapp.Services {
  export class TaskService {
    public TaskResource;

    public getTasks() {
      this.TaskResource.query();
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

  export class ProjectService {
    public ProjectResource;

    public getProjects() {
      return this.ProjectResource.query();
    }

    public getTasks(projectId) {
      return this.ProjectResource.query({id: projectId}).$promise;
    }

    public saveProject(project) {
      return this.ProjectResource.save(project);
    }

    public removeProject(projectId) {
      return this.ProjectResource.remove({id: projectId});
    }
    constructor(private $resource) {
      this.ProjectResource = $resource('/api/newProjects/:id');
    }
  }
  angular.module('taskapp').service('projectService', ProjectService);

  export class UserService {
    public LoginResource;
    public SignUpResource;
    public UserResource;

    public registerUser(userObj) {
      return this.SignUpResource.save(userObj).$promise;
    }

    public loginUser(userInfo) {
      return this.LoginResource.save(userInfo).$promise;
    }

    public get(id) {
      return this.UserResource.get({id:id});
    }

    public listUsers() {
      return this.UserResource.query();
    }

    constructor(private $resource: ng.resource.IResourceService) {
      this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
      this.SignUpResource = this.$resource('/userRoutes/api/Register');
      this.UserResource = this.$resource('/userRoutes/api/:id');
    }
  }
  angular.module('taskapp').service('userService', UserService);
}
