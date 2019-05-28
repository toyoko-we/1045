 <template>
   <section v-ui>
     <div v-divider>{{title}}</div>
     <div ref='container'>
    </div>
  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('config')
         }
       }
     },
     data:function(){
       return{
         gui:null
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
       debug:function(){
         this.$parent._data.db.WebAPI.ip = null
       }
     },
     created:function(){
       this.gui = new dat.GUI({autoPlace:false})
       this.gui.remember(this.$data)
       this.gui.add(this,'debug')
     },
     mounted:function(){
       this.$refs.container.appendChild(this.gui.domElement)
     }
   }
</script>
 <style>
  .config .dg.main,
  .config .dg.main .close-button{
    width:100% !important;
  }
</style>