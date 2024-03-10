<template>
 
    <div class="TL">
      <Button><TextBox></TextBox></Button>
    </div>

    <br/>
    <div>
      <img class="img" v-if="imageSrc" :src="imageSrc" alt="Loaded Image" />
    </div>
    
    <br/>
    <div>
      <BarCharts></BarCharts>
    </div>
    
    <br/>
    <div>
      <VideoBox></VideoBox>
    </div>

    <br/>
    <div style="padding-top: 50px;">
      <TextInp></TextInp>
    </div>

    <br/>
    <div>
      <Retriever></Retriever>
    </div>
</template>

<script>
import axios from 'axios';
import Button from './views/Buttons.vue';
import TextBox from './views/TextBox.vue';
import BarCharts from './views/Charts.vue';
import VideoBox from './views/video.vue';
import Retriever from './views/Retrieve.vue';
import TextInp from './views/TextInp.vue';


export default {
  name: 'App',
  components: {
    Button,
    TextBox,
    BarCharts,
    VideoBox,
    TextInp,
    Retriever,
  },
  data() {
    return {
      imageSrc: null,
    };
  },
  methods: {
    async loadImage() {
      try {
        const response = await axios.get('/api/image', { responseType: 'blob' });
        this.imageSrc = URL.createObjectURL(response.data);
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.loadImage();
  },
};
</script>
<style scoped>
  
  .img {
    border: 1px solid grey;
    border-radius: 20px;
    width: 500px;
    height: 400px;
  }

  .TL {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
