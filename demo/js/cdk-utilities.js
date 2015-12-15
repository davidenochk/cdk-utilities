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
        noRecordsMessage:'=?',//what message to display when there are no records
        showEdit:'=?',//show edit column at the start so that it can selected
        editRow:'&',//handler for editing the row
        height:'@'//helps to resize the grid when the height changes
      },
      link:function cdkTableLink(scope, el, attr){
        // description: Set defaults to the attributes
        scope.options = scope.options == undefined ? [] : scope.options;
        scope.enableFiltering = scope.enableFiltering == undefined ? false : scope.enableFiltering;
        scope.saveFilters = scope.saveFilters == undefined ? false : scope.saveFilters;
        scope.autoGenerateColumns = scope.autoGenerateColumns == undefined ? false : scope.autoGenerateColumns;
        scope.exportToExcel = scope.exportToExcel == undefined ? false : scope.exportToExcel;
        scope.maxWidth = scope.maxWidth == undefined ? 3000 : scope.maxWidth;
        scope.maxHeight = scope.maxHeight == undefined ? 3000 : scope.maxHeight;
        scope.showEdit = scope.showEdit == undefined ? false : scope.showEdit;
        scope.height = scope.height == undefined ? 'auto' : scope.height;
      },
      controller:function cdkTableController($scope, $compile, $window, $attrs){


        $attrs.$observe('height', function(newValue){
          console.log('changed');
        });

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
          var el = $compile('<div data-ui-grid="gridOptions" data-ui-grid="gridOptions" data-ui-grid-resize-columns="" data-ui-grid-auto-resize="" style="margin:0 auto; max-height: ' + $scope.maxHeight + 'px; max-width:' + $scope.maxWidth + 'px; width:' + ($scope.gridWidth + 18) + 'px; height:' + $scope.height + 'px;"></div>')($scope);
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
          console.log(columnOptions);
          var headerOffset = 40;
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
                  enableColumnMenu:false,
                  enableColumnResizing:true
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
          var columnOptions = [];
          // TODO: Read the data first object in array, get the keys of the data,
          //       for each key find if it's in options, if there get the options

          // TODO: Add Edit Column Definition
          if($scope.showEdit){
            columnOptions.push({
              columnID:'EDIT',
              columnName:'EDIT'
            })
          }
          var keys;
          if($scope.autoGenerateColumns){
            //Read data for keys
            keys = Object.keys(data[0]);
            for(var i= 0;i<keys.length;i++){
              columnOptions.push({
                columnID:keys[i],
                columnName:keys[i]
              })
            }
          }else {
            //Read options for keys
            keys = $scope.options;
            for(var i= 0;i<keys.length;i++){
              columnOptions.push({
                columnID:keys[i],
                columnName:keys[i]
              })
            }
          }
          return columnOptions;
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

        // TODO: implement a function to resize the grid when the height of the container changes, read height property
        //$scope.$watch(function(){
        //  var el = document.getElementById($scope.id);
        //  console.log(el.attributes.height.nodeValue);
        //  return el.attributes.height.nodeValue;
        //}, function(){
        //  var el = document.getElementById($scope.id);
        //  el = el.children[0];
        //  el.style.height = $scope.height;
        //  console.log('height changed');
        //})
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
