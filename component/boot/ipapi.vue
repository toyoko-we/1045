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
           <td>{{no+1}}</td>
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
           el.classList.add('ipapi')
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
       getIP:function(){
         var self = this
         fetch('https://ipapi.co/json/')
         .then(function(response){
           return response.json()
         })
         .then(function(json){
           self.db = json
           self.$emit('input',self.db)
         })
       }
     },
     created:function(){
       this.getIP()
     }
   }
</script>
 <style>
</style>