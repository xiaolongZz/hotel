<template>
  <div>
    <el-card>
      <div class="title">评价管理</div>
      <div class="search">
        <el-form
          ref="form"
          :model="searchForm"
          label-width="80px"
          class="searchForm"
        >
          <el-form-item label="关键词" size="small ">
            <el-input
              v-model="searchForm.number"
              placeholder="房型/订单编号"
            ></el-input>
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
          <el-form-item label="评价来源" size="small ">
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
        </el-form>
      </div>
      <div class="searchbtn">
        <el-button>查询</el-button>
      </div>
      <div class="evaluationList">
        <el-table :data="evaluationData" border style="width: 100%" >
          <el-table-column prop="num" label="订单编号"></el-table-column>
          <el-table-column prop="room" label="房型"></el-table-column>
          <el-table-column prop="message" label="评价信息"> </el-table-column>
          <el-table-column prop="lever" label="评分等级"> </el-table-column>
          <el-table-column prop="state" label="评价状态"> </el-table-column>
          <el-table-column prop="name" label="用户昵称"> </el-table-column>
          <el-table-column prop="time" label="评价时间"> </el-table-column>
          <el-table-column label="操作"> 
            <!-- eslint-disable-next-line -->
              <template slot-scope="scope">
              <el-button type="text" size="small" @click="showDetail">详情</el-button>
              <el-button type="text" size="small">回复</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-card>
    
  </div>
</template>

<script>
export default {
  name: "Evaluationmanagement",
  data() {
    return {
      searchForm: {
        number: "",
        orderTime: "",
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
      evaluationData:[{
        num:5201314,
        room:'大床房',
        message:'垃圾房间',
        lever:'5.0',
        state:'生效',
        name:'海绵宝宝',
        time:'2021-07-17'
      },{
        num:5201314,
        room:'大床房',
        message:'垃圾房间',
        lever:'5.0',
        state:'生效',
        name:'海绵宝宝',
        time:'2021-07-17'
      },{
        num:5201314,
        room:'大床房',
        message:'垃圾房间',
        lever:'5.0',
        state:'生效',
        name:'海绵宝宝',
        time:'2021-07-17'
      }],
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
    };
  },
  methods:{
    showDetail(){
      console.log(1111);
       this.$router.push({ path: '/orderlist/detail'})
    }
  }
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
  .searchbtn {
    height: 40px;
    position: relative;
    .el-button {
      position: absolute;
      right: 239px;
      width: 130px;
    }
   
  }
  .evaluationList{
        margin-top: 20px;
    }
}
</style>