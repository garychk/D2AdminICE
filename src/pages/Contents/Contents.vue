<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-Contents">
    <template slot="header">内容管理</template>
    <el-button icon="el-icon-refresh" type="success" size="small" @click="refreshTable" style="margin-right:5px">刷新</el-button>
    <add-dialog :actkey="actkey" :row="row" :index="index"/>
    <tab-table ref="tabtable"/>
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
// 组件
import TabTable from './components/TabTable/index'
import AddDialog from './components/AddDialog'
// 请删除下面代码中你不需要的部分
export default {
  name: 'Contents',
  components: {
    TabTable,
    'add-dialog': AddDialog,
  },
  // 数据
  data () {
    return {
      actkey:'add',
      row:{},
      index:0,      
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 事件处理方法
  methods: {
    refreshTable:function(){
        this.$refs.tabtable.fetchData();
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Contents.scss';
</style>
