<template>
  <div class="tab-table">
    <basic-container>
      <el-tabs v-model="tabKey" @tab-click="handleClick">
        <el-tab-pane v-for="tab in tabs" :label="tab.tab" :name="tab.key" :key="tab.key">
          <d2-crud
            :columns="columns"
            :data="dataSource[tab.key]"
            :loading="loading"
            :pagination="pagination"
            :rowHandle="rowHandle"
            :form-template="formTemplate"
            :form-options="formOptions"
            selection-row
            @selection-change="handleSelectionChange"
            @row-edit="handleRowEdit"
            @row-remove="handleRowRemove"
            @dialog-cancel="handleDialogCancel"
          >
          </d2-crud>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from "@vue-materials/basic-container";
import DeleteBalloon from "./components/DeleteBalloon";
import EditDialog from "./components/EditDialog";
import AddDialog from "../../components/AddDialog";
import { mapActions } from "vuex";
import util from "@/libs/util.js";

export default {
  components: {
    BasicContainer,
    DeleteBalloon,
    EditDialog,
    AddDialog
  },
  name: "TabTable",

  data() {
    return {
      tabKey: "all",
      dataSource: {
        all: [],
        inreview: [],
        released: [],
        rejected: []
      },
      loading: true,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total:100000,
        layout: 'prev, pager, next, total'
      },
      tabs: [
        { tab: "全部", key: "all" },
        { tab: "已发布", key: "inreview" },
        { tab: "审核中", key: "released" },
        { tab: "已拒绝", key: "rejected" }
      ],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: 50,
          fixed: true,
        },
        {
          title: "标题",
          dataIndex: "title",
          key: "title",
          width: 320,
          fixed: true,
        },
        {
          title: "标签",
          dataIndex: "tags",
          key: "tags"
        },
        {
          title: "作者",
          dataIndex: "author",
          key: "author"
        },
        {
          title: "置顶",
          dataIndex: "isTop",
          key: "isTop"
        },
        {
          title: "更新时间",
          dataIndex: "lastModificationTime",
          key: "lastModificationTime",
          width: 240,
          sortable: true,
          formatter: this.formatDate
        }
      ],
      rowHandle: {
        columnHeader: "操作",
        edit: {
          icon: "el-icon-edit",
          text: "编辑",
          type: "primary",
          size: "small"
        },
        remove: {
          icon: "el-icon-delete",
          text: "删除",
          type: "danger",
          size: "small"
        }
      },
      formTemplate: {
        title: {
          title: "标题",
          component: {
            name: "el-input",
            span: 18
          }
        },
        id: {
          title: "ID",
          component: {
            name: "el-input",
            span: 6,
            disabled: true
          }
        },
        subTitle: {
          title: "副标题"
        },
        contents: {
          title: "内容",
          component: {
            name: "el-input",
            type: "textarea"
          }
        },
        tags: {
          title: "标签",
          component: {
            name: "el-input",
            span: 12
          }
        },
        author: {
          title: "作者",
          component: {
            name: "el-input",
            span: 12
          }
        },
        isTop: {
          title: "置顶",
          component: {
            name: "el-switch",
            span: 6
          }
        },
        isRec: {
          title: "推荐",
          component: {
            name: "el-switch",
            span: 6
          }
        },
        isHot: {
          title: "热",
          component: {
            name: "el-switch",
            span: 6
          }
        }
      },
      formOptions: {
        labelWidth: "120px",
        labelPosition: "right",
        saveLoading: false
      }
    };
  },

  created() {},
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("d2admin/Contents", [
      "GetAll",
      "Del",
      "CreateOrUpdate",
      "Get"
    ]),
    handleClick(tab) {
      console.log(tab);
    },
    handleRowRemove({ index, row }, done) {
      this.Del({
        id: row.id
      }).then(res => {
        console.log(res);
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
      done();
    },
    handleRowEdit(datas, done) {
      console.log(datas.row);
      this.Get({ id: datas.row.id }).then(async res => {
        var model = res.result;
        if (model != null) {
          model.title = datas.row.title;
          model.subTitle = datas.row.subTitle;
          model.contents = datas.row.contents;
          model.tags = datas.row.tags;
          model.author = datas.row.author;
          model.isTop = datas.row.isTop;
          model.isRec = datas.row.isRec;
          model.isHot = datas.row.isHot;
          this.CreateOrUpdate(model)
            .then(async res => {
              if (res.success) {
                this.$message.success("修改成功！");
                done();
              } else {
                console.log("err: ", res.error);
              }
            })
            .catch(err => {
              console.log("err: ", err);
            });
        }
      });
    },
    formatDate(row, column, cellValue, index) {
      var timestr = new Date(cellValue);
      return util.Dtformat("yyyy-MM-dd hh:mm:ss", timestr);
    },
    handleDialogCancel(done) {
      this.$message({
        message: "取消保存",
        type: "warning"
      });
      done();
    },
    fetchData() {
      this.loading = true;
      this.GetAll({
        SkipCount: (this.pagination.currentPage-1)*this.pagination.pageSize,
        MaxResultCount: this.pagination.total
      }).then(res => {
        this.dataSource = res;
        this.loading = false;
      });
    },
    handleSelectionChange(selection) {
      console.log(selection);
    }
  }
};
</script>

<style>
</style>
