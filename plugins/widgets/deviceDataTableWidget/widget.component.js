/* Authore - Deepak Podili Devendra */

(function() {
    'use strict';

    angular
    .module('inseego.widgets')
    .component('deviceDataTableWidget', {
        templateUrl: ':::PLUGIN_PATH:::/deviceDataTableWidget/widget.html',
        controller: Controller,
        controllerAs: 'vm'
      });

      /* @ngInject */
      function Controller(Excel, $timeout, $scope, deviceDataService, c8yTitle) {

        var vm = this;

        c8yTitle.changeTitle({
            title: 'Home'
          });

        vm.deviceCollectionUnavailable = [];
        vm.deviceCollectionAvailable = [];
        vm.deviceCollectionAlarms = [];
        vm.pendingCollection = [];

        vm.unAvailableCount = 0;
        vm.availableCount = 0;
        vm.alarmsCount = 0;
        vm.pendingCount = 0;

        getDeviceStatus();
        getDeviceRegistration();

        function getDeviceStatus() {
            deviceDataService.getDevicesData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    //console.log(data[i]);
                    if (data[i].c8y_Hardware) {
                         console.log(data[i]);
                        if (data[i].c8y_Availability.status === 'UNAVAILABLE') {
                            
                            if(data[i].c8y_Hardware.imei && data[i].c8y_Hardware.ptn && data[i].name) {
                                vm.unAvailableCount++;
                                vm.deviceCollectionUnavailable.push({
                                    imei: data[i].c8y_Hardware.imei,
                                    sim_id: data[i].c8y_Hardware.simid,
                                    name: data[i].name,
                                    ptn: data[i].c8y_Hardware.ptn,
                                    ipv4: data[i].c8y_Mobile.ipaddress4,
                                    ipv6: data[i].c8y_Mobile.ipaddress6
                                });
                                console.log(data[i].c8y_Mobile.imei);
                              
                            }
                          
                           
                        } if(data[i].c8y_Availability.status === 'AVAILABLE') {
                            
                            if(data[i].c8y_Hardware.imei && data[i].c8y_Hardware.ptn && data[i].name) {
                                vm.availableCount++;
                                vm.deviceCollectionAvailable.push({
                                    imei: data[i].c8y_Hardware.imei,
                                    sim_id: data[i].c8y_Hardware.simid,
                                    name: data[i].name,
                                    ptn: data[i].c8y_Hardware.ptn,
                                    ipv4: data[i].c8y_Mobile.ipaddress4,
                                    ipv6: data[i].c8y_Mobile.ipaddress6
                                });
                         }
                        
                    }  if(data[i].c8y_ActiveAlarmsStatus && (data[i].c8y_Availability.status === 'AVAILABLE' || data[i].c8y_Availability.status === 'UNAVAILABLE')) {
                        
                        if(data[i].c8y_Hardware.imei && data[i].c8y_Hardware.ptn && data[i].name) {
                            vm.alarmsCount++;
                            vm.deviceCollectionAlarms.push({
                                imei: data[i].c8y_Hardware.imei,
                                sim_id: data[i].c8y_Hardware.simid,
                                name: data[i].name,
                                ptn: data[i].c8y_Hardware.ptn,
                                ipv4: data[i].c8y_Mobile.ipaddress4,
                                ipv6: data[i].c8y_Mobile.ipaddress6
                            });
                     }
                    }


                }
                }
            });
        }

        function getDeviceRegistration() {
            deviceDataService.getDeviceRegistration().then(function(data) {
                for(var i = 0; i < data.length; i++) {
                    vm.pendingCount++;
                    vm.pendingCollection.push({
                        id: data[i].id,
                        owner: data[i].owner
                    });
                }
                console.log('Registered DEVICES' + data);
            });
        }

        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
            $timeout(function () { location.href = exportHref; }, 100); // trigger download

        }        
      }
})();