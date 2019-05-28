document.alias={
  'grid':{
    inserted:function(el){
      el.classList.add('ui','grid','padded')
    }
  },
  'splash':{
    inserted:function(el){
      el.classList.add('ui','active','inverted','dimmer')
    }
  },
  'sign':{
    inserted:function(el){
      el.classList.add('ui','label','compact')
    }
  },
  'control':{
    inserted:function(el){
      el.classList.add('ui','card')
    }
  },
  'controls':{
    inserted:function(el){
      el.classList.add('ui','stackable','cards')
    }
  }
}

document.form=[
  'url:form/boot.vue',
  'url:form/startup.vue'
]

document.addEventListener('DOMContentLoaded',function(){
  Vue.use(VueLoader)
  Vue.directive('visible',{
    update:function(el,binding,vnode){
      el.style.visibility = binding.value ? 'visible' : 'hidden'
    }
  })

  new Vue({
    el:'main',
    components:this.form,
    data:{
      param:null,
      isLoading:true
    },
    methods:{
      init:function(){
        this.isLoading = false
      }
    },
    created:function(){
      this.param = new URL(window.location).searchParams
      for(name in document.alias){
        Vue.directive(name,document.alias[name])
      }
    }
  })
})