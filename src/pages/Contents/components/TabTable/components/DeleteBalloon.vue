<template>
  <el-popover
    placement="bottom"
    width="160"
    v-model="visible">
    <p>确认删除？</p>
    <div style="text-align: left; margin: 0">
      <el-button type="danger" size="mini" @click="handleHide(1)" round>确认</el-button>
      <el-button size="mini" @click="handleHide(0)" round>关闭</el-button>
    </div>
    <el-button type="danger" size="mini" round v-if="actkey === 'action'" slot="reference">删除</el-button>
  </el-popover>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      visible: false,
    };
  },
  props: {
    row: {
      type: Object,
      default: {},
    },
    actkey: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    tabKey: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions('d2admin/Contents', ['Del']),
    handleHide(code) {
      if (parseInt(code) === 1) {
        this.Del({id: this.row.id}).then(async res => {          
          if(res.success){
            this.$message.success('删除成功！')
            this.$emit('handleRemove',this.row, this.index, this.tabKey);
          }
        }).catch(err => {
          console.log('err: ', err)
        })
        
      }
      this.visible = false;
    },
  },
};
</script>
