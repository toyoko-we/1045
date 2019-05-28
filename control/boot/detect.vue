 <template>
   <section v-ui>

     <div v-controls>
       <div v-control>
         <div v-divide>detects browser features</div>
         <div class='description'>
           <table v-table v-for='(must,key,no) in browserFeatures'>
             <thead>
               <tr>
                 <td class='center aligned'>
                   <i :class="['icon',isAllTrue(must.source)]"></i>
                </td>
                 <td class='title' colspan='2'>{{must.name}}</td>
              </tr>
            </thead>
             <tbody v-html='tableify(must.source)'>
            </tbody>
          </table>
        </div>
      </div>


       <div v-control>
         <div v-divide>video</div>
         <table v-table>
           <tbody v-html='tableify(Modernizr.video)'>
          </tbody>
        </table>
      </div>
       <div v-control>
         <div v-divide>audio</div>
         <table v-table>
           <tbody v-html='tableify(Modernizr.audio)'>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.classList.add('detect')
         }
       },
       'divide':{
         inserted:function(el){
           el.classList.add('ui','horizontal','divider')
         }
       },
       'table':{
         inserted:function(el){
           el.classList.add('ui')
           el.classList.add('very','basic')
           el.classList.add('fixed','table','attached')
           el.classList.add('celled','unstackable')
         }
       }
     },
     data:function(){
       return{
         browserFeatures:{
          'input':{
            name:'入力',
            source:Modernizr.input
          },
          'inputType':{
            name:'入力種類',
            source:Modernizr.inputtypes
          },
          'dom':{
            name:'編集',
            source:{
              contenteditable:Modernizr.contenteditable
            }
          },
          'speech':{
            name:'音声',
            source:{
              synthesis:Modernizr.speechsynthesis,
              recognition:Modernizr.speechrecognition
            }
          },
          'storage':{
            name:'保存',
            source:{
              local:Modernizr.localstorage,
              session:Modernizr.sessionstorage,
              indexeddb:('indexedDB' in window)
            }
          },
          'iframe':{
            name:'メッセージチャンネル',
            source:{
              local:Modernizr.messagechannel
            }
          },
          'socket':{
            name:'通信',
            source:{
              binary:Modernizr.websocketsbinary,
              web:Modernizr.websockets
            }
          },
          'rtc':{
            name:'リアルタイム通信',
            source:{
              data:Modernizr.datachannel,
              peer:Modernizr.peerconnection
            }
          },
          'json':{
            name:'データ整形',
            source:{
              json:Modernizr.json,
            }
          },
          'device':{
            name:'端末',
            source:{
              serviceworker:Modernizr.serviceworker,
              notification:Modernizr.notification,
              orientation:Modernizr.deviceorientation,
              fullscreen:Modernizr.fullscreen,
              webworkers:Modernizr.webworkers,
              vibrate:Modernizr.vibrate,
              webgl:Modernizr.webgl
            }
          }
        },
       }
     },
     methods:{
      isAllTrue:function(target,key){
        return Object.values(target).every(function(v) {
          return (typeof key == 'undefined') ? v==true : v[key]==true
        }) ? 'green check' : ''
      },
     },
     created:function(){

     }
   }
</script>
 <style>
   .detect .ui.table th,
   .detect .ui.table td{
     padding:0 !important;
   }
   .detect .ui.table th:first-child,
   .detect .ui.table td:first-child{
     width:2em !important;
   }
   .detect .ui.card{
     overflow:hidden;
   }
</style>