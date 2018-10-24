/**
 * Created by glenn on 03.03.17.
 */

(function () {
    'use strict';
  
    angular
      .module('inseego.widgets')
      .component('inseegoAlarms', {
        templateUrl: ':::PLUGIN_PATH:::/alarms/widget.html',
        controller: Controller,
        controllerAs: 'vm'
      });
  
    /* @ngInject */
    function Controller(
      c8yTitle,
      gettextCatalog
    ) {
      var vm = this;
  
      vm.$onInit = onInit;
  
      ////////////
  
      function onInit() {
        // setupTitle();
      }
  
    //   function setupTitle() {
    //     c8yTitle.changeTitle({ title: gettextCatalog.getString('Alarm list') });
    //   }
    }
  }());