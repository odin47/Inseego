/**
 * Created by Deepak Podili Devendra
 */

(function(){
    'use strict';

    angular
    .module('inseego.groupdashboard')
    .component('groupDashboard',{
        templateUrl: ':::PLUGIN_PATH:::/groupDashboard.html',
        bindings: {
            section: '@',
            type: '@'
          },
        controller: Controller,
        controllerAs: 'vm',
    });

    
 /* @ngInject */
 function Controller(groupDashboardConstants) {

   const vm = this;
   
  vm.$onChanges = function(section, type) {
    if (section && vm.section) {
                onSectionOrTypeChange();
              }
    
              if (type && vm.type) {
                onSectionOrTypeChange();
              }
  }


     ////////////

     function onSectionOrTypeChange() {
           vm.defaultWidgets = groupDashboardConstants.DASHBOARD_WIDGETS;
     }
 }
})();