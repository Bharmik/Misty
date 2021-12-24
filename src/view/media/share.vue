<template>
  <div class="share-box">
    <img :src="img" alt="">
    <span>长按图片保存</span>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      shareImgUrl: ''
    }
  },
  computed: {
    ...mapState({
      img: state => state.imgUrl
    })
  },
  created () {
    // this.shareImgUrl = localStorage[this.$route.params.storage]
  }
}
</script>
<style lang="less">
.share-box {
  text-align: center;
  img {
    width: 6.4rem;
    margin: 0 auto;
  }
}
</style>
