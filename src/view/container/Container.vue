<template>
    <div id="apps">
        <el-container>
            <el-aside class="app-side app-side-left" style="width:'230px';"
            :class="classApse">
                <div class="app-side-logo"
                :width="isCollapse ? '60' : '60'"
                height="60">
                  <img src="../../../static/img/selflive.jpg" class="round_icon" :style="imgstyle"/>
                </div>
                <div>
                    <el-menu default-active="1-4-1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    :collapse="isCollapse">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">导航一</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">分组一</span>
                                <el-menu-item index="1-1">选项一</el-menu-item>
                                <el-menu-item index="1-2">选项二</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <span slot="title">分组二</span>
                                <el-menu-item index="1-3">选项2-1</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <span slot="title">分组三</span>
                                <el-menu-item index="1-4">选项3-1</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
        <el-container>
            <el-header class="app-header">
                <div style="width:60px;cursor:pointer;"
                @click.prevent="toggleSideBar">
                    <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
                    <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
                </div>
                <el-menu default-active="1"
                class="el-menu-demo tab-page"
                mode="horizontal"
                @select="handleSelect"
                active-text-color="#409eff">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-submenu index="2-3">
                            <template slot="title">选项3</template>
                            <el-menu-item index="2-3-1">选项3-1</el-menu-item>
                            <el-menu-item index="2-3-2">选项3-2</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                    <el-menu-item index="4">
                        <a href="#">订单管理</a>
                    </el-menu-item>
                </el-menu>
                <div class="app-header-userinfo">
                    <el-dropdown trigger="hover" :hide-on-click="false">
                        <span class="el-dropdown-link">
                            {{username}}
                            <i class="el-icon-arrow-down el-icon-right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item divied @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main class="app-body">
                <template>
                    <router-view/>
                </template>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      isCollapse: false,
      classApse: 'app-side-collaped', // : 'app-side-expaned'
      imgstyle: 'margin-left:80px;'
    }
  },
  methods: {
    toggleSideBar () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.classApse = 'app-side-collapsed'
        this.imgstyle = 'margin-left:10px;'
      } else {
        this.classApse = 'app-side-expanded'
        this.imgstyle = 'margin-left:80px;'
      }
    },
    logout: function () {
      this.$confirm('确认退出？', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user')
          this.$router.push('/login')
        }).catch(() => {})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted: function () {
    let user = sessionStorage.getItem('user')
    if (user) {
      this.username = user
    }
  }
}
</script>
