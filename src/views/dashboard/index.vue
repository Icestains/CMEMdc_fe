<template>
  <div class="dashboard-container">
    <div class="dashboard-text">hello {{ name }}</div>
    <div class="dashboard-token">auth token
      <hr>
      {{ token }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  mounted() {
    console.log('hello dashboard')
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }

    &-token {
      width: 200px;
      word-break: break-all;
    }
  }
</style>
