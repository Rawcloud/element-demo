<template>
  <div>
    <!-- <myHeader></myHeader> -->
        <h2 v-text="dat.title"></h2>
        <p>作者：{{dat.author.loginname}}   发表于：{{$utils.goodTime(dat.creat_at)}}</p>
        <hr>
        <article v-html="dat.content"></article>
        <h3>网友回复：</h3>
        <ul>
            <li v-for="(i,index) in dat.replies" :key="index">
                <p>评论者：{{i.author.loginname}}    评论于：{{$utils.goodTime(i.creat_at)}}</p>
                <article v-html="i.content"></article>
            </li>
        </ul>
    <!-- <myFooter></myFooter> -->
  </div>
</template>
<script>
import myHeader from '../../components/Header'
import myFooter from '../../components/Footer'
export default {
  components: {myHeader, myFooter},
  data () {
    return {
    //   id: this.$route.params.id,
      dat: {}
    }
  },
  props: ['id'],
  created () {
    this.getData()
  },
  methods: {
    getData () {
      console.log('档前文章id：' + this.id)
      this.$api.get('topic/' + this.id, null, r => {
        this.dat = r.data
        console.log('档前文章详情：' + JSON.parse(this.data))
      })
    }
  }
}
</script>
