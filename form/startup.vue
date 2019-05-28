 <template>
   <article v-ui>

     <h3 v-header>
       <i class='users icon'></i>
       <div class='content'>
         <div class='sub header'>アプリの概要</div>
      </div>
    </h3>
     
     <div v-controls>
       <in v-control></in>
       <legal v-control></legal>
       <license v-control></license>
    </div>
     <div v-controls>
       <about v-control></about>
       <thanks v-control></thanks>       
    </div>
     
  </article>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('startup')
         }
       },
       'header':{
         inserted:function(el){
           el.classList.add('ui','icon','fluid')
           el.classList.add('header','center','aligned')
           el.classList.add('pointing','below','label','teal')
         }
       }
     },
     components:[
       'url:component/startup/about.vue',
              'url:component/startup/in.vue',
       'url:component/startup/legal.vue',
       'url:component/startup/license.vue',

       'url:component/startup/thanks.vue'
     ],
     created:function(){

     }
   }
</script>
 <style>
   .startup .ui.stackable.cards{
     margin:0;
   }
</style>