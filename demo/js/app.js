"use strict";

(function(){
  angular.module('demo',['cdk-utilities'])
  .controller('demoController', function ($scope, data){
    $scope.data = data.GetData();
    $scope.EditTheRow = function EditTheRow(obj){
      console.log(obj);
    }
    $scope.GetTemplate = function GetTemplate(obj){
      if(obj.toUpperCase() === 'REOPEN')
      return '<div class="ui-grid-cell-contents"><a class="hyperlink" data-ng-click="grid.appScope.methods.reopen({value:row.entity.Request})">Reopen</a></ui-grid-cell-contents>';
    }
    $scope.reopen = function reopen(value){
      console.log(value);
    }
    $scope.EditRow = function(val){
      console.log(val);
    }
  })
})(angular);
