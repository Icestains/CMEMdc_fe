<template>
  <div class="app-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-table
      v-loading="ClientsListLoading"
      :data="EmqxClientsList"
      element-loading-text="Loading"
      fit
      highlight-current-row
      empty-text="暂无设备数据"
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
          <span v-if="row.State">在线</span>
          <span v-else>离线</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button
            type="success"
            size="small"
            icon="el-icon-zoom-in"
            @click="getDataBySender(row.ClientId)"
          >
            查看数据
          </el-button>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import { GetClientsList, GetDataBySender } from '@/api/emqx.js'
  import { parseTime } from '@/utils'
  // import mqtt from 'mqtt'

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

        realTimeData: {
          clientId: null,
          randomData: [],
          randomDataTime: []
        },
        realTimeClient: null,
        showRealTime: false,

        lineChartData: {
          clientId: null,
          randomData: [],
          randomDataTime: []
        },
        OnlineClientsList: []

      }
    },

    created() {
      this.fetchEmqxClients()
    },
    methods: {
      async fetchEmqxClients() {
        this.ClientsListLoading = true
        const { data } = await GetClientsList()
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
      getDataBySender(ClientId) {
        this.DataListLoading = true
        this.cleanChart()
        GetDataBySender(ClientId).then(res => {
          const data = res.data
          if (!data.length) {
            console.log('暂无数据')
            this.$message.error('暂无数据')
            this.DataListLoading = false
            return
          }
          console.log(data[0].sender)
          this.lineChartData.clientId = data[0].sender
          this.EmqxDataList = data.map(v => {
            this.lineChartData.randomData.push(v.payload.randomData)
            this.lineChartData.randomDataTime.push(v.payload.time)
            return v
          })
        }).catch(err => {
          console.log(err)
          // this.Message.error(err || 'Has Error')
        })
        this.DataListLoading = false
      },
      cleanChart() {
        this.lineChartData.clientId = null
        this.lineChartData.randomData = []
        this.lineChartData.randomDataTime = []
      }

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
