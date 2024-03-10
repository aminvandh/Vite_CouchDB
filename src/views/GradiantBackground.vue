<template>
    <div class="gradient-background">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GradientBackground'
  }
  </script>
  
  <style scoped>
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .gradient-background {
    height: 100vh;
    width: 100vw;
    background-size: 200% 200%;
    background-image: linear-gradient(35deg, #9ac9ff 0%, #fad0c4 33%, #b9f7c3 66%, #b5baff 100%);
    animation: gradient 5s ease infinite;
  }
  </style>
  