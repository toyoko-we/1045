 <template>
   <section v-ui>
     <div v-controls>
       <div v-control>
         <div v-divide>supported</div>
         <table v-table>
           <tbody v-html='tableify(browser)'>
          </tbody>
        </table>
         <div id='outdated' class='ui attached bottom mini message'>あなたのブラウザはサポートされています</div>
        </table>
      </div>
    </div>
  </section>
</template>
 <script>
  module.exports={
    data:function(){
      return{
        browser:{
          'Chrome'        : 49,
          'Safari'        : 6,
          'Mobile Safari' : 6,
          'Firefox'       : false,
          'Edge'          : false,
          'Opera'         : false,
          'Vivaldi'       : false,
          'Yandex'        : false,
          'IE'            : false
        },
      }
    },
    mounted:function(){

      new outdatedBrowserRework({
        fade                   :false,
        language               :'ja',
        fullscreen             :false,
        isUnknownBrowserOK     :false, 
        browserSupport         :self.browser,
        requireChromeOnAndroid :false,
        messages: {
          ja: {
            outOfDate    :'あなたのブラウザは時代遅れです!',
            unsupported  :'あなたのブラウザはサポートされていません!',
            update: {
              web        :'このWebサイトを正しく表示するようにブラウザを更新してください。',
              googlePlay :'Google PlayからChromeをインストールしましょう!。',
              appStore   :'設定アプリからiOSを更新しましょう!。'
            },
            url:'http://outdatedbrowser.com/',
            callToAction :'今すぐブラウザを更新する Click!',
            close        :'閉じる'
          }
        }
      })


    }
  }
</script>
 <style>
</style>