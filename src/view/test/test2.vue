<template>
  <div class="warp">
    <ul>
      <li class="box" v-for=" item in 'dsdsdsdsdsdasdasdasdsa'"></li>
    </ul>
    <div class="theme3Pictue">
       <div
              class="imgbox"
             v-for="(item, k) in imgsList" :key="k">
              <img :src="item"
              />
            </div>
    </div>
    <div class="fff" @click="zan()" v-if="1" v-show="1">
      <div
        class="fixedbtn"
      >
        <!-- <div class="t1">{{ voteText }}</div> -->
        <div class="t2">已收到1个赞</div>
        <!-- <span class="trans" v-show="1">+1</span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arr: '23123214324324324234312',
      inp: false /* false 发送按钮的颜色为淡  true发送按钮为深 */,
      inpt: true, // placeholder
      scrtop: 0, // 滚动条
      bor: false, // 圆角
      paddb: '0.11rem', // input paddingbottom
      inpflag: false, // 输入框显示
      swiperSpecialColumn: {
        pagination: '.swiper-pagination',
        loop: false,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        slidesPerView: 'auto',
        freeMode: false, // 反弹效果
        freeModeMomentum: true,
        freeModeMomentumVelocityRatio: 1,
        onClick: swiper => {}
      },
      transflag: false, // 赞的动效
      obj: {}, // 数据
      pageIndex: 1, // 分页
      pageSize: 10,
      totalCount: 0, // 评论总条数
      imgsList: ['https://alicdn.avicare.cn/group1/M01/0C/2D/Chvbol5ThmuAJWjnAAnSxCjwHxc162.jpg'], // 放图片的数组
      plList: [], // 评论列表
      loading: false, //
      voteNum: 0, // 获得投票数量
      enabledComment: false, // 是否能评论
      voteEnable: false,
      voteText: '', // 弹框文案
      haveTimes: 0, // 剩余票数
      voteStatus: 0, // 投票状态
      // scimg: this.$route.query.theme == 1 ? sc : this.$route.query.theme == 2 ? lsc : blueDelete,
      // xgimg: this.$route.query.theme == 1 ? xg : this.$route.query.theme == 2 ? lxg : blueedit,
      btnflag: true, // 按钮状态
      audio: '' // true音频活动  false摄影活动
    }
  },
  watch: {
    // inpflag (v) {
    //   if (v) {
    //     this.btnflag = false
    //   } else {
    //     this.btnflag = true
    //   }
    // }
  },
  mounted () {
    this.$nextTick(() => {
      // if (String(this.$route.query.voteEnable) == 'true') {
      //   this.voteEnable = true
      // } else {
      //   this.voteEnable = false
      // }
      // if (String(this.$route.query.enabledComment) == 'true') {
      //   this.enabledComment = true
      // } else {
      //   this.enabledComment = false
      // }
      // this.init()
      // window.scrollTo(0, 0)
    })
  },
  methods: {
    /* init */
    init () {
      Indicator.open({ spinnerType: 'fading-circle' })
      empUserPhotosDetails({ workId: this.$route.query.workId }).then(
        ({ data }) => {
          Indicator.close()
          if (data.success) {
            if (data.data.photoImgList) {
              data.data.photoImgList.forEach((item, index) => {
                this.onLoadImg(item)
              })
            }
            this.audio = data.data.audio
            document.title = data.data.activityName
            this.voteNum = data.data.voteNum
            this.haveTimes = data.data.haveTimes
            this.obj = data.data

            // console.log(
            //   nowTime >= this.obj.startTime && nowTime <= this.obj.endTime
            // )
            // console.log(this.obj.activityStatus)
            if (this.obj.activityStatus == 1 || this.obj.activityStatus == 2) {
              this.voteText = '投票即将开始'
            } else if (this.obj.activityStatus == 3) {
              this.voteText = '喜欢就点个赞吧'
            }
            var nowTime = new Date().getTime()
            if (nowTime >= this.obj.startTime && nowTime <= this.obj.endTime) {
              this.voteStatus = 1
              this.voteText = '喜欢就点个赞吧'
            } else {
              this.voteStatus = 0
            }
            this.getPLlist()
          } else {
            Toast({
              message: data.bizMessage,
              position: 'center',
              duration: 2000
            })
          }
        }
      )
    },
    /* 删除评论 */
    del (id) {
      Indicator.open({ spinnerType: 'fading-circle' })
      deleteComments({ id: id }).then(({ data }) => {
        Indicator.close()
        if (data.success) {
          Toast({
            message: '删除成功',
            position: 'center',
            duration: 2000
          })
          this.plList = []
          this.pageIndex = 1
          this.getPLlist()
          const shootdetailparams = JSON.stringify({ id: this.$route.query.workId, reviewQuantity: this.totalCount, voteNum: this.voteNum, myVoteCount: this.obj.myVoteCount })
          sessionStorage.setItem('shootdetailparams', shootdetailparams)
        } else {
          Toast({
            message: data.bizMessage,
            position: 'center',
            duration: 2000
          })
        }
      })
    },
    /* getPLlist */
    getPLlist () {
      Indicator.open({ spinnerType: 'fading-circle' })
      sygetCommentList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        workId: this.$route.query.workId,
        activeId: this.$route.query.id,
        tagType: 3
      }).then(({ data }) => {
        Indicator.close()
        if (data.success) {
          if (this.pageIndex == 1) {
            this.plList = data.data.list
          } else {
            this.plList = this.plList.concat(data.data.list)
          }
          this.totalCount = data.data.totalCount
          if (this.pageIndex * this.pageSize < this.totalCount) {
            this.loading = false
          } else {
            this.loading = true
          }
          // const shootdetailparams = JSON.stringify({ id: this.$route.query.workId, reviewQuantity: this.totalCount, voteNum: this.voteNum, myVoteCount: this.obj.myVoteCount })
          // sessionStorage.setItem('shootdetailparams', shootdetailparams)
          sessionStorage.setItem(this.$route.query.workId + 'P', this.plList.length)
        } else {
          Toast({
            message: data.bizMessage,
            position: 'center',
            duration: 2000
          })
        }
      })
    },
    onLoadImg (data) {
      if (!data) {
        Indicator.close()
        return
      }
      const dataT = data
      const img = new Image()
      var _that = this
      var widthflag = 0
      img.onload = () => {
        if (img.width > img.height) {
          widthflag = 1
        } else if (img.width == img.height) {
          widthflag = 3
        } else if (img.width < img.height) {
          widthflag = 2
        }
        _that.imgsList.push({ imgVideoUrl: dataT, width: widthflag })
        _that.srclen = _that.imgsList.length
      }
      img.onerror = () => {
        this.onLoadImg(data)
      }
      img.src = dataT
    },
    /* fenye  */
    loadMore () {
      // console.log(this.$route)
      if (this.$route.path != '/activityshoot/shootDetail') {
        return
      }

      // const scr = document.documentElement.scrollTop || document.body.scrollTop
      // const sch = document.documentElement.clientHeight || document.body.clientHeight
      // const waph = document.querySelector(".warpj").scrollHeight;
      if (this.plList && this.plList.length) {
        // console.log(scr, sch, waph);
        // if (scr + sch >= waph - 20) {
        // this.scroll_pageIndex++;
        if (this.pageIndex * this.pageSize < this.totalCount) {
          this.pageIndex++
          this.loading = true
          this.getPLlist() // 调用接口
        }
        // }
      }
    },
    /* 点赞 */
    zan () {
      if (this.voteStatus == 0) {
        return
      }

      if (!this.obj.enabledRepeatVote) {
        if (this.obj.voteRule == 1) {
          if (this.obj.myVoteCount >= 1) {
            Toast({
              message: '每个作品只能投一票，继续投给其他作品吧',
              position: 'center',
              duration: 2000
            })
            return
          }
        } else {
          if (this.obj.myTodayCount == 1) {
            Toast({
              message: '每天每个作品仅可投一票，明天再来吧',
              position: 'center',
              duration: 2000
            })
            return
          }
        }
      }
      if (this.obj.haveTimes == 0) {
        if (this.obj.voteRule == 1) {
          Toast({
            message:
              '最多可投' + this.$route.query.oldvoteNum + '票，投票次数已用完',
            position: 'center',
            duration: 2000
          })
        } else {
          Toast({
            message: '今日投票次数已用完，明天可以继续投票哦',
            position: 'center',
            duration: 2000
          })
        }
        return
      }
      this.transflag = true
      setTimeout(() => {
        this.transflag = false
      }, 300)
      voteTA({ voteId: this.$route.query.workId, tagType: 2 }).then(
        ({ data }) => {
          if (data.success) {
            if (this.haveTimes == 1) {
              if (this.obj.voteRule == 1) {
                Toast({
                  message: '投票成功',
                  position: 'center',
                  duration: 2000
                })
              } else {
                Toast({
                  message: '投票成功，明天可以继续投票哦',
                  position: 'center',
                  duration: 2000
                })
              }
            } else if (this.haveTimes > 1) {
              if (this.obj.voteRule == 1) {
                Toast({
                  message: '投票成功，还可继续投' + (this.haveTimes - 1) + '票',
                  position: 'center',
                  duration: 2000
                })
              } else {
                Toast({
                  message: '投票成功，今日还可继续投' + (this.haveTimes - 1) + '票',
                  position: 'center',
                  duration: 2000
                })
              }
            }
            this.voteNum++
            this.haveTimes--
            this.obj.myVoteCount++
            this.obj.myTodayCount = 1
            const shootdetailparams = JSON.stringify({ 'id': this.$route.query.workId, 'reviewQuantity': this.totalCount, 'voteNum': this.voteNum, 'myVoteCount': this.obj.myVoteCount, 'myTodayCount': this.obj.myTodayCount })
            sessionStorage.setItem('shootdetailparams', shootdetailparams)
            sessionStorage.setItem(this.$route.query.id, this.haveTimes)
          } else {
            Toast({
              message: data.bizMessage,
              position: 'center',
              duration: 2000
            })
          }
        }
      )
    },
    /* 点击评论 */
    plbtn () {
      this.inpflag = true
      document.querySelector('#inpdiv').focus()
    },
    /* 发送 */
    send () {
      if (document.querySelector('#inpdiv').innerText.trim() == '') {
        Toast({
          message: '请输入评论内容',
          position: 'center',
          duration: 2000
        })
        return
      }
      if (document.querySelector('#inpdiv').innerText.length >= 201) {
        Toast({
          message: '内容超过200字不能发送',
          position: 'center',
          duration: 2000
        })
        return
      }
      var divtext = ''
      divtext = document
        .querySelector('#inpdiv')
        .innerText.replace(/[\n\r]/g, '<br>')
      divtext = divtext.replace(/<br><br>/g, '<br>')
      addComments({
        activitiesId: this.$route.query.id,
        worksId: this.$route.query.workId,
        commentContent: divtext
      }).then(({ data }) => {
        if (data.success) {
          this.inpflag = false
          document.querySelector('#inpdiv').innerHTML = ''
          this.totalCount++
          const shootdetailparams = JSON.stringify({ id: this.$route.query.workId, reviewQuantity: this.totalCount, voteNum: this.voteNum, myVoteCount: this.obj.myVoteCount })
          sessionStorage.setItem('shootdetailparams', shootdetailparams)
          Toast({
            message: '评论成功',
            position: 'center',
            duration: 2000
          })
          this.paddb = '0.11rem'
          this.plList = []
          this.pageIndex = 1
          this.getPLlist()
        } else {
          Toast({
            message: data.bizMessage,
            position: 'center',
            duration: 2000
          })
        }
      })
    },
    /* 输入的事件 */
    range () {
      var _div = document.querySelector('#inpdiv')
      var range = document.createRange()

      range.selectNodeContents(_div)
      range.collapse(false)

      var sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    },
    /* 去修改 */
    goupload () {
      if (this.obj.photoVideoFlag == 2) {
        Toast({
          message: '请去上传作品处修改',
          position: 'center',
          duration: 2000
        })
        return false
      }
      if (this.$route.query.theme == 3) {
        this.$router.push({
          path: '/activityGroupRelease',
          query: {
            activeId: this.$route.query.id,
            workId: this.$route.query.workId
          }
        })
      } else {
        this.$router.push({
          path: 'shootUpload',
          query: {
            xg: 'y',
            id: this.$route.query.id,
            workId: this.$route.query.workId,
            theme: this.$route.query.theme,
            enabledComment: this.$route.query.enabledComment,
            voteEnable: this.$route.query.voteEnable,
            photoNum: this.$route.query.photoNum,
            audio: this.audio
          }
        })
      }
    },
    inputdiv () {
      if (document.querySelector('#inpdiv').innerHTML != '') {
        this.inp = true
        this.inpt = false
        if (document.querySelector('#inpdiv').innerHTML.length >= 20) {
          this.bor = true
        } else {
          this.bor = false
        }
        if (document.querySelector('#inpdiv').innerHTML.length >= 60) {
          this.paddb = '0.46rem'
        } else {
          if (document.querySelector('#inpdiv').innerHTML.length >= 40) {
            this.paddb = '0.22rem'
          }
          if (document.querySelector('#inpdiv').innerHTML.length < 40) {
            this.paddb = '0.11rem'
          }
        }
      } else {
        this.inp = false
        this.inpt = true
      }
    },
    getscr () {
      // this.shootbodyStopFun1(true);
      this.scrtop =
        document.body.scrollTop || document.documentElement.scrollTop
      setTimeout(() => {
        document.documentElement.scrollTop = document.body.scrollTop = document.documentElement.scrollHeight
      }, 501)
      this.range()
      if (document.querySelector('#inpdiv').innerHTML.length == 0) {
        this.inp = false
      }
    },
    setscr () {
      console.log(document.querySelector('#inpdiv').innerHTML.length)
      if (document.querySelector('#inpdiv').innerHTML == '') {
        this.inpt = false
        this.inpflag = false
      } else {
        this.inpt = true
        this.inpflag = true
      }
      document.documentElement.scrollTop = document.body.scrollTop = this.scrtop
      // this.shootbodyStopFun1(false);
    }
  }
}
</script>
<style lang="less">
#shootswi {
  overflow: initial;

  .swiper-slide {
    // width: 100% !important;
    height: auto !important;
  }
  .swiper-pagination {
    left: 50%;
    transform: translateX(-50%);
    top: 8.8rem;
    .swiper-pagination-bullet {
      background: #f1f1f1 !important;
      width: 0.12rem;
      height: 0.12rem;
      &.swiper-pagination-bullet-active {
        background: #fd8585 !important;
      }
    }
    &.green {
      .swiper-pagination-bullet-active {
        background: #03ce9f !important;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.warp {
  height: 100%;
  // height: 100rem;
  // background-color: #000;
  .box{
    height: 100px;
    width: 100%;
  }
  .banner {
    height: 8.8rem;
    .ovX {
      overflow-x: hidden;
      height: 9.2rem;
    }
    .imgbox {
      text-align: center;
      width: 100%;
      height: 8.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F5F5F5;
      img {
        height: 100%;
      }
    }
  }
  .imgbox {
      text-align: center;
      width: 100%;
      height: 8.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F5F5F5;
      img {
        height: 100%;
      }
    }
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
  }
  .video {
    height: 4.22rem;
    position: relative;
    video {
      height: 100%;
      width: 100%;
      input[title="更多选项"] {
        display: none;
      }
      &::-webkit-media-controls-enclosure {
        height: auto;
      }
      &::-webkit-media-controls-panel {
        position: relative;
      }
      &::-webkit-media-controls-play-button {
        position: absolute;
        left: 0.2rem;
        bottom: 0.3rem;
        // background: url("~@/assets/img/activityshoot/bf.png") no-repeat top
        //   center / 0.6rem 0.6rem;
        // height: 0.6rem;
        // width: 0.6rem;
      }
      &::-webkit-media-controls-timeline {
        width: 3.9rem;
      }
    }
  }
  .audio{
    position: relative;
  }
  .back {
    background: #fff;
  }
  .info {
    padding: 0.4rem 0.2rem 0;

    .top {
      overflow: hidden;
      .headimg {
        float: left;
        width: 0.7rem;
        height: 0.7rem;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .name {
        float: left;
        font-size: 0.34rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(108, 108, 108, 1);
        transform: translateY(0.11rem);
        padding-left: 0.1rem;
      }
      .btnn {
        float: right;
        width: 0.9rem;
        height: 0.4rem;
        transform: translateY(0.19rem);
        img {
          width: 100%;
        }
      }
    }
    .con {
      padding: 0.3rem 0;
      font-size: 0.34rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      border-bottom: 0.01rem solid #e6e6e6;
      word-break: break-all;
      white-space: pre-line;
    }
  }
  .inpdiv {
    padding: 0.4rem 0.2rem 0.5rem;
    .inpp {
      background: rgba(245, 245, 245, 1);
      border-radius: 0.3rem;
      font-size: 0.26rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(184, 184, 184, 1);
      text-indent: 0.3rem;
      padding: 0.12rem 0;
    }
  }
  .pldiv {
    padding: 0 0.2rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    overflow: hidden;
    .pl {
      float: left;
      font-size: 0.3rem;
      color: rgba(102, 102, 102, 1);
    }
    .numpl {
      float: right;
      font-size: 0.24rem;
      color: rgba(184, 184, 184, 1);
      transform: translateY(0.02rem);
    }
  }
  .nolis{
    text-align: center;
    padding: 2rem 0;
    color: rgba(184, 184, 184, 1);
    font-size: 0.3rem;
  }
  .pllist {
    padding: 0.5rem 0.2rem;
    .box {
      overflow: hidden;
      padding-bottom: 0.5rem;
      .headimg {
        float: left;
        width: 0.7rem;
        height: 0.7rem;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .infos {
        float: left;
        padding-left: 0.2rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        width: 6.16rem;
        .namebtnn {
          overflow: hidden;
          height: 0.4rem;
          .name {
            float: left;
            color: rgba(142, 142, 142, 1);
            font-size: 0.28rem;
          }
          .btnn {
            float: right;
            width: 0.9rem;
            height: 0.4rem;
            img {
              width: 100%;
              height: 0.4rem;
            }
          }
        }
        .times {
          font-size: 0.22rem;
          color: rgba(148, 148, 148, 1);
        }
        .con {
          font-size: 0.28rem;
          color: rgba(102, 102, 102, 1);
          padding-top: 0.2rem;
          word-break: break-all;
        }
      }
    }
  }
  .gobott {
    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(161, 161, 161, 1);
    padding-bottom: 2.9rem;
    text-align: center;
  }
  .fff{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 0.2rem;
    z-index:100;
  }
  .fixedbtn {
    height: 1.2rem;

    background: linear-gradient(
      180deg,
      rgba(255, 93, 93, 1) 0%,
      rgba(255, 50, 50, 1) 100%
    );
    box-shadow: 0px 0px 0.1rem 0px rgba(255, 101, 101, 0.7);
    border-radius: 0.6rem;
    text-align: center;

    &.green {
      background: linear-gradient(
        180deg,
        rgba(42, 219, 157, 1) 0%,
        rgba(3, 206, 159, 1) 100%
      );
      box-shadow: 0px 0px 0.1rem 0px rgba(42, 217, 162, 0.4);
    }
    &.blue{
      background: linear-gradient(180deg, #85D9FE 0%, #13B4FF 100%);
      box-shadow:0px 0px 0.1rem 0px rgba(172,223,245,0.7);
    }
     &.blueGray{
      background: linear-gradient(180deg, #85D9FE 0%, #13B4FF 100%);
      box-shadow:0px 0px 0.1rem 0px rgba(172,223,245,0.7);
      opacity: 0.4;
    }
    &.gray {
      box-shadow: 0 0 0 0;
      background: linear-gradient(
        180deg,
        rgba(229, 229, 229, 1) 0%,
        rgba(189, 189, 189, 1) 100%
      );
    }
    .t1 {
      padding-top: 0.18rem;
      font-size: 0.36rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .t2 {
      font-size: 0.2rem;
      transform: scale(0.9);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      &.big {
        font-size: 0.3rem;
        transform: scale(1);
        line-height: 1.2rem;
      }
    }
    .trans {
      font-style: normal;
      z-index: 30;
      position: fixed;
      bottom: 1rem;
      right: 10%;
      transform: translateX(-50%);
      animation: Ftop 0.3s linear 1;
      animation-fill-mode: forwards; /*让动画停留在最后一帧 */
      font-size: 0.3rem;
      font-family: PingFangSC-Regular;
      color: rgba(255, 50, 50, 1);
      // opacity: 0;
    }
  }
  .fixedinp {
    border-top:1px solid #f5f5f5;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 0.2rem 0.3rem;
    .inpp {
      width: 4.75rem;
      background: rgba(245, 245, 245, 1);
      border-radius: 0.3rem;
      padding: 0.12rem 0.35rem 0.11rem 0.2rem;
      font-size: 0.26rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(117, 117, 117, 1);
      min-height: 0.37rem;
      max-height: 1.57rem;
      overflow-x: hidden;
      overflow-y: scroll;
      float: left;
      outline: none;
      &.indent {
        background: rgba(245, 245, 245, 1)
          // url("~@/assets/img/activityshoot/qb.png") no-repeat left 0.2rem center /
          // 0.25rem auto;
        // text-indent: 0.4rem;
      }
      &.borDer {
        border-radius: 0.1rem;
      }
      &:empty::before {
        content: attr(placeholder);
        color: rgba(117, 117, 117, 1);
      }
      &:empty:focus {
        content: none;
      }
    }
    .send {
      width: 1.4rem;
      height: 0.6rem;
      line-height: 0.6rem;
      background: rgba(253, 133, 133, 1);
      border-radius: 0.1rem;
      text-align: center;
      font-size: 0.3rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      float: left;
      margin-left: 0.2rem;
      z-index: 99;
      &.r {
        background: #ff3e3e;
      }
      &.green {
        background: #a1e7d7;
        &.r {
          background: #03ce9f;
        }
      }
      &.blue{
          background: #13B4FF ;
           opacity: 0.4;
         &.r {
         opacity: 1;
        }
      }
    }
  }
  .bigimg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: #000;
    z-index: 30;
    .imgs {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
}

@keyframes Ftop {
  0% {
    bottom: 1rem;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    bottom: 1.5rem;
    opacity: 1;
  }
}
</style>
