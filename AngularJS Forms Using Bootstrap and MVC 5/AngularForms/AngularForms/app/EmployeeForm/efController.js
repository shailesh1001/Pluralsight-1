angularFormsApp.controller('efController',
    function efController($scope, $window, $routeParams, $modalInstance, DataService, employeeId) {

        if (employeeId)
            $scope.employee = DataService.getEmployee(employeeId);
        else
            $scope.employee = {id: 0}

        /*
        if ($routeParams.id)
            $scope.employee = DataService.getEmployee($routeParams.id);
        else
            $scope.employee = {id: 0}
        */
        // perform deep copy of employee data read from data service
        $scope.editableEmployee = angular.copy($scope.employee);

        $scope.departments = [
            "Engineering",
            "Marketing",
            "Finance",
            "Administration"
        ];

        $scope.programmingLanguages = [
            "C",
            "C++",
            "C#",
            "JavaScript",
            "Java",
            "Pascal",
            "Perl",
            "PHP"
        ];

        $scope.shouldShowFullName = function () {
            return true;
        };

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / 10);
        };

        $scope.submitForm = function () {

            $scope.$broadcast('show-errors-event');

            if ($scope.employeeForm.$invalid) {
                return;
            }

            if ($scope.editableEmployee.id == 0) {
                // Insert new employee
                DataService.insertEmployee($scope.editableEmployee);
            }
            else {
                DataService.updateEmployee($scope.editableEmployee);
            }

            $scope.employee = angular.copy($scope.editableEmployee);
            //$window.history.back();
            $modalInstance.close();
        };

        $scope.cancelForm = function () {
            //$window.history.back();
            $modalInstance.dismiss();
        };

        $scope.resetForm = function () {
            $scope.$broadcast('hide-errors-event');
        };

    });