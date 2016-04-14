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
/**
 *
 * @param vl
 * @param c
 * @returns {*}
 */
Array.prototype.findOne = function (vl, c) {
    var v = [];
    for (var i = 0; i < this.length; i++) {
        //get the array item
        if (this[i][c] == vl)
            return this[i];
    }
    return v;
};
Array.prototype.findMatch = function (prop, str, all) {
    if (this) {
        var arr = [];
        angular.forEach(this, function (v) {
            if (v[prop].toString() == str.toString())
                arr.push(v);
        });
        return arr;
    }
    return all;
}
var weekNames = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
};
String.prototype.name = function () {
    return weekNames[this];
};
var timeConst = 60000 * 24 * 60;
var NVL = function NVL(val, replc) {
    if (val === null || val === undefined || val === '')
        return replc != undefined ? replc : '';
    else
        return val;
};
(function () {
    angular.module('cdk-utilities', ['ui.grid', 'ui.grid.autoResize', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.autoResize', 'ui.grid.pinning'])
        .service('progress', function () {
            var progressObj = {count: 0};
            this.GetProgressObj = function () {
                return progressObj;
            };
            this.incCnt = function () {
                progressObj.count++;
            };
            this.decCnt = function () {
                progressObj.count--;
            };
            this.reset = function () {
                progressObj.count = 0;
            };
        })
        .filter('formatDate', function ($filter) {
            return function (val) {
                var aDate = val;
                if (aDate && aDate != 'Invalid Date') {
                    var dt = $filter('date')(aDate, 'MM/dd/yyyy');
                    //console.log(aDate, dt);
                    var month = dt.substring(0, dt.indexOf('/'));
                    var day = dt.substring(dt.indexOf('/') + 1, dt.lastIndexOf('/'));
                    var year = dt.substring(dt.lastIndexOf('/') + 1, dt.length);
                    return (month.length < 2 ? '0' + month : month) + '/' + (day.length < 2 ? '0' + day : day) + '/' + year;
                } else {
                    return aDate;
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
        .filter('unsafe', ['$sce', function ($sce) {
            return function (val) {
                return $sce.trustAsHtml(val);
            };
        }])
        .filter('searchFilter', function () {
            return function (value, searchStr, prop, text, role, reverse) {
                var result = [];
                if (reverse)
                    prop = text;
                if (value) {
                    for (var i = 0; i < value.length; i++) {
                        var val = value[i];
                        if (val.selected == undefined)
                            val.selected = false;
                        if (val.shown == undefined || role == 'reset')
                            val.shown = true;
                        if (searchStr == '') {
                            val.shown = true;
                            result.push(val);
                        } else {
                            if (val[prop] && val[prop].toString().toUpperCase().toString().indexOf(searchStr.toString().toUpperCase()) > -1) {
                                val.shown = true;
                                result.push(val);
                            }
                            else {
                                val.shown = false;
                                result.push(val);
                            }
                        }
                    }

                }
                return result;
            }
        })
        .service('storage', function () {
            this.write = function (key, value) {
                localStorage.setItem(key, value);
            };
            this.read = function (key) {
                return localStorage.getItem(key);
            };
        })
        .directive('progressBar', ['progress', function (progress) {
            return {
                restrict: 'E',
                //template: '<div class="progress2-wrap"><div class="progress2"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div></div>',
                template: '<div class="progress-wrapper">' +
                '<div class="progress">Loading<span class="dots">...</span></div></div>',
                controller: function ($scope, progress) {
                    $scope.progressObj = progress.GetProgressObj();
                }
            };
        }])
        .directive('cdkTable', function () {
            return {
                restrict: 'EA',
                scope: {
                    id: '@', /*id of the grid*/
                    data: '=model', /*data as an input*/
                    options: '=', /*column options which consists the configuration for each column*/
                    enableFiltering: '=?', /*should the filtering panel be shown*/
                    saveFilters: '=?', /*should the filters be saved to database*/
                    maxWidth: '@', /*width of the grid to which it should expand*/
                    maxHeight: '@', /*height of the grid to which it can expand*/
                    autoGenerateColumns: '=?', /*Should the columns be auto generated from the input model*/
                    export: '=?', /*display the export to excel icon*/
                    noRecordsMessage: '=?', /*what message to display when there are no records*/
                    showEdit: '=?', /*show edit column at the start so that it can selected*/
                    filterable: '=?', /*to be able to filter on the column*/
                    //showCheck: '=?',/*show check column at the start so that it can be selected*/
                    editRow: '&', /*handler for editing the row*/
                    headerOffset: '=?', /*header offset value*/
                    autoHeightOffset: '=?', /*auto height offset calculation*/
                    getTemplate: '&', /*for getting the templates*/
                    storageKeyPrefix: '=?', /*For localstorage, to save the column definitions*/
                    fullRowSelec: '=?', /*to enable full row selection by clicking anywhere on the row*/
                    showColMenu: '=?', /*to show or hide the column menus*/
                    class: '=?', /*add the cell class*/
                    methods: '=?', /*map external methods*/
                    selectRow: '=?', /*select the rows on which you want to do some kind of processing*/
                    values: '=?', /*pass on values from external scope to the appscope*/
                    showFoots: '=?', /*show footers for the columns,*/
                    horScroll: '=?', /*to show or hide horizontal scrollbar */
                    defSort: '=?', /*to sort the grid by this column as soon as the grid loads*/
                    priority: '@', /*sort on the column according to this priority*/
                    offsetRowHeight: '@', /*used to calculate the extra height needed for the grid while using rowHeight for calculating dataHeight through rows*/
                    rowHeight: '@', /*to give height to the row*/
                    selected: '=?', /*Exposes the selected items*/
                    menuOptions: '=?', /*Add custom menu options and methods*/
                },
                link: function cdkTableLink(scope) {
                    // description: Set defaults to the attributes
                    scope.options = scope.options == undefined ? [] : scope.options;
                    scope.enableFiltering = scope.enableFiltering == undefined ? false : scope.enableFiltering;
                    scope.saveFilters = scope.saveFilters == undefined ? false : scope.saveFilters;
                    scope.autoGenerateColumns = scope.autoGenerateColumns == undefined ? false : scope.autoGenerateColumns;
                    scope.export = scope.export == undefined ? false : scope.export;
                    scope.maxWidth = scope.maxWidth == undefined ? 'AUTO' : scope.maxWidth;
                    scope.maxHeight = scope.maxHeight == undefined ? 'AUTO' : scope.maxHeight;
                    scope.showEdit = scope.showEdit == undefined ? false : scope.showEdit;
                    //scope.storageKeyPrefix = scope.storageKeyPrefix == undefined ? '' : scope.storageKeyPrefix;
                    //scope.showCheck = scope.showCheck == undefined ? false : scope.showCheck;
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
                    scope.rowHeight = scope.rowHeight === undefined ? 21 : scope.rowHeight;
                    scope.selected = scope.selected === undefined ? '' : scope.selected;
                    scope.fullRowSelec = scope.fullRowSelec === undefined ? true : scope.fullRowSelec;
                    scope.showColMenu = scope.showColMenu === undefined ? true : scope.showColMenu;
                    scope.menuOptions = scope.menuOptions === undefined ? [] : scope.menuOptions;
                },
                controller: function cdkTableController($scope, $compile, $window, $attrs, $log, $filter, uiGridConstants, storage) {
                    $scope.$watch('storageKeyPrefix', function () {
                        if ($scope.storageKeyPrefix) {
                            $scope.storageKey = $scope.storageKeyPrefix + $scope.id;
                        }
                        //if (!storedValues) {
                        //    storedValues = { filters: {}, sorts: {} };
                        //}
                        //try {
                        //    storedValues = JSON.parse(storedValues);
                        //} catch (e) {
                        //    storedValues = { filters: {}, sorts: {} };
                        //}
                    });
                    $scope.GetStoredValue = function () {
                        if ($scope.storageKeyPrefix) {
                            return JSON.parse(storage.read($scope.storageKey));
                        }
                        else {
                            return undefined;
                        }
                    };
                    $scope.ExportToExcel = function (ev) {
                        console.log(ev);
                    }
                    $scope.Store = function Store(scope) {
                        //console.log($scope.gridApi.grid.columns);
                        //if (type === 'filters') {
                        //    //storedValues[type] ? storedValues[type] : {};
                        //    angular.forEach($scope.gridApi.grid.columns, function (col) {
                        //        if (col.field != "selectionRowHeaderCol")
                        //            storedValues[type][col.field] = col.filter.term;
                        //    })
                        //} else if (type === 'sorts') {
                        //    //storedValues[type] ? storedValues[type] : {};
                        //    angular.forEach($scope.gridApi.grid.columns, function (col) {
                        //        if (col.field != "selectionRowHeaderCol")
                        //            storedValues[type][col.field] = {
                        //                direction: col.sort.direction,
                        //                priority: col.sort.priority
                        //            };
                        //    })
                        //}
                        if (!scope) {
                            scope = $scope;
                        }
                        var columnDefs = [];
                        //cellClass, cellFilter, cellTemplate, colDef, displayName, drawnWidth, enableFiltering, enableSorting, field, filter, filterCellFiltered, filterHeadTemplate,
                        //headerCellClass, headerCellFilter, headerCellTemplate, headerClass, name, sort, sortCellFiltered, suppressRemoveSort, visible, width
                        //console.log($scope.gridApi.grid.columns);
                        for (var i = 0; i < scope.gridApi.grid.columns.length; i++) {
                            var col = scope.gridApi.grid.columns[i];
                            if (col.field != "selectionRowHeaderCol") {
                                var json = {};
                                json.cellClass = col.cellClass;
                                json.cellFilter = col.cellFilter;
                                json.cellTemplate = col.cellTemplate;
                                json.displayName = col.displayName;
                                //json.colDef = col.colDef;
                                json.drawnWidth = col.drawnWidth;
                                json.enableFiltering = col.enableFiltering;
                                json.enableSorting = col.enableSorting;
                                json.field = col.field;
                                json.filter = col.filter;
                                json.filterCellFiltered = col.filterCellFiltered;
                                json.filterHeadTemplate = col.filterHeadTemplate;
                                json.headerCellClass = col.headerCellClass;
                                json.headerCellFilter = col.headerCellFilter;
                                json.headerCellTemplate = col.headerCellTemplate;
                                json.headerClass = col.headerClass;
                                json.sort = col.sort;
                                json.enablePinning = col.enablePinning;
                                json.pinnedLeft = col.pinnedLeft;
                                json.pinnedRight = col.pinnedRight;
                                json.sortCellFiltered = col.sortCellFiltered;
                                json.suppressRemoveSort = col.suppressRemoveSort;
                                json.visible = col.visible;
                                json.width = col.width;
                                columnDefs.push(json);
                            }
                        }
                        if ($scope.storageKeyPrefix) {
                            storage.write($scope.storageKey, JSON.stringify(columnDefs));
                        }
                        //storage.write(storageKey, JSON.stringify(storedValues));
                    };
                    // NOTE: Defaults for the gridOptions
                    // $scope.rowHeight = 21;
                    // TODO: get the grid api and check for the handle window resize functionality
                    // TODO: watch data to see if data changes and then if it is valid, render the grid
                    $scope.$watch('data', function () {
                        if ($scope.data) {
                            if ($scope.data.length) {
                                //$scope.storedValues = $scope.GetStoredValue();
                                var data = $scope.data;
                                data = ProcessDataForCorrectDates(data);
                                $scope.gridOptions = {
                                    data: $scope.data,
                                    columnDefs: GetColumnDefs($scope.data),
                                    gridMenuCustomItems: $scope.menuOptions,
                                    minRowsToShow: (data.length < 35 ? data.length : 35),
                                    rowHeight: parseInt($scope.rowHeight),
                                    minWidth: $scope.minWidth,
                                    enableFiltering: true,
                                    showGridFooter: true,
                                    showColumnFooter: $scope.showColumnFooter,
                                    columnFooterHeight: 20,
                                    exporterMenuPdf: false,
                                    exporterMenuCsv: false,
                                    enableColumnMenu: $scope.showColMenu,
                                    enableFullRowSelection: $scope.fullRowSelec,
                                    enableHorizontalScrollbar: $scope.horScroll ? uiGridConstants.scrollbars.ALWAYS : uiGridConstants.scrollbars.NEVER,
                                    rowTemplate: '<div data-ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>',
                                    onRegisterApi: function (gridApi) {
                                        $scope.gridApi = gridApi;
                                        if (gridApi.colResizable) {
                                            gridApi.colResizable.on.columnSizeChanged($scope, function () {
                                                $scope.Store();
                                            });
                                        }
                                        if (gridApi.core) {
                                            gridApi.core.on.columnVisibilityChanged($scope, function () {
                                                $scope.Store();
                                            });
                                        }
                                        if (gridApi.selection) {
                                            gridApi.selection.on.rowSelectionChanged($scope, function () {
                                                $scope.selected = gridApi.selection.getSelectedRows();
                                            });
                                            gridApi.selection.on.rowSelectionChangedBatch($scope, function () {
                                                $scope.selected = gridApi.selection.getSelectedRows();
                                            });
                                        }
                                        gridApi.core.on.filterChanged($scope, function () {
                                            $scope.Store($scope);
                                        });
                                        gridApi.core.on.sortChanged($scope, function () {
                                            $scope.Store();
                                        });
                                    }
                                };
                                $scope.gridOptions.enableGridMenu = true;
                                if ($scope.export) {
                                    $scope.gridOptions.exporterMenuCsv = true;
                                }
                                $scope.gridOptions.exporterCsvFilename = "exported.csv";
                                $scope.gridOptions.exporterCsvLinkElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                                $scope.exporterFieldCallback = function exporterFieldCallback(grid, row, col, value) {
                                    var field = col.field;
                                    var option = $scope.options.findOne(field, 'columnID');
                                    value = option.filter ? $filter(option.filter)(value) : value;
                                    return value;
                                };
                                $scope.gridOptions.exporterFieldCallback = $scope.methods.exporterFieldCallback ? $scope.methods.exporterFieldCallback : $scope.exporterFieldCallback;
                                $scope.gridOptions.exporterHeaderFilter = $scope.methods.exporterHeaderFilter ? $scope.methods.exporterHeaderFilter : exporterHeaderFilter;
                                var exporterHeaderFilter = function exporterHeaderFilter(displayName) {
                                    return displayName;
                                }
                            }
                            else {
                                $scope.NoRecords();
                            }
                        }
                    });
                    var ProcessDataForCorrectDates = function ProcessDataForCorrectDates(data) {
                        //console.log(data);
                        var options = $scope.options;
                        for (var i = 0; i < options.length; i++) {
                            //For each type of date, loop through data and convert value to date
                            if (options[i].type && options[i].type.toUpperCase() === 'DATE') {
                                for (var j = 0; j < data.length; j++) {
                                    if (data[j][options[i].columnID])
                                        data[j][options[i].columnID] = new Date(data[j][options[i].columnID]);
                                }
                            }
                        }
                        return data;
                    };
                    // TODO: implement a function to show no records message
                    $scope.NoRecords = function NoRecords() {
                        // TODO: show 'No records message'
                    };
                    // TODO: Show default grid
                    $scope.ShowDefaultGrid = function ShowDefaultGrid() {
                        // TODO: replace
                        var elm = document.getElementById($scope.id);

                        try {
                            elm.removeChild(elm.children[0]);
                        } catch (e) {
                        }
                        //console.log($scope.maxHeight, $scope.autoHeightOffset, FindDataHeight(), FindOffsetHeight());
                        var offset = $scope.autoHeightOffset ? $scope.autoHeightOffset : 0;
                        var dataHeight = FindDataHeight() + 80 + (parseInt($scope.offsetRowHeight) ? parseInt($scope.offsetRowHeight) : 0);
                        var gridMaxHeight = FindOffsetHeight() - offset;
                        //var maxHeight = 0;
                        //maxHeight = $scope.maxHeight != 'AUTO' ? $scope.maxHeight : (maxHeight < FindDataHeight() ? maxHeight : FindDataHeight());
                        var calculatedHeight;
                        //If maxHeight is already given which means not auto
                        if ($scope.maxHeight && parseInt($scope.maxHeight) > 0) {
                            calculatedHeight = parseInt($scope.maxHeight);
                        }
                        //maxHeight should be auto
                        else {
                            //If actual data height is more than the occupiable height on the screen, then calculatedHeight should be the occupiable height
                            //or should be the data height
                            if (dataHeight > gridMaxHeight) {
                                calculatedHeight = gridMaxHeight;
                            }
                            else {
                                calculatedHeight = dataHeight;
                            }
                        }
                        //Use the offset height
                        //calculatedHeight = calculatedHeight - offset;
                        //console.log(calculatedHeight);
                        if ($scope.data && $scope.data.length) {
                            var el = $compile('<div class="grid-wrapper"><div data-ng-show="data && data.length" class="grid" data-ui-grid="gridOptions" ' +
                                'ui-grid-auto-resize="" ui-grid-pinning="" ' + ($scope.selectRow || $scope.export ? 'ui-grid-selection="" ' : '') + 'ui-grid-exporter="" ui-grid-resize-columns data-ui-grid-auto-resize="" ' +
                                'style="margin:0 auto; width:' + ($scope.gridWidth + 50) + 'px !important; max-height:' + calculatedHeight + 'px !important;max-width:100%;"></div></div>')($scope);
                            //el.clientHeight = maxHeight - offset;
                            angular.element(elm).append(el);
                        }
                    };
                    /*Function to clear all the filters on the columns*/
                    //$scope.ClearAllFilters = function ClearAllFilters() {
                    //    angular.forEach($scope.gridApi.grid.columns, function (col) {
                    //        col.filter.term = '';
                    //    });
                    //    angular.forEach($scope.gridApi.grid.columns, function (col) {
                    //        //$log.log(col);
                    //        storedValues.filters[col.field] = col.filter.term;
                    //    })
                    //    storage.write(storageKey, JSON.stringify(storedValues));
                    //}
                    // TODO: Find the offset height from the top of the grid and the innerHeight of the document
                    // padding
                    var FindOffsetHeight = function () {
                        var elm = document.getElementById($scope.id);
                        var height = document.body.scrollHeight;
                        return height - elm.offsetTop;
                    };
                    /**
                     // TODO: Find the height that could be occupied by the records while displaying
                     @description Used to set the height to auto so that any number of records which would occupy more height that the maxHeight
                     there in the screen, it would set the height to the minimum of these
                     */
                    var FindDataHeight = function FindDataHeight() {
                        return $scope.data.length * $scope.rowHeight;
                    };
                    /**
                     @description Build the column definitions for the input data to display in the grid
                     */
                    var GetColumnDefs = function (data) {
                        var columnDefs = [];
                        var storedValues = $scope.GetStoredValue();
                        if (storedValues) {
                            columnDefs = storedValues;
                        } else {
                            //var dataRow = data[0];
                            var columnOptions = BuildColumnOptions(data);
                            //console.log(columnOptions);
                            var headerOffset = $scope.headerOffset;
                            var totalWidth = 0;
                            var errorWidth = 0;
                            $scope.gridWidth = 0;
                            for (var i = 0; i < columnOptions.length; i++) {
                                var opt = columnOptions[i];
                                var cellTemp = '';
                                var footTemp = '';
                                var headTemp = '';
                                var showFoot = false;
                                if (opt.columnID == 'EDIT')
                                    cellTemp = '<div class="hyperlink ui-grid-cell-contents" data-ng-click="grid.appScope.editRow({value:row.entity.Request})">Edit</div>';
                                if (opt.template) {
                                    cellTemp = $scope.getTemplate({value: opt.template});
                                }
                                if (opt.footTemplate) {
                                    footTemp = $scope.getTemplate({value: opt.footTemplate});
                                    showFoot = true;
                                }
                                if (opt.headTemplate) {
                                    headTemp = $scope.getTemplate({value: opt.headTemplate});
                                }
                                var sort = {};
                                //Building the sort object
                                if (opt.defSort && opt.defSort != '') {
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
                                        }
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
                                o.filter = {};
                                o.filter.term = '';
                                o.displayName = displayName;
                                o.width = width + headerOffset;
                                $scope.gridWidth += o.width;
                                o.cellFilter = opt.filter ? opt.filter : '';
                                o.cellTemplate = cellTemp ? cellTemp : '';
                                o.enableColumnMenu = $scope.showColMenu;
                                o.enableColumnResizing = true;
                                o.enableSorting = opt.enableSorting;
                                o.visible = (opt.visible === undefined ? true : opt.visible);
                                o.enableFiltering = opt.filterable;
                                o.cellClass = opt.class ? opt.class : '';
                                o.footerCellTemplate = footTemp ? footTemp : '';
                                o.headerCellTemplate = headTemp ? headTemp : '';
                                o.enablePinning = opt.enablePinning;
                                o.pinnedLeft = opt.pinnedLeft;
                                o.pinnedRight = opt.pinnedRight;
                                o.showColumnFooter = showFoot;
                                o.cellTooltip = opt.cellTooltip;
                                //o.filter = { term: $scope.GetStoredValue(o.field, 'filters') };
                                o.filterHeaderTemplate = '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters" ng-class="{\'ui-grid-filter-cancel-button-hidden\' : ' +
                                    'colFilter.disableCancelFilterButton === true}"><input type="text" class="ui-grid-filter-input" ' +
                                    'ng-model="colFilter.term" ng-model-options="{debounce:50}" aria-label="Filter for column" placeholder=""><div role="button" class="ui-grid-filter-button ng-scope"' +
                                    'ng-click="removeFilter(colFilter, $index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || ' +
                                    'colFilter.term === \'\'" ng-show="colFilter.term !== undefined &amp;&amp; colFilter.term !== null &amp;&amp; colFilter.term !== \'\'"><div>' +
                                    '<i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter" aria-label="Remove Filter">&nbsp;</i></div></div></div>';
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
                                    else if (o.type === 'date') {
                                        o.sortingAlgorithm = function (a, b) {
                                            //if (a === null && b !== null)
                                            //    return -1;
                                            //else if (a != null && b === null)
                                            //    return 1;
                                            a = new Date(a);
                                            b = new Date(b);
                                            if (a === null && b === null)
                                                return 0;
                                            else if (a > b)
                                                return 1;
                                            else if (a < b)
                                                return -1;
                                            else if (a === b)
                                                return 0;
                                            else return 0;
                                        }
                                    }
                                }
                                columnDefs.push(o);
                                if (opt.visible)
                                    totalWidth += (width + headerOffset);
                            }
                            !$scope.selectRow ? $scope.gridWidth = $scope.gridWidth - 32 : null;
                            $scope.ShowDefaultGrid();
                            return columnDefs;
                        }
                        $scope.ShowDefaultGrid();
                        return columnDefs;
                    };
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
                        //// TODO: Add Check Column Definition
                        //if ($scope.showCheck) {
                        //    columnOptions.push({
                        //        columnID: 'CHECK',
                        //        columnName: '',
                        //        width: '1',
                        //        enableSorting: false,
                        //        filterable: false,
                        //        visible: true
                        //    })
                        //}
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
                    };
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
                            option.filterCellFiltered = true;
                            option.visible = !colOpts.hide;
                            option.class = colOpts.class ? colOpts.class : '';
                            option.filterable = colOpts.filterable != undefined ? colOpts.filterable : false;
                            option.template = colOpts.template ? colOpts.template : '';
                            option.type = colOpts.type ? colOpts.type : '';
                            option.footTemplate = colOpts.footTemplate ? colOpts.footTemplate : '';
                            option.headTemplate = colOpts.headTemplate ? colOpts.headTemplate : '';
                            option.defSort = colOpts.defSort ? colOpts.defSort : '';
                            option.priority = colOpts.priority ? colOpts.priority : '';
                            option.enablePinning = colOpts.enablePinning ? colOpts.enablePinning : false;
                            option.pinnedLeft = colOpts.pinnedLeft ? colOpts.pinnedLeft : false;
                            option.pinnedRight = colOpts.pinnedRight ? colOpts.pinnedRight : false;
                            option.cellTooltip = colOpts.cellTooltip ? colOpts.cellTooltip : false;
                            columnOptions.push(option);
                        }
                        //console.log(columnOptions);
                        return columnOptions;
                    };
                    var GetWidth = function GetWidth(txt) {
                        var el = document.createElement('forWidth');
                        el.style.visibility = 'hidden';
                        el.innerHTML = txt;
                        document.body.appendChild(el);
                        var width = el.offsetWidth;
                        document.body.removeChild(el);
                        return width;
                    };
                    //var ChangeWidth = function ChangeWidth(id, width) {
                    //    angular.element(document.getElementById(id)).css('width', width + 'px');
                    //}
                }
            }
        })
        /**
         @module cdk-utilities
         @method cdkMultiSelect directive
         @description to be able to select multiple options from the dropdowns
         */
        .directive('cdkMultiSelect', function ($templateCache) {
            return {
                restrict: 'EA',
                template: $templateCache.get('cdkmultiselect.html'),
                scope: {
                    // TODO: Write the options
                    data: '=in',
                    prop: '@value',
                    text: '@text',
                    defaultText: '@deftext',
                    json: '=json',
                    tip: '@tooltipColumn',
                    outvalues: '=out',
                    selected: '=?filtered',
                    reverseprop: '=?reverse',
                    ind: '@index'
                },
                link: function cdkMultiSelectLink(scope, el, attrs) {
                    // TODO: Link the default values to the options
                    //Default Values if attributes are not given
                    if (!attrs.deftext)
                        attrs.deftext = 'Select';
                    if (!attrs.searchable)
                        scope.search = true;
                    else
                        scope.search = false;
                    if (attrs.json)
                        scope.dojson = true;
                    else
                        scope.dojson = false;
                    if (!attrs.filtered)
                        scope.selected = [];
                    if (!attrs.reverse)
                        scope.reverse = true;
                    else
                        scope.reverse = false;
                    scope.ind = scope.ind ? scope.ind : '';
                },
                controller: function cdkMultiSelectController($scope, $filter) {
                    // TODO: Write the functionality for the multi select
                    $scope.searchString = '';
                    $scope.all = true;
                    $scope.uncheckAll = false;
                    $scope.checkAll = true;
                    ///Executed when any element in the list is clicked on
                    ///toggles the selected property on the item
                    $scope.CheckIt = function (ind) {
                        $scope.data[ind].selected = !$scope.data[ind].selected;
                        SetFlags()
                    };
                    ///Use the searchFilter(custom filter) to filter the data for the string entered
                    ///This is where additional properties are pushed to each object in the array
                    ///selected & shown
                    $scope.filterData = function (role) {
                        $scope.data = $filter('searchFilter')($scope.data, $scope.searchString, $scope.prop, $scope.text, role, $scope.reverseprop);
                        //if ($scope.data.findMatch('selected', true).length)
                        //    ToggleAllData(false);
                        //else
                        //    ToggleAllData(true);
                    };
                    //Build JSON
                    $scope.BuildJSON = function () {
                        var jsonV = [];
                        var selectedValues = [];
                        $scope.outvalues = [];
                        if (!$scope.json) $scope.json = [];
                        if ($scope.json) {
                            angular.forEach($scope.data.findMatch('selected', true), function (d) {
                                jsonV.push("'" + ($scope.reverseprop ? d[$scope.text].toString().trim().replace('&', "chr(38)") : d[$scope.prop].toString().trim().replace('&', "chr(38)")) + "'");
                                selectedValues.push(d[$scope.prop].toString().trim());
                            });
                            $scope.json = jsonV;
                            $scope.outvalues = selectedValues;
                        }
                    };
                    ///Reset all the variables
                    $scope.Reset = function () {
                        $scope.searchString = '';
                        $scope.filterData('reset');
                        ToggleAllData(false);
                    };
                    ///Used to toggle the all variable - all item in list
                    $scope.ToggleAll = function (flag) {
                        //if (!$scope.all)
                        if (flag == 'checkall') {
                            $scope.uncheckAll = false;
                            $scope.checkAll = true;
                            ToggleAllData(true);

                        }
                        else if (flag == 'uncheckall') {
                            $scope.uncheckAll = true;
                            $scope.checkAll = false;
                            ToggleAllData(false);
                        }

                    };
                    ///Form filter text
                    $scope.BuildLabelText = function () {
                        var str = '';
                        var len = $scope.data.findMatch('selected', true).length;
                        str = len ? '(Total : ' + len + ')' : '';
                        return str;
                    };
                    ///ToggleDropDown
                    $scope.showDrop = false;
                    $scope.ToggleDropdown = function () {
                        $scope.showDrop = !$scope.showDrop;
                    };
                    ///Watchers on
                    /// Data - Filter the data when data is refreshed
                    /// SearchString - Filter data when searchString is changed / entered
                    /// all - when all is selected, every other item should be unselected
                    $scope.$watch('data', function () {
                        if ($scope.data) {
                            if ($scope.data.length) {
                                if ($scope.data[0].selected == undefined)
                                    $scope.filterData('');
                            }
                        }
                        var t = $scope.BuildLabelText();
                        $scope.displayText = (t == '' ? $scope.defaultText : t);
                    });
                    $scope.$watch('searchString', function () {
                        $scope.filterData('');
                    });
                    //$scope.$watch('selected', function () { if (!$scope.selected) $scope.selected = []; else { $scope.filterData(''); } })
                    $scope.$watch('data', function () {
                        if ($scope.data.length) {
                            var t = $scope.BuildLabelText();
                            $scope.displayText = (t == '' ? $scope.defaultText : t);
                            if ($scope.dojson)
                                $scope.BuildJSON();
                            SetFlags()
                        }
                    }, true);
                    var SetFlags = function SetFlags() {
                        if ($scope.data.findAll(true, 'selected').length == $scope.data.length) {
                            $scope.uncheckAll = false;
                            $scope.checkAll = true;
                        }
                        else if ($scope.data.findAll(true, 'selected').length == 0) {
                            $scope.uncheckAll = true;
                            $scope.checkAll = false;
                        }
                        else {
                            $scope.checkAll = false;
                            $scope.uncheckAll = false;
                        }
                    };

                    var ToggleAllData = function ToggleAll(bool) {
                        angular.forEach($scope.data, function (d) {
                            if (d.shown) {
                                d.selected = bool;
                            }
                        });
                    }
                }
            }
        })
        .directive('cdkCheck', function () {
            return {
                // $parsers/$formatters live on the
                // ngModel controller, so we need this!
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel) {
                    //ngModel.$parsers.push(function toModel(input) {
                    //    // do something to format user input
                    //    // to be more "computer-friendly"
                    //    return modifiedInput;
                    //});

                    ngModel.$formatters.push(function toView(input) {
                        // do something to format user input
                        // to be more "human-friendly"
                        var modifiedInput;
                        if (input.toString().toUpperCase() === 'YES')
                            modifiedInput = true;
                        else if (input.toString().toUpperCase() === 'NO')
                            modifiedInput = false;
                        else modifiedInput = input;
                        return modifiedInput;
                    });
                }
            };
        })
        .directive('cdkWeekPicker', function () {
            return {
                restrict: 'E',
                scope: {
                    currentWeek: "=?"
                },
                link: function (scope) {
                    scope.openPicker = scope.open;
                },
                controller: function ($scope, $filter) {
                    $scope.year = new Date().getFullYear();
                    $scope.show = false;
                    /**
                     * @description Start from date 1 of january, scan through the dates
                     * */
                    $scope.FormWeeksCollectionInYear = function FormWeeksCollectionInYear(year) {
                        var d = new Date('1/1/' + year);
                        var newYear = year;
                        var obj = [];
                        var days = [];
                        var newMonth = 0;
                        var month = 0;
                        while (newYear == year) {
                            newYear = parseInt(d.getFullYear());
                            var day = d.getDay();
                            newMonth = d.getMonth();
                            if (newMonth == month) {
                                if (day === 6) {
                                    days.push(d.getDate());
                                }
                            }
                            else {
                                obj.push({
                                    month: $filter('date')(new Date(d.getTime() - timeConst), 'MMM'),
                                    days: days
                                });
                                days = [];
                                month = newMonth;
                            }
                            d = new Date(d.setDate(d.getDate() + 1));
                        }
                        return obj;
                    };
                    $scope.months = $scope.FormWeeksCollectionInYear($scope.year);
                    $scope.previousYear = function () {
                        $scope.year = $scope.year - 1;
                        $scope.months = $scope.FormWeeksCollectionInYear($scope.year);
                    };
                    $scope.nextYear = function () {
                        $scope.year = $scope.year + 1;
                        $scope.months = $scope.FormWeeksCollectionInYear($scope.year);
                    };
                    $scope.SelectWeek = function (day, month, year) {
                        $scope.currentWeek = new Date(day + '-' + month + '-' + year);
                        $scope.show = false;
                    };
                },
                template: '<div class="week-picker-wrap"><div class="btn btn-default" data-ng-click="show = !show">Pick Week</div><div data-ng-show="show" class="week-picker">' +
                '<div class="row">' +
                '<span class="btn btn-default col-sm-2" data-ng-click="previousYear()"><</span>' +
                '<span class="btn btn-default col-sm-6">{{year}}</span>' +
                '<span data-ng-click="nextYear()" class="btn btn-default col-sm-2">></span>' +
                '<span class="btn btn-danger col-sm-2" data-ng-click="show = false">X</span>' +
                '</div>' +
                '<div class="row week" data-ng-repeat="month in months">' +
                '<span class="col-sm-2 btn btn-default">{{month.month}}</span>' +
                '<span class="col-sm-2 btn btn-default" data-ng-repeat="day in month.days" data-ng-click="SelectWeek(day, month.month, year)">{{day}}</span>' +
                '</div>' +
                '</div></div>'
            }
        })
        .directive('cdkHeader', function ($templateCache) {
            return {
                restrict: 'EA',
                scope: {
                    userName: '@',
                    userRole: '@',
                    appTitle: '@',
                    pageTitle: '@',
                    hostName: '@',
                    logoUrl: '@'
                },
                template: $templateCache.get('cdkheader.html')
            }
        })
        .run(function ($templateCache) {
            $templateCache.put('cdkmultiselect.html', '<div class="cdk-multi-wrap" ng-mouseleave="showDrop=false">        <input type="text" readonly="readonly" data-ng-click="ToggleDropdown()" value="{{displayText}}"/>        <span class="select-icon" data-ng-click="ToggleDropdown()">▼</span>    <div class="select-count">{{all ? data.length : data.findMatch(\'selected\',true).length}}</div>    <div class="cdk-multi-drop" ng-class="showDrop?\'expand\':\'collapse\'">        <input ng-show="search" class="search-input" ng-model="searchString" type="text" placeholder="Search">        <input type="button" class="select-btn cdk-btn-icon cdk-btn" ng-click="ToggleAll(\'checkall\')"    ng-disabled="checkAll"    value="✔" title="Check All"/>        <input type="button" class="unselect-btn cdk-btn-icon cdk-btn" ng-click="ToggleAll(\'uncheckall\')"    ng-disabled="uncheckAll"    value="X" title="Uncheck All"/>        <div class="values">        <ul>        <li title="{{val[tip]}}" ng-class="val.selected?\'check\':\'uncheck\'" ng-show="val.shown"    ng-repeat="val in data track by $index" value="val[prop]"    ng-click="CheckIt($index)">        {{val[text]}}    </li>    </ul>    </div>    </div>    </div>    ')
            $templateCache.put('cdkheader.html', '<div class="cdk-header-wrap"><img id="Image1" data-ng-src="{{logoUrl}}" class="header-logo" /><span class="app-title">{{appTitle}}</span><div class="header-user-wrap"><span class="header-user-name">{{userName}}</span><span class="header-user-role">{{userRole}}</span><span class="header-server-name">{{hostName}}</span></div><div><div class="page-title">{{pageTitle}}</div></div></div>');
        });
})(angular);