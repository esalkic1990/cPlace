'use strict';

angular.module('myApp.view1', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/view1', {
                    templateUrl: 'view1/view1.html',
                    controller: 'View1Ctrl'
                });
            }])

        .controller('View1Ctrl', function ($scope, TaskService, $rootScope, $location, GettingSelectedTaskService) {

            $rootScope.allTasks = TaskService.getArray();
            $scope.taskCount = TaskService.getSizeOfArray();


            $scope.openTaskOvewViewEdit = function (task) {

                GettingSelectedTaskService.addCurrentSelTask(task);

                $location.path('/taskOverviewEdit');
                console.log('this task: ' + task.description);





            };


        })

        .factory('GettingSelectedTaskService', function () {

            var currentTask;

            return{
                addCurrentSelTask: function (selectedTask) {

                    currentTask = selectedTask;



                },
                getCurrentSelTask: function () {

                    return currentTask;


                }



            }



        });

