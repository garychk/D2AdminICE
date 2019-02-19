<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecosystem-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :loading="loading"
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
      @selection-change="handleSelectionChange"
    >
      <el-button slot="headerButton" icon="el-icon-refresh" size="small" type="success" @click="fetchData">刷新</el-button>
    </d2-crud>
  </div>
</template>

<script>
import Vue from "vue";
import D2Crud from "@d2-projects/d2-crud";
import { mapActions } from "vuex";

Vue.use(D2Crud);

export default {
  data() {
    return {
      columns: [
        {
          title: "名称",
          key: "name",
          width: "180"
        },
        {
          title: "租户名称",
          key: "tenancyName"
        },
        {
          title: "激活",
          key: "isActive"
        },
        {
          title: "ID",
          key: "id",
          width: "100",
          sortable: true
        }
      ],
      data: [],
      loading: true,
      createData: {
        tenancyName: "",
        name: "",
        adminEmailAddress: "",
        connectionString: "",
        isActive: true
      },
      addButton: {
        icon: "el-icon-plus",
        size: "small",
        type: "primary"
      },
      rowHandle: {
        columnHeader: "编辑表格",
        edit: {
          icon: "el-icon-edit",
          text: "编辑",
          size: "small"
        },
        remove: {
          icon: "el-icon-delete",
          size: "small",
          fixed: "right",
          confirm: true,
          disabled(index, row) {
            if (row.name == "Default") {
              return true;
            }
            return false;
          }
        }
      },
      formTemplate: {
        id: {
          title: "ID",
          value: "",
          component: {
            span: 12,
            disabled: true
          }
        },
        name: {
          title: "名称",
          value: ""
        },
        tenancyName: {
          title: "租户名称",
          value: "",
          component: {
            span: 24
          }
        },
        isActive: {
          title: "激活",
          value: false,
          component: {
            name: "el-switch",
            span: 12
          }
        }
      },
      formRules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }],
        tenancyName: [
          { required: true, message: "请输入租户名称", trigger: "blur" }
        ]
      },
      formOptions: {
        labelWidth: "80px",
        labelPosition: "left",
        saveLoading: false,
        gutter: 20
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("d2admin/Tenants", ["GetAll", "CreateOrUpdate"]),
    handleRowAdd(row, done) {
      this.formOptions.saveLoading = true;
      this.createData.name = row.name;
      this.createData.tenancyName = row.name;
      this.createData.isActive = row.isActive;
      this.createData.adminEmailAddress = row.name + "@demo.com";
      this.CreateOrUpdate(this.createData).then(async res => {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        done();
        this.formOptions.saveLoading = false;
      });
    },
    handleRowEdit({ index, row }, done) {
      this.formOptions.saveLoading = true;
      console.log(index);
      console.log(row);
      this.CreateOrUpdate(row).then(async res => {
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        done();
        this.formOptions.saveLoading = false;
      });
    },
    handleRowRemove({ index, row }, done) {
      setTimeout(() => {
        console.log(index);
        console.log(row);
        this.$message({
          message: "删除成功",
          type: "success"
        });
        done();
      }, 300);
    },
    handleDialogCancel(done) {
      this.$message({
        message: "取消保存",
        type: "warning"
      });
      done();
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
    fetchData() {
      this.loading = true;
      this.GetAll({
        vm: this,
        skipCount: (this.pagination.currentPage - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      }).then(res => {
        this.data = res.result;
        this.loading = false;
      });
    }
  }
};
</script>
