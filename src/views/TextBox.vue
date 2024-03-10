<template>
  <div class="text-holder">{{ text }}</div>
</template>

<script>
export default {
  name: 'TextBox',
  data() {
    return {
      text: ''
    }
  },
  mounted() {
    this.fetchText();
  },
  methods: {
    async fetchText() {
  try {
    const response = await fetch('/api/text');
    const data = await response.json();
    this.text = data['text'];
  } catch (error) {
    console.error('Error retrieving text:', error.message);
    this.text = 'Failed to retrieve text';
  }
}

  }
}
</script>

<style scoped>
.text-holder {
  padding: 1px;
  border: 0px solid #cccccc;
  border-radius: 10px;
  color:black;
  width: 450px;
}
</style>


