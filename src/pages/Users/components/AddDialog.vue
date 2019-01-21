<template>
  <div :style="style.addDialog">
    <el-button icon="el-icon-plus" type="primary" size="small" @click="dialogFormVisible = true">新增</el-button>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="userModel" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="userModel.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓" :label-width="formLabelWidth" prop="name">
          <el-input v-model="userModel.name"></el-input>
        </el-form-item>
        <el-form-item label="名" :label-width="formLabelWidth" prop="surname">
          <el-input v-model="userModel.surname"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop="emailAddress">
          <el-input v-model="userModel.emailAddress"></el-input>
        </el-form-item>
        <el-form-item label="有效" :label-width="formLabelWidth" prop="isActive">
          <el-switch v-model="userModel.isActive"></el-switch>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="userModel.password"></el-input>
        </el-form-item>
        <el-form-item label="权限组" :label-width="formLabelWidth" prop="roleNames">
          <el-checkbox-group v-model="userModel.roleNames">
            <el-checkbox label="Admin"></el-checkbox>
            <el-checkbox label="Guest"></el-checkbox>
          </el-checkbox-group>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      style: {
        addDialog: {
          display: "inline-block",
          marginRight: "8px"
        }
      },
      dialogFormVisible: false,
      userModel: {
        userName: "",
        name: "",
        surname: "",
        emailAddress: "",
        isActive: false,
        roleNames: [],
        password: ""
      },
      rules: {
        userName: [{ required: true, message: "必填选项", trigger: "blur" }],
        name: [{ required: true, message: "必填选项", trigger: "blur" }],
        surname: [{ required: true, message: "必填选项", trigger: "blur" }],
        emailAddress: [
          { required: true, message: "必填选项", trigger: "blur" }
        ],
        password: [{ required: true, message: "必填选项", trigger: "blur" }]
      },
      props: { },
      formLabelWidth: "80px"
    };
  },
  computed: {},
  methods: {
    ...mapActions("d2admin/account", ["GetAllUser", "UserCreateOrUpdate"]),
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.UserCreateOrUpdate(this.userModel)
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
    }
  }
};
</script>