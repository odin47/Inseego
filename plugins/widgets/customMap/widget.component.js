/**
 * Author Deepak Podili Devendra
 */

(function () {
  'use strict';

  angular
    .module('inseego.widgets')
    .component('inseegoCustomMap', {
      templateUrl: ':::PLUGIN_PATH:::/customMap/widget.html',
      controller: Controller,
      controllerAs: 'vm'
    });

  /* @ngInject */
  function Controller(
    $scope,
    $q,
    c8yInventory,
    c8yBinary
  ) {
    var vm = this;
    vm.markers = [];
    vm.filterTerm;
    vm.newMarker = [];
    vm.status = '';
    vm.tempMarkers = [];


    $scope.$on('mapEvent', function (event, data) {
      vm.markers = [];
      var query = {};

      var getDevicesAndBinariesWithStatus = {
        devices: getDevicesWithLocationAndStatus(),
        binaries: c8yBinary.list({})
      };
      $q.all(getDevicesAndBinariesWithStatus).then(placeTypes);

      function getDevicesWithLocationAndStatus() {
        if (data.message !== 'ALARMS') {
           query = {
            _filter: {
              'c8y_Availability.status': {
                __in: [data.message]
              },
              __has: 'c8y_Position'
            }
          };
        } else {
           query = {
            _filter: {
              __has: 'c8y_Position',
              __and: {__has: 'c8y_ActiveAlarmsStatus'}
              
            },

          };
        }

        var params = {
          customParam: true
        };
        var queryAll = false;
        return c8yInventory.listQuery(query, params, queryAll);

      }
    });



    var getDevicesAndBinaries = {
      devices: getDevicesWithLocation(),
      binaries: c8yBinary.list({})
    };
    $q.all(getDevicesAndBinaries).then(placeTypes);

    function getDevicesWithLocation() {
      var filters = { fragmentType: 'c8y_Position' };
      return c8yInventory.list(filters);
    }

    function placeTypes(devicesAndBinaries) {
      var devicesOfType = createTypeMap(devicesAndBinaries.devices);
      var iconOfType = createIconMap(devicesAndBinaries.binaries);
      angular.forEach(devicesOfType, _.curry(placeType)(iconOfType));

    }

    function placeType(iconOfType, devices, type) {
      var icon = iconOfType[type];
      if (icon) {
        var placeDevices = _.curry(place)(devices);
        c8yBinary.downloadAsDataUri(icon).then(placeDevices);
      } else {
        place(devices);
      }
    }

    function createTypeMap(devices) {
      var typeMap = {};
      angular.forEach(devices, _.curry(addDeviceToTypeMap)(typeMap));
      return typeMap;
    }

    function addDeviceToTypeMap(typeMap, device) {
      var hw = 'default';
      if (device.c8y_Hardware && device.c8y_Hardware.model) {
        hw = device.c8y_Hardware.model;
      }

      if (!typeMap[hw]) {
        typeMap[hw] = [];
      }

      typeMap[hw].push(device);
    }

    function createIconMap(binaries) {
      var iconMap = {};
      angular.forEach(binaries, _.curry(addIconToIconMap)(iconMap));
      return iconMap;
    }

    function addIconToIconMap(iconMap, icon) {
      if (c8yBinary.isImage(icon)) {
        var name = icon.name;
        name = name.substring(0, name.lastIndexOf('.'));
        iconMap[name] = icon;
      }
    }

    function place(devices, uri) {
      angular.forEach(devices, _.curry(placeDevice)(_, uri));
    }

    function placeDevice(device, uri) {
      if(device.c8y_Position) {
        var pos = device.c8y_Position;
        var marker = {
          lat: pos.lat,
          lng: pos.lng,
         // message: '<a href="#/device/' + device.id + '">' + device.name + '</a>',
         message:'<b>IMEI: </b>'+device.c8y_Hardware.imei+'</br><b>Longitude: </b>'+device.c8y_Position.lng+'</br><b>Latitude: </b>'+device.c8y_Position.lat+
         '</br><b>Last Transmission (Last GPS Update): </b>'+device.lastUpdated,
        };
  
        if (uri) {
          marker.icon = { iconUrl: uri };
        }
        vm.markers.push(marker);
      }
   
    }
  }
}());