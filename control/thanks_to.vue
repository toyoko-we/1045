 <template>
   <section v-ui>

     <div v-controls>
       <div v-control>
         <div class='content'>
           <div class='header'>
             <span class='name' v-text='currentItem.name'></span>
          </div>
           <div class='meta'>
             <span class='source' v-text='currentItem.source'></span>
          </div>
           <div class='description'>
             <span class='gratitude' v-html='currentItem.gratitude'></span>
          </div>
        </div>
         <div class='extra content'>
           <div v-tags>
             <span v-tag v-for='tag in currentItem.tag'>
               <a :href='currentItem.source + tag' v-text='tag'></a>
            </span>
          </div>
        </div>
      </div>
       <div v-control>
         <div v-avatars>
           <div v-avatar @click='currentItem = src' v-for='src in source'>
             <div class='image'>
               <img :src='src.icon'>
            </div>
          </div>
      </div>
    </div>

  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('thanks_to')
         }
       },
             'header':{
        inserted:function(el){
          el.classList.add('ui','center','aligned','icon','teal','header')
        }
      },
       'avatars':{
         inserted:function(el){
           el.classList.add('ui','nine','cards')
         }
       },
       'avatar':{
         inserted:function(el){
           el.classList.add('ui','link','card')
         }
       },
       'tags':{
         inserted:function(el){
           el.classList.add('ui','labels','mini')
         }
       },
       'tag':{
         inserted:function(el){
           el.classList.add('ui','label','teal')
         }
       }
     },
     data:function(){
       return{
         shown:true,
         currentItem:{
           name:'toyoko-we',
           image:'',
           source:'',
           gratitude:'<p>巨人の肩の上に立つ。このアプリケーションは多くの開発者の力を借りて成り立っています。</p><p>高品質・無料のフレームワークやライブラリは一人では数十時間かかる作業を数時間に短縮してくれました。私は欲しいものを欲しいときに作ることができます。ありがとう。</p><p>私はこの気持を適切に伝えたい。言語を覚えるのに必要なのは誰かになにかを伝えようとする心です。英語を話そう。</p>'
         },
         source:[
           {name:'GoogleChromeLabs',tag:['pwacompat'],icon:'https://avatars1.githubusercontent.com/u/31970254',source:'https://github.com/GoogleChromeLabs/',gratitude:"<p>グーグルに感謝している。<a href='https://github.com/GoogleChromeLabs/pwacompat'>PWACompat</a>は一個のウェブアプリケーションマニフェストから複数のウェブブラウザに対応するウェブアプリ用の機能を提供する。</p><p>スプラッシュスクリーンやホーム画面に組み込まれるアイコンのタグ等を単一のマニフェストファイルから生成する。</p>"}
         ],
         gratitude:null
       }
     },
     methods:{
       toggle:function(){
         this.shown = !this.shown
       }
     },
     mounted:function(){
       var self = this
       
       new Parallax(this.$refs.images, {
         frictionX:0.2,
         frictionY:0.2,
       })
     }
   }
</script>
 <style>
   @font-face{
     font-family:'M+2VM+IPAG circle';
     src:url('/asset/font/ipa/m+2vm+ipag-circle/20060520p1.ttf');
   }
   .ui.nine.cards .description{
     display:none;
   }

   .ui.card.view{
     padding:.5em;
   }
  .thanks_to .extra,
  .thanks_to .description p{
    font:12px 'M+2VM+IPAG circle';
    color:black;
  }

   .thanks_to .ui.card p{
     font:12px 'M+2VM+IPAG circle';
     line-height:normal;
     margin:0;
   }
   .thanks_to .view{
     display:block;
     padding:.5em;
     color:#000;
   }
   .thanks_to .balloon .ui.cards .card .description{
     display:none;
   }
  .thanks_to .balloon{
    padding:0;
  }
  .ui.card>:first-child, .ui.cards>.card>:first-child{
    
  }
  .ui.stackable.cards>.card.view{
    padding:.5em !important;
  }
  .thanks_to .ui.nine.cards {
    margin:0;
  }
@media only screen and (max-width: 767px) {
.ui.nine.cards .card:first-child {
    margin-top: .875em!important;
}

   .logo.ui.card.balloon_container{
     box-shadow:none;
   }
}
.images{
  width:100%;
}
.thanks_to .description p{
  font:12px 'M+2VM+IPAG circle';
  color:black;
}
.thanks_to .ui.label > a,
.thanks_to .ui.card>.extra a:not(.ui),
.thanks_to .ui.cards>.card>.extra a:not(.ui) {
  color:white;
  opacity:1;
}
</style>