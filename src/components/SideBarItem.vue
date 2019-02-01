<template>
  <!-- 如果当前 subroute 柚子节点 -->
  <el-submenu v-if="!subroute.hidden && subroute.children && subroute.children.length > 0"
      :index="genPath(fatherpath, subroute.path)">
    <!-- 创建分组菜单 -->
    <template slot="title">
      <!-- 图标 -->
        <i :class="subroute.icon"></i>
        <span slot="title">{{subroute.name}}</span>
    </template>
    <!-- 递归调用自身，直到subroute不含子节点 -->
    <SideBarItem v-for="(submenu, subidx) in subroute.children"
      :key="barIdx + '-' + subidx"
      :subroute="submenu"
      :fatherpath="genPath(fatherpath, subroute.path)"></SideBarItem>
  </el-submenu>
  <!-- 当前节点不含子节点且显示 -->
  <el-menu-item v-else-if="!subroute.hidden"
    style="font-weight:400;"
    :index="genPath(fatherpath, subroute.path)">
      <template slot="title">
        <i :class="subroute.icon"></i>
        <span slot="title">{{subroute.name}}</span>
    </template>
    </el-menu-item>
    <el-menu-item v-else
      style="font-weight:400;"
      :index="genPath(fatherpath, subroute.path)">
        <template slot="title">
        <i :class="subroute.icon"></i>
        <span slot="title">{{subroute.name}}</span>
    </template>
      </el-menu-item>
</template>
<script>
export default {
  name: 'SideBarItem',
  props: {
    subroute: {
      type: Object
    },
    barIdx: {
      type: [String, Number]
    },
    fatherpath: {
      type: String
    }
  },
  computed: {
    // 默认激活的路由，用来激活菜单选中状态
    defaultActive: function () {
      return this.$route.path
    }
  },
  methods: {
    // 生成侧边栏路由，格式：/a/b/c
    genPath: function () {
      let arr = [...arguments]
      let path = arr.map(v => {
        while (v[0] === '/') {
          v = v.substring(1)
        }
        while (v[-1] === '/') {
          v = v.substring(0, v.length)
        }
        return v
      }).join('/')
      path = path[0] === '/' ? path : '/' + path
      return path
    },
    handleOpen: function (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose: function (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    console.log('sidebar routes:', this.routes)
  }
}
</script>
