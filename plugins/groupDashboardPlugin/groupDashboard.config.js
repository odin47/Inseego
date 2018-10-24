(function() {
    'use strict';
  
    angular
      .module('inseego.groupdashboard')
      .config(configure);
  
    configure.$inject = [
      'c8yViewsProvider'
    ];
  
    function configure(
          c8yViewsProvider          
      ) {
      c8yViewsProvider.when('/group/:groupId', { // when the path "/group/:groupId" is accessed ...
        name: 'Group Details', // ... show a tab with the name *"Group Details"*
        icon: 'home', // ... use the envelope-o icon (icons are provided by the great Font Awesome library and you can use any of their [icon names](http://fontawesome.io/icons/) without the *fa-* prefix here
        priority: 1000, // ... set the priority to 1000, which means that all tabs with a priority lower than 1000 appear before this tab and all with a priority higher than 1000 appear after this tab
        template: '<group-dashboard section="group" type="master" />', //  ... display our html file "groupDashboard.html" inside the "views" folder of our plugin (the plugin's folder is represented using the magic string ```:::PLUGIN_PATH:::```, which is replaced by the actual path during the build process)
      });
    }
  
  }());