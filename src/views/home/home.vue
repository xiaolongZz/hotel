<template>
  <div>
    <el-card>
      <h4>亲爱的某某某酒店您好！您的入住时间为 2021-07-09</h4>
      <div class="title">数据分析</div>
      <div class="search">
        <el-form
          ref="form"
          :model="searchForm"
          label-width="80px"
          class="searchForm"
        >
          <el-form-item label="时间选择">
            <el-date-picker
              v-model="searchForm.searchDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单类别" size="small ">
            <el-select v-model="searchForm.value" placeholder="请选择">
              <el-option
                v-for="item in searchForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small ">
            <el-button class="searchbtn">查询</el-button>
            <el-button class="searchbtn">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="main" style="width: 100%; height: 270px"></div>
      <div class="title">热门房型</div>
      <div class="Echars2">
        <div id="main1" style="width: 50%; height: 270px"></div>
        <div class="search2">
          <div>
            <el-date-picker
              v-model="searchForm.searchDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
          <div>
            <el-button>查询</el-button>
            <el-button>导出</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "Home",
  data() {
    return {
      searchForm: {
        searchDate: "",
        name: "",
        options: [
          {
            value: "订单",
            label: "订单",
          },
          {
            value: "收入",
            label: "收入",
          },
        ],
        value: "订单",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    var echarts = require("echarts");
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    var myChart1 = echarts.init(document.getElementById("main1"));
    // 配置参数
    var option = {
      title: {
        text: "兑换情况",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: [
          "衬衫",
          "羊毛衫",
          "雪纺衫",
          "裤子",
          "高跟鞋",
          "袜子",
          "衬衫",
          "羊毛衫",
          "雪纺衫",
          "裤子",
          "高跟鞋",
          "袜子",
          "衬衫",
          "羊毛衫",
          "雪纺衫",
          "裤子",
          "高跟鞋",
          "袜子",
        ],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [
            5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20,
          ],
        },
      ],
    };
    var option1 = {
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          data: [
            { value: 1, name: "视频广告" },
            { value: 2, name: "联盟广告" },
            { value: 3, name: "邮件营销" },
            { value: 4, name: "直接访问" },
            { value: 5, name: "搜索引擎" },
          ],
        },
      ],
    };
    myChart.setOption(option);
    myChart1.setOption(option1);
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 13px;
  h4 {
    font-weight: 500;
    font-size: 14px;
    color: #909090;
  }
  .title {
    padding-left: 10px;
    text-align: left;
    height: 54px;
    line-height: 54px;
    background-color: #fafafa;
    font-size: 13px;
  }
  .search {
    margin-top: 10px;
    .searchForm {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .el-form-item {
        width: 480px;
        display: inline-block;
        .el-date-picker {
          width: 200px;
        }
      }
    }
    .searchbtn {
      width: 100px;
      margin-left: 50px;
    }
  }
  .Echars2 {
    display: flex;
    div {
      flex: 1;
      align-items: center;
    }
    .search2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 50px;
      padding-left: 500px;
      .el-button{
        width: 100px;
        margin-right: 15px;
      }
    }
  }
}
</style>
