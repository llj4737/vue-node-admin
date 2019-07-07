<template>
  <div class="login">
    <h1>登录</h1>
    <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(form) {
      let { username, password } = this.user;
      if (username && password) {
        this.$axios.post("/user/login", this.user).then(res => {
          if (res.code === 0) {
            this.$message({showClose: true, message: "登录成功", duration: 1000, type: "success"});
            localStorage.setItem("token", res.token);
            this.$router.push("/home");
          } else {
            this.$message({showClose: true, message: res.msg, duration: 1000, type: "error"});
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
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