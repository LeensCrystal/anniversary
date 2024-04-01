<template>
  <!-- <div class="container">
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
  </div> -->
  <div class="container" id="bubble-container">
    <div class="centered-title">02.10.2023</div>
    <div class="centered-sub-text">Happy anniversary hon ❤️❤️❤️</div>
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
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { Rive } from '@rive-app/canvas';

const props = defineProps({
  msg: String,
})
const canvas = ref(null);

function createBubble() {
  const container = document.getElementById('bubble-container');
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const size = Math.random() * 60 + 10; // Bubble size between 10px and 70px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`; // Random position across the bottom

  container.appendChild(bubble);

  // Animation
  bubble.animate([
      { bottom: '0px', opacity: 1 },
      { bottom: '100%', opacity: 0 }
  ], {
      duration: Math.random() * 3000 + 3000, // Duration between 3s and 6s
      easing: 'linear',
      iterations: 1
  }).onfinish = () => bubble.remove(); // Remove the bubble at the end of the animation
}

// Create new bubbles periodically
setInterval(createBubble, 1000);

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

/* .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
} */

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

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1; /* Ensure the container has a defined z-index */
}

.bubble {
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 0; /* Bubbles start invisible and fade in */
  z-index: 2; /* Higher z-index so bubbles are on top */
}
</style>
