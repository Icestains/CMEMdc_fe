<template>
  <div class="app-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="msgid"
      >
        <template slot-scope="{row}">
          {{ row.msgid }}
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        class-name="status-col"-->
      <!--        label="created"-->
      <!--        align="center"-->
      <!--        width="120"-->
      <!--      >-->
      <!--        <template slot-scope="{row}">-->
      <!--          <el-tag>{{ row.created }}</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="topic">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input
              v-model="row.topic"
              class="edit-input"
              size="small"
            />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.topic }}</span>
        </template>
      </el-table-column>
      <el-table-column label="payload">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input
              v-model="row.payload"
              class="edit-input"
              size="small"
            />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span>{{ row.payload.randomData }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getList } from '@/api/emqxjs'

  import LineChart from './components/LineChart'

  export default {
    name: 'Mqtt',
    components: {
      LineChart
    },
    data() {
      return {
        list: null,
        listLoading: true,
        // randomData: [],
        // randomDataTime: [],
        lineChartData: {
          randomData: [],
          randomDataTime: [],
        }

      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        console.log('before await')
        const { data } = await getList()
        console.log('after await:', data)
        this.list = data.map(v => {
          this.lineChartData.randomData.push(v.payload.randomData)
          this.lineChartData.randomDataTime.push(v.payload.time)
          return v
        })
        this.listLoading = false
      },
      onCancel() {},
      onSubmit() {},
      cancelEdit() {},
      confirmEdit() {},
      deleteUser() {}
    }
  }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 12px;
  }

</style>
