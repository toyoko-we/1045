 <template>
   <section v-ui>
     <div v-divider>{{title}}</div>
     <table v-table class='attached'>
       <thead>
         <tr>
           <th v-no>no</th>
           <th>name</th>
           <th>version</th>
        </tr>
      </thead>
       <tbody>
         <tr v-for='(result,name,no) in db'>
           <td>{{no+1}}</td>
           <td>{{name}}</td>
           <td>{{result}}</td>
        </tr>
      </tbody>
    </table>
     <div id='outdated' class='ui attached bottom mini message'>
      あなたのブラウザはサポートされています
    </div>
  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('outdated-browser')
         }
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
     mounted:function(){
       new outdatedBrowserRework({
         fade                   :false,
         language               :'ja',
         fullscreen             :false,
         isUnknownBrowserOK     :false, 
         browserSupport         :this.db,
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