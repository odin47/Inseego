/**
 * Created by glenn on 05.03.17.
 */

(function () {
  'use strict';

  angular
    .module('inseego.widgets')
    .config(configure);

  /* @ngInject */
  function configure(
    c8yComponentsProvider,
    gettext
  ) {
    c8yComponentsProvider.add({
      name: 'greetings',
      nameDisplay: gettext('Greetings'),
      description: gettext('Greetings widget for Inseego'),
      templateUrl: ':::PLUGIN_PATH:::/greetings/main.html'
      //template: '<inseego-greetings-widget>'
    });
  }
}());
