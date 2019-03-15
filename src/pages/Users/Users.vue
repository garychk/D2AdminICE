<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-Users">
    <template slot="header">管理员</template>
    <template>
      <div>
        <d2-crud
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :form-template="formTemplate"
          :form-options="formOptions"
          :form-rules="formRules"
          :rowHandle="rowHandle"
          selection-row
          @selection-change="handleSelectionChange"
          @row-add="handleRowAdd"
          @row-edit="handleDialogEdit"
          @row-remove="handleRowRemove"
          @dialog-cancel="handleDialogCancel"
          @pagination-current-change="paginationCurrentChange"
        >
          <add-button slot="headerButton"/>
          <el-button slot="headerButton" icon="el-icon-refresh" size="small" type="success" @click="refreshData">刷新</el-button>
          <el-button slot="headerButton" type="danger" icon="el-icon-delete" size="small">删除</el-button>
        </d2-crud>
      </div>
    </template>
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
import AddDialog from "./components/AddDialog";
import { mapActions } from "vuex";
import util from "@/libs/util.js";
export default {
  components: {
    "add-button": AddDialog
  },
  name: "UsersForm",
  data() {
    return {
      columns: [
        {
          title: "用户名",
          dataIndex: "userName",
          key: "userName"
        },
        {
          title: "电子邮箱",
          dataIndex: "emailAddress",
          key: "emailAddress"
        },
        {
          title: "创建时间",
          dataIndex: "creationTime",
          key: "creationTime",
          formatter: this.formatDate
        },
        {
          title: "有效",
          dataIndex: "isActive",
          key: "isActive",
          filters: [
            { text: "有效", value: true },
            { text: "无效", value: false }
          ],
          filterMethod(value, row) {
            return row.isActive === value;
          },
          filterPlacement: "bottom-end"
        },
        {
          title: "上次登录时间",
          dataIndex: "lastLoginTime",
          key: "lastLoginTime",
          width: 240,
          sortable: true,
          formatter: this.formatDate
        }
      ],
      data: [],
      loading: true,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        layout: "prev, pager, next, total"
      },
      options: {
        stripe: true
      },
      rowHandle: {
        columnHeader: "操作",
        edit: {
          icon: "el-icon-edit",
          text: "编辑",
          size: "small"
        },
        remove: {
          icon: "el-icon-delete",
          text: "删除",
          type: "danger",
          size: "small",
          disabled(index, row) {
            if (row.userName == "admin") {
              return true;
            }
            return false;
          }
        }
      },
      formTemplate: {
        userName: {
          title: "用户名",
          component: {
            name: "el-input",
            disabled: true,
            span: 12
          }
        },
        id: {
          title: "ID",
          component: {
            name: "el-input",
            disabled: true,
            span: 12
          }
        },
        name: {
          title: "姓",
          component: {
            name: "el-input",
            clearable: true,
            span: 6
          }
        },
        surname: {
          title: "名",
          component: {
            name: "el-input",
            clearable: true,
            span: 6
          }
        },
        fullName: {
          title: "全称",
          component: {
            name: "el-input",
            disabled: true,
            span: 6
          }
        },
        emailAddress: {
          title: "邮箱",
          component: {
            name: "el-input",
            clearable: true
          }
        },
        roleNames: {
          title: "角色",
          component: {
            name: "el-input",
            visible: false
          },
          visible: false
        },
        lastLoginTime: {
          title: "上次登录时间",
          component: {
            name: "el-date-picker",
            type: "datetime",
            disabled: true,
            span: 8
          }
        },
        creationTime: {
          title: "创建时间",
          component: {
            name: "el-date-picker",
            type: "datetime",
            disabled: true,
            span: 8
          }
        },
        isActive: {
          title: "有效",
          component: {
            name: "el-switch"
          }
        }
      },
      formOptions: {
        labelWidth: "120px",
        labelPosition: "right",
        saveLoading: false
      },
      formRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓", trigger: "blur" }],
        surname: [{ required: true, message: "请输入名", trigger: "blur" }],
        emailAddress: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.fetchData(this.pagination.currentPage, this.pagination.pageSize);
  },
  methods: {
    ...mapActions("d2admin/account", [
      "GetAllUser",
      "UserCreateOrUpdate",
      "UserDel"
    ]),
    paginationCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchData(currentPage, this.pagination.pageSize);
    },
    formatDate(row, column, cellValue, index) {
      var timestr = new Date(cellValue);
      return util.Dtformat("yyyy-MM-dd hh:mm:ss", timestr);
    },
    fetchData(page, pageSize) {
      this.loading = true;
      this.GetAllUser({
        SkipCount: (page - 1) * pageSize,
        MaxResultCount: pageSize
      })
        .then(res => {
          this.data = res.result;
          this.pagination.total = res.result.length;
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.loading = false;
        });
    },
    handleRowAdd(row, done) {
      this.formOptions.saveLoading = true;
      this.UserCreateOrUpdate(row).then(async res => {
        console.log(res);
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
      done({
        address: "我是通过done事件传入的数据！"
      });
      this.formOptions.saveLoading = false;
    },
    handleDialogCancel(done) {
      this.$message({
        message: "取消保存",
        type: "warning"
      });
      done();
    },
    handleDialogEdit(datas, done) {
      this.formOptions.saveLoading = true;
      this.UserCreateOrUpdate(datas.row).then(async res => {
        console.log(res);
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
      this.formOptions.saveLoading = false;
      done();
    },
    handleRowRemove({ index, row }, done) {
      this.UserDel({ id: row.id }).then(async res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
      done();
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
    refreshData() {
      this.loading = true;
      this.fetchData(this.pagination.currentPage, this.pagination.pageSize);
    },
    handleAddDialog() {
      console.log(AddDialog);
      AddDialog.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Users.scss";
</style>
