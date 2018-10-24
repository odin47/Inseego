(function() {
    'use strict';

    var gettext = _.identity;

    angular
    .module('inseego.groupdashboard')
    .constant('groupDashboardConstants', {

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
              }
             
          ]
    })
})();