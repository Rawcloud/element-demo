<template>
  <div>
    <div class="app-side-logo"
      :width="isCollapse ? '60' : '60'"
       @click.prevent="toggleSideBar"
       height="60">
       <img src="../../static/img/selflive.jpg" class="round_icon" :style="imgstyle"/>
    </div>
    <el-menu router :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    :collapse="isCollapse">
        <SideBarItem
          v-for="(item, idx) in routes"
          :key="idx"
          :subroute="item"
          :fatherpath="fatherPath"
          :barIdx="idx"></SideBarItem>
    </el-menu>
  </div>
</template>
<script>
import SideBarItem from './SideBarItem'
export default {
  components: {
    SideBarItem
  },
  data () {
    return {
      isCollapse: false,
      classApse: 'app-side-collaped'// : 'app-side-expaned'
      // imgstyle: 'margin-left:80px;'
    }
  },
  name: 'SideBar',
  props: {
    collapse: {
      type: Boolean
    },
    routes: {
      type: Array
    },
    imgstyle: {
      type: String
    }
  },
  computed: {
    //   首次进入页面时展开当前页所属的菜单
    defaultActive () {
      return this.$route.path
    },
    // 直接获取路由器配置的'/'项
    fatherPath () {
      return this.$router.options.routes[1].path
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
