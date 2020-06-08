<template>
  <div class="app-container">
    <el-row
      style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"
    >
      <line-chart :chart-data="realTimeData" />
    </el-row>
    <el-row class="search-button">
      <el-col :span="6">
        <el-input
          v-model="currentClient"
          size="medium"
          placeholder="选择一个设备"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getRealTimeData()"
          >
            获取实时数据
          </el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      v-loading="ClientsListLoading"
      :data="OnlineClientsList"
      element-loading-text="Loading"
      fit
      highlight-current-row
      empty-text="暂无在线设备"
      @current-change="handleCurrentChange"
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
    </el-table>
  </div>
</template>

<script>

  import { GetClientsList } from '@/api/emqx.js'
  import { parseTime } from '@/utils'
  import mqtt from 'mqtt'

  import LineChart from './components/LineChart'

  export default {
    name: 'RealTime',
    components: {
      LineChart
    },
    data() {
      return {
        currentClient: '',
        EmqxDataList: null,
        DataListLoading: true,
        EmqxClientsList: [],
        ClientsListLoading: true,

        realTimeData: {
          clientId: null,
          randomData: [],
          randomDataTime: []
        },
        realTimeClient: null

      }
    },
    computed: {
      OnlineClientsList: function() {
        return this.EmqxClientsList.filter(item => item.State === 1)
      }
    },
    created() {
      this.fetchEmqxClients()
    },
    beforeDestroy() {
      this.onClose()
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
          // v.showRealTime = false
          return v
        })
        this.ClientsListLoading = false
      },
      getRealTimeData() {
        this.onClose()
        console.log(this.EmqxClientsList.find(item => item.ClientId === this.currentClient))
        if (!this.EmqxClientsList.find(item => item.ClientId === this.currentClient)) {
          this.$message('请获取有效在线客户端')
          return
        }
        const subs = [`${this.currentClient}/1`]
        // const subs = [`${ClientId}/${ID}`]
        console.log(subs)

        // WebSocket 连接字符串
        const WebSocket_URL = 'ws://47.103.5.67:8083/mqtt'
        // const WebSocket_URL = 'ws://localhost:8083/mqtt'

        // TCP/TLS 连接字符串，仅限 Node.js 环境
        // const TCP_URL = 'mqtt://47.103.5.67/:1883'
        // const TCP_TLS_URL = 'mqtts://47.103.5.67/:8883'

        // 连接选项
        const options = {
          // 超时时间
          connectTimeout: 4000,

          // 认证信息
          clientId: 'rec_emqx_ws',

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
      },
      onClose() {
        if (this.realTimeClient) {
          this.realTimeClient.end()
        }
        this.realTimeData.randomData = []
        this.realTimeData.randomDataTime = []
      },
      handleCurrentChange(val) {
        console.log(val.ClientId)
        this.currentClient = val.ClientId
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

  .search-button {
    margin: 20px;
  }
</style>
