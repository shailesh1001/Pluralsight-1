angularFormsApp.controller('efController',
    function efController($scope, $window, $routeParams, DataService) {

        if ($routeParams.id)
            $scope.employee = DataService.getEmployee($routeParams.id);
        else
            $scope.employee = {id: 0}

        // perform deep copy of employee data read from data service
        $scope.editableEmployee = angular.copy($scope.employee);

        $scope.departments = [
            "Engineering",
            "Marketing",
            "Finance",
            "Administration"
        ];

        $scope.submitForm = function () {

            if ($scope.editableEmployee.id == 0) {
                // Insert new employee
                DataService.insertEmployee($scope.editableEmployee);
            }
            else {
                DataService.updateEmployee($scope.editableEmployee);
            }

            $scope.employee = angular.copy($scope.editableEmployee);
            $window.history.back();
        };

        $scope.cancelForm = function () {
            $window.history.back();
        };

    });