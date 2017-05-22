namespace taskapp.Controllers {
// need to PAYLOAD to add/edit controllers. Create/edit should be available to "guest" but not deleate
    export class HomeController {
        public projectId;
        public projects;
        public tasks;
        public payload;

        public getTasks(projectId) {
          this.projectService.getTasks(projectId).then((result) => {
            this.tasks = result;
          });
        }

        public deleteTask(taskId) {
          if (this.payload.role === 'admin') {
            this.taskService.removeTask(taskId);
            this.$state.reload().then(() => {
              this.$state.current;
            })
          } else {
            alert('Denied! Admins only.');
          }
        }

        public deleteProject(projectId) {
          if (this.payload.role === 'admin') {
            this.projectService.removeProject(projectId);
            this.$state.reload().then(() => {
              this.$state.current;
            })
          } else {
            alert('Denied! Admins only.')
          }
        }

        constructor(private taskService, private projectService, public $state) {
          this.projects = this.projectService.getProjects();
          let token = window.localStorage['token'];

          if(token) {
            this.payload = JSON.parse(window.atob(token.split('.')[1]));
          }
        }
    }
    angular.module('taskapp').controller('HomeController', HomeController);

    export class AddTaskController {
        public task;
        public projects;

        public addTask() {
          this.taskService.saveTask(this.task);
          this.$state.go('home');
        }
        constructor(private taskService, private projectService, public $state) {
          this.projects = this.projectService.getProjects();
        }
    }
    angular.module('taskapp').controller('AddTaskController', AddTaskController);

    export class EditTaskController {
        public task;
        public taskId;

        public editTask() {
          this.task._id = this.taskId;
          this.taskService.saveTask(this.task);
          this.$state.reload().then(() => {
            this.$state.go('home');
          })
        }

        constructor(
          private taskService,
          public $stateParams,
          public $state
        ) {
            this.taskId = $stateParams['id'];
        }
    }
    angular.module('taskapp').controller('EditTaskController', EditTaskController);

    export class AddProjectController {
        public project;

        public addProject() {
          this.projectService.saveProject(this.project);
          this.$state.reload().then(() => {
            this.$state.go('home');
          })
        }
        constructor(private projectService, public $state) { }
    }
    angular.module('taskapp').controller('AddProjectController', AddProjectController);

    export class EditProjectController {
      public project;
      public projectId;

      public editProject() {
        console.log(this.projectId)
        this.project._id = this.projectId;
        this.projectService.saveProject(this.project);
        this.$state.reload().then(() => {
          this.$state.go('home');
        })
      }

      constructor(
        private projectService,
        public $stateParams,
        public $state
      ) {
          this.projectId = $stateParams['id'];
      }
  }
    angular.module('taskapp').controller('EditProjectController', EditProjectController);



    export class LoginController {
      public userInfo;
      public isAdmin;

      public login() {
        if(this.isAdmin === true) {
          this.userInfo.role = 'admin';
          this.createSession();
        } else {
          this.userInfo.role = 'guest';
          console.log(this.userInfo);
          this.createSession();
        }
      }

      public createSession() {
        this.userService.loginUser(this.userInfo).then((data) => {
          this.$window.localStorage.setItem("token", JSON.stringify(data.token));
          this.$state.go('home');
        })
      }

      constructor(private userService, private $window, private $state) {
        this.userInfo = {};
      }
    }
    angular.module('taskapp').controller('LoginController', LoginController);

    export class RegisterController {
      public user;

      public signup() {
        this.userService.registerUser(this.user).then(() => {
          alert('signup successful, please login');
        })
      }

      constructor(private userService) {}
    }
    angular.module('taskapp').controller('RegisterController', RegisterController);
}
