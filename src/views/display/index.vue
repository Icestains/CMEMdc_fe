<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="UserName">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="department">
        <el-input v-model="form.department" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.created"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >Create
        </el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="Uid"
        width="100"
      >
        <template slot-scope="{row}">
          {{ row.Uid }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="created"
        align="center"
        width="120"
      >
        <template slot-scope="{row}">
          <el-tag>{{ row.created }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="username">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input
              v-model="row.username"
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
          <span v-else>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="department">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input
              v-model="row.department"
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
          <span v-else>{{ row.department }}</span>
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
              编辑
            </el-button>
          </el-col>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getUserInfoList, newUser, deleteUser, updateUser } from '@/api/table'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        form: {
          username: '',
          department: '',
          created: ''
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
        const { data } = await getUserInfoList()
        console.log('after await:', data)
        this.list = data.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalUsername = v.username //  will be used when user click the cancel botton
          v.originalDepartment = v.department
          return v
        })
        this.listLoading = false
      },
      deleteUser(id) {
        console.log(id)
        deleteUser(id).then(res => {
          this.$message('deleted Uid:', id)
          console.log(res)
          this.fetchData()
        })
      },
      cancelEdit(row) {
        row.username = row.originalUsername
        row.department = row.originalDepartment

        row.edit = false
        this.$message({
          message: 'The title has been restored to the original value',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        row.edit = false
        row.originalUsername = row.username
        row.originalDepartment = row.department
        console.log('update:', row)
        updateUser({
          Uid: row.Uid,
          username: row.username,
          department: row.department
        }).then(res => {
          this.$message({
            message: 'The title has been edited',
            type: 'success'
          })
        })
      },
      onSubmit() {
        this.$message('submit!')
        newUser(this.form).then(res => {
          console.log(res)
          this.fetchData()
        })
        console.log(this.form)
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
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
