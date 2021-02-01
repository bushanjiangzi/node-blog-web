<template>
  <div>
    <h3>test</h3>
    <div>my name: {{ fullName }}</div>
    <el-button type="primary" round @click="add">加加</el-button>
  </div>
</template>

<script>
export default {
  name: "Test",
  data () {
    return {
      firstName: 'jiang',
      lastName: 'zi'
    };
  },
  computed: {
    fullName () {
      return this.firstName + this.lastName
    }
  },
  methods: {
    add () {
      this.lastName += 1
    }
  }
};
</script>

<style></style>
