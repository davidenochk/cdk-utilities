/**
 * Created by kummarid on 5/10/2016.
 */

"use strict";
(function () {
    angular.module('app', ['cdk-utilities'])
        .controller('demoController', function ($scope) {
            $scope.list = 'CDK CRM,CDK Desking,CDK Menu'.split(',');
            $scope.template = '<span>{{list.join(\',\')}}</span>';
        })
})(angular);