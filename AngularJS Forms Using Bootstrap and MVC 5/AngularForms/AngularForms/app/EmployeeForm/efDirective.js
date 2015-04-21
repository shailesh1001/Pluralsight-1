// Note that "employeeForm" will be automatically be translated to "employee-form".
// This allows the user to preserve the conventions of each respective technology
// (HTML is snake case, JS is camel case)

angularFormsApp.directive('employeeForm',
    function () {
        return {
            restrict: 'E',
            templateUrl: 'app/EmployeeForm/efTemplate.html'
        }
    })