(function () {
    'use strict';
  
    angular
      .module('inseego.widgets')
      .config(configure);
  
    configure.$inject = [
      'c8yComponentsProvider',
      'gettext'
    ];
  
    function configure(
      c8yComponentsProvider,
    gettext
    ) {
      c8yComponentsProvider.add({ 
        name: 'Map', 
        nameDisplay: gettext('Device Map'),
        description: gettext('Displays position of the devices on the map'),
        templateUrl: ':::PLUGIN_PATH:::/map/main.html',
        options: { noDeviceTarget: true }
      });
    }
  }());