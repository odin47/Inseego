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
        name: 'deviceDataTable', 
        nameDisplay: gettext('Device Data Table'),
        description: gettext('Displays information about the devices'),
        templateUrl: ':::PLUGIN_PATH:::/deviceDataTableWidget/main.html',
        options: { noDeviceTarget: true }
      });
    }
  }());