 <template>
   <section v-ui>
     <div v-divider>{{title}}</div>
     <table v-table>
       <thead>
         <tr>
           <th v-no>no</th>
           <th>author</th>
           <th>package</th>
           <th>version</th>
           <th>license</th>
        </tr>
      </thead>
       <tbody>
         <tr v-for='(record,name,no) in packages'
           :class='{
             positive:record.loaded == true,
             negative:record.loaded == false}'>
           <td>{{no+1}}</td>
           <td>{{record.author}}</td>
           <td><a :href='record.link'>{{name}}</a></td>
           <td>{{record.main}}</td>
           <td>{{record.license}}</td>
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
           el.classList.add('system')
         }
       }
     },
     computed:{
       has_exception:function(){
         return this.exception.length > 0
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
     data:function(){
       return{
         baseURL:'package',
         exception:[],
         transpiler:'traceur',
         defaultJSExtension:'.min.js',
         packages:this.db,
         meta:{
            '*':{
              authorization:true
            },
           'semantic-ui/*':{
             deps:['jquery']
           }
         }
       }
     },
     methods:{
       config:function(){
         System.config(this.$data)
       },
       construct:function(){
         var self = this
         Object.values(this.packages).forEach(function(package){
           self.$set(package,'loaded',null)
         })
       },
       import:function(){
         var self = this
         return Object.keys(self.packages).map(function(name){
           return System.import(name).then(
             function(ok)   { self.packages[name].loaded = true },
             function(fail) { self.packages[name].loaded = false
                              self.exception.push(r.message)
             }
           )
         })
       }
     },
     created:function(){
       this.config()
       this.construct()
       var self = this
       Promise.all(this.import()).then(function(){
         if(!self.has_exception){
           self.$emit('loaded')
         }
       })
     }
   }
</script>
 <style>
</style>