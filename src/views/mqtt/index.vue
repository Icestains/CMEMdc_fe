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
          <span v-if="row.State">在线</span>
          <span v-else>离线</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button
            v-if="!showRealTime&&row.State"
            type="success"
            size="small"
            icon="el-icon-zoom-in"
            @click="getRealTimeData(row.ClientId,row.ID)"
          >
            实时数据
          </el-button>
          <el-button
            v-if="showRealTime&&row.State"
            type="danger"
            size="small"
            icon="el-icon-zoom-in"
            @click="onClose()"
          >
            关闭实时数据
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row
      v-if="showRealTime"
      style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"
    >
      <line-chart :chart-data="realTimeData" />
    </el-row>

  </div>
</template>

<script>
  import { getDataList, getClientsList } from '@/api/emqx.js'
  import { parseTime } from '@/utils'
  import mqtt from 'mqtt'

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
          randomData: [],
          randomDataTime: []
        },
        realTimeClient: null,
        showRealTime: false,

        lineChartData: {
          clientId: null,
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
        console.log(data[0].topic.split('/')[0])
        this.lineChartData.clientId = data[0].topic.split('/')[0]
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
      getRealTimeData(ClientId, ID) {
        const subs = [`${ClientId}/${ID}`]

        // WebSocket 连接字符串
        const WebSocket_URL = 'ws://47.103.5.67:8083/mqtt'

        // TCP/TLS 连接字符串，仅限 Node.js 环境
        // const TCP_URL = 'mqtt://47.103.5.67/:1883'
        // const TCP_TLS_URL = 'mqtts://47.103.5.67/:8883'

        // 连接选项
        const options = {
          // 超时时间
          connectTimeout: 4000,

          // 认证信息
          clientId: 'emqx_js_res',

          // 心跳时间
          keepalive: 60,
          clean: true
        }

        this.realTimeClient = mqtt.connect(WebSocket_URL, options)

        // 连接成功后初始化订阅
        this.realTimeClient.on('connect', () => {
          console.log('Connected to', WebSocket_URL)

          // 订阅主题
          this.realTimeClient.subscribe(
            subs,
            { qos: 1 },
            (err) => {
              console.log(err || '订阅成功')
            })
        })

        // 为 message 事件添加处理函数
        this.realTimeClient.on('message', (topic, message) => {
          const payload = JSON.parse(message.toString())
          console.log('收到来自', topic, '的消息:', payload)
          this.realTimeData.clientId = topic
          this.realTimeData.randomData.push(payload.randomData)
          this.realTimeData.randomDataTime.push(payload.time)
        })

        this.showRealTime = true
      },
      onClose() {
        this.showRealTime = false

        this.realTimeClient.end()
        this.realTimeData.randomData = []
        this.realTimeData.randomDataTime = []
      },
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
