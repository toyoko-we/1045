 <template>
   <section v-ui>
     <div v-controls>
       <div v-control>
         <div class='image'>
           <img src='/asset/welcome.png'>
        </div>
         <div class='content'>
           <div class='header'>Yusuke Sano</div>
           <div class='meta'>
             <span class='source'><a href='https://github.com/toyoko-we/1045'>https://github.com/toyoko-we/1045</a></span>
          </div>
           <div class='description'>
             <p>使用言語は元々C#,C。今はHTML,CSS,JS 各種のフレームワークJQUERY,VUEを書きます。今回のウェブアプリを皮切りにグーグルプレイストアのあらゆるネイティブアプリをＰＷＡ化する予定です。並行してココナラやクラウドワークスから個人で仕事をとる計画です。</p>
             <p>生産性は利益に影響します。この向上を目的にこのアプリはフレームワークを問わず世界中のライブラリを取り入れます。この過程で理解を深め、クライアントの要求に逸早く応えられる素地を作り、必要なら中身も修正して実現します。</p>
             <p>また、巨大なライブラリがなくてもシンプルな機能の実装だけで済むことはよくあります。そこで、.NET(C#)System.Windows.Formsを参考にコントロール集を作成します。いつでも結合ができるようにです。</p>
             <p>最終的には、コントロール一覧の資料を作成しクライアントの要求に対して、これとこららを組み合わせて足りない機能は新規開発し、デザインに近い面は〜に注文します。等の選択式のトークができればベストです。</p>
             <p>このアプリを終え次第、その資料作成の新しいソフトウェアを開発します。DRAW.IO を土台にBOOTSTRAPやSEMANITC-UIのフレームワークから生成したコンポーネントをそのまま画像としてDRAW.IOにD&Dできます。</p>
             <p>これまでPowerPointやDraw.io 上で作成されていた独自の表やグラフ を共通基盤であるCSSに置き換えて、フレームワークを利用することでクラス名を入力するだけで細かな調整のできるコンポーネントを大量に作り込むことができるものです。あくまで前者はドロップされたコンポーネントを矢印で繋げるだけの存在に持っていきたい。</p>
             <p>また、このアプリやＰＷＡ化時の開発資料を書いてQiitaに上げる予定です。 私には人脈が必要だ。それから私の元で学びたい生徒を増やす必要がある。私の独自の資料で新しい教育をしたい。</p>
             <p>これらを作成後に履歴書を書き、再びＩＴ業界に舞い戻る予定です。そして経験を経てから教育のほうに回ります。</p>
          </div>
        </div>
         <div class='extra content'>
           <a href='https://github.com/toyoko-we/' target='_blank'>
             <i class='icon github'></i>
          </a>
           <a href='mailto:toyoko.app@gmail.com'>
             <i class='icon mail'></i>
          </a>
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
           el.classList.add('about')
         }
       }
     }
   }
</script>
 <style>
   .about .ui.card .content .description p{
     font:12px 'M+2VM+IPAG circle';
     line-height:normal;
     color:black;
   }
</style>