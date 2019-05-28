 <template>
   <section v-ui>
     <div class='image'>
       <img src='app/image/startup/undraw_reading_0re1.svg'>
    </div>
     <div class='content'>
       <div class='description'>
         <p>本アプリケーションは（以下「アプリ」）は利用者の端末から情報を収集します。サービスの安全性と信頼性の向上を目的とし、アプリの発展に役立てます。</p>
         <p>これらの情報には、ブラウザおよびデバイスの種類や機能・ＯＳのバージョン、ＩＰに紐付けられた接続環境も含まれます。処理した結果として、技術的な問題の検知、防止や古い端末に対応することができます。</p>
         <p>アプリに対する通信の負荷、不審なアクセスの検知を目的とし、アクセス解析を導入しています。クッキーと呼ばれる情報を利用者の端末に保存し、利用した結果としてアプリ上での行動履歴や二度目の訪問がわかります。これらから個人が特定されることはありません。</p>
         <p>アプリに入力したデータは、すべての利用者の端末に複製されます。いつでも誰でも見れる状態です。もし個人を特定できるもの、ホテルの信用に関わる情報を入力してしまったら、私にご連絡ください。</p>
      </div>
    </div>
  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('legal')
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
   .legal .description p{
     font:12px 'M+2VM+IPAG circle';
     color:black;
   }
</style>