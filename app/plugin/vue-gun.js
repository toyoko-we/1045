'use strict';

(function(root){
  
   var plugin = 
   {
     install:function(Vue,options){
       
       if (typeof window !== 'undefined' && window.Gun)
         Vue.prototype.$gun = new Gun('http://toyoko.us-3.evennode.com' + '/gun')
       else
         throw 'Gun Not Found'
         

      console.dir(Vue.prototype.$gun)

     }
   }

  plugin.version = '0.0.1'

  if (typeof module === 'object' && module.exports == 'object') {
    module.exports = plugin
  } else if (typeof define === 'function' && define.amd) {
    define('VueGun', plugin);
  } else {
    root.VueGun = plugin
  }

}(this));