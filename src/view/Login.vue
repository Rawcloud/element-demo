<template>
    <div class="login-container" >
        <h2 v-text="systemname" style="margin-top:100px;"></h2>
        <el-form :model="ruleForm2"
            :rules="rules2"
            status-icon
            ref="ruleForm2"
            label-position="right"
            label-width="0x"
            class="demo-ruleForm login-page"
        >
            <h3>系统登陆</h3>
            <el-form-item prop="username">
                <el-input type="text"
                v-model="ruleForm2.username"
                auto-complete="false"
                prefix-icon="iconfont icon-user"
                placeholder="用户名">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                type="password"
                v-model="ruleForm2.password"
                auto-complete="false"
                prefix-icon="iconfont icon-yaoshi-"
                placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-checkbox
            v-model="checked"
            class="rememberme">
            记住密码
            </el-checkbox>
            <el-form-item style="width:100%;">
            <el-button
            type="primary"
            style="width:100%;"
            @click="handleSubmit"
            :loading="loging">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loging: false,
      ruleForm2: {
        username: 'admin',
        password: '123456'
      },
      rules2: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      checked: false,
      systemname: 'Element ui demo'
    }
  },
  methods: {
    handleSubmit (event) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          loading.close()
          this.loginig = true
          if (this.ruleForm2.username === 'admin' && this.ruleForm2.password === '123456') {
            this.loging = false
            sessionStorage.setItem('user', this.ruleForm2.username)
            // 登陆成功 保存帐号密码
            if (this.rememberme) {
              this.setCookie(this.ruleForm2.username, this.ruleForm2.password, 7)
            } else {
              this.deleteCookie()
            }
            this.$router.push({path: '/'})
          } else {
            this.loging = false
            this.$alert('用户名或密码错误', '提示', {
              confirmButtonText: '确定'
            })
          }
        } else {
          loading.close()
          console.log('登陆失败！')
          return false
        }
      })
    },
    setCookie (name, pass, days) {
      let expire = new Date()
      expire.setDate(expire.getDate() + days)
      document.cookie = `C-username=${name};expires=${expire}`
      document.cookie = `C-password=${pass};expires=${expire}`
    },
    getCookie () {
      if (document.cookie.length) {
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            this.ruleForm2.username = arr2[1]
          } else if (arr2[0] === 'C-password') {
            this.ruleForm2.password = arr2[1]
            this.rememberme = true
          }
        }
      }
    },
    // 修改为空，天数为-1
    deleteCookie () {
      this.setCookie('', '', -1)
    }
  },
  mounted () {
    this.getCookie()
  }
}
</script>
<style scoped>
html,body {
  height: 100%;
}
.login-container {
    width: 100%;
    height: 100%;
    text-align: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding:0px;
    margin:0px;
    position:absolute;
    top:0px;
    left:0px;
    width:100%;
    border:hidden;
    background:#E0FFFF
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 130px auto;
    width: 350px;
    padding: 35px 35px 50px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>
