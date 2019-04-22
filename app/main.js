'use strict';

document.ui =
{
  el:'#view',
  controller:{
    animate:function(el){
      $(el).addClass('animated zoomIn fast')
    },
  },
  ready:function(){
    this.controller.animate(this.el)
  }
}

document.addEventListener('DOMContentLoaded',function(){

  Vue.use(VueGun)
  Vue.use(VueLoader)
  Vue.use(VueCookies)

  new Vue({
    el:'main',
    components:[
      'url:component/form/data-table.vue',
      'url:component/form/numeric-up-down.vue'
    ],
    data:{
      src:[],
      srcFilters:['name','floor','bed','bath','check'],
      db:null,
      user:null,
      userList:null,
      userData:{
        id:null,
        name:'・ω・',
        floor:0,
        bed:null,
        bath:null,
        check:null
      },
    },
    methods:{
      row:function(userData){
        return {
          me:userData.id == this.uid
        }
      },
      cell:function(key,userDataValue){
        return {
          zero:userDataValue == 0
        }
      },
      init:function(){
        this.db = moment().format('YMD')
        this.uid = this.$cookies.get('_ga')
        this.user = this.$gun.get(this.uid)
        this.userList = this.$gun.get(this.db)
      },
      setup:function(){
        var self = this

        this.userData.id = this.uid

        this.userList.open(function(data){
          self.src = _.filter(data)
        })
  
        this.userList.set(this.user)
        this.userList.get(this.uid).bye().put(null)
      },
      synchronize:function(){
        this.user.put(this.userData)
        this.userList.set(this.user)

        localStorage.setItem('userData',JSON.stringify(this.userData))
      }
    },
    created:function(){

      if ('userData' in localStorage) {
        this.userData = JSON.parse(localStorage.getItem('userData'))
      }

      this.init()
      this.setup()

    },
    mounted:function(){

      document.ui.ready()

      FastClick.attach(this.$el)

      var userController = new dat.GUI({autoPlace:false})

      var self = this
      userController.add(this.userData,'name').name('名前は？').onChange(function(value){
        self.synchronize()
      })
      // ホテルが何階から何階まであって１フロアずつ増減・自分がどのフロアにいるってこと
      userController.add(this.userData,'floor').min(0).max(13).step(1).name('今何階？').onChange(function(value){
        value = parseInt(value)
        self.synchronize()
      })

      $('#user-controller').append(userController.domElement)

      $('.menu .browse')
        .popup({
          inline     : false,
          hoverable  : false,
          position   : 'top center',
          delay: {
            show: 300,
            hide: 800
          },
            on: 'click'
        })
      ;

    }
  })

})