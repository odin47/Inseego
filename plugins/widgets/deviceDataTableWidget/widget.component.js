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
      function Controller(Excel, $timeout, $scope, deviceDataService) {

        var vm = this;

        vm.deviceCollectionUnavailable = [];
        vm.deviceCollectionAvailable = [];
        vm.deviceCollectionAlarms = [];
        vm.pendingCollection = [];
        vm.deviceCollectionAll = [];

        vm.unAvailableCount = 0;
        vm.availableCount = 0;
        vm.alarmsCount = 0;
        vm.pendingCount = 0;

        getDeviceStatus();
        getDeviceRegistration();

        $scope.sendEvent = function(status) {
            $scope.$emit('deviceDataTableEvent', {message: status});
        }

        function getDeviceStatus() {
                 deviceDataService.getDevicesData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].c8y_Hardware) {

                        if(data[i].c8y_Hardware.imei && data[i].c8y_Hardware.ptn && data[i].name) {
                            vm.deviceCollectionAll.push({
                                status: data[i].c8y_Connection.status,
                                last_message: data[i].c8y_Availability.lastMessage,
                                imei: data[i].c8y_Hardware.imei,
                                device_type: data[i].type,
                                device_name: data[i].name,
                                carrier: data[i].c8y_Mobile.currentOperator,
                                sim_no: data[i].c8y_Hardware.simid,
                                ptn: data[i].c8y_Hardware.ptn,
                                ipv4_address: data[i].c8y_Mobile.ipaddress4,
                                ipv6_address: data[i].c8y_Mobile.ipaddress6,
                                model: data[i].c8y_Hardware.model,
                                ethernet_1_clients: 'NA',
                                linux_version: data[i].c8y_Hardware.linuxversion,
                                modem_firmware_version: data[i].c8y_Hardware.modemversion,
                                radio_access_technology: data[i].c8y_Mobile.rat,
                                rsrp: data[i].c8y_Mobile.rsrp,
                                rsrq: data[i].c8y_Mobile.rsrq,
                                rssi: data[i].c8y_Mobile.rssi,
                                sinr: data[i].c8y_Mobile.sinr,
                                wifi_1_clients: 'NA',
                                pri_version: data[i].c8y_Hardware.priversion,
                                apn: 'NA',
                                battery_per: 'NA',
                                data_used: 'NA',
                                active_input: 'NA',
                                ec_io: 'NA',
                                usb_input: 'NA',
                                application_version: 'NA',
                                modem_temprature: 'NA'
                            });
                          
                        }
                        if (data[i].c8y_Availability.status === 'UNAVAILABLE') {
                            
                            if(data[i].c8y_Hardware.imei && data[i].c8y_Hardware.ptn && data[i].name) {
                                vm.unAvailableCount++;
                                // vm.deviceCollectionUnavailable.push({
                                //     imei: data[i].c8y_Hardware.imei,
                                //     sim_id: data[i].c8y_Hardware.simid,
                                //     name: data[i].name,
                                //     ptn: data[i].c8y_Hardware.ptn,
                                //     ipv4: data[i].c8y_Mobile.ipaddress4,
                                //     ipv6: data[i].c8y_Mobile.ipaddress6
                                // });
                                vm.deviceCollectionUnavailable.push({
                                    status: data[i].c8y_Connection.status,
                                    last_message: data[i].c8y_Availability.lastMessage,
                                    imei: data[i].c8y_Hardware.imei,
                                    device_type: data[i].type,
                                    device_name: data[i].name,
                                    carrier: data[i].c8y_Mobile.currentOperator,
                                    sim_no: data[i].c8y_Hardware.simid,
                                    ptn: data[i].c8y_Hardware.ptn,
                                    ipv4_address: data[i].c8y_Mobile.ipaddress4,
                                    ipv6_address: data[i].c8y_Mobile.ipaddress6,
                                    model: data[i].c8y_Hardware.model,
                                    ethernet_1_clients: 'NA',
                                    linux_version: data[i].c8y_Hardware.linuxversion,
                                    modem_firmware_version: data[i].c8y_Hardware.modemversion,
                                    radio_access_technology: data[i].c8y_Mobile.rat,
                                    rsrp: data[i].c8y_Mobile.rsrp,
                                    rsrq: data[i].c8y_Mobile.rsrq,
                                    rssi: data[i].c8y_Mobile.rssi,
                                    sinr: data[i].c8y_Mobile.sinr,
                                    wifi_1_clients: 'NA',
                                    pri_version: data[i].c8y_Hardware.priversion,
                                    apn: 'NA',
                                    battery_per: 'NA',
                                    data_used: 'NA',
                                    active_input: 'NA',
                                    ec_io: 'NA',
                                    usb_input: 'NA',
                                    application_version: 'NA',
                                    modem_temprature: 'NA'
                                });
                              
                            }
                          
                           
                        } if(data[i].c8y_Availability.status === 'AVAILABLE') {
                            
                            if(data[i].c8y_Hardware.imei && data[i].c8y_Hardware.ptn && data[i].name) {
                                vm.availableCount++;
                                // vm.deviceCollectionAvailable.push({
                                //     imei: data[i].c8y_Hardware.imei,
                                //     sim_id: data[i].c8y_Hardware.simid,
                                //     name: data[i].name,
                                //     ptn: data[i].c8y_Hardware.ptn,
                                //     ipv4: data[i].c8y_Mobile.ipaddress4,
                                //     ipv6: data[i].c8y_Mobile.ipaddress6
                                // });
                                vm.deviceCollectionAvailable.push({
                                    status: data[i].c8y_Connection.status,
                                    last_message: data[i].c8y_Availability.lastMessage,
                                    imei: data[i].c8y_Hardware.imei,
                                    device_type: data[i].type,
                                    device_name: data[i].name,
                                    carrier: data[i].c8y_Mobile.currentOperator,
                                    sim_no: data[i].c8y_Hardware.simid,
                                    ptn: data[i].c8y_Hardware.ptn,
                                    ipv4_address: data[i].c8y_Mobile.ipaddress4,
                                    ipv6_address: data[i].c8y_Mobile.ipaddress6,
                                    model: data[i].c8y_Hardware.model,
                                    ethernet_1_clients: 'NA',
                                    linux_version: data[i].c8y_Hardware.linuxversion,
                                    modem_firmware_version: data[i].c8y_Hardware.modemversion,
                                    radio_access_technology: data[i].c8y_Mobile.rat,
                                    rsrp: data[i].c8y_Mobile.rsrp,
                                    rsrq: data[i].c8y_Mobile.rsrq,
                                    rssi: data[i].c8y_Mobile.rssi,
                                    sinr: data[i].c8y_Mobile.sinr,
                                    wifi_1_clients: 'NA',
                                    pri_version: data[i].c8y_Hardware.priversion,
                                    apn: 'NA',
                                    battery_per: 'NA',
                                    data_used: 'NA',
                                    active_input: 'NA',
                                    ec_io: 'NA',
                                    usb_input: 'NA',
                                    application_version: 'NA',
                                    modem_temprature: 'NA'
                                });
                         }
                        
                    }  if(data[i].c8y_ActiveAlarmsStatus && (data[i].c8y_Availability.status === 'AVAILABLE' || data[i].c8y_Availability.status === 'UNAVAILABLE')) {
                        
                        if(data[i].c8y_Hardware.imei && data[i].c8y_Hardware.ptn && data[i].name) {
                            vm.alarmsCount++;
                            // vm.deviceCollectionAlarms.push({
                            //     imei: data[i].c8y_Hardware.imei,
                            //     sim_id: data[i].c8y_Hardware.simid,
                            //     name: data[i].name,
                            //     ptn: data[i].c8y_Hardware.ptn,
                            //     ipv4: data[i].c8y_Mobile.ipaddress4,
                            //     ipv6: data[i].c8y_Mobile.ipaddress6
                            // });
                            vm.deviceCollectionAlarms.push({
                                status: data[i].c8y_Connection.status,
                                last_message: data[i].c8y_Availability.lastMessage,
                                imei: data[i].c8y_Hardware.imei,
                                device_type: data[i].type,
                                device_name: data[i].name,
                                carrier: data[i].c8y_Mobile.currentOperator,
                                sim_no: data[i].c8y_Hardware.simid,
                                ptn: data[i].c8y_Hardware.ptn,
                                ipv4_address: data[i].c8y_Mobile.ipaddress4,
                                ipv6_address: data[i].c8y_Mobile.ipaddress6,
                                model: data[i].c8y_Hardware.model,
                                ethernet_1_clients: 'NA',
                                linux_version: data[i].c8y_Hardware.linuxversion,
                                modem_firmware_version: data[i].c8y_Hardware.modemversion,
                                radio_access_technology: data[i].c8y_Mobile.rat,
                                rsrp: data[i].c8y_Mobile.rsrp,
                                rsrq: data[i].c8y_Mobile.rsrq,
                                rssi: data[i].c8y_Mobile.rssi,
                                sinr: data[i].c8y_Mobile.sinr,
                                wifi_1_clients: 'NA',
                                pri_version: data[i].c8y_Hardware.priversion,
                                apn: 'NA',
                                battery_per: 'NA',
                                data_used: 'NA',
                                active_input: 'NA',
                                ec_io: 'NA',
                                usb_input: 'NA',
                                application_version: 'NA',
                                modem_temprature: 'NA'
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
            });
        }

        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            var exportHref = Excel.tableToExcel(tableId, 'Inseego Data Export');
            $timeout(function () { location.href = exportHref; }, 100); // trigger download

        }   

        $scope.selectedRowCallback = function(rows){
            console.log('Rows..........'+JSON.stringify(rows));
        };
      
      }
     

})();