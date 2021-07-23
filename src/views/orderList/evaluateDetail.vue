<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/orderlist' }"
          >订单列表</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/orderlist/evaluationmanagement' }"
          >评价管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <div>
          <span>订单编号：1233531323</span>
          <span>房间类型：大床房</span>
          <span>入住时间：2021-07-14 17:50:21</span>
        </div>
        <div>
          <span>用户昵称：张三</span>
          <span>入住人：袁杰是二杯</span>
          <span>电话号码：13888888888</span>
        </div>
        <div>
          <span>用户评分：10.0</span>
          <span>状态：入住成功</span>
          <span>评论时间：2021-07-14 17:50:21</span>
        </div>
        <div>
          <span>提交图片：</span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="demo-image__preview" style="width: 1000px">
        <el-image
          v-for="(ele, index) in srcList"
          :key="index"
          style="width: 180px; height: 180px"
          :src="url"
          :preview-src-list="srcList"
          fit="cover"
        ></el-image>
      </div>
      <div class="message">
        <span>提交的信息：</span>
        <span></span>
        <span></span>
      </div>
      <div class="comment">
        <div v-for="(ele, index) in commentList" :key="index" class="message">
          <span class="content">{{ commentList[index].content }}</span>
          <span class="contentTime">{{ commentList[index].contentTime }}</span>
        </div>
      </div>
      <div class="reply">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4}"
          placeholder="追加回复"
          v-model="textarea"
          resize="none"
        >
        </el-input>
         <el-button>提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EvaluateDetail",
  data() {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        // "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        // "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        // "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        // "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        // "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      commentList: [
        {
          content:
            "嗯，这家酒店很好，相当不错，住的很啊啊啊啊啊灑蘇打水多啊啊啊啊舒服。",
          contentTime: "2021/07/12   17：55：10",
        },
        {
          content: "嗯，这家酒店很好，相当不错，住的很舒服。",
          contentTime: "2021/07/12   17：55：10",
        },
        {
          content: "嗯，这家酒店很好，相当不错，住的很舒服。",
          contentTime: "2021/07/12   17：55：10",
        },
        {
          content: "嗯，这家酒店很好，相当不错，住的很舒服。",
          contentTime: "2021/07/12   17：55：10",
        },
        {
          content: "嗯，这家酒店很好，相当不错，住的很舒服。",
          contentTime: "2021/07/12   17：55：10",
        },
      ],
      textarea: "",
    };
  },
};
</script> 
 
 <style lang="scss" scoped>
.el-card {
  padding-bottom: 50px;
  .title {
    padding-left: 10px;
    text-align: left;
    height: 54px;
    line-height: 54px;
    background-color: #fafafa;
    font-size: 13px;
  }
  .main {
    margin-top: 20px;
    div {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-evenly;
      span {
        width: 400px;
      }
    }
  }
  .demo-image__preview {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: -20px;
    .el-image {
      margin: 0 5px;
      margin-top: 10px;
    }
  }
  .message {
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
    span {
      width: 400px;
    }
  }
  .reply{
      display: flex;
      height: 100px;
      text-align: center;
      justify-content: space-evenly;
      width: 50%;
      margin-left: 18%;
      margin-top: 35px;
      .el-button{
        margin-top: 10px;
        margin-left: 20px;
        width: 90px;
        height: 50px;
      }
  }
}
</style>