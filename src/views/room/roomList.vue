<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/room' }"
          >客房管理</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/room/roomlist' }"
          >客房列表</el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="tabs">
        <el-radio-group
          v-model="tabPosition"
          style="margin-bottom: 30px"
          @change="tabChange"
        >
          <el-radio-button label="客房列表">客房列表</el-radio-button>
          <el-radio-button label="价格调整">价格调整</el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="nowtab == '客房列表'" class="addRoom">
        <div class="search">
          <el-form
            ref="form"
            :model="searchForm"
            label-width="80px"
            class="searchForm"
          >
            <el-form-item label="客房名称" style="width: 20%">
              <el-input v-model="searchForm.roomName"></el-input>
            </el-form-item>
            <el-form-item label="添加时间">
              <el-date-picker
                v-model="searchForm.addData"
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
            <el-form-item label="客房分类">
              <el-select v-model="searchForm.classification" placeholder="标间" style="width:280px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="营销标签">
              <el-select v-model="searchForm.classification" placeholder="标间" style="width:280px">
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
          <div class="searchBtn">
            <el-button>添加客房</el-button>
            <el-button>查询</el-button>
            <el-button>导出</el-button>
            <el-button>批量导出</el-button>
          </div>
        </div>
      </div>

      <div v-if="nowtab == '价格调整'" class="adjustmentPrice">价格调整</div>
    </el-card>
  </div>
</template>

<script>
import { getRoomList} from '@/api'
export default {
  data() {
    return {
      tabPosition: "客房列表",
      nowtab: "客房列表",
      searchForm: {
        roomName: "",
        addData: "",
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
      options: [{
          value: '选项1',
          label: '标间'
        }]
    };
  },
  created(){
    console.log(111);
   const data =  getRoomList({hotel_id:"xb0002",status:1,page:1})
   console.log(data);
  },
  methods: {
    tabChange(tab) {
      this.nowtab = tab;
    },
   async getRoomList(){

   }
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
  .tabs {
    margin-top: 20px;
    .el-radio-group {
      .el-radio-button:nth-child(2) {
        margin-left: 20px;
        border-left: 1px solid #dcdfe6;
      }
    }
  }
  .addRoom {
    .search {
      .searchForm {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .searchBtn{
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        .el-button{
          margin-left: 20px;
        } 
      }
    }
  }
}
</style>