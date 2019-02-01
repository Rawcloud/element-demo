<template>
  <div>
    <Header></Header>
      <div :style="height">
        <el-scrollbar class="default-scrollbar"  wrap-class="default-scrollbar__wrap" view-class="p20-scrollbar__view">
          <ul v-if="ifshow">
            <li v-for="(i, index) in list" :key="index">
              <time v-text="$utils.goodTime(i.create_at)"></time>
              <!-- <router-link :to="'/content/'+i.id">
                {{i.title}}
              </router-link> -->
              <a @click="showDetails(i.id)" style="text-decoration:underline;color:blue;" title="点击显示详情">{{i.title}}</a>
            </li>
          </ul>
          <Content v-if="!ifshow" :id="articleId"></Content>
        </el-scrollbar>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Content from '../../view/article/content'
let moment = require('moment')
export default {
  components: {Header, Footer, Content},
  data () {
    return {
      list: [],
      screenHeight: window.innerHeight,
      height: window.innerHeight * 0.7,
      ifshow: true,
      articleId: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topics', null, r => {
        this.list = this.sortKey(r.data, 'create_at')
      })
    },
    showDetails (atid) {
      this.articleId = atid
      this.ifshow = !this.ifshow
    },
    goBack () {
      this.ifshow = !this.ifshow
    },
    // 集合排序
    sortKey (arr, key) {
      return arr.sort(function (a, b) {
        var x = moment(a[key], 'YYYY-MM-DD')
        var y = moment(b[key], 'YYYY-MM-DD')
        return (y.diff(x) > -1) ? (y.diff(x) > 0 ? 1 : 0) : -1
      })
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight
        console.log(window.innerHeight)
        that.height = that.screenHeight * 0.7
      })()
    }
    // 判断浏览器是否支持popstate
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  // 页面销毁时，取消监听。否则其他vue路由页面也会被监听
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false)
  }
}
</script>
