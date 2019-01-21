<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecosystem-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      title="所有租户"
      selection-row
      index-row
      add-mode
      :add-button="addButton"
      :rowHandle="rowHandle"
      :form-template="formTemplate"
      :form-rules="formRules"
      :form-options="formOptions"
      :pagination="pagination"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
      @selection-change="handleSelectionChange"/>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import { mapActions } from 'vuex'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [        
        {
          title: '姓名',
          key: 'name',
          width: '180'
        },
        {
          title: '租户名称',
          key: 'tenancyName'
        },
        {
          title: '激活',
          key: 'isActive'
        },
        {
          title: 'ID',
          key: 'id',
          width: '60',
          sortable: true
        },
      ],
      data: [],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      rowHandle: {
        columnHeader: '编辑表格',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small',
        },
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true,
        }
      },
      formTemplate: {
        id: {
          title: 'ID',
          value: '',
          component: {
            span: 12,
            disabled: true
          }
        },
        name: {
          title: '姓名',
          value: '',
        },
        tenancyName: {
          title: '租户名称',
          value: '',
          component: {
            span: 24
          }
        },
        isActive: {
          title: '激活',
          value: false,
          component: {
            name: 'el-switch',
            span: 12
          }
        },
      },
      formRules: {
        name: [ { required: true, message: '请输入名称', trigger: 'change' } ],
        tenancyName: [ { required: true, message: '请输入租户名称', trigger: 'blur' } ]
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
      this.GetAll({
        vm: this,
        skipCount:(this.pagination.currentPage-1)*this.pagination.pageSize,
        maxResultCount:this.pagination.pageSize}).then(res=>{
          console.log("datas: ",res)
         this.data =  res.result
        })
  },
  methods: {
    ...mapActions('d2admin/Tenants', [
      'GetAll'
    ]),
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        done()
        this.formOptions.saveLoading = false
      }, 300);
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowRemove ({index, row}, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
    },
    handleSelectionChange (selection) {
      console.log(selection)
    }
  }
}

</script>
