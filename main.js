'use strict'

window.addEventListener('load',function(){

  Vue.use(VueLoader)
  Vue.use(VueCookies)
  
  new Vue({
    el:'main',
    components:[
      'url:bootstrap/init.vue',
      'url:bootstrap/introduce.vue',
      'url:component/form/data-table.vue',
      'url:component/form/numeric-up-down.vue',
    ],
    data:{
      isReady:false
    },
    methods:{
      startup:function(fingerprint,json){
      },
      setup:function(name,data){
        this.isReady = true
      }
    },
    created:function(){
      this.parameter = new URLSearchParams(window.location.search)
    },
    mounted:function(){
      $('.menu .item').
        tab('change tab','task')
    }
  })

})