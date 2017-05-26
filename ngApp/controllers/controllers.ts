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
          if (this.payload.role === 'teamLead') {
            this.taskService.removeTask(taskId);
            this.$state.reload().then(() => {
              this.$state.current;
            })
          } else {
            alert('Denied! TeamLeads only.');
          }
        }

        public deleteProject(projectId) {
          if (this.payload.role === 'teamLead') {
            this.projectService.removeProject(projectId);
            this.$state.reload().then(() => {
              this.$state.current;
            })
          } else {
            alert('Denied! TeamLeads only.')
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
        public taskTitle;
        public taskDescription;
        public taskDetails;
        public taskDueDate;

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
            let info = $stateParams['id'].split(',');
            this.taskTitle = info[1];
            this.taskDescription = info[2];
            this.taskDetails = info[3];
            this.taskDueDate = info[4];
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
      public projectName;

      public editProject() {
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
          let info = $stateParams['id'].split(',');
          this.projectName = info[1];
      }
  }
    angular.module('taskapp').controller('EditProjectController', EditProjectController);

    export class LoginController {
      public userInfo;

      public login() {
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
          this.$state.go('login');
          alert('signup successful, please login');
        })
      }

      constructor(private userService, public $state) {}
    }
    angular.module('taskapp').controller('RegisterController', RegisterController);
}
