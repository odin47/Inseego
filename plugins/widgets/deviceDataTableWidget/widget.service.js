/* Author - Deepak Podili Devendra*/

(function() {
    'use strict';

    angular
    .module('inseego.widgets')
    .factory('deviceDataService', deviceService);

    /* @ngInject */
    function deviceService(c8yInventory, c8yDeviceRegistration) {

        return {
             getDevicesData : function() {
                var filters = {fragmentType: 'c8y_IsDevice', withParents: true};
                return c8yInventory.list(filters);
                
            },
            
            getDeviceRegistration : function() {
                return c8yDeviceRegistration.list();
            }

        };

        
    }
})();