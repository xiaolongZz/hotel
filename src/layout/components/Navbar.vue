<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="title">
      <span>小巴酒店</span>
    </div>
    <div class="headPortrait">
      <el-popover
        placement="top-start"
        width="200"
        trigger="hover"
      >
        <div class="logoutbox" style="text-align: center">
          <p style="border-bottom: 1px solid #ccc"> <a href="">首页</a> </p>
          <p @click="logout"><a href="">退出登录</a></p>
        </div>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          slot="reference"
        ></el-avatar>
      </el-popover>
          <i>某某酒店</i>
      <!-- <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar> -->
      <!-- <img src="../../assets/logo/touxiang.jpg" alt=""> -->
    </div>
    <div class="message">
      <span> 您有一笔新订单，请及时处理！</span>
      <i class="el-icon-bell"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #6c6d6f 1%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  // .breadcrumb-container {
  //   float: left;
  // }
  .title {
    float: left;
    width: 200px;
    height: 100%;
    margin-left: 20px;
    line-height: 50px;
    span {
      margin: 0;
      color: #fff;
      font-size: 24px;
    }
  }
  .message {
    float: right;
    // position: absolute;
    // right: 80px;
    width: 280px;
    height: 100%;
    line-height: 50px;
    span {
      color: #fff;
      font-size: 14px;
      &:hover {
        color: rgb(203, 224, 10);
        cursor: pointer;
      }
    }
    .el-icon-bell {
      color: #fff;
      // font-size: 24px;
    }
  }
  .headPortrait {
    // position: absolute;
    // right: 130px;
    line-height: 80px;
    width: 250px;
    height: 100%;
    float: right;
    cursor: pointer;
    
    i{
      position:absolute;
      top: -11px;
      margin-left: 8px;
      font-style: normal;
      color: #fff;
    }
    // cursor: pointer;

  }
}
</style>
