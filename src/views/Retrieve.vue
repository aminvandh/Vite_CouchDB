<template>
  <div style="color: black; width: 500px">
    <ul>
      <li v-for="(value, index) in inputValues" :key="index">{{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValues: []
    };
  },
  methods: {
    async retrieveInputValues() {
      try {
        const response = await fetch('/api/retrieve');
        const data = await response.json();
        this.inputValues = data.inputValues || [];
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  mounted() {
    this.retrieveInputValues();
    setInterval(this.retrieveInputValues, 5000);
  }
};
</script>

<style scoped>

</style>
