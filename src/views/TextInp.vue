<template>
    <div class="TI">
      <input type="text" v-model="inputValue" placeholder="What to save ?">
      <button @click="saveInput">Submit</button>
  
      <div v-if="inputValues.length > 0">
        <h2>Saved Input Values:</h2>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputValue: '',
        inputValues: []
      };
    },
    methods: {
      async saveInput() {
        try {
          const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputValue: this.inputValue })
          });
          const data = await response.json();
          if (data.success) {
            this.inputValues.push(this.inputValue);
            this.inputValue = '';
          } else {
            console.error('Failed to save');
          }
        } catch (error) {
          console.error('Error saving:', error);
        }
      },
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
    }
  };
  </script>
  
<style scoped>
.TI {
  padding-top: 10%;
}
</style>
  