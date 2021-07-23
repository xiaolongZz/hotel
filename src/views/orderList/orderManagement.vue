<template>
  <div>
    <el-card>
      <div class="title">筛选查询</div>
      <div class="search">
        <el-form
          ref="form"
          :model="searchForm"
          label-width="80px"
          class="searchForm"
        >
          <el-form-item label="订单编号" size="small ">
            <el-input v-model="searchForm.number"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" size="small ">
            <el-date-picker
              v-model="searchForm.orderTime"
              type="datetimerange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入住时间" size="small ">
            <el-date-picker
              v-model="searchForm.CheckInTime"
              type="datetimerange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="支付时间" size="small ">
            <el-date-picker
              v-model="searchForm.payTime"
              type="datetimerange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离店时间" size="small ">
            <el-date-picker
              v-model="searchForm.leaveTime"
              type="datetimerange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态" size="small ">
             <el-select v-model="searchForm.state" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" size="small ">
            <el-input v-model="searchForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="支付方式" size="small ">
            <el-select v-model="searchForm.payType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small ">
            <el-button size="medium ">查询</el-button>
            <el-button size="medium ">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="title title2">订单列表</div>
      <div class="orderlist">
        <el-button>待确认</el-button>
        <el-button>待入住</el-button>
        <el-button>已入住</el-button>
        <el-button>已完成</el-button>
        <el-button>待付款</el-button>
        <el-button>已关闭</el-button>
        <el-button>全部订单</el-button>
      </div>
      <div class="orderlist1">
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="date" label="订单编号"></el-table-column>
          <el-table-column prop="name" label="会员昵称"></el-table-column>
          <el-table-column prop="address" label="联系人信息"> </el-table-column>
          <el-table-column prop="address" label="房型信息"> </el-table-column>
          <el-table-column prop="address" label="订单金额"> </el-table-column>
          <el-table-column prop="address" label="房间数"> </el-table-column>
          <el-table-column prop="address" label="入住人数"> </el-table-column>
          <el-table-column prop="address" label="支付方式"> </el-table-column>
          <el-table-column prop="address" label="下单时间"> </el-table-column>
          <el-table-column prop="address" label="订单状态"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Ordermanagement",
  data() {
    return {
      searchForm: {
        number: "",
        orderTime: "",
        CheckInTime: "",
        payTime: "",
        leaveTime: "",
        state:"",
        tel: "",
        payType: "",
      },
      orderPickerOptions: {
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
      tableData: [],
      options:{}
    };
  },
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
  .title {
    padding-left: 10px;
    text-align: left;
    height: 54px;
    line-height: 54px;
    background-color: #fafafa;
    font-size: 13px;
  }
  .title2{
    margin-top: 50px;
  }
  .search {
    margin-top: 20px;
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
  }
  .orderlist {
    display: flex;
    padding-left: 1px;
    .el-button {
      flex: 1;
      margin: 0;
      border-radius: 0;
      margin-left: -1px !important;
    }
  }
  .orderlist1{
    margin-top: 15px;
  }
}
</style>