<template>
  <div class="register">
    <h1>注册</h1>
    <el-form
      :model="user"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="user.password2" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="user.type" placeholder="请选择">
          <el-option label="老板" value="boss"></el-option>
          <el-option label="员工" value="employee"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === this.user.password) {
        callback();
      } else {
        callback(new Error("密码必须相等"));
      }
    };
    return {
      user: {
        username: "",
        password: "",
        password2: "",
        type: "employee"
      },
      rules: {
        username: [
          { min: 3, max: 6, message: "2到6位之间" },
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
          // { validator: validateName, trigger: "blur" },
        ],
        password: [
          { min: 6, max: 10, message: "6到10位之间" },
          // { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            message: "请输入正确的密码",
            trigger: "blur,change"
          }
        ],
        password2: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/user/register", this.user).then(res => {
            if (res.code === 0) {
              this.$message({ showClose: true, message: "注册成功", durations: 1500, type: "success"});
              this.$router.push("/login")
            } else {
              this.$message({ showClose: true, message: res.message, durations: 1500, type: "warn"});
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(/img/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  h1 {
    font-size: 24px;
    color: white;
    margin: 100px auto 0;
  }
  .demo-ruleForm {
    background: white;
    padding: 30px 50px 10px 10px;
    width: 300px;
    margin: 30px auto;
  }
}
</style>