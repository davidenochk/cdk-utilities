"use strict";
(function(){
  angular.module('cdk-utilities', ['ui.grid', 'ui.grid.autoResize', 'ui.grid.resizeColumns',])
  .directive('cdkTable', function(){
    return {
      restrict:'EA',
      scope:{
        id:'@',//id of the grid
        data:'=model',//data as an input
        options:'=',//column options which consists the configuration for each column
        enableFiltering:'=?',//should the filtering panel be shown
        saveFilters:'=?',//should the filters be saved to database
        maxWidth:'=?',//width of the grid to which it should expand
        maxHeight:'=?',//height of the grid to which it can expand
        autoGenerateColumns:'=?',//Should the columns be auto generated from the input model
        exportToExcel:'=?',//display the export to excel icon
        noRecordsMessage:'=?'//what message to display when there are no records
      },
      link:function cdkTableLink(scope, el, attr){
        // description: Set defaults to the attributes
        scope.enableFiltering = scope.enableFiltering == undefined ? false : scope.enableFiltering;
        scope.saveFilters = scope.saveFilters == undefined ? false : scope.saveFilters;
        scope.autoGenerateColumns = scope.autoGenerateColumns == undefined ? false : scope.autoGenerateColumns;
        scope.exportToExcel = scope.exportToExcel == undefined ? false : scope.exportToExcel;
        scope.maxWidth = scope.maxWidth == undefined ? 3000 : scope.maxWidth;
        scope.maxHeight = scope.maxHeight == undefined ? 3000 : scope.maxHeight;
      },
      controller:function cdkTableController($scope, $compile){
        // TODO: get the grid api and check for the handle window resize functionality
        // TODO: watch data to see if data changes and then if it is valid, render the grid
        $scope.$watch('data', function(){
          if($scope.data){
            if($scope.data.length){
              var data = $scope.data;
              $scope.gridOptions = {
                data:$scope.data,
                columnDefs:GetColumnDefs($scope.data),
                minRowsToShow:(data.length < 10 ? data.length : 10),
                minWidth:$scope.minWidth
              };
              $scope.ShowDefaultGrid();
            }
            else{$scope.NoRecords();}
          }
        });
        // TODO: implement a function to show no records message
        $scope.NoRecords = function NoRecords(){
          // TODO: show 'No records message'
        }
        // TODO: Show default grid
        $scope.ShowDefaultGrid = function ShowDefaultGrid(){
          // TODO: replace
          var elm = document.getElementById($scope.id);
          var el = $compile('<div data-ui-grid="gridOptions" style="margin:0 auto;height: auto; max-height: ' + $scope.maxHeight + 'px; max-width:' + $scope.maxWidth + 'px; width:' + ($scope.gridWidth + 18) + 'px;"></div>')($scope);
          angular.element(elm).append(el);
        }
        /**
        @description Build the column definitions for the input data to display in the grid
        */
        var GetColumnDefs = function (data)
        {
          var dataRow = data[0];
          var columnDefs = [];
          var columnOptions = BuildColumnOptions(data);
          var headerOffset = 30;
          var totalWidth = 0;
          angular.forEach(columnOptions, function (opt, i)
          {
              var cellTemp;
              if (opt.columnID == 'EDIT')
                  cellTemp = '<div class="hyperlink ui-grid-cell-contents" data-ng-click="grid.appScope.EditRow(row.entity.CODE)">Edit</div>';
              //auto calculate the column width from data value length
              var dataLength = 0;
              if (opt.width && opt.width.toUpperCase() == 'AUTO')
              {
                  angular.forEach(data, function (d, i)
                  {
                      if ((dataLength + headerOffset) < GetWidth(d[opt.columnID]))
                          dataLength = GetWidth(d[opt.columnID]);
                  });
              }
              //auto generate columnName if not there
              var displayName = opt.columnName ? opt.columnName : opt.columnID.toString().toUpperCase().replace('_', ' ').replace('_', ' ').replace('_', ' ');
              //auto calculate the header text length from columnNames
              //if width is not set on the column in columnOptions
              var width = opt.width && opt.width != 'AUTO' ? opt.width : GetWidth(displayName);
              width = width > dataLength ? width : dataLength;
              columnDefs.push({
                  field: opt.columnID,
                  displayName: displayName,
                  width: width + headerOffset,
                  cellFilter: opt.filter ? opt.filter : '',
                  cellTemplate: cellTemp ? cellTemp : '',
                  enableHiding:false,
                  enableColumnMenu:true
              });
              totalWidth += (width + headerOffset);
            });
            $scope.gridWidth = totalWidth;
            //ChangeWidth($scope.id, totalWidth);
            return columnDefs;
        }

        /**
        @description the forming of the column definitions depends on the autoGenerateColumns key
        if the key is true, then it has to read data and form definitions taking all the columns into consideration
        else it should only consider the columns in the options
        ColumnDefs:{
          columnID,
          columnName,
          width,
          lineMode,
          maxWidth,
          defsort
        }
        */
        var BuildColumnOptions = function BuildColumnOptions(data){
          return [{
            columnID:'Name',
            columnName:'Associate Name',
            width:'AUTO',
            lineMode:'single',
            maxWidth:10,
            defsort:'ASC'
          },
          {
            columnID:'ID',
            columnName:'Associate ID',
            width:'AUTO'
          }]
        }
        var GetWidth = function GetWidth(txt)
        {
            var el = document.createElement('forWidth');
            el.style.visibility = 'hidden';
            el.innerHTML = txt;
            document.body.appendChild(el);
            var width = el.offsetWidth;
            document.body.removeChild(el);
            return width;
        }
        var ChangeWidth = function ChangeWidth(id, width)
        {
            angular.element(document.getElementById(id)).css('width', width + 'px');
        }
      }
    }
  })
  /**
  @module cdk-utilities
  @method cdkMultiSelect directive
  @description to be able to select multiple options from the dropdowns
  */
  .directive('cdkMultiSelect', function(){
    return {
      restrict:'EA',
      scope:{
        // TODO: Write the options
      },
      link:function cdkMultiSelectLink(scope, el, attr){
        // TODO: Link the default values to the options
      },
      controller:function cdkMultiSelectController($scope){
        // TODO: Write the functionality for the multi select
        // TODO:
      }
    }
  })
})(angular);
