document.alias={
  'grid':{
    inserted:function(el){
      el.classList.add('ui','grid','padded')
    }
  },
  'divide':{
    inserted:function(el){
      el.classList.add('ui','divider','horizontal')
    }
  },
  'sign':{
    inserted:function(el){
      el.classList.add('ui','label','compact')
    }
  },
  'ui-header':{
    inserted:function(el){
      el.classList.add('ui','icon','fluid')
      el.classList.add('header','center','aligned')
      el.classList.add('pointing','below','label','teal')
    }
  },
  'control':{
    inserted:function(el){
      el.classList.add('ui','card')
    }
  },
  'header':{
    inserted:function(el){
      el.classList.add('ui','icon','fluid')
      el.classList.add('header','center','aligned')
      el.classList.add('pointing','below','label','teal')
    }
  },
  'controls':{
    inserted:function(el){
      el.classList.add('ui','stackable','cards')
    }
  }
}

document.controls=[
  'url:control/boot/ua.vue',
  'url:control/boot/init.vue',
  'url:control/boot/detect.vue',
  'url:control/boot/lookup.vue',
  'url:control/face.vue',
  'url:control/about.vue',
  'url:control/thanks_to.vue',
  'url:control/introduce.vue',
  'url:control/settings.vue',
  'url:control/team.vue',
  'url:control/plan.vue',
  'url:control/task.vue',
  'url:control/pile.vue',
  'url:control/log.vue',
]
document.components=[
  'url:module/core/architecture/vue/component/chart/ridge-line.vue',
  'url:module/core/architecture/vue/component/chart/stacked-bar.vue',
  'url:module/core/architecture/vue/component/form/data-table.vue',
  'url:module/core/architecture/vue/component/form/numeric-up-down.vue'
]


document.addEventListener('DOMContentLoaded',function(){

  Vue.use(VueLoader)

  new Vue({
    el:'main',
    components:_.union(
      this.controls,
      this.components
    ),

    data:{
      isShow:false,
      isLoading:true,
      db:{
        team:{
        },
        plan:{
          img:{
            blob:null
          },
          table:{
            総括:{
              名前:null,
              連絡:null
            },
            担当:{
              上司:null,
              階数:9,
              自分:null,
              時短:null,
            },
            就業:{
              日付:null,
              開始:null,
              終了:null,
              休憩:null,
            }
          }
        },
        task:{
          list:{
            回収:0,
            寝室:0,
            浴室:0,
            仕上:0,
            台車:0,
          }
        },
        pile:{
          arr:[],
          chart:{
            keys:['回収','寝室','浴室','仕上','台車']
          },
          table:{
            head:{},
            keys:['就業.日付','担当.階数','回収','寝室','浴室','仕上','台車']
          },
        }
      }
    },
    watch:{
      'db.plan':{
        handler:function(val,oldVal){

        },
        deep:true
      },
      'db.task':{
        handler:function(val,oldVal){

        },
        deep:true
      },
      allData:{
        handler:function(val,oldVal){
          this.update()
        },
        deep:true
      }
    },
    components:_.union(
      this.controls,
      this.components
    ),
    methods:{
      saveTask:function(){
      },
      update:function(){
        this.db.pile.table.head = flat.flatten(_.assign({},this.db.plan.table,this.db.task.list))
        console.dir(this.db.pile.table.head)
        var record = {
          '20190921':this.db.pile.table.head,
          '20190922':{
            日付:'05/22',
            回収:12,
            寝室:25,
            浴室:14,
            仕上:14,
            台車:50
          },
          '20190923':{
            日付:'05/23',
            回収:12,
            寝室:25,
            浴室:14,
            仕上:14,
            台車:50
          }
        }

        this.db.pile.arr = _.values(record)
      },
      init:function(){

      }
    },
    computed:{
      allData:function(){
        return [this.db.plan,this.db.task]
      }
    },
    created:function(){
      this.init()
      this.update()

      var self = this
      window.addEventListener('load',function(){
        self.isLoading = false
        /* このタイミングですべてのタブを閉じる */
      })

      _.each(document.alias,function(obj,directive){
        Vue.directive(directive,obj)
      })
    }
  })

})