 <template>

   <div class='init ui'>
     <div v-ui>
       <section v-ui-card>
         <h3 v-ui-header>
           <a :href="'mailto:toyoko.app@gmail.com?subject=このまま送信&body=' + JSON.stringify(_data)">
             <i class="mail icon"></i>
          </a>
           <div class='content'>
             <div class='sub header'>アプリが動かない時はメールを送信</div>
          </div>
        </h3>
      </section>
    </div>
     <div v-ui>
       <section v-ui-card>
         <div v-ui-divider>supported</div>
         <table v-ui-table>
           <tbody v-html='tableify(browser)'>
          </tbody>
        </table>
         <div id='outdated' class='ui attached bottom mini message'>あなたのブラウザはサポートされています</div>
        </table>
      </section>
    </div>
     <div v-ui>
       <section v-ui-card>
         <div v-ui-divider>loading modules</div>
         <table v-ui-table>
           <tbody v-for='(depends,name,no) in view'>
             <tr>
               <td class='center aligned'>
                 <i :class="['icon', isAllTrue(depends.lib,'result')]"></i>
              </td>
               <td colspan='3' class='title' v-text='name'>
              </td>
            </tr>
             <tr v-for='(script,key,i) in depends.lib' :class="[isTrue(script.result)]">
               <td class='center aligned'>{{1+no}}.{{1+i}}</td>
               <td><a v-text='key' :href='script.link'></a></td>
               <td v-text='script.license'></td>
               <td>{{script.main | version}}</td>
            </tr>
          </tbody>
        </table>
      </section>
       <section v-ui-card>
         <div v-ui-divider>detects browser features</div>
         <div class='description'>
           <table v-ui-table v-for='(must,key,no) in browserFeatures'>
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
      </section>
    </div>
     <div v-ui>
       <section v-ui-card>
         <div v-ui-divider>supported video formats</div>
         <table v-ui-table>
           <tbody v-html='tableify(Modernizr.video)'>
          </tbody>
        </table>
      </section>
       <section v-ui-card>
         <div v-ui-divider>supported audio formats</div>
         <table v-ui-table>
           <tbody v-html='tableify(Modernizr.audio)'>
          </tbody>
        </table>
      </section>
       <section v-ui-card>
         <div v-ui-divider>supported webgl extensions</div>
         <table v-ui-table v-show='Modernizr.webgl'>
           <tbody v-html='tableify(Modernizr.webglextensions)'>
          </tbody>
        </table>
      </section>
    </div>
     <div v-ui>
       <section v-ui-card>
         <div v-ui-divider>lookup ip</div>
         <table v-ui-table>
           <tbody v-html='tableify(api.ip)'>
          </tbody>
        </table>
      </section>
       <section v-ui-card>
        <div v-ui-divider>lookup browser</div>
          <table v-ui-table>
            <tbody v-html='tableify(api.ua.browser)'>
            </tbody>
         </table>
      </section>
       <section v-ui-card>
         <div v-ui-divider>lookup device</div>
         <table v-ui-table>
           <tbody v-html='tableify(api.ua.device)'>
          </tbody>
        </table>
      </section>
       <section v-ui-card>
         <div v-ui-divider>lookup os</div>
         <table v-ui-table>
           <tbody v-html='tableify(api.ua.os)'>
          </tbody>
        </table>
      </section>
    </div>
  </div>

</template>
 <script>
  module.exports = {
    props:{
      debug:{
        default:false,
        type:Object
      }
    },
    data:function(){
      return {
        view:{
          ui:{
            lib:{
              'ui:fast-click':       {main:'1.0.6',license:'MIT',link:'https://github.com/ftlabs/fastclick'},
              'ui:dat-gui':          {main:'0.7.6',license:'APACHE',link:'https://github.com/dataarts/dat.gui'},
            }
          }
        },
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
        extension:'.min.js',
        exception:[],
        script:[],
        api:{
          ip:{},
          ua:{}
        }
      }
    },
    computed:{
      has_error:function(){
        return Object.values(this.browserFeatures).some(function(v){
          return v.result == false
        })
      },
      has_exception:function(){
        return this.exception.length > 0
      },
    },
    filters:{
      version:function(fname){
        return fname.replace(/\.min\.js|\.js/,'')
      }
    },
    directives:{
      'ui':{
        inserted:function(el){
          el.classList.add('ui','stackable','cards')
        }
      },
      'ui-header':{
        inserted:function(el){
          el.classList.add('ui','icon','fluid')
          el.classList.add('header','center','aligned')
          el.classList.add('pointing','below','label','teal')
        }
      },
      'ui-divider':{
        inserted:function(el){
          el.classList.add('ui','horizontal','divider')
        }
      },
      'ui-table':{
        inserted:function(el){
          el.classList.add('ui')
          el.classList.add('very','basic')
          el.classList.add('fixed','table')
          el.classList.add('celled','unstackable','attached')
          Array.from(el.querySelectorAll('td.title')).forEach(function(title){
            title.style.background='beige'
          })
        }
      },
      'ui-card':{
        inserted:function(el){
          el.classList.add('ui','card')
          if(el.offsetHeight > 500) {
             el.classList.add('scrollHeight')
          }
        }
      },
    },
    methods:{
      init:function(){
        this.script = Object.assign({},
          this.view.ui.lib
        )
      },
      construct:function(){
        var self = this
        Object.values(this.browserFeatures).forEach(function(prop){
          self.$set(prop,'result',Object.values(prop.source).every(function(v){
            return v == true
          }))
        })
        Object.values(this.script).forEach(function(prop){
          self.$set(prop,'result',null)
          prop.main  += self.extension
          prop.format = 'global'
        })
      },
      configuration:function(){
        System.config({
          transpiler:'traceur',
          packages:this.script,
          baseURL:'/',
          paths:{
            'ui:'     :'module/ui/',
          },
          meta:{
            '*':{
              authorization:true
            },
          }
        })
      },
      import:function(keys){
        var finish = []
        var self = this
        Object.keys(keys).forEach(function(key){
          var promise = System.import(key).then(function(success){
            self.script[key].result = true
          },function(fail){
            self.exception.push(fail.message)
            self.script[key].result = false
          })
          finish.push(promise)
        })
        return finish
      },
      isTrue:function(result){
        return (result == null) ? '' : result==true ? 'positive' : 'negative'
      },
      isAllTrue:function(target,key){
        return Object.values(target).every(function(v) {
          return (typeof key == 'undefined') ? v==true : v[key]==true
        }) ? 'green check' : ''
      },
      getIP:function(){
        var self = this
        fetch('https://ipapi.co/json/')
        .then(function(response){
          return response.json()
        })
        .then(function(json){
          delete json.in_eu
          self.api.ip = json
        })
      },
      getUA:function(){
        var self = this
        fetch('http://api.userstack.com/detect?access_key=96c9e83d40c6402d9867e54e24bd0619&ua=' + window.navigator.userAgent)
        .then(function(response){
          return response.json()
        })
        .then(function(json){
          self.api.ua = json
        })
      }
    },
    created:function(){
      this.init()
      this.construct()
      this.configuration()

      this.getIP()
      this.getUA()
    },
    mounted:function(){
      var self = this
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

      Fingerprint2.getV18(function(murmur,components){
        Promise.all(self.import(self.script)).then(function(success){
          if (!self.has_exception && !self.debug) {
            self.$emit('loaded', murmur,self._data)
          }
        })
      })

    }
  }
</script>
 <style>
.init.ui th,
.init.ui td{
  padding:0 !important;
}
.init.ui th:first-child,
.init.ui td:first-child{
  width:2em !important;
}
.init.ui .icon{
  margin:0;
}
.init.ui table{
  width:100% !important;
}
.init.ui .ui.attached.table{
  margin: 0;
}
</style>