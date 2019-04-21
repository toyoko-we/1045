'use strict'

document.ui =
{
  
  data:{
    animate:function()
    {
      /*
       * わざわざJS側に書くのはVUEのマウントを待っているってこと
       * 直接HTMLに書くと、多分、描画される前にというよりJSの読込とか
       * ああいった内部的な処理の間にレンダリングされない場合があるんじゃないかな
       * だからこうしてる。マウントが終わってからならキチンとアニメーションされる...はず
       * 別にwindow.load()でもいいんだけれど。ちょっとChrome Developer Toolをみるか
       */
      $('#view').addClass('animated zoomIn fast')
      $('#counter').addClass('animated bounceIn fast')
    }
  },
  ready:function(){
    this.data.animate()
  }
  
}

document.addEventListener('DOMContentLoaded',function(){

  Vue.use(VueGun)
  Vue.use(VueLoader)

  new Vue({
    el:'main',
    components:[
      'url:component/form/data-table.vue',
      'url:component/form/numeric-up-down.vue'
    ],
    data:{
      db:0,
      uid:0,
      userList:null,
      src:[],
      srcFilters:['name','floor','bed','bath','check'],
      user:null,
      userData:{
        name:'・ω・',
        floor:0,
        bed:null,
        bath:null,
        check:null
      }
    },
    methods:{
      init:function(){
        /*
         * bye()がうまくいかなかった時に
         * ユーザがユーザリストに残り続ける場合がある
         * NULLを手動で入れることも出来るけれどどのみち
         * 日毎に変えればそういった心配をする必要もなくなる
         */
        this.db = moment().format('YMD')
        /*
         * 仮だよ
         * GunにはRANDOM.TEXTがあるけれど
         * これはいづれフィンガープリントの値にする
         */
        this.uid = moment().format('x')
        /*
         * ユーザを取得
         */
        this.user = this.$gun.get(this.uid)
        /*
         * ユーザリストを取得
         */
        this.userList = this.$gun.get(this.db)
      },
      sync:function(){
         this.user.put(this.userData)
         this.userList.set(this.user)
      }
    },
    created:function(){
      this.init()

      /*
       * ユーザにデータを登録
       */
      this.user.put(this.userData)

      // これは昔のJS用、本当なら =>で書きたい
      var self = this
      /*
       * 本当はonce()を使ってレコード毎にデータを取りたいところだが
       * 少量だし、ホテルのWIFIを利用すればデータ通信量も気にはならない
       * ただ、更新時のデータの整合性が気になる、改良の必要がありそうだ
       */
      this.userList.open(function(data){
        // NULLを省きたいだけだよ
        self.src = _.filter(data)
      })

      this.userList.set(this.user)
      // ユーザがアプリを終了した時、つまりタブを閉じるとか
      // ブラウザを閉じたときに自動的にNULLを入れて
      // ユーザリストから削除しよう
      // 今のところGUNにキーを消す機能はない
      // また、bye()は古いデータにアクセスしているから
      // プルリクエストを送っておくべきか（メールはして返信あったんだけど）
      this.userList.get(this.uid).bye().put(null);

    },
    mounted:function(){

      var self = this
      var gui = new dat.GUI({autoPlace:false})
          gui.add(this.userData,'name').name('名前は？').onChange(function(value){
            self.sync()
          })
          // ホテルが何階から何階まであって１フロアずつ増減・自分がどのフロアにいるってこと
          gui.add(this.userData,'floor').min(0).max(12).step(1).name('今何階？').onChange(function(value){
            value = parseInt(value)
            self.sync()
          })

      document.ui.ready()

      $('#user-controller').append(gui.domElement)

      $('.menu .browse')
      .popup({
        inline     : true,
        hoverable  : true,
        position   : 'top left',
        delay: {
          show: 300,
          hide: 800
        }
      })
    ;

    }
  })

})