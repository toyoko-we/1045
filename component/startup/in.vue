 <template>
   <section v-ui>
     <div class='image'>
       <img src='app/image/startup/undraw_loving_it_y27c.svg'>
    </div>
     <div class='content'>
       <div class='description'>
         <p>このアプリケーションは、ホテルの清掃状況の進捗管理・情報共有・業務連絡を円滑にするために開発しました。シミュレータ上のテストになりますが、2015年以降に発売されたスマートフォンかパソコン上で動きます。</p>
         <p>このアプリケーションはウェブアプリです。普段皆さんがウェブサイトをみている環境上で動きます。インターネットに接続されていてウェブブラウザが端末上にあれば、世界中だれでも参加できます。</p>
         <p>もし利用者が何かのデータを入力すればリアルタイムに全員の端末に反映されます。いつでも共有できます。</p>
         <p>なにを共有したいですか？私は全員を楽にしたかった。ストレスを溜めてほしくなかった。私は誰でも纏め役ができるようにしたかった。誰でも統一された手順と基準を設けたかった。あなたが共感してくれたら、それは素晴らしいことです。私と一緒に開発しましょう。</p>
         <p>仕事に行く理由が１つじゃ勿体無い</p>
    </div>
  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('summary')
         }
       },
      'icon':{
         inserted:function(el){
           el.classList.add('ui','icon','circular')
         }
       },
      'header':{
        inserted:function(el){
          el.classList.add('ui','center','aligned','icon','header')
        }
      }
     },
     created:function(){

     }
   }
</script>
 <style>
   .summary .description p{
     font:12px 'M+2VM+IPAG circle';
     color:black;
   }
</style>