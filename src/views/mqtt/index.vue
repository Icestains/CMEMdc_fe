<template>
  <div class="app-container">
    <el-table
      v-loading="ClientsListLoading"
      :data="EmqxClientsList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ClientId">
        <template slot-scope="{row}">
          {{ row.ClientId }}
        </template>
      </el-table-column>
      <el-table-column label="Node">
        <template slot-scope="{row}">
          <span>{{ row.Node }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上线时间">
        <template slot-scope="{row}">
          <span>{{ row.OnlineAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span>{{ row.IsOnline }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <!--    <el-table-->
    <!--      v-loading="DataListLoading"-->
    <!--      :data="EmqxDataList"-->
    <!--      element-loading-text="Loading"-->
    <!--      border-->
    <!--      fit-->
    <!--      highlight-current-row-->
    <!--    >-->
    <!--      <el-table-column-->
    <!--        label="msgid"-->
    <!--      >-->
    <!--        <template slot-scope="{row}">-->
    <!--          {{ row.msgid }}-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="topic">-->
    <!--        <template slot-scope="{row}">-->
    <!--          <span>{{ row.topic }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="payload">-->
    <!--        <template slot-scope="{row}">-->
    <!--          <span>{{ row.payload.randomData }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->

  </div>
</template>

<script>
  import { getDataList, getClientsList } from '@/api/emqxjs'
  import { parseTime } from '@/utils'

  import LineChart from './components/LineChart'

  export default {
    name: 'Mqtt',
    components: {
      LineChart
    },
    data() {
      return {
        EmqxDataList: null,
        DataListLoading: true,
        EmqxClientsList: null,
        ClientsListLoading: true,

        lineChartData: {
          randomData: [],
          randomDataTime: []
        }

      }
    },
    created() {
      this.fetchEmqxData()
      this.fetchEmqxClients()
    },
    methods: {
      async fetchEmqxData() {
        this.DataListLoading = true
        const { data } = await getDataList()
        this.EmqxDataList = data.map(v => {
          this.lineChartData.randomData.push(v.payload.randomData)
          this.lineChartData.randomDataTime.push(v.payload.time)
          return v
        })
        this.DataListLoading = false
      },
      async fetchEmqxClients() {
        this.ClientsListLoading = true
        const { data } = await getClientsList()
        this.EmqxClientsList = data.map(v => {
          if (v.OnlineAt > v.OfflineAt) {
            v.IsOnline = '在线'
          } else {
            v.IsOnline = '离线'
          }
          v.OnlineAt = parseTime(v.OnlineAt, '{m}-{d} {h}:{i}:{s}')
          return v
        })
        this.ClientsListLoading = false
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
