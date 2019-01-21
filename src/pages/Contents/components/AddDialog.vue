<template>
  <div :style="style.addDialog">
    <el-button
      icon="el-icon-plus"
      type="primary"
      size="small"
      @click="dialogFormVisible = true"
      v-if="actkey === 'add'"
    >新增</el-button>
    <el-button
      icon="el-icon-edit"
      type="primary"
      size="small"
      @click="dialogFormVisible = true"
      v-if="actkey === 'edit'"
    >编辑</el-button>

    <el-dialog title="新增内容" :visible.sync="dialogFormVisible">
      <el-tabs type="card" v-model="activeTab">
        <el-tab-pane label="基础内容" name="first">
          <el-form :model="pageModel" :rules="rules" ref="ruleForm">
            <el-form-item label="分类" :label-width="formLabelWidth" prop="categoryId">
              <el-col :span="8">
                <el-select v-model="pageModel.categoryId" clearable placeholder="请选择">
                  <el-option
                    v-for="item in categories"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-checkbox v-model="pageModel.isTop" label="置顶"></el-checkbox>
                <el-checkbox v-model="pageModel.isRec" label="推荐"></el-checkbox>
                <el-checkbox v-model="pageModel.isHot" label="热"></el-checkbox>
              </el-col>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
              <el-input v-model="pageModel.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" :label-width="formLabelWidth" prop="subTitle">
              <el-input v-model="pageModel.subTitle"></el-input>
            </el-form-item>
            <el-form-item
              label="内容"
              :label-width="formLabelWidth"
              prop="contents"
              style="display:none"
            >
              <el-input type="textarea" v-model="pageModel.contents"></el-input>
            </el-form-item>
            <el-form-item label="摘要" :label-width="formLabelWidth" prop="summary">
              <el-input type="textarea" v-model="pageModel.summary"></el-input>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth" prop="tags">
              <el-input v-model="pageModel.tags"></el-input>
            </el-form-item>
            <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
              <el-input v-model="pageModel.author"></el-input>
            </el-form-item>
            <el-form-item label="视频地址" :label-width="formLabelWidth" prop="videoUrl">
              <el-input placeholder="请输入URL地址" v-model="pageModel.videoUrl">
                <template slot="prepend">Http://</template>
              </el-input>
            </el-form-item>
            <el-form-item label="有效日期" :label-width="formLabelWidth" prop="endTime">
              <el-date-picker v-model="pageModel.endTime"></el-date-picker>
            </el-form-item>
            <el-form-item
              label="扩展属性"
              :label-width="formLabelWidth"
              prop="extendAttr"
              style="display:none"
            >
              <el-input v-model="pageModel.extendAttr"></el-input>
            </el-form-item>
            <el-form-item label="ID" :label-width="formLabelWidth" prop="id" style="display:none">
              <el-input v-model="pageModel.id"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="详细内容" name="second">
          <quill-editor
            ref="myTextEditor"
            :content="pageModel.contents"
            :options="editorOption"
            @change="onEditorChange($event)"></quill-editor>
        </el-tab-pane>
        <el-tab-pane label="多媒体文件" name="third">
          <el-form>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="imageUrl">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogImgVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-form-item>
            <el-form-item label="文件地址" :label-width="formLabelWidth" prop="fileUrl">
              <el-col :span="8">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-col>
              <el-col :span="11">只能上传word/excel/pdf文件，且不超过500kb</el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import util from "@/libs/util.js";
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      style: {
        addDialog: {
          display: "inline-block",
          marginRight: "8px"
        }
      },
      dialogFormVisible: false,
      fileList: [],
      dialogImageUrl: "",
      dialogImgVisible: false,
      activeTab: "first",
      categories: [
        {
          value: 1,
          label: "新闻"
        },
        {
          value: 0,
          label: "话题"
        }
      ],
      pageModel: {
        title: "string",
        subTitle: "string",
        contents: "string",
        creatorUserId: util.cookies.get("uuid"),
        tenantId: 1,
        categoryId: 0,
        tags: "string",
        isTop: false,
        isRec: false,
        isHot: false,
        author: "string",
        imageUrl: "string",
        fileUrl: "string",
        videoUrl: "string",
        summary: "string",
        endTime: new Date(),
        extendAttr: "string",
        id: 0
      },
      rules: {
        title: [{ required: true, message: "必填选项", trigger: "blur" }],
        contents: [{ required: true, message: "必填选项", trigger: "blur" }],
        author: [{ required: true, message: "必填选项", trigger: "blur" }],
        summary: [{ required: true, message: "必填选项", trigger: "blur" }],
        tags: [{ required: true, message: "必填选项", trigger: "blur" }]
      },
      formLabelWidth: "80px",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ]
        },
        height:280
      }
    };
  },
  props: {
    row: {
      type: Object,
      default: {}
    },
    actkey: {
      type: String,
      default: "add"
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  methods: {
    ...mapActions("d2admin/Contents", ["CreateOrUpdate"]),
    onEditorChange(editor) {
      this.pageModel.contents = editor.html;
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.CreateOrUpdate(this.pageModel)
          .then(async res => {
            if (res.success) {
              this.$message.success("添加成功！");
              this.dialogFormVisible = false;
            } else {
              console.log("err: ", res.error);
            }
          })
          .catch(err => {
            console.log("err: ", err);
          });
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>