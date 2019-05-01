 <template>
  <div class='introduce ui'>
    <div v-ui>
      <section v-ui-card>
        <h3 v-ui-header>
          <i class='users icon'></i>
          <div class='content'>
            <div class='sub header'>アプリの概要</div>
         </div>
       </h3>
     </section>
   </div>
    <div v-ui>
      <section v-ui-card>
        <div class='image'>
          <img src='asset/welcome.png'>
       </div>
        <div class='content'>
          <a class='header'>Yusuke Sano</a>
          <div class='meta'>
            <span class='date'>201901 ~</span>
         </div>
          <div class='description'>
            <p>私は開発者です。ハッカーになることを夢みてマルウェアやカーネルの解析をしていました。その夢も潰えました。いま私は、1500冊以上の蔵書を読みながら東横インでバイトしてます。専門はウェブじゃないですが、2019年01月からこのアプリを開発しています。・ω・</p>
            <p>ソースコードは<a href='https://github.com/toyoko-we/1045'>GitHub</a>です。</p>
         </div>
       </div>
     </section>
      <section v-ui-card>
        <div class='content'>
          <h2 v-ui-card-header>
            <i class='copyright' v-ui-icon></i>
            MIT LICENSE
         </h2>
          <div class='description'>
            <p>以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。</p>
            <p>上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。</p>
            <p>ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。</p>
         </div>
       </div>
     </section>
      <section v-ui-card>
        <div class='content'>
          <h2 v-ui-card-header>
            <i class='user' v-ui-icon></i>
            PRIVACY POLICY
         </h2>
          <div class='description'>
            <p>本アプリケーションは（以下「アプリ」）は利用者の端末から情報を収集します。サービスの安全性と信頼性の向上を目的とし、アプリの発展に役立てます。</p>
            <p>これらの情報には、ブラウザおよびデバイスの種類や機能・ＯＳのバージョン、ＩＰに紐付けられた接続環境も含まれます。処理した結果として、技術的な問題の検知、防止や古い端末に対応することができます。</p>
            <p>アプリに対する通信の負荷、不審なアクセスの検知を目的とし、アクセス解析を導入しています。クッキーと呼ばれる情報を利用者の端末に保存し、利用した結果としてアプリ上での行動履歴や二度目の訪問がわかります。これらから個人が特定されることはありません。</p>
            <p>アプリに入力したデータは、すべての利用者の端末に複製されます。いつでも誰でも見れる状態です。もし個人を特定できるもの、ホテルの信用に関わる情報を入力してしまったら、私にご連絡ください。</p>
         </div>
       </div>
     </section>
      <section v-ui-card>
        <div class='content'>
          <h2 v-ui-card-header>
            <i class='hotel' v-ui-icon></i>
            INTRO OF 1045
         </h2>
          <div class='description'>
            <p>このアプリケーションは、ホテルの清掃状況の進捗管理・情報共有・業務連絡を円滑にするために開発しました。シミュレータ上のテストになりますが2015年以降に発売されたスマートフォンかパソコン上で動きます。</p>
            <p>このアプリケーションはウェブアプリです。普段皆さんがウェブサイトをみている環境上で動きます。インターネットに接続されていてウェブブラウザが端末上にあれば、世界中だれでも参加できます。</p>
            <p>もし利用者が何かのデータを入力すればリアルタイムに全員の端末に反映されます。いつでも共有できます。</p>
            <p>なにを共有したいですか？私は全員を楽にしたかった。ストレスを溜めてほしくなかった。私は誰でも纏め役ができるようにしたかった。誰でも統一された手順と基準を設けたかった。あなたが共感してくれたら、それは素晴らしいことです。私と一緒に開発しましょう。</p>
            <p>仕事に行く理由が１つじゃ勿体無い</p>
         </div>
       </div>
     </section>
   </div>
    <div v-ui>
      <section v-ui-card>
        <div class='content'>
          <form class='ui login form' @submit.prevent>
            <div class='field'>
              <div class='ui left icon input'>
                <i class='user icon'></i>
                <input type='text' name='nickname' v-model='nickname' placeholder='Nickname' size='100%'>
             </div>
           </div>
            <div class='field'>
              <select class='ui floor dropdown' name='floor'>
                <option value="">Floor</option>
                <option value="1">１Ｆ</option>
                <option value="2">２Ｆ</option>
                <option value="3">３Ｆ</option>
                <option value="4">４Ｆ</option>
                <option value="5">５Ｆ</option>
                <option value="6">６Ｆ</option>
                <option value="7">７Ｆ</option>
                <option value="8">８Ｆ</option>
                <option value="9">９Ｆ</option>
                <option value="10">１０Ｆ</option>
                <option value="11">１１Ｆ</option>
                <option value="12">１２Ｆ</option>
                <option value="13">１３Ｆ</option>
             </select>
           </div>
            <div class='ui error message'>
           </div>
            <div class='field'>
              <button class='ui fluid button' type='submit'>プライバシーポリシーに同意する</button>
           </div>
         </form>
       </div>
     </section>
   </div>
 </div>
</template>
 <script>
   module.exports = {
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('ui','stackable','cards')
         }
       },
       'ui-card':{
         inserted:function(el){
           el.classList.add('ui','card')
         }
       },
      'ui-header':{
        inserted:function(el){
          el.classList.add('ui','icon','fluid')
          el.classList.add('header','center','aligned')
          el.classList.add('pointing','below','label','teal')
        }
      },
       'ui-card-header':{
         inserted:function(el){
           el.classList.add('ui','center','aligned','icon','teal','header')
         }
       },
       'ui-icon':{
         inserted:function(el){
           el.classList.add('ui','icon','circular')
         }
       }
     },
     data:function(){
       return {
         nickname:'',
         floor:null
       }
     },
     methods:{
       agreed:function(event,fields){
         this.$emit('logined',
           this.nickname,
           parseInt(this.floor))
       }
     },
     mounted:function(){
       var self = this

       $('.form.login')
        .form({
          onSuccess:this.agreed,
          fields:{
            nickname:{
              identifier:'nickname',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'あだ名は必須です'
                },
                {
                  type   : 'minLength[1]',
                  prompt : 'あだ名は一文字以上です'
                },
                {
                  type   : 'regExp[/^[ぁ-んァ-ンーa-zA-Z一-龠]+$/]',
                  prompt : 'あだ名は日本語か英語のみです'
                }
              ]
            },
            floor: {
              identifier: 'floor',
              rules: [
                {
                  type   : 'minCount[1]',
                  prompt : '清掃する階を選択して下さい'
                }
              ]
            }
          }
        })

      
       $('.dropdown.floor')
        .dropdown({
          onChange: function(value, text, $selectedItem) {
            self.floor = value
          }
       })

     }
   }
</script>
 <style>
.introduce .ui.form input {
  width:100% !important;
}
.introduce .description p{
  font:12px 'M+2VM+IPAG circle';
  color:black;
}
.introduce.ui .icon{
  margin:0;
}
</style>