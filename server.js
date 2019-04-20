'use strict';

/*
 * 認証用のパスワードを暗号化
 */
const auth = require('argon2')
      auth.accounts = {
        guest : { name:'ゲスト', password: '$argon2i$v=19$m=4096,t=3,p=1$xq9mMWOsJuIdt1k4ttcdyw$LIGw0gvLf17mHf6Glo9Qnww+losx8mX4D8/unO3gBS4' },
        admin : { name:'管理者', password: '$argon2i$v=19$m=4096,t=3,p=1$lPaGunvVA1K+GTogh0cKWg$9ayfcVfvzp/n3jsGyGj5JjtHQp6RVvXruF9K3FXDeow' }
      }

/*
 * BASIC認証
 * すぐ破られるだろうけれど、回数制限やセッション発行などは次回
 */
const authValidate = async function(request,name,pw,h){
  var user = auth.accounts[name]
   if(user && await auth.verify(user.password,pw))
     return { isValid:true, credentials:{} }
   else
     return { isValid:false, credentials:null } 
}

/*
 * HTTP-SERVER
 * HAPIのテストコードとリファレンスを参考
 */
const http    = require('hapi'),
      httpApp = http.server({
        routes:{
          files:{
            relativeTo:`${__dirname}/app/`
          }
        },
        address:process.env.IP || '192.168.11.8',
        host:process.env.HOST  || '192.168.11.8',
        port:process.env.PORT  || 8080
      })

/*
 * GUN-DB
 * 分散型データベース。今回の要
 */
var Gun = require('gun')
require('gun/lib/bye.js')

const gunDB = new Gun({
  web:httpApp.listener,
  localStorage:false,
  radisk:false,
  file:null,
})

/*
 * BASIC認証 + IPによる制限（ホテルのローカルネットワーク限定にしようかと..）
 */
async function init(){
  await httpApp.register(require('inert'))
  await httpApp.register(require('hapi-auth-basic'))
  await httpApp.register(require('hapi-auth-ip-whitelist'))
  await httpApp.register({
    plugin:require('blipp'),
    options:{
      showAuth: true,
      showScope:true,
      showStart:true,
    }
  })
}

async function setup(){

  await init()

  httpApp.auth.strategy('simple', 
    'basic', { validate:authValidate })
    
  httpApp.route([
    {
      path:'/{any*}',
      method:['GET'],
      config:{
        auth:'simple',
        description: 'ファイルとフォルダの返却用',
      },
      handler:{
        directory:{
          listing:true,
          index:true,
          path:'.',
        }
      }
    }
  ])

  await  httpApp.start()
  return httpApp
}

function startup(server){
  console.dir(`Server listening on ${server.info.uri}`)
}

setup()
  .then(startup).catch(function(error){
})
