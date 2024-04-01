<template>
  <div class="container">
    <div class="centered-title">02.10.2023</div>
    <div class="centered-sub-text">Happy anniversary hon ❤️❤️❤️</div>
    <iframe src="https://rive.app/community/8748-16732-cattt/embed"
      frameborder="0"
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        z-index: 1;"
      allowfullscreen
    >
    </iframe>
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


<style>
body {
  background-color: #b0aac1 !important;
}
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

.container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.centered-sub-text {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background-color: #b0aac1 !important;
  padding: 10px;
  margin: 0;
  z-index: 2;
  width: 100% !important;
  font-size: 4vw; /* Adjust the font size as needed */
  font-family: 'Margherita', sans-serif;
}
.centered-title {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background-color: #b0aac1 !important;
  padding: 10px;
  margin: 0;
  z-index: 2;
  width: 100% !important;
  font-size: 4vw; /* Adjust the font size as needed */
  font-family: 'Margherita', sans-serif;
}

/* Media query for devices with a width of up to 600px */
@media (max-width: 600px) {
    .centered-sub-text {
      font-size: 12vw; /* Smaller font size on mobile devices */
      padding: 5px; /* Smaller padding on mobile devices */
    }

    .centered-title {
      font-size: 12vw; /* Smaller font size on mobile devices */
      padding: 5px; /* Smaller padding on mobile devices */
    }
}
</style>
