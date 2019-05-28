 <template>
   <section v-ui>

     <h5 v-header>
       <i class='icon hotel' data-micron='tada' @click='clickedIcon'></i>
         <div class='content'>1045 by Yusuke Sano
           <div class='header sub'>
             <a href='https://github.com/toyoko-we/1045'>https://github.com/toyoko-we/1045</a>
          </div>
        </div>
    </h5>

  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('face')
         }
       },
       'header':{
         inserted:function(el){
           el.classList.add('ui','header','center','aligned','icon')
         }
       }
     },
     methods:{
       clickedIcon:function(){
         this.$emit('knock')
       }
     }
   }
</script>
 <style>
   .ui.face .icon{
     color:#0cf;
   }
</style>