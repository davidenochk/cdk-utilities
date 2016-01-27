"use strict";
Array.prototype.findAll = function (vl, c) {
    var v = [];
    for (var i = 0; i < this.length; i++) {
        //get the array item
        if (this[i][c] == vl)
            v.push(this[i]);
    }
    return v;
};
Array.prototype.findOne = function (vl, c) {
    var v = [];
    for (var i = 0; i < this.length; i++) {
        //get the array item
        if (this[i][c] == vl)
            return this[i];
    }
    return v;
};
(function () {
    angular.module('cdk-utilities', ['ui.grid', 'ui.grid.autoResize', 'ui.grid.resizeColumns'])
    .filter('formatDate', function ($filter) {
        return function (val) {
            var aDate = val;
            if (aDate) {
                var dt = $filter('date')(new Date(aDate), 'MM/dd/yyyy');
                dt = dt == '01/01/0001' ? '' : dt;
                return dt;
            } else {
              //console.log(aDate);
              return null;
            }
        }
    })
    .filter('toNumber', function ($filter) {
        return function (val) {
            if (val === null)
                val = 0;
            return $filter('number')(val, 2);
        }
    })
    .directive('cdkTable', function () {
        return {
            restrict: 'EA',
            scope: {
                id: '@',//id of the grid
                data: '=model',//data as an input
                options: '=',//column options which consists the configuration for each column
                enableFiltering: '=?',//should the filtering panel be shown
                saveFilters: '=?',//should the filters be saved to database
                maxWidth: '@',//width of the grid to which it should expand
                maxHeight: '@',//height of the grid to which it can expand
                autoGenerateColumns: '=?',//Should the columns be auto generated from the input model
                exportToExcel: '=?',//display the export to excel icon
                noRecordsMessage: '=?',//what message to display when there are no records
                showEdit: '=?',//show edit column at the start so that it can selected
                filterable: '=?',//to be able to filter on the column
                showCheck: '=?',//show check column at the start so that it can be selected
                editRow: '&',//handler for editing the row
                headerOffset: '=?',//header offset value
                autoHeightOffset: '=?',//auto height offset calculation
                getTemplate: '&',//for getting the templates
                class: '=?',//add the cell class
                methods: '=?',//map external methods
                selectRow: '=?',//select the rows on which you want to do some kind of processing
                values:'=?',//pass on values from external scope to the appscope
                showFoots:'=?',//show footers for the columns,
                horScroll:'=?',//to show or hide horizontal scrollbar,
                defSort:'=?',//to sort the grid by this column as soon as the grid loads
                priority:'@',//sort on the column according to this priority
                offsetRowHeight:'@',//used to calculate the extra height needed for the grid while using rowHeight for calculating dataHeight through rows
            },
            link: function cdkTableLink(scope, el, attr, $window) {
                // description: Set defaults to the attributes
                scope.options = scope.options == undefined ? [] : scope.options;
                scope.enableFiltering = scope.enableFiltering == undefined ? false : scope.enableFiltering;
                scope.saveFilters = scope.saveFilters == undefined ? false : scope.saveFilters;
                scope.autoGenerateColumns = scope.autoGenerateColumns == undefined ? false : scope.autoGenerateColumns;
                scope.exportToExcel = scope.exportToExcel == undefined ? false : scope.exportToExcel;
                scope.maxWidth = scope.maxWidth == undefined ? 'AUTO' : scope.maxWidth;
                scope.maxHeight = scope.maxHeight == undefined ? 'AUTO' : scope.maxHeight;
                scope.showEdit = scope.showEdit == undefined ? false : scope.showEdit;
                scope.showCheck = scope.showCheck == undefined ? false : scope.showCheck;
                scope.selectRow = scope.selectRow == undefined ? true : scope.selectRow;
                scope.filterable = scope.filterable == undefined ? false : scope.filterable;
                scope.headerOffset = scope.headerOffset == undefined ? 20 : scope.headerOffset;
                scope.autoHeightOffset = scope.autoHeightOffset == undefined ? 30 : scope.autoHeightOffset;
                scope.class = scope.class == undefined ? '' : scope.class;
                scope.methods = scope.methods == undefined ? {} : scope.methods;
                scope.showColumnFooter = scope.showFoots === undefined ? false : scope.showFoots;
                scope.horScroll = scope.horScroll === undefined ? true : scope.horScroll;
                scope.offsetRowHeight = scope.offsetRowHeight === undefined ? 0 : scope.offsetRowHeight;
                scope.defSort = scope.defSort === undefined ? 'ASC' : scope.defSort;
            },
            controller: function cdkTableController($scope, $compile, $window, $attrs, uiGridConstants) {
                // NOTE: Defaults for the gridOptions
                $scope.rowHeight = 21;
                // TODO: get the grid api and check for the handle window resize functionality
                // TODO: watch data to see if data changes and then if it is valid, render the grid
                $scope.$watch('data', function () {
                    if ($scope.data) {
                        if ($scope.data.length) {
                            var data = $scope.data;
                            data = ProcessDataForCorrectDates(data);
                            var options = {
                                data: $scope.data,
                                columnDefs: GetColumnDefs($scope.data),
                                minRowsToShow: (data.length < 35 ? data.length : 35),
                                rowHeight: $scope.rowHeight,
                                minWidth: $scope.minWidth,
                                enableFiltering: true,
                                showGridFooter:true,
                                showColumnFooter: $scope.showColumnFooter,
                                columnFooterHeight: 20,
                                enableHorizontalScrollbar:$scope.horScroll ? uiGridConstants.scrollbars.ALWAYS : uiGridConstants.scrollbars.NEVER,
                                rowTemplate: '<div ' + ($scope.showCheck ? 'ng-click="row.entity.selectbit = !row.entity.selectbit"  ng-class="{\'highlightRow\': row.entity.selectbit === true}" ' : '') + ' ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>'
                            };
                            $scope.gridOptions = options;
                            $scope.ShowDefaultGrid();
                        }
                        else { $scope.NoRecords(); }
                    }
                });
                var ProcessDataForCorrectDates = function ProcessDataForCorrectDates(data){
                  //console.log(data);
                  var options = $scope.options;
                  for(var i = 0;i<options.length;i++){
                    //For each type of date, loop through data and convert value to date
                    if(options[i].type && options[i].type.toUpperCase() === 'DATE'){
                      for(var j = 0;j<data.length;j++){
                        if(data[j][options[i].columnID])
                        data[j][options[i].columnID] = new Date(data[j][options[i].columnID]);
                      }
                    }
                  }
                  //console.log(data);
                  return data;
                }
                // TODO: implement a function to show no records message
                $scope.NoRecords = function NoRecords() {
                    // TODO: show 'No records message'
                }
                // TODO: Show default grid
                $scope.ShowDefaultGrid = function ShowDefaultGrid() {
                    // TODO: replace
                    var elm = document.getElementById($scope.id);
                    try {
                        elm.removeChild(elm.children[0]);
                    } catch (e) { }
                    //console.log($scope.maxHeight, $scope.autoHeightOffset, FindDataHeight(), FindOffsetHeight());
                    var offset = $scope.autoHeightOffset ? $scope.autoHeightOffset : 0;
                    var dataHeight = FindDataHeight();
                    var gridMaxHeight = FindOffsetHeight();
                    var maxHeight = 0;
                    maxHeight = $scope.maxHeight != 'AUTO' ? $scope.maxHeight : (maxHeight < FindDataHeight() ? maxHeight : FindDataHeight());
                    var calculatedHeight;
                    //If maxHeight is already given which means not auto
                    if(parseInt($scope.maxHeight) > 0){
                      calculatedHeight = parseInt($scope.maxHeight);
                    }
                    //maxHeight should be auto
                    else{
                      //If actual data height is more than the occupiable height on the screen, then calculatedHeight should be the occupiable height
                      //or should be the data height
                      if(dataHeight > gridMaxHeight){
                        calculatedHeight = gridMaxHeight;
                      }
                      else {
                        calculatedHeight = dataHeight;
                      }
                    }
                    //Use the offset height
                    calculatedHeight = calculatedHeight - offset;
                    //console.log(calculatedHeight);
                    var el = $compile('<div class="grid" data-ui-grid="gridOptions" ui-grid-resize-columns data-ui-grid-auto-resize="" style="margin:0 auto; width:' + ($scope.gridWidth + 18 + ($scope.selectRow ? 35 : 0)) + ' px; max-height:'+calculatedHeight+'px !important;height:auto !important;max-width:100%;"></div>')($scope);
                    //el.clientHeight = maxHeight - offset;
                    angular.element(elm).append(el);
                }
                // TODO: Find the offset height from the top of the grid and the innerHeight of the document
                // padding
                var FindOffsetHeight = function () {
                    var elm = document.getElementById($scope.id);
                    var height = document.body.scrollHeight;
                    return height - elm.offsetTop;
                }
                /**
                // TODO: Find the height that could be occupied by the records while displaying
                @description Used to set the height to auto so that any number of records which would occupy more height that the maxHeight
                  there in the screen, it would set the height to the minimum of these
                */
                var FindDataHeight = function FindDataHeight(){
                  //console.log($scope.offsetRowHeight);
                  return $scope.data.length * $scope.rowHeight + $scope.offsetRowHeight;
                }
                /**
                @description Build the column definitions for the input data to display in the grid
                */
                var GetColumnDefs = function (data) {
                    var dataRow = data[0];
                    var columnDefs = [];
                    var columnOptions = BuildColumnOptions(data);
                    //console.log(columnOptions);
                    var headerOffset = $scope.headerOffset;
                    var totalWidth = 0;
                    var errorWidth = 0;
                    for (var i = 0; i < columnOptions.length; i++) {
                        var opt = columnOptions[i];
                        var cellTemp = '';
                        var footTemp = '';
                        var headTemp = '';
                        var showFoot = false;
                        if (opt.columnID == 'EDIT')
                            cellTemp = '<div class="hyperlink ui-grid-cell-contents" data-ng-click="grid.appScope.editRow({value:row.entity.Request})">Edit</div>';
                        if (opt.columnID == 'CHECK')
                            cellTemp = '<div class="ui-grid-cell-contents"><input type="checkbox" data-ng-click="row.entity.selectbit = !row.entity.selectbit" data-ng-model="row.entity.selectbit"/></div>';
                        if (opt.template) {
                            cellTemp = $scope.getTemplate({ value: opt.template });
                        }
                        if(opt.footTemplate){
                            footTemp = $scope.getTemplate({value: opt.footTemplate});
                            showFoot = true;
                        }
                        if(opt.headTemplate){
                            headTemp = $scope.getTemplate({value:opt.headTemplate});
                        }
                        var sort = {};
                        //Building the sort object
                        if(opt.defSort && opt.defSort != ''){
                          sort.direction = opt.defSort.toUpperCase() == 'ASC' ? uiGridConstants.ASC : opt.defSort.toUpperCase() == 'DESC' ? uiGridConstants.DESC : '';
                          sort.priority = opt.priority;
                        }
                        //auto calculate the column width from data value length
                        var dataLength = 0;
                        var width;
                        opt.columnName = opt.columnName ? opt.columnName : opt.columnID.toUpperCase();
                        //auto generate columnName if not there
                        var displayName = opt.columnName ? opt.columnName : opt.columnID.toString().toUpperCase().replace('_', ' ').replace('_', ' ').replace('_', ' ');
                        //auto calculate the header text length from columnNames
                        //if width is not set on the column in columnOptions
                        if (opt.visible !== undefined && opt.visible) {
                            if (opt.width && opt.width.toUpperCase() === 'AUTO') {
                                for (var j = 0; j < data.length; j++) {
                                    var d = data[j];
                                    if ((dataLength) < GetWidth(d[opt.columnID]))
                                        dataLength = GetWidth(d[opt.columnID]);
                                };
                                var gotWidth = GetWidth(displayName);
                                width = dataLength > gotWidth ? dataLength : gotWidth;
                            }
                            else if (opt.width && opt.width.toUpperCase() !== 'AUTO') {
                                width = parseInt(opt.width);
                            }
                            else {
                                width = 0;
                            }
                        }
                        if (width === undefined) {
                            width = 40;
                            errorWidth += width;
                        }
                        var o = {};
                        o.field = opt.columnID;
                        o.displayName = displayName;
                        o.width = width + headerOffset;
                        o.cellFilter = opt.filter ? opt.filter : '';
                        o.cellTemplate = cellTemp ? cellTemp : '';
                        o.enableHiding = false;
                        o.enableColumnMenu = false;
                        o.enableColumnResizing = true;
                        o.enableSorting = opt.enableSorting;
                        o.visible = (opt.visible === undefined ? true : opt.visible);
                        o.enableFiltering = opt.filterable;
                        o.cellClass = opt.class ? opt.class : '';
                        o.footerCellTemplate = footTemp ? footTemp : '';
                        o.headerCellTemplate = headTemp ? headTemp : '';
                        o.showColumnFooter = showFoot;
                        o.sort = sort;

                        o.type = opt.type ? opt.type : '';
                        if (o.type.length) {
                            if (o.type === 'floatnumber') {
                                o.sortingAlgorithm = function (a, b) {
                                    if (a === null && b !== null)
                                        return -1;
                                    else if (a !== null && b === null)
                                        return 1;
                                    else if (a === null && b === null)
                                        return 0;
                                    else if (parseFloat(a) > parseFloat(b))
                                        return 1;
                                    else if (parseFloat(a) < parseFloat(b))
                                        return -1;
                                    else if (parseFloat(a) === parseFloat(b))
                                        return 0;
                                    else return 0;
                                }
                            }
                        }
                        columnDefs.push(o);
                        if (opt.visible)
                            totalWidth += (width + headerOffset);
                    };
                    $scope.gridWidth = totalWidth + 30 + errorWidth;
                    //console.log(columnDefs);
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
                var BuildColumnOptions = function BuildColumnOptions(data) {
                    var columnOptions = [];
                    // TODO: Read the data first object in array, get the keys of the data,
                    //       for each key find if it's in options, if there get the options

                    // TODO: Add Edit Column Definition
                    if ($scope.showEdit) {
                        columnOptions.push({
                            columnID: 'EDIT',
                            columnName: '',
                            width: '1',
                            enableSorting: false,
                            filterable: false,
                            visible: true
                        })
                    }
                    // TODO: Add Check Column Definition
                    if ($scope.showCheck) {
                        columnOptions.push({
                            columnID: 'CHECK',
                            columnName: '',
                            width: '1',
                            enableSorting: false,
                            filterable: false,
                            visible: true
                        })
                    }
                    var keys;
                    if ($scope.autoGenerateColumns) {
                        //Read data for keys
                        keys = Object.keys(data[0]);
                        var changedKeys = [];
                        for (var i = 0; i < keys.length; i++) {
                            changedKeys.push({
                                columnID: keys[i]
                            })
                        }
                        LoadColumnOption(changedKeys, $scope.options, columnOptions);
                    } else {
                        //Read options for keys
                        keys = $scope.options;
                        LoadColumnOption(keys, $scope.options, columnOptions);
                    }
                    return columnOptions;
                }
                /**
                @description Default values for the paramters that need to be filled when no value is given in the options
                @function Default values
                  width : 'AUTO',
                  sortable : 'true',
                  filter : ''
                */
                var LoadColumnOption = function LoadColumnOption(keys, options, columnOptions) {
                    //check if there is a columnID given in the options.
                    //If there is, get the parameters from the options
                    for (var i = 0; i < keys.length; i++) {
                        //find if the key is in the options
                        var colOpts = {};
                        if (options.findAll(keys[i].columnID, 'columnID').length) {
                            colOpts = keys[i].columnName ? keys[i] : options.findAll(keys[i].columnID, 'columnID')[0];
                        }
                        //if there is get the properties from there
                        //else put the default values given for the properties
                        var key = keys[i];
                        var option = {};
                        option.columnID = key.columnID;
                        option.columnName = colOpts.columnName ? (colOpts.columnName.length ? colOpts.columnName : '') : (key.columnName ? key.columnName : key.columnID.toUpperCase());
                        option.width = colOpts.width ? colOpts.width : (key.width ? key.width : 'AUTO');
                        option.enableSorting = colOpts.sortable != undefined ? colOpts.sortable : true;
                        option.filter = colOpts.filter ? colOpts.filter : '';
                        option.visible = !colOpts.hide;
                        option.class = colOpts.class ? colOpts.class : '';
                        option.filterable = colOpts.filterable != undefined ? colOpts.filterable : false;
                        option.template = colOpts.template ? colOpts.template : '';
                        option.type = colOpts.type ? colOpts.type : '';
                        option.footTemplate = colOpts.footTemplate ? colOpts.footTemplate : '';
                        option.headTemplate = colOpts.headTemplate ? colOpts.headTemplate : '';
                        option.defSort = colOpts.defSort ? colOpts.defSort : '';
                        option.priority = colOpts.priority ? colOpts.priority : '';
                        columnOptions.push(option);
                    }
                    //console.log(columnOptions);
                    return columnOptions;
                }
                var GetWidth = function GetWidth(txt) {
                    var el = document.createElement('forWidth');
                    el.style.visibility = 'hidden';
                    el.innerHTML = txt;
                    document.body.appendChild(el);
                    var width = el.offsetWidth;
                    document.body.removeChild(el);
                    return width;
                }
                var ChangeWidth = function ChangeWidth(id, width) {
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
    .directive('cdkMultiSelect', function () {
        return {
            restrict: 'EA',
            scope: {
                // TODO: Write the options
            },
            link: function cdkMultiSelectLink(scope, el, attr) {
                // TODO: Link the default values to the options
            },
            controller: function cdkMultiSelectController($scope) {
                // TODO: Write the functionality for the multi select
                // TODO:
            }
        }
    })
})(angular);
