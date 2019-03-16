<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-Config">
    <template slot="header">系统配置</template>
    <BasicForm/>
    <template slot="footer"><el-tag>项目地址：<a href="https://github.com/garychk/D2AdminICE" target="_blank">https://github.com/garychk/D2AdminICE</a></el-tag> </template>
  </d2-container>
</template>

<script>
import BasicForm from "./components/BasicForm";
// 组件
// 请删除下面代码中你不需要的部分
export default {
  name: 'Config',
  components: {
    BasicForm
  },
  // 数据
  data () {
    return {}
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
  methods: {}
}
</script>

<style lang="scss" scoped>
@import './Config.scss';
</style>
