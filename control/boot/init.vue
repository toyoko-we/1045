 <template>

   <div class='init ui'>

     <div v-ui>
       <section v-ui-card>
         <div v-ui-divider>loading modules</div>
         <table v-ui-table>
           <tbody v-for='(depends,name,no) in view'>
             <tr>
               <td class='center aligned'>
                 <i :class="['icon', isAllTrue(depends.lib,'result')]"></i>
              </td>
               <td colspan='3' class='title' v-text='name'>
              </td>
            </tr>
             <tr v-for='(script,key,i) in depends.lib' :class="[isTrue(script.result)]">
               <td class='center aligned'>{{1+no}}.{{1+i}}</td>
               <td><a v-text='key' :href='script.link'></a></td>
               <td v-text='script.license'></td>
               <td>{{script.main | version}}</td>
            </tr>
          </tbody>
        </table>
      </section>

    </div>

  </div>

</template>
 <script>
  module.exports = {
    props:{
      debug:{
        default:false,
        type:Object
      }
    },
    data:function(){
      return {
        view:{
          ui:{
            lib:{
              'ui:fast-click':       {main:'1.0.6',license:'MIT',link:'https://github.com/ftlabs/fastclick'},
              'ui:dat-gui':          {main:'0.7.6',license:'APACHE',link:'https://github.com/dataarts/dat.gui'},
            }
          },
          date:{
            lib:{
              'date:moment':         {main:'2.24.0',license:'MIT',link:'https://github.com/moment/moment'},
            }
          }
        },
        extension:'.min.js',
        exception:[],
        script:[],
        api:{
          ip:{},
          ua:{}
        }
      }
    },
    computed:{
      has_error:function(){
        return Object.values(this.browserFeatures).some(function(v){
          return v.result == false
        })
      },
      has_exception:function(){
        return this.exception.length > 0
      },
    },
    filters:{
      version:function(fname){
        return fname.replace(/\.min\.js|\.js/,'')
      }
    },
    directives:{
      'ui':{
        inserted:function(el){
          el.classList.add('ui','stackable','cards')
        }
      },

      'ui-divider':{
        inserted:function(el){
          el.classList.add('ui','horizontal','divider')
        }
      },
      'ui-table':{
        inserted:function(el){
          el.classList.add('ui')
          el.classList.add('very','basic')
          el.classList.add('fixed','table')
          el.classList.add('celled','unstackable','attached')
          Array.from(el.querySelectorAll('td.title')).forEach(function(title){
            title.style.background='beige'
          })
        }
      },
      'ui-card':{
        inserted:function(el){
          el.classList.add('ui','card')
          if(el.offsetHeight > 500) {
             el.classList.add('scrollHeight')
          }
        }
      },
    },
    methods:{
      init:function(){
        this.script = Object.assign({},
          this.view.ui.lib,
          this.view.date.lib,
        )
      },
      construct:function(){
        var self = this
        Object.values(this.browserFeatures).forEach(function(prop){
          self.$set(prop,'result',Object.values(prop.source).every(function(v){
            return v == true
          }))
        })
        Object.values(this.script).forEach(function(prop){
          self.$set(prop,'result',null)
          prop.main  += self.extension
          prop.format = 'global'
        })
      },
      configuration:function(){
        System.config({
          transpiler:'traceur',
          packages:this.script,
          baseURL:'/',
          paths:{
            'ui:'     :'module/ui/',
            'date:'   :'module/date/',
          },
          meta:{
            '*':{
              authorization:true
            },
          }
        })
      },
      import:function(keys){
        var finish = []
        var self = this
        Object.keys(keys).forEach(function(key){
          var promise = System.import(key).then(function(success){
            self.script[key].result = true
          },function(fail){
            self.exception.push(fail.message)
            self.script[key].result = false
          })
          finish.push(promise)
        })
        return finish
      },
      isTrue:function(result){
        return (result == null) ? '' : result==true ? 'positive' : 'negative'
      },
      isAllTrue:function(target,key){
        return Object.values(target).every(function(v) {
          return (typeof key == 'undefined') ? v==true : v[key]==true
        }) ? 'green check' : ''
      },

    },
    created:function(){
      this.init()
      this.construct()
      this.configuration()


    },
    mounted:function(){
      var self = this

      Fingerprint2.getV18(function(murmur,components){
        Promise.all(self.import(self.script)).then(function(success){
          if (!self.has_exception && !self.debug) {
            self.$emit('loaded', murmur,self._data)
          }
        })
      })

    }
  }
</script>
 <style>
.init.ui th,
.init.ui td{
  padding:0 !important;
}
.init.ui th:first-child,
.init.ui td:first-child{
  width:2em !important;
}
.init.ui .icon{
  margin:0;
}
.init.ui table{
  width:100% !important;
}
.init.ui .ui.attached.table{
  margin: 0;
}
</style>