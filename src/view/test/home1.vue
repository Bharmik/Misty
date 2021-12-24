<template>
  <div>
    <div class="page">
      <img src="../../assets/imgs/activityGroup/ruleBtn.png" alt=""
        @click="gzclick(true)" class="ruleBtn">
      <div class="time" :class="{'ip7Time':ip7Page,'x21Time':x21Page,}">
        活动时间 9.20-11.10
      </div>
      <div class="body">
        <div class="right" :class="{'ip7Right':ip7Page,'x21Right':x21Page}">
          <img src="../../assets/imgs/activityGroup/focusingLeft1.png" alt="">
        </div>
        <div class="center"
          :class="{'xrPage':xrPage,'ip7Center':ip7Page,'x21Center':x21Page,}">
          <img src="../../assets/imgs/activityGroup/focusingCenter.png" alt="">
        </div>
        <div class="left" :class="{'ip7Left':ip7Page,'x21Left':x21Page,}">
          <img src="../../assets/imgs/activityGroup/focusingRight1.png" alt="">
        </div>
      </div>
      <div class="bottom" :class="{'ip7Bottom':ip7Page,'x21Bottom':x21Page,}">
        <div @click="goList()" class="shallow">先去看看</div>
        <div @click="goDesign()" class="deep" v-if="true">设计专属海报</div>
        <div @click="myworks()" class="deep" v-else>查看我的海报</div>
      </div>
    </div>
  </div>
</template>
<script>
// import NotStarted from '@/components/activityGroup/notStarted'
// import End from '@/components/activityGroup/end'
// import { Toast, Indicator } from 'mint-ui'
// import { dian_date_text } from '@/assets/js/filters'
// 首页调用摄影活动详情老接口，用到了活动状态，规则信息.
// import { shootinfo } from '@/api/activity/index'
// import { shootbodyStopFun } from '@/assets/js/mixin'
// import Vue from 'vue'
export default {
  // components: {
  //   NotStarted,
  //   End
  // },
  data () {
    return {
      // 兼容小屏幕
      x21Page: false,
      ip7Page: false,
      xrPage: false,
      UserPhotosNum: '', // 用户发布的次数, 没有发布过就是0,发布过几次就是几
      isNotStarted: false, // 未开始
      idEnd: false, // 已结束
      activityStatus: '', // 1，未开始  2，进行中  4，结束
      gzflag: false, // 控制活动规则弹窗
      // ruleData: '', // 活动规则数据
      oldvoteNum: '',
      haveCount: 0,
      maxVoteCount: 0, // 可重复投票多少次 0 是不限制次数
      objdata: '', // list外层活动规则相关数据
      theme: '1',
      listData: [],
      currentCount: 0,
      noFlag: false,
      onePhone: [],
      searchaValue: '',
      searchanoflag: false,
      closeFlag: false,
      addshowflag: true,
      enabled: true, // 活动启用禁用
      ruleData: {
        'voteRule': 2,
        'selectedRules': 2,
        'registrationsTimeAndeTime': '2021年9月7日 00:00:01 - 10月29日 23:59:58',
        'activityDescribe': 'ljytest',
        'photos': [
          {
            'photoId': '1000004455',
            'photoImg': 'https://alicdn.avicare.cn/group1/M01/0E/76/ChpU12E29S6Ad5gGAACbbQegcIM380.jpg',
            'photoDescribe': ''
          },
          {
            'photoId': '1000004460',
            'photoImg': 'https://alicdn.avicare.cn/group1/M01/0E/79/ChpU12E3PoaAYOljAAAvxCtxTS868.jpeg',
            'photoDescribe': '111111'
          },
          {
            'photoId': '1000004461',
            'photoImg': 'https://alicdn.avicare.cn/group1/M01/15/33/ChvbomE4X2OARbhHAABXjKN4eK0875.jpg',
            'photoDescribe': ''
          },
          {
            'photoId': '1000004464',
            'photoImg': 'https://alicdn.avicare.cn/group1/M01/15/33/ChvbomE4bViARmoEAAHfxSJlzlQ53.jpeg',
            'photoDescribe': ''
          }
        ],
        'applySuspend': false,
        'voteEnable': true,
        'voteTimes': 5,
        ruleDesc: '每人每天5票,不dfsdfsdfddfsd可重复投票',
        'activityStatus': 2,
        'enabledRepeatVote': false,
        'startTime': 1630944000000,
        'id': '1667',
        'registrationEndTime': 1635523198000,
        'activityName': 'ljy测试活动',
        'maxVoteCount': 0,
        'activityTemplate': 2,
        'voteStatus': 2,
        'UserPhotosNum': 4,
        'registrationStartTime': 1630944001000,
        'personTimes': 5,
        'sTimeAndeTime': '2021年9月7日  - 10月29日 ',
        'activitySponsor': 'ljy',
        'endTime': 1635523199000,
        'photoRule': 2,
        'applyStatus': '1',
        'photoNum': 5
      }

    }
  },
  mounted () {
    let { height } = this.getPage()
    // 以在商网打开的高度为准
    // oppo x21 height:585
    // iphone7 height:553
    // iphonexr height:774
    // mi9 height:782
    // if (height < 783) {
    //   this.xrPage = true
    // }
    if (height < 604) {
      this.ip7Page = true
    }
    if (height < 585) {
      this.x21Page = true
    }
  },
  methods: {
    getPage () {
      return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, // 获取屏幕宽度
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight// 获取屏幕高度
      }
    },
    showGz () {
      this.gzflag = true
    },
    // 跳转海报编辑页面
    goDesign () {
      this.$router.push({
        path: '/activityGroupDesign',
        query: {

        }
      })
    },
    // 去作品列表页
    goList () {
      this.$router.push({
        path: '/posterList',
        query: {

        }
      })
    },
    // 跳转我的作品页面
    myworks () {
      this.$router.push({
        path: '/',
        query: {

        }
      })
    },
    // 规则是否显示
    gzclick (flag) {
      if (flag) {
        this.shootbodyStopFun(true)
      } else {
        this.shootbodyStopFun(false)
      }
      this.gzflag = flag
    }
  }

  // beforeRouteLeave (to, from, next) {
  //   if (to.name != 'index' && from.name) {
  //     const scrTop =
  //       document.documentElement.scrollTop || document.body.scrollTop
  //     sessionStorage.setItem('activityshootScroll', scrTop)
  //   }
  //   next()
  // }
}
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/imgs/activityGroup/focusingBg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.ruleBtn {
  width: 1.78rem;
  height: 0.6rem;
  position: absolute;
  right: -3%;
  top: 0.38rem;
}
.time {
  width: 2.68rem;
  height: 0.46rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.25rem;
  border: 0.02rem solid #ffffff;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  top: 2.56rem;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.body {
  .right {
    width: 1.36rem;
    position: absolute;
    top: 4.39rem;
    right: 0;
    transform: translate(0, 0%);
    img {
      width: 100%;
    }
  }
  .left {
    width: 1.36rem;
    height: 6.78rem;
    position: absolute;
    top: 4.39rem;
    left: 0rem;
    transform: translate(0, 0%);
    img {
      width: 100%;
    }
  }
  .center {
    width: 5.38rem;
    height: auto;
    position: absolute;
    top: 3.07rem;
    left: 50%;
    transform: translate(-50%, 0%);
    img {
      width: 100%;
    }
  }
}
.bottom {
  width: 100%;
  height: 1rem;
  padding: 0 0.57rem 0 0.53rem;
  line-height: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 1.22rem;
  .shallow {
    width: 3rem;
    height: 1rem;
    border-radius: 0.5rem;
    border: 0.02rem solid #6ec4fe;
    font-size: 0.36rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #55b9fc;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .deep {
    width: 3rem;
    height: 1rem;
    background: linear-gradient(180deg, #85d9fe 0%, #13b4ff 100%);
    border-radius: 0.5rem;
    font-size: 0.36rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
//兼容xip7  size：604 start
.ip7Time {
  top: 2.1rem;
}
.body {
  .xrPage {
    width: 2.38rem;
    top: 2.7rem;
  }
  .ip7Center {
    width: 4.38rem;
    top: 2.7rem;
  }
  .ip7Left {
    width: 1.1rem;
    top: 3.8rem;
  }
  .ip7Right {
    width: 1.1rem;
    top: 3.8rem;
  }
}
.ip7Bottom {
  bottom: 0.8rem;
}
//兼容ip7  size：604  end

//兼容x21  size：585 start
.x21Time {
  top: 2.1rem;
}
.body {
  .x21Center {
    width: 4.38rem;
    top: 2.7rem;
  }
  .x21Left {
    width: 1.1rem;
    top: 3.8rem;
  }
  .x21Right {
    width: 1.1rem;
    top: 3.8rem;
  }
}
.x21Bottom {
  bottom: 0.8rem;
}
//兼容x21  size：585  end

.hdzzc {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  .zzc {
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .alertboxp {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .closeimg {
      width: 0.8rem;
      height: 0.8rem;
      margin: 0.56rem auto 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .alertboxz {
      position: relative;
      width: 6.5rem;
      height: 7.92rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.2rem;
      border: 0.04rem solid #23b9ff;
      .gz {
        position: relative;
        font-size: 0.36rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(54, 54, 54, 1);
        text-align: center;
        margin-top: 0.5rem;
        &.hdgz1 {
          &::after,
          &::before {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 0.3rem;
            height: 0.06rem;
            background: #fd8585;
            border-radius: 0.03rem;
          }
          &::before {
            content: '';
            left: 2.15rem;
          }
          &::after {
            content: '';
            right: 2.15rem;
          }
        }
        &.hdgz2 {
          &::after,
          &::before {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 0.3rem;
            height: 0.06rem;
            background: #ffb508;
            border-radius: 0.03rem;
          }
          &::before {
            content: '';
            left: 2.15rem;
          }
          &::after {
            content: '';
            right: 2.15rem;
          }
        }
        .leftl,
        .rightl {
          width: 0.3rem;
          height: 0.06rem;
          background: rgba(255, 185, 109, 1);
          border-radius: 0.03rem;
          display: inline-block;
          transform: translateY(-0.1rem);
        }
        .ttext {
          display: inline-block;
        }
      }
      .hzinfo {
        padding: 0.4rem;
        height: 5.4rem;
        box-sizing: border-box;
        overflow-y: scroll;
        .opus,
        .entri,
        .vote,
        .con {
          font-family: PingFangSC-Regular;
          font-size: 0.3rem;
          color: #707070;
          letter-spacing: 0;
          line-height: 0.48rem;
          padding-bottom: 0.1rem;
          word-wrap: break-word;
          word-break: break-all;
        }
        .entri {
          overflow: hidden;
          display: flex;
          em {
            font-style: normal;
            display: inline-block;
            white-space: nowrap;
          }
          span {
            width: 4.7rem;
            word-break: break-all;
            word-wrap: break-word;
            display: inline-block;
          }
        }
        .con {
          padding-top: 0.2rem;
          padding-bottom: 0;
        }
      }
      .btnssz {
        position: absolute;
        left: 50%;
        bottom: 0.5rem;
        transform: translateX(-50%);
        width: 3.7rem;
        height: 0.8rem;
        background: linear-gradient(180deg, #85d9fe 0%, #13b4ff 100%);
        border-radius: 0.4rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.36rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
