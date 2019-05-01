'use strict'

window.addEventListener('load',function(){

  Vue.use(VueLoader)
  Vue.use(VueCookies)
  
  new Vue({
    el:'main',
    components:[
      'url:bootstrap/init.vue',
      'url:bootstrap/introduce.vue',
    ],
    methods:{
      startup:function(fingerprint,json){
        console.log(fingerprint,json)
      },
      setup:function(name,data){
        console.log(name,data)
      }
    },
    created:function(){
      this.parameter = new URLSearchParams(window.location.search)
    },
    mounted:function(){
    }
  })

})