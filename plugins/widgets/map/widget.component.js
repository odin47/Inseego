/**
 * Author Deepak Podili Devendra
 */

(function () {
    'use strict';
  
    angular
      .module('inseego.widgets')
      .component('inseegoMap', {
        templateUrl: ':::PLUGIN_PATH:::/map/widget.html',
        controller: Controller,
        controllerAs: 'vm'
      });
  
    /* @ngInject */
    function Controller(
      $http,
      c8yBase,
      c8yTitle,
      gettextCatalog
    ) {
      var vm = this;
      vm.device.id = 60234;
  
      vm.$onInit = onInit;
  
      ////////////
  
      function onInit() {
        setupTitle();
        setupMarkerTooltipTemplate();
      }
  
      function setupTitle() {
        c8yTitle.changeTitle({ title: gettextCatalog.getString('Vehicle location') });
      }
  
      function setupMarkerTooltipTemplate() {
        $http
          .get(':::PLUGIN_PATH:::/map/marker-tooltip.html')
          .then(c8yBase.getResData)
          .then(function (template) {
            vm.markerTooltipTemplate = template;
          });
      }
    }
  }());