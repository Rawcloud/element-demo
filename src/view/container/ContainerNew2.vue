<template>
    <div id="apps">
        <el-container>
            <el-aside class="app-side app-side-left"
            :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
             <SideBar :imgstyle="imgstyle" :collapse="isCollapse" :routes="$router.options.routes[1].children"/>
            </el-aside>
        <el-container>
            <el-header class="app-header">
                <div style="width:60px;cursor:pointer;"
                @click.prevent="toggleSideBar">
                    <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
                    <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
                </div>
                <el-menu default-active="/"
                class="el-menu-demo tab-page"
                mode="horizontal"
                @select="handleSelect"
                active-text-color="#409eff">
                   <el-menu-item index="routePath">{{title}}</el-menu-item>
                </el-menu>
                <div class="app-header-userinfo">
                  <!-- 换肤 -->
                  <div>
                    <el-radio-group v-model="themecolor">
                      <el-radio label="a25fbc">默认-a25fbc</el-radio>
                      <el-radio label="02abfd">默认-02abfd</el-radio>
                      <el-radio label="1b1e24">默认-1b1e24</el-radio>
                    </el-radio-group>
                  </div>
                  <!-- 全屏显示 -->
                  <div class="btn-fullscreen" @click="handleFullScreen">
                      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                          <i class="el-icon-rank"></i>
                      </el-tooltip>
                  </div>
                    <img src="../../../static/img/selflive.jpg" class="round_icon" />
                    <el-dropdown trigger="hover" :hide-on-click="false">
                        <span class="el-dropdown-link">
                            {{username}}
                            <!-- <i class="el-icon-arrow-down el-icon-right"></i> -->
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
import SideBar from '../../components/SideBar'
export default {
  components: {
    SideBar
  },
  data () {
    return {
      username: '',
      isCollapse: false,
      classApse: 'app-side-collaped', // : 'app-side-expaned'
      imgstyle: 'margin-left:80px;',
      defaultActive: '1',
      routePath: '/',
      title: '首页',
      fullscreen: false,
      classH2: 'custom-a25fbc'
    }
  },
  methods: {
    logout: function () {
      this.$confirm('确认退出？', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user')
          this.$router.push('/login')
        }).catch(() => {})
    },
    changeTitle: function (route, item) {
      this.routePath = route.path + '/' + item.path
      this.title = item.name
    },
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
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted: function () {
    this.$utils.toggleClass(document.body, 'custom-' + this.themecolor)
    let curcolor = this.$store.state.themecolor
    this.classH2 = 'custom=' + curcolor
    let user = sessionStorage.getItem('user')
    if (user) {
      this.username = user
    }
  },
  computed: {
    themecolor: {
      get () {
        return this.$store.state.themecolor
      },
      set (val) {
        this.$store.commit('setThemeColor', val)
      }
    }
  },
  watch: {
    themecolor: {
      handler () {
        this.$utils.toggleClass(document.body, 'custom-' + this.themecolor)
      }
    }
  }
}
</script>
<style scoped>
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
</style>
