<template>
  <div class="wrap">
    <div class="box" v-for="(item,index) in list" :key="index" @click="jump(item)">
      <p>{{item.name}}</p>
    </div>
    <div class="box" @click="addMenu">
      <p>+</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    list: function () {
      return this.$store.state.indexList
    }
  },
  mounted () {
    // this.$store.dispatch('GET_INDEXLIST', this.$router.options.routes)
  },
  methods: {
    ...mapActions(['GET_INDEXLIST']),
    ...mapState(['indexList']),
    jump (item) {
      console.log(item)
      this.$router.push({
        path: item.path
      })
    },
    addMenu () {
      console.log('新增菜单')
      console.log(this.$router.options.routes)
    }
  }

}
</script>

<style lang='less' scoped>
.wrap {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  box-sizing: border-box;
  padding: 0.3rem;
  .box {
    width: 2rem;
    height: 3rem;
    background-color: #fff;
    margin: 0 0.45rem 0.2rem 0;
    display: flex;
    align-items: center;
    p {
      box-sizing: border-box;
      padding: 0 0.2rem;
      width: 2rem;
      // height: 0.8rem;
      max-height: 0.8rem;
      line-height: 0.4ren;
      font-size: 0.3rem;
      text-align: center;
      // line-height: 3rem;
      // 文本溢出隐藏
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical; /* autoprefixer: on */
      word-break: break-all;
    }
  }
  .box:nth-child(3n) {
    margin-right: 0;
  }
  .box:last-child{
    p{
      max-height: 3rem;
      line-height: 3rem;
      font-size: 1rem;
      font-weight: 100;
    }
  }
}
</style>
