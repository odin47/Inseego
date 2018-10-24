//Author - Deepak Podili Devendra

(function () {
  'use strict';

  angular
    .module('inseego.widgets')
    .component('inseegoGreetingsWidget', {
      templateUrl: ':::PLUGIN_PATH:::/greetings/widget.html',
      controller: Controller,
      controllerAs: 'vm'
    });

  /* @ngInject */
  function Controller(
    c8yUser
  ) {
    var vm = this;

    vm.$onInit = onInit;

    ////////////

    function onInit() {
      c8yUser
        .current()
        .then(function (currentUser) {
          vm.currentUser = 'Deepak';
        });
    }
  }
}());
