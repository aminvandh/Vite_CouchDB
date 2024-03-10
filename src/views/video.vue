<template>
    <video ref="videoPlayer" class="video-js" controls style="width: 495px; height:495px;"></video>
</template>

<script>
import videojs from 'video.js';
import axios from 'axios';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null,
      videoUrl: null
    }
  },
  mounted() {
    axios.get('/api/video', { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'video/mp4' });
        this.videoUrl = URL.createObjectURL(blob);
        this.initializePlayer();
      })
      .catch(error => {
        console.error('Cant:', error);
      });
  },
  methods: {
    initializePlayer() {
      this.player = videojs(this.$refs.videoPlayer, {
        ...this.options,
        sources: [{
          src: this.videoUrl,
          type: 'video/mp4'
        }],
        textTrackSettings: false,
        autoplay: true,
        controls: false,
        controlBar: false,
        bigPlayButton: true,
      }, () => {
        this.player.log('onPlayerReady', this);
      });
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style scoped>


</style>
