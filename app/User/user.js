'use strict';

angular.module('myApp.user', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/user', {
                    templateUrl: 'User/user.html',
                    controller: 'UserCtrl'
                });
            }])

        .controller('UserCtrl', function ($scope, UserService, $rootScope, TaskService) {

//get the initial size of array and last added user for view display
            $scope.lastAddedUser = UserService.getFirstUser();
            $scope.allUsersArraySize = UserService.getSizeOfArray();
            $rootScope.allUsers = UserService.getArray();
            console.log($scope.lastAddedUser);



//user model
            $scope.newUser = {
                name: "",
                surname: "",
                email: null
            };


//adding new user function, callback to service
            $scope.addUser = function (user) {

                $scope.allUsers = UserService.getArray();
                UserService.addUser($scope.newUser);
                $scope.clearNewUserVariable();

                $scope.allUsersArraySize = UserService.getSizeOfArray();
                $scope.lastAddedUser = UserService.getFirstUser();
                console.log('add user function !');


            };



            $scope.clearNewUserVariable = function () {
                $scope.newUser = {
                    name: "",
                    surname: "",
                    email: null
                };

            };


//getting all tasks from a specific user, function calls factory serives
            $scope.getUserTasks = function (id) {

                $scope.userTaskArray = TaskService.getAllUserTasks(id);

            }

            $scope.isCollapsed = true;

        })


        .factory("UserService", function () {

            var n = 3;

            var array = [
                {
                    id: 1,
                    name: "Max",
                    surname: "Musterman",
                    email: "max@gmail.com"

                },
                {id: 2,
                    name: "Emir",
                    surname: "Salkic",
                    email: "emir@gmail.com"

                }

            ];


            return {
                getArray: function () {

                    if (array.length == 0) {

                        console.log("array is currently empty")


                    } else {


                        return array;

                    }

                },
                addUser: function (user) {
                    user.id = n;

                    array.unshift(user);
                    console.log("this user been passed to array:");
                    console.log(user);
                    console.log(array);
                    n++;





                },
                getSizeOfArray: function () {
                    console.log("get size called");
                    return array.length;


                },
                deleteUser: function (index) {

                    array.splice(index, 1);
                    console.log("you deleted an user , call from service")


                },
                getFirstUser: function () {

                    return array[0];


                }


            }


        });