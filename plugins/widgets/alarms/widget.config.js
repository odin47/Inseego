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
        name: 'Alarms', 
        nameDisplay: gettext('Device Alarms'),
        description: gettext('Displays alarms of all the devices'),
        templateUrl: ':::PLUGIN_PATH:::/alarms/main.html',
        options: { noDeviceTarget: true }
      });
    }
  }());