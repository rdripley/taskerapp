namespace taskapp.Controllers {
// need to PAYLOAD to add/edit controllers. Create/edit should be available to "guest" but not deleate
    export class HomeController {
        public project;
        public tasks;

        public getAllTasks() {
          this.taskService.getTasks(this.project).then((result) => {
            this.tasks = result;
          });
        }

        public deleteTask(taskId) {
          this.taskService.removeTask(taskId);
        }

        constructor(private taskService) {}
    }
    angular.module('taskapp').controller('HomeController', HomeController);

    export class AddController {
      public project;

      public addTask(title: string, description: string, details: string, dueDate: string) {
        this.$uibModal.open({
          templateUrl: '/ngApp/views/addTask.html',
          controller: 'AddDialogController',
          controllerAs: 'modal',
          resolve: {
            title: () => title,
            description: () => description,
            details: () => details,
            dueDate: () => dueDate
          },
          size: 'sm'
        });
      }
      constructor(private $uibModal, private $http) {
        this.$http.get('/api/tasks')
        .then((response) => {
          this.project = response.data;
        });
      }
    }
    angular.module('taskapp').controller('AddController', AddController);

    export class AddDialogController {
        public task;
        public project;

        public ok() {
          this.taskService.saveTask(this.task).then(() => {
            this.project = this.taskService.getTasks();
            this.task = {};
            this.$uibModalInstance.close();
          })
        }

        constructor(private $uibModalInstance, private taskService) {
          this.project = this.taskService.getTasks();
        }
    }
    angular.module('taskapp').controller('AddDialogController', AddDialogController);

    export class EditController {
      // need to add logic for editing
      public project;
      public task;
      public taskId;

      public editTask(title: string, description: string, details: string, dueDate: string) {
        this.$uibModal.open({
          templateUrl: '/ngApp/views/editTask.html',
          controller: 'EditDialogController',
          controllerAs: 'modal',
          resolve: {
            title: () => title,
            description: () => description,
            details: () => details,
            dueDate: () => dueDate
          },
          size: 'sm'
        });
      }
      constructor(private $uibModal, private $http) {
        this.$http.get('/api/tasks')
        .then((response) => {
          this.project = response.data;
        });
      }
    }
    angular.module('taskapp').controller('EditController', EditController);

    export class EditDialogController {
    // need to add logic for editting
        public task;
        public taskId;

        public ok() {
          this.task._id = this.taskId;
          this.taskService.saveTask(this.task).then(() => {
            this.$uibModalInstance.close();
          })
        }

        constructor(
          private $uibModalInstance,
          private taskService,
          public $stateParams) {
            this.taskId = $stateParams['id'];
        }
    }
    angular.module('taskapp').controller('EditDialogController', EditDialogController);

    export class LoginController {
      public userInfo;
      public isAdmin;

      public login() {
        if(this.isAdmin === true) {
          this.userInfo.role = 'admin';
          console.log(this.userInfo);
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
