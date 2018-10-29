/**
 * Created by Deepak Podili Devendra
 */

(function(){
    'use strict';

    angular
    .module('inseego.home')
    .component('homeDashboard',{
        templateUrl: ':::PLUGIN_PATH:::/home.html',
        bindings: {
            section: '@',
            type: '@'
          },
        controller: Controller,
        controllerAs: 'vm',
    });

    
 /* @ngInject */
 function Controller(c8yTitle, homeConstants, $scope) {

   const vm = this;

   $scope.$on('deviceDataTableEvent', function(event, data){
    // do what you want with the data from the event
     $scope.$broadcast('mapEvent', {message: data.message});
})
   
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
           vm.defaultWidgets = homeConstants.DASHBOARD_WIDGETS;
           c8yTitle.changeTitle({
            title: 'Home'
          });
     }
 }
})();