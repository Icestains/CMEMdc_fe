<template>
  <div class="app-container">
    <div>
      mqtt server
    </div>
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
          <span v-else>{{ row.payload.randomData }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Actions"
        width="200"
      >
        <template slot-scope="{row}">
          <el-col v-if="row.edit">
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="deleteUser(row.Uid)"
            >
              Delete
            </el-button>
          </el-col>
          <el-col v-else>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit=!row.edit"
            >
              Edit
            </el-button>
          </el-col>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getList } from '@/api/emqxjs'

  export default {
    name: 'Mqtt',
    data() {
      return {
        list: null,
        listLoading: true
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
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTopic = v.topic //  will be used when user click the cancel botton
          v.originalPayload = v.payload
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
