<template>
  <div class="wrap">
    <div class="progress1">
      <!-- 自定义svg路径 -->
      <!-- <loading-progress :progress="progress" :indeterminate="indeterminate"
        :counter-clockwise="counterClockwise" :hide-background="hideBackground"
        shape="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" size="180"
        fill-duration="2" /> -->
      <!-- <loading-progress :progress="progress" :indeterminate="indeterminate"
        :counter-clockwise="counterClockwise" :hide-background="hideBackground"
        shape="m311,179c-5,241 -74,62 -74,62c0,0 -22,-58 -22,-58c0,0 146,-77 146,-77c0,0 61,109 61,110c0,1 -44,18 -44,18c0,0 89,58 89,58c0,0 74,-24 74,-24" size="600"
        fill-duration="4" /> -->
      <loading-progress :progress="leftProgress" :indeterminate="indeterminate"
        :counter-clockwise="counterClockwise" :hide-background="hideBackground"
        shape="M169.213,253.951
			c0,0-101.882,16.68-100.529-31.105c0,0-17.581-32.458-2.705-76.637c0,0-7.664-69.424,60.859-50.039
			c0,0,73.481-11.27,90.161-85.653" size="350" fill-duration="4" />
    </div>
    <div class="progress1">
      <!-- 自定义svg路径 -->
      <loading-progress :progress="rightProgress" :indeterminate="indeterminate"
        :counter-clockwise="counterClockwise" :hide-background="hideBackground"
        shape="M168.091,254.066c0,0,89.34,21.207,94.754-35.195
			c0,0-52.792-1.354-51.889-49.633c0,0,14.89-55.048,51.889-72.645c0,0,74.901-75.352-47.377-85.279"
        size="350" fill-duration="4" />
    </div>
    <div class="grogress2 ss0">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
    <div class="grogress2 ss1">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
    <div class="grogress2 ss2">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
    <div class="grogress2 ss3">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
    <div class="grogress2 ss4">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
    <div class="grogress2 ss5">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
    <div class="grogress2 ss6">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
    <div class="grogress2 ss7">
      <!-- 圆形 -->
      <div class="box">
        <loading-progress :progress="progress" :indeterminate="indeterminate"
          :counter-clockwise="counterClockwise"
          :hide-background="hideBackground" size="27" rotate fillDuration="2"
          rotationDuration="1" />
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-progress-path/dist/vue-progress-path.css'
export default {
  data() {
    return {
      progress: 0.5, // 进度
      leftProgress: 0.5, // 进度
      rightProgress: 0.7, // 进度
      indeterminate: false, // 循环
      counterClockwise: false, // 逆时针
      hideBackground: false // 隐藏背景路径
    }
  }

}
</script>

<style lang='less'>
.wrap {
  // background-color: #152B80;
  position: relative;
  width: 100vw;
  height: 100vh;
}
.progress1 {
  position: absolute;
  top: 0;
  /* // 路径宽度 */
  .vue-progress-path path {
    stroke-width: 18;
  }
  /* // 进度颜色 */
  .vue-progress-path .progress {
    stroke: #6a8a32;
  }
  /* // 背景颜色 */
  .vue-progress-path .background {
    stroke: #ff9127;
  }
}
.grogress2 {
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  background-color: #ff9130;
  position: absolute;
  top: 14px;
  left: 60%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    width: 0.8rem;
    height: 0.8rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    z-index: 3;
    g {
      // transform:none;
    }
  }
  /* // 路径宽度 */
  .vue-progress-path path {
    stroke-width: 3;
  }
  /* // 进度颜色 */
  .vue-progress-path .progress {
    stroke: #c08476;
  }
  /* // 背景颜色 */
  .vue-progress-path .background {
    stroke: #99270c;
  }
}
.ss1 {
  top: 90px;
  left: 37%;
}
.ss2 {
  top: 147px;
  left: 18%;
}
.ss3 {
  top: 147px;
  left: 57%;
}
.ss4 {
  top: 256px;
  left: 45%;
}
.ss5 {
  top: 223px;
  left: 18%;
}
.ss6 {
  top: 218px;
  left: 69%;
}
.ss7 {
  top: 88px;
  left: 70%;
}
</style>
