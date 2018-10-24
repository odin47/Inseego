(function() {
    'use strict';

    var gettext = _.identity;

    angular
    .module('inseego.home')
    .constant('homeConstants', {

        DASHBOARD_WIDGETS: [
            {
                name: 'deviceDataTable',
                _x: 0, _y: 0, _width: 4, _height: 2,
                classes: { 'panel-title-hidden': true }
              },
              {
                name: 'Map',
                title: gettext('Location for All Devices'),
                translateTitle: true,
                _x: 4, _y: 9, _width: 8, _height: 3,
                config: { markerTemplate: ':::PLUGIN_PATH:::/map/marker-popup.html' }
              },
              {
                name: 'Alarms',
                title: gettext('Recent Alarms of all the devices'),
                translateTitle: true,
                _x: 0, _y: 2, _width: 4, _height: 5,
              }   
          ]
    })
})();