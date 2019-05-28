 <template>
   <section v-ui>

     <div v-controls>
       <div v-control>
         <div v-divide>ip</div>
         <table v-table>
           <tbody v-html='tableify(api.ip)'>
          </tbody>
        </table>
      </div>
       <div v-control>
         <div v-divide>os</div>
         <table v-table>
           <tbody v-html='tableify(api.ua.os)'>
          </tbody>
        </table>
      </div>
       <div v-control>
         <div v-divide>device</div>
         <table v-table>
           <tbody v-html='tableify(api.ua.device)'>
          </tbody>
        </table>
      </div>
       <div v-control>
         <div v-divide>browser</div>
         <table v-table>
           <tbody v-html='tableify(api.ua.browser)'>
          </tbody>
        </table>
      </div>

 </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('lookup')
         }
       },
       'divide':{
         inserted:function(el){
           el.classList.add('ui','horizontal','divider')
         }
       },
       'table':{
         inserted:function(el){
           el.classList.add('ui')
           el.classList.add('very','basic')
           el.classList.add('fixed','table')
           el.classList.add('celled','unstackable')
         }
       }
     },
     data:function(){
       return{
         api:{
           ip:{},
           ua:{}
         }
       }
     },
     methods:{
       getIP:function(){
         var self = this
         fetch('https://ipapi.co/json/')
         .then(function(response){
           return response.json()
         })
         .then(function(json){
           self.api.ip = json
         })
       },
       getUA:function(){
         var self = this
         fetch('http://api.userstack.com/detect?access_key=96c9e83d40c6402d9867e54e24bd0619&ua=' + window.navigator.userAgent)
         .then(function(response){
           return response.json()
         })
         .then(function(json){
           self.api.ua = json
         })
       }
     },
     created:function(){
       this.getIP()
       this.getUA()
     }
   }
</script>
 <style>
   .lookup .ui.table thead th,
   .lookup .ui.table tbody td{
     padding:0 !important;
   }
   .lookup .ui.table thead th:first-child,
   .lookup .ui.table tbody td:first-child{
     width:2em !important;
   }
</style>