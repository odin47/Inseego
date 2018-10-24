/**
 * Created by Deepak Podili Devendra
 */

(function() {
    'use strict';
  
    angular
      .module('inseego.home')
      .config(configure);
  
    configure.$inject = [
        'c8yNavigatorProvider',
        'c8yViewsProvider'
    ];
  
    function configure(
        c8yNavigatorProvider,
        c8yViewsProvider
    ) {
     
        c8yNavigatorProvider.addNavigation({
            name: 'Home', // ... the name *"hello"*
            icon: 'home', // ... the cube icon (icons are provided by the great Font Awesome library and you can use any of their [icon names](http://fontawesome.io/icons/) without the *fa-* prefix here
            priority: 100000, // ... a priority of 100000, which means that all menu items with a priority lower than 100000 appear before this menu item and all with a priority higher than 100000 appear after this menu item
            path: '' // ... */hello* as path
        });

        c8yViewsProvider.when('/', { // when the path "/hello" is accessed ...
        //templateUrl: ':::PLUGIN_PATH:::/main.html', //  ... display our html file "hello.html" inside the "views" folder of our plugin (the plugin's folder is represented using the magic string ```:::PLUGIN_PATH:::```, which is replaced by the actual path during the build process)
        template: '<home-dashboard section="home" type="master" />'
        });
    }
  }());