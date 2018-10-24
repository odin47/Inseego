/* core_alarms 9.12.5 2018-08-27T16:53:22+00:00 b689bea882f7+ (release/9.12.0) tip */
!function(){"use strict";angular.module("c8y.alarms",[])}(),function(){"use strict";function t(t,e){t.add({name:"Alarm list",nameDisplay:e("Alarm list"),description:e("Displays a list of alarms filtered by object, severity and status"),templateUrl:"core_alarms/widget.html",configTemplateUrl:"core_alarms/widget-config.html",options:{groupsSelectable:!0}})}t.$inject=["c8yComponentsProvider","gettext"],angular.module("c8y.alarms").config(t)}(),function(){"use strict";function t(t){function e(t){t&&n(t)}function n(e){var n=t.child.config.device;i.options=_.cloneDeep(e),i.options.source=n&&n.id;var s=_.filter(i.options.status).length,l=_.get(i.options.status,"CLEARED"),o=s&&(1===s&&l||!l);o&&(i.options.resolved=l),_.unset(i,"options.device"),a()}function a(){i.activeSeverities=_.pickBy(i.options.severity,_.curry(_.isEqual)(!0)),_.unset(i,"options.severity")}var i=this;t.$watch("child.config.options",e)}t.$inject=["$scope"],angular.module("c8y.alarms").controller("AlarmsController",t)}(),function(){"use strict";function t(t,e){function n(){var e=t.config.options;e?_.assign(v.options,e):(a(),i()),l()}function a(){s("status")}function i(){s("severity")}function s(t){v.options[t]=_(v[t]).invert().mapValues(_.stubTrue).value()}function l(){var e=t.config.options,n=e?e.types:[];_.isEmpty(n)?m():_.forEach(n,m)}function o(t){t&&(v.options.device=t.id,p())}function r(e){var n=_.filter(e).length>0,a=t.forms;v.severityValid=n,a&&a.componentForm.$setValidity("severity",n)}function c(){v.options.types=_(v.alarmTypes).map("name").compact().uniq().value(),p()}function p(){t.config.options=v.options}function m(t){v.alarmTypes.push({name:t||""})}function u(t){_.pullAt(v.alarmTypes,t)}var v=this;_.assign(v,{status:e.status,severity:e.severity,icon:e.icon,options:{orderMode:"ACTIVE_FIRST"},alarmTypes:[],updateOptions:p,addAlarmType:m,removeAlarmType:u}),n(),t.$watch("config.device",o),t.$watch("vm.options.severity",r,!0),t.$watch("vm.alarmTypes",c,!0)}t.$inject=["$scope","c8yAlarms"],angular.module("c8y.alarms").controller("AlarmsConfigController",t)}(),function(){"use strict";function t(){var t={restrict:"E",templateUrl:"core_alarms/severity.html",scope:{options:"=",severity:"="},controller:e,controllerAs:"vm",bindToController:!0};return t}function e(t){var e=this;e.icon=t.icon}e.$inject=["c8yAlarms"],angular.module("c8y.alarms").directive("c8yAlarmsSeverity",t)}(),function(){"use strict";function t(t){var e;e='<div class="btn-group" style="margin-bottom:20px" ng-repeat="(key, value) in vm.options.severity">\n  <button type="button" class="btn btn-default" ng-if="value" ng-model="vm.severity[key]" uib-btn-checkbox>\n    <i c8y-icon="{{vm.icon(key)}}" class="status" ng-class="key | lowercase"></i>\n    {{key | capitalizeString}}\n  </button>\n</div>\n',t.put("alarms/severity.html",e),t.put("core_alarms/severity.html",e),t.put("/apps/core/alarms/severity.html",e),e='<div class="alarms-widget-config" ng-controller="AlarmsConfigController as vm">\n  <label translate>Status</label>\n  <div class="form-group">\n    <div ng-repeat="(key, value) in vm.status">\n      <label class="checkbox-inline">\n        <input type="checkbox" ng-model="vm.options.status[value]" ng-change="vm.updateOptions()">\n        {{value | translate}}\n      </label>\n    </div>\n  </div>\n\n  <label translate>Types</label>\n  <div class="form-group">\n    <ul class="list-unstyled">\n      <li class="input-group alarm-type" ng-repeat="alarmType in vm.alarmTypes track by $index">\n        <input class="form-control" placeholder="{{\'Alarm type\' | translate}}" ng-model="alarmType.name">\n        <span class="input-group-btn">\n        <button class="btn btn-link" type="button" ng-disabled="vm.alarmTypes.length <= 1" ng-click="vm.removeAlarmType($index)">\n          <i class="text-danger" c8y-icon="close"></i>\n        </button>\n      </span>\n      </li>\n    </ul>\n    <button class="btn btn-link" ng-click="vm.addAlarmType()">\n      <i c8y-icon="plus"></i> <span translate>Add alarm type</span>\n    </button>\n  </div>\n\n  <label translate>Severities</label>\n  <div class="form-group">\n    <div ng-repeat="(key, value) in vm.severity">\n      <label class="checkbox-inline">\n        <input type="checkbox" ng-model="vm.options.severity[value]" ng-change="vm.updateOptions()">\n        <i c8y-icon="{{vm.icon(value)}}" class="status fa-lg" ng-class="value | lowercase"></i>\n        {{value | translate}}\n      </label>\n    </div>\n  </div>\n\n  <label translate>Order</label>\n  <div class="form-group">\n    <div class="radio">\n      <label>\n        <input type="radio" value="ACTIVE_FIRST" ng-model="vm.options.orderMode" ng-change="vm.updateOptions()">\n        <span translate>By active status</span>\n      </label>\n      <i class="text-info" c8y-icon="info-circle" uib-tooltip="{{\'Order alarms by active status, severity, and time\' | translate}}" tooltip-placement="top-left">\n      </i>\n    </div>\n    <div class="radio">\n      <label>\n        <input type="radio" value="SEVERITY_FIRST" ng-model="vm.options.orderMode" ng-change="vm.updateOptions()">\n        <span translate>By severity</span>\n      </label>\n      <i class="text-info" c8y-icon="info-circle" uib-tooltip="{{\'Order alarms by severity and time\' | translate}}" tooltip-placement="top-left">\n      </i>\n    </div>\n  </div>\n\n  <div class="alert-warning" ng-show="!vm.severityValid" translate>\n    Please select at least one severity.\n  </div>\n</div>\n',t.put("alarms/widget-config.html",e),t.put("core_alarms/widget-config.html",e),t.put("/apps/core/alarms/widget-config.html",e),e='<div ng-controller="AlarmsController as vm">\n  <c8y-alarms-severity severity="vm.activeSeverities" options="vm.options">\n  </c8y-alarms-severity>\n  <c8y-alarm-list class="alarm-list" active-severities="vm.activeSeverities" filter="vm.options" realtime="true" hide-header-actions="true">\n  </c8y-alarm-list>\n</div>\n',t.put("alarms/widget.html",e),t.put("core_alarms/widget.html",e),t.put("/apps/core/alarms/widget.html",e)}angular.module("c8y.alarms").run(["$templateCache",t])}();