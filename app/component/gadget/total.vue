 <template>
  <div class='total-table'>
    <table v-ui-total-table>
      <thead>
        <tr>
          <th
            v-for='col in keys'>
              <i
                :class="['icon',col]"></i>
         </th>
       </tr>
     </thead>
      <tbody>
        <tr>
          <td
            v-for='col in keys'
            v-text='_.sumBy(rows,col)'></td>
       </tr>
     </tbody>
   </table>
 </div>
</template>
 <script>
  module.exports = {
    directives:{
      'ui-total-table':{
        inserted:function(el){
          el.classList.add('ui','table','unstackable','icon','very','basic')
          el.classList.add('fixed','center','aligned','celled','teal')
        }
      }
    },
    props:{
      rows:{
        default:null,
        type:Object
      },
      keys:{
        default:null,
        type:Object
      }
    },
    computed:{
      'values':function(){
        return _.values(this.rows)
      },
      'a':function(){
        return _.sumBy(this.rows,function(obj){
          return obj.key !== null
        })
      }
    }
  }
</script>
 <style>
.total-table .ui thead th,
.total-table .ui tbody td{
  padding:0;
}
.total-table .ui thead th .icon{
  margin:0;
}
</style>