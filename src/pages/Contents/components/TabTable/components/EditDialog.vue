<template> 
  <div :style="style.editDialog">
    <el-button @click="handleColumnClick(row)" type="primary" size="mini" round v-if="actkey === 'action'">编辑</el-button>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formRow" :rules="rules" ref="ruleForm">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="formRow.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" :label-width="formLabelWidth" prop="subTitle">
          <el-input v-model="formRow.subTitle"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth" prop="tags">
          <el-input v-model="formRow.tags"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="formRow.author"></el-input>
        </el-form-item>
        <el-form-item label="置顶" :label-width="formLabelWidth" prop="isTop">
          <el-checkbox v-model="formRow.isTop"></el-checkbox>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth" prop="lastModificationTime">
          <el-date-picker v-model="formRow.lastModificationTime"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { async } from 'q';

export default {
  data() {
    return {
      style: {
        editDialog: {
          display: 'inline-block',
          marginRight: '5px',
        },
      },
      dialogFormVisible: false,
      rules: {
        title: [
          { required: true, message: '必填选项', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '必填选项', trigger: 'blur' }
        ],
        isTop: [
          { required: true, message: '必填选项', trigger: 'blur' }
        ],
        creationTime: [
          { required: true, message: '必填选项', trigger: 'blur' }
        ],
      },
      formLabelWidth: '80px',
    };
  },
  computed: {
    formRow() {
      return this.row; //Object.assign({}, this.row); //复制row
    },
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
    ...mapActions('d2admin/Contents', ['CreateOrUpdate']),
    handleColumnClick(row) {
      this.dialogFormVisible = true;
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        
        this.CreateOrUpdate(this.formRow).then(async res => {          
          if(res.success){
            this.$message.success('更新成功！')
            this.$emit('handleMod', this.formRow, this.index, this.tabKey);
            this.dialogFormVisible = false;   
          }else{
            console.log('err: ', res.error)
          }
        }).catch(err => {
          console.log('err: ', err)
        })

      });
    },
  },
};
</script>
