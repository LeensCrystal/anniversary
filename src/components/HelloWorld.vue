<template>
  <div id="app" @mousemove="moveCat">
    <!-- <div class="cat" :style="{ left: `${catX}px`, top: `${catY}px` }"></div> -->
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;">
      <h1 style="
          position: absolute;
          top: 80%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          background: transparent;
          padding: 20px;
          width: 100% !important;
          margin: 0;
          z-index: 2;
      " class="marg">Happy Anniversary hon!!! ❤️❤️❤️</h1>
      <h1 style="
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          background: transparent;
          padding: 20px;
          width: 100% !important;
          margin: 0;
          z-index: 2;
      " class="marg">02.10.2023</h1>
      <iframe src="https://rive.app/community/8748-16732-cattt/embed" frameborder="0" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          z-index: 1;
      " allowfullscreen></iframe>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { Rive } from '@rive-app/canvas';

const props = defineProps({
  msg: String,
})
const canvas = ref(null);

const catX = ref(0);
const catY = ref(0);
const laserX = ref(Math.random() * 480);
const laserY = ref(Math.random() * 480);
let laserDX = 2 * (Math.random() < 0.5 ? 1 : -1);
let laserDY = 2 * (Math.random() < 0.5 ? 1 : -1);

const moveCat = (event) => {
  catX.value = event.offsetX - 25; // Center the cat icon
  catY.value = event.offsetY - 25; // Center the cat icon

  // Check for collision with the laser dot
  if (Math.abs(catX.value - laserX.value) < 25 && Math.abs(catY.value - laserY.value) < 25) {
    alert('Happy Anniversary! You caught the laser!');
    // Restart the game or end here
  }
};

// Function to update the laser's position smoothly
const moveLaser = () => {
  laserX.value += laserDX;
  laserY.value += laserDY;

  // Change direction when hitting the boundary
  if (laserX.value <= 0 || laserX.value >= 480) laserDX *= -1;
  if (laserY.value <= 0 || laserY.value >= 480) laserDY *= -1;
};

// Update the laser's position every 20 milliseconds for smoother movement
setInterval(moveLaser, 20);
// return {canvas}
</script>


<style scoped>
.read-the-docs {
  color: #888;
}

.marg {
  /* font-family: 'Margarita', sans-serif; */
  font-family: 'Margherita', sans-serif;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  /* border: 2px solid black; */
}
.cat {
  position: absolute;
  width: 50px;
  height: 50px;
  background: url('cat-icon.png'); /* Replace with your cat icon */
  background-size: cover;
}
.laser {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
}
</style>
