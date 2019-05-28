 <template>
   <article v-ui>

     <h3 v-header>
       <a :href=contact>
         <i class="mail icon"></i>
      </a>
       <div class='content'>
         <div class='sub header'>アプリが動かない時はメールを送信</div>
      </div>
    </h3>
     <div v-controls>
                  <outdated-browser v-model='db.BrowserAPI.list' title='supported browsers' v-control>
      </outdated-browser>
      </div>

     <div v-controls>
       <ipapi v-model='db.WebAPI.ip' title='lookup ip' v-control>
      </ipapi>
       <userstack v-model='db.WebAPI.us' title='look ua' v-control>
      </userstack>
      </div>
     <div v-controls>
       <modernizr title='detect browser features' v-control>
      </modernizr>
       <system v-model='db.PackageAPI.list' @loaded='db.PackageAPI.loaded = true' title='loading packages' v-control>
      </system>
       <config title='aaa' v-control>
      </config>
      </div>
    </div>
  </article>
</template>
 <script>
   module.exports={
     directives:{
      'ui':{
        inserted:function(el){
          el.classList.add('boot')
        }
      },
      'header':{
        inserted:function(el){
          el.classList.add('ui','icon','fluid')
          el.classList.add('header','center','aligned')
          el.classList.add('pointing','below','label','teal')
        }
      },
      'divider':{
        inserted:function(el){
          el.classList.add('ui','divider','horizontal')
        }
      }
     },
     components:[
       'url:component/boot/ipapi.vue',
       'url:component/boot/system.vue',
       'url:component/boot/modernizr.vue',
       'url:component/boot/userstack.vue',
       'url:component/boot/config.vue',
       'url:component/boot/outdated-browser.vue'
     ],
     data:function(){
       return{
         db:{
           WebAPI:{
             ip:null,
             us:null,
           },
           BrowserAPI:{
             Modernizr:Modernizr,
             list:{
               'Chrome'        : 80,
               'Safari'        : 60,
               'Mobile Safari' : 60,
               'Firefox'       : false,
               'Edge'          : false,
               'Opera'         : false,
               'Vivaldi'       : false,
               'Yandex'        : false,
               'IE'            : false
             }
           },
           PackageAPI:{
             loaded:false,
             list:{
               'jquery':       {main:'3.4.1',license:'MIT',link:'https://github.com/jquery/jquery',author:'JS Foundation'},
               'semantic-ui':  {main:'2.4.2',license:'MIT',link:'https://github.com/Semantic-Org/Semantic-UI',author:'Semantic Org'},
             }
           }
         }
       }
     },
     watch:{
       db:{
         handler:function(val){
           if(val.WebAPI.ip && val.WebAPI.us && val.PackageAPI.loaded) {
             this.$emit('startup')
           }
         },
         deep:true
       }
     },
     computed:{
       contact:function(){
         return 'mailto:toyoko.app@gmail.com?subject=このまま送信&body=' + JSON.stringify(this.db)
       }
     },
     methods:{
       print:function(){
         console.dir(this.db.RestAPI.ip)
         console.dir(this.db.PackageAPI.us)
       },
       flatten:function(obj,sep){
         var out
         var flatObj
         var toReturn = {};
        
         for (var key in obj) {
           var val = obj[key]
           
           if(!obj.hasOwnProperty(key))
             continue
           if(typeof(val) === 'object'){
             flatObj = this.flatten(val,sep)
             for(k in flatObj){
               if(flatObj.hasOwnProperty(k))
                 toReturn[key+sep+k] = flatObj[k]
               else{
                 continue
               }
             }
           }else{
             toReturn[key] = val
           }
         }
         return toReturn 
       }
     },
     mounted:function(){

       Vue.directive('divider',{
         inserted:function(el){
           el.classList.add('ui','divider','horizontal')
         }
       })

       Vue.directive('table',{
         inserted:function(el){
           el.classList.add('ui')
           el.classList.add('single','line')
           el.classList.add('celled','fixed')
           el.classList.add('unstackable','table')
         }
       })
       Vue.directive('no',{
         inserted:function(el){
           el.classList.add('two','wide')
         }
       })
     }
   }
</script>
 <style>
   .boot .ui.stackable.cards{
     margin:0;
   }
   .boot .ui.stackable.cards>.card{
     display: -webkit-box !important;
     display: -webkit-flex !important;
     display: -moz-box !important;;
     display: -ms-flexbox !important;
     display: flex !important;
     overflow:hidden;
   } 
   .boot .ui.table{
     border:none;
   }
   .boot .ui.table thead th,
   .boot .ui.table tbody td{
     padding:0;
   }
   .boot .ui.table thead th{
     text-transform:uppercase;
   }
   .boot .ui.table thead th:first-child,
   .boot .ui.table tbody td:first-child{
     text-align:center;
   }
</style>