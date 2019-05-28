 <template>
   <section v-ui>
     <div v-divider>{{title}}</div>
     <table v-table>
       <thead>
         <tr>
           <th v-no>no</th>
           <th>name</th>
           <th>value</th>
        </tr>
      </thead>
       <tbody>
         <tr v-for='(result,name,no) in db'>
           <td>{{no + 1}}</td>
           <td>{{name}}</td>
           <td>{{result}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('userstack')
         }
       }
     },
     model:{
       prop:'db',
       event:'input'
     },
     props:{
       db:Object,
       title:String
     },
     methods:{
       getUA:function(){
         var self = this
         fetch('http://api.userstack.com/detect?access_key=96c9e83d40c6402d9867e54e24bd0619&ua=' + window.navigator.userAgent)
         .then(function(response){
           return response.json()
         })
         .then(function(json){
           self.db = self.$parent.flatten(json,'-')
           self.$emit('input',self.db)
         })
       }
     },
     created:function(){
       this.getUA()
     }
   }
</script>
 <style>
</style>