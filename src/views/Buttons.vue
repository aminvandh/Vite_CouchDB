<template>
  <button @click="handleClick" :class="{ 'clicked': isClicked }">
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Default Button Text'
    }
  },
  data() {
    return {
      isClicked: false
    };
  },
  methods: {
    handleClick() {
      this.isClicked = true;
      // Reset the click state after a delay to allow the animation to complete
      setTimeout(() => {
        this.isClicked = false;
      }, 300); // Adjust the delay (in milliseconds) as needed
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
button {
  background-image: radial-gradient(circle, #edf8ba, #aeffd7);
  border: 0px;
  width: 500px;
  height: 180px;
  border-radius: 20px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  animation: clickAnimation 0.3s ease;
}


@keyframes clickAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
</style>
