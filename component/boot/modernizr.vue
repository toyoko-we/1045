 <template>
   <section v-ui>
     <div v-divider>{{title}}</div>
     <table v-table>
       <thead>
         <tr>
           <th v-no>no</th>
           <th>feature</th>
           <th>result</th>
        </tr>
      </thead>
       <tbody>
         <tr v-for='(result,name,no) in features'
           :class='{
             positive:result == true,
             negative:result == false}'>
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
           el.classList.add('modernizr')
         }
       }
     },
     props:{
       title:String
     },
     data:function(){
       return{
         features:{},
       }
     },
     created:function(){
       this.features = this.$parent.flatten(Modernizr,'-')
     }
   }
</script>
 <style>
</style>