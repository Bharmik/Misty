<template>
  <div class="boxWap">
    <img src="../../assets/imgs/bg.jpg" alt="">
    <div class="describeContent">
     <div class="describe">
        <div class="mydescribe">对方是否都是负担</div>
        <div class="topic">#hangkngkong#</div>
     </div><div class="useInfor">
        <div class="entInfor">
           <img class="headPicture" src="../../assets/imgs/bg.jpg">
          <div class="entName">{{dataList.empName?dataList.empName.substring(0,3):''}}</div>
          <div class="workNum">编号：2312423343243</div>
        </div>
      <div class="voteInfor">
        <div class="zan" v-if="dataList.voteEnable" @click.stop="voteFn(dataList)">
          <!-- <img v-if="dataList.isVote" src="../../../assets/img/activityGroup/posterList/zan_active.png" alt=""> -->
          <!-- <img v-if="!dataList.isVote" src="../../../assets/img/activityGroup/posterList/zan.png" alt=""> -->
          <span>{{dataList.voteNum |formatCount}}</span>
       </div>
       <div class="comment" v-if="dataList.enabledComment" @click="goDetail(dataList)">
        <!-- <img src="../../../assets/img/activityGroup/comment.png" alt=""> -->
        <span>{{dataList.commentCount|formatCount}}</span>
    </div>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageCont: {// 分页参数
        listType: 2,
        listNum: this.$route.query.page,
        activitiesId: this.$route.query.activitiesId || '' // 摄影活动id
      },
      dataList: '', // 作品信息
      swipeFlage: true, // 是否可滑动
      activeInfo: ''// 活动信息
    }
  },
  filters: {
    formatCount (num) {
      if (num) {
        if (num < 10000) {
          return num
        } else {
          return parseInt(num / 10000 * 10) / 10 + 'w+'
        }
      } else {
        return 0
      }
    }
  },
  mounted () {
    // this.getActiveData()
  },
  methods: {
    // 获取活动信息数据
    getActiveData () {
      apiActiveInfo({ activityId: this.$route.query.activitiesId }).then(({ data }) => {
        if (data.success) {
          this.activeInfo = data.data
          document.title = data.data.activityName
          this.init()
        } else {
          Toast({
            message: data.bizMessage,
            position: 'top',
            duration: 2000
          })
        }
      })
    },
    // 详情初始化
    init () {
      this.swipeFlage = false
      // Indicator.open({ spinnerType: 'fading-circle' })
      shootList(this.pageCont).then(({ data }) => {
        this.swipeFlage = true
        // Indicator.close()
        if (data.success) {
          if (data.data.list && data.data.list.length > 0) {
            this.dataList = data.data.list[0]
            this.haveMore = true
          } else {
            Toast({
              message: '滑不动咯，已经是最后一个作品了~',
              position: 'middle',
              duration: 2000
            })
            this.pageCont.listNum--
          }
        } else {
          Toast({
            message: data.bizMessage,
            position: 'center',
            duration: 2000
          })
          return false
        }
      })
    },
    swipeRight () {
      if (this.swipeFlage) {
        if (this.pageCont.listNum > 1) {
          this.pageCont.listNum--
          this.init()
        // 页面跳转或其它操作
        } else {
          Toast({
            message: '滑不动咯，已经是第一个作品了~',
            position: 'middle',
            duration: 2000
          })
        }
      }
    },
    // 右滑
    swipeLeft () {
      if (this.swipeFlage) {
        this.pageCont.listNum++
        this.init()
        // 页面跳转或其它操作
      }
    },
    // 详情
    goDetail (item) {
      this.$router.push({
        path: '/activityshoot/shootDetail',
        query: {
          id: this.$route.query.activitiesId, // 摄影活动id
          workId: item.id, // 作品id
          theme: 3,
          enabledComment: item.enabledComment, // 是否开启评论
          voteEnable: item.voteEnable, // 是否开启投票
          photoNum: 1,
          oldvoteNum: item.voteTimes // 投票次数
        }
      })
    },
    // 点赞
    voteFn (item) {
      const activeInfo = this.activeInfo
      const currentTime = new Date().getTime()
      const startTime = activeInfo.startTime
      const endTime = activeInfo.endTime
      const posterInfo = item
      if (currentTime < startTime) {
        Toast({
          message: '投票时间还没到哦~',
          position: 'top',
          duration: 2000
        })
        return false
      }
      if (currentTime > endTime) {
        Toast({
          message: '投票已结束~',
          position: 'top',
          duration: 2000
        })
        return false
      }
      // employeeVoteCount当前人的投票次数
      if (activeInfo.employeeVoteCount >= activeInfo.voteTimes) {
        Toast({
          message:
            activeInfo.voteRule == 1
              ? '最多可投' + activeInfo.voteTimes + '票，投票次数已用完'
              : '今日投票次数已用完，明天可以继续投票哦~',
          position: 'top',
          duration: 2000
        })
        return false
      }
      // enabledRepeatVote对同一作品是否可多次投票
      if (!activeInfo.enabledRepeatVote) {
        if (activeInfo.voteRule == 1) {
          if (activeInfo.employeeVoteCount >= 1) {
            Toast({
              message: '每个作品只能投一票，继续投给其他作品吧~',
              position: 'top',
              duration: 2000
            })
            return false
          }
        } else if (activeInfo.voteRule == 2) {
          if (item.employeeVoteCount >= 1) {
            Toast({
              message: '每天每个作品仅可投一票，明天再来吧~',
              position: 'top',
              duration: 2000
            })
            return false
          }
        }
      }
      Indicator.open({ spinnerType: 'fading-circle' })
      voteTA({ voteId: item.id, tagType: 2 }).then(({ data }) => {
        Indicator.close()
        if (data.success) {
          activeInfo.employeeVoteCount++
          posterInfo.isVote = true
          posterInfo.voteNum++
          this.activeInfo = activeInfo
          if (activeInfo.voteTimes - activeInfo.employeeVoteCount <= 0) {
            let msgtext = ''
            if (activeInfo.voteRule == '1') {
              msgtext = '投票成功'
            } else if (activeInfo.voteRule == '2') {
              msgtext = '投票成功，明天可以继续投票哦'
            }
            Toast({
              message: msgtext,
              position: 'top',
              duration: 2000
            })
          } else {
            let msgtext = ''
            if (activeInfo.voteRule == '1') {
              msgtext = '投票成功，还可继续投' + (activeInfo.voteTimes - activeInfo.employeeVoteCount) + '票'
            } else if (activeInfo.voteRule == '2') {
              msgtext = '投票成功，今日还可投' + (activeInfo.voteTimes - activeInfo.employeeVoteCount) + '票'
            }
            Toast({
              message: msgtext,
              position: 'top',
              duration: 2000
            })
          }
        } else {
          Toast({
            message: data.bizMessage,
            position: 'top',
            duration: 2000
          })
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
.boxWap{
  // width: 100%;
  height: 100%;
  // overflow-y: scroll;
  background-color: #000;
  img{
   display: block;
   width: 100%;
  }
  .describeContent{
   width: 100%;
  //  height: 3.92rem;
   .describe{
    width: 100%;
    position: fixed;
    bottom: 1.12rem;
    left: 0;
    height:2.79rem;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
     padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
     padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
    .mydescribe{
      padding: 1.45rem 0.3rem 0 0.3rem;
      height: 0.8rem;
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 0.4rem;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
       /*! autoprefixer: off */
      -webkit-box-orient: vertical; /* autoprefixer: on */
      word-break: break-all;
    }
    .topic{
      height: 0.36rem;
      line-height: 0.36rem;
      padding: 0 0.18rem;
      border:1px solid #fff;
      border-radius: 0.25rem;
      font-size: 0.26rem;
      color: #fff;
      display: inline-block;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
    }
   }
   .useInfor{
     width: 100%;
     background-color: #000;
     height:1.13rem ;
     line-height:1.13rem ;
     position: fixed;
     bottom: 0rem;
     left: 0;
     right: 0;
      .entInfor{
         margin-left: 0.3rem;
         text-align: left;
         display: inline-block;
        .headPicture{
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        vertical-align: middle;
     }
     .entName{
        display: inline-block;
        font-size: 0.22rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8E8E8E;
        margin-left: 0.13rem;
        vertical-align: middle;
     }
     .workNum{
       display: inline-block;
       margin-left: 0.5rem;
       font-size: 0.24rem;
       font-family: PingFangSC-Regular, PingFang SC;
       font-weight: 400;
       color: #777777;
       vertical-align: middle;
     }
      }

     .voteInfor{
       text-align: right;
       margin-right: 0.3rem;
       float: right;
       .zan{
       display: inline-block;
       font-size: 0.3rem;
       font-family: PingFangSC-Regular, PingFang SC;
       font-weight: 400;
       color: #8E8E8E;
       img{
        display: inline-block;
        width: 0.32rem;
        height: auto;
        vertical-align: middle;
       }
       span{
         display: inline-block;
         vertical-align: middle;
         margin-right: 0.05rem;
       }
     }
       .comment{
        display: inline-block;
        font-size: 0.3rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8E8E8E;
        margin-left: 0.4rem;
        img{
        display: inline-block;
        width: 0.32rem;
        height: auto;
        vertical-align: middle;
       }
        span{
         display: inline-block;
         vertical-align: middle;
       }
     }
     }

     .ml50{
       margin-left: 0.5rem;
     }

   }
  }
}
</style>
