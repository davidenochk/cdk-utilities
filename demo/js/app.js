"use strict";

(function(){
  angular.module('demo',['cdk-utilities'])
  .controller('demoController', function ($scope, data){
    $scope.title = 'Jello';
    $scope.data = data.GetData();
    $scope.EditTheRow = function EditTheRow(obj){
      console.log(obj);
    }
  })
})(angular);
