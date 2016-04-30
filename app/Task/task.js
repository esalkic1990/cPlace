'use strict';

angular.module('myApp.task', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/task', {
                    templateUrl: 'Task/task.html',
                    controller: 'TaskCtrl'
                })
                        .when('/taskOverviewEdit', {
                            templateUrl: 'Task/taskOverviewEdit.html',
                            controller: 'TaskOverviewEditCtrl'
                        });
            }])

        .controller('TaskCtrl', function ($scope, UserService, $rootScope, TaskService, $location, GettingSelectedTaskService) {



            $rootScope.allUsers = UserService.getArray();

            $scope.allTasks = TaskService.getArray();





            $scope.newTask = {
                nameTask: "",
                description: "",
                percentage: 0,
                user: {
                }
            };


            //adding new tasks 
            $scope.addTask = function (task) {

                $rootScope.allTasks = TaskService.getArray();

                //console.log("This is beeging added to task array: ");
                //console.log($scope.newTask);


                TaskService.addTask($scope.newTask);
                $scope.clearNewTaskVariable();

                $scope.allTasksArraySize = TaskService.getSizeOfArray();
                $scope.lastAddedTask = TaskService.getFirstTask();
                


            };

            $scope.deteteSelectedTask = function (task) {
                TaskService.deleteTask(task);




            };

            $scope.getTaskForModal = function (task) {

                $scope.selectedTaskModal = task;



            };

            $scope.clearNewTaskVariable = function () {

                $scope.newTask = {
                    nameTask: "",
                    description: "",
                    percentage: 0,
                    user: {
                    }
                };



            };

            $scope.goToEdit = function () {


                $location.path('/taskOverviewEdit');


            };

            $rootScope.percentage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
           


        })

        .controller("TaskOverviewEditCtrl", function ($scope, GettingSelectedTaskService, $rootScope, UserService, TaskService, $location) {

            
            $rootScope.allUsers = UserService.getArray();
            $scope.selectedTask = GettingSelectedTaskService.getCurrentSelTask();

            



            $scope.enableEdit = function () {

                $('.taskEditPanel input').removeAttr('disabled');
                $('.taskEditPanel textarea').removeAttr('disabled');
                $('.taskEditPanel select').removeAttr('disabled');




            };

            $scope.enableEditPercentage = function () {

                $('.percentageEditPanel select').removeAttr('disabled');



            };


            //save the edited task
            $scope.save = function (editedTask) {

                $rootScope.allTasks = TaskService.getArray();
                
                $location.path("/#taskOverviewEdit");


                $('.taskEditPanel input').attr('disabled', 'disabled');
                $('.taskEditPanel textarea').attr('disabled', 'disabled');
                $('.taskEditPanel select').attr('disabled', 'disabled');

            };





            $scope.saveButton = false;
            $scope.saveButtonPergentage = false;
            $rootScope.percentage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];


        })





        .factory("TaskService", function () {

            var n = 3;

            var array = [
                {id: 1,
                    nameTask: "Setup homepage",
                    description: "Setting up the homepage on our new server with some small modifications. Changes will be sent by mail.",
                    percentage: 30,
                    user: {
                        id: 1,
                        name: "Max",
                        surname: "Musterman",
                        email: "max@gmail.com"

                    }

                },
                {id: 2,
                    nameTask: "Update the Json data format for users",
                    description: "Some small description",
                    percentage: 70,
                    user: {
                        id: 2,
                        name: "Emir",
                        surname: "Salkic",
                        email: "emir@gmail.com"

                    }

                }

            ];


            return {
                getArray: function () {

                    if (array.length == 0) {

                       // console.log("array is currently empty")


                    } else {


                        return array;

                    }

                },
                addTask: function (task) {

                    task.id = n;
                    array.unshift(task);
                    console.log(array);
                    n++;




                },
                getSizeOfArray: function () {
                    
                    return array.length;


                },
                deleteTask: function (index) {

                    array.splice(index, 1);
                    


                },
                getFirstTask: function () {

                    return array[0];


                },
                getAllUserTasks: function (userId) {
                    //empty array for storing tasks of specific user
                    var allUserTasksArray = [];

                    for (var i = 0; i < array.length; i++) {

                        if (array[i].user.id == userId) {

                            allUserTasksArray.unshift(array[i]);
                            //console.log(allUserTasksArray);


                        }
                    }
                    return allUserTasksArray;


                }


            }


        });

  