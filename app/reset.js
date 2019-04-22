document.addEventListener('DOMContentLoaded',function(){

  Vue.use(VueGun)

  new Vue({
    el:'main',
    data:{
      db:null,
      keys:null,
      userList:null
    },
    created:function(){
      var self = this
      this.db = moment().format('YMD')
      this.userList = this.$gun.get(this.db)

      this.userList.open(function(data){
        console.dir(data)
        self.keys = _.keys(data)
      })
  
      _.each(this.keys,function(v){
        self.userList.get(v).put(null)
      })



    }
  })


  })