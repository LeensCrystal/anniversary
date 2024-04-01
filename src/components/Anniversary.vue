<template>
  <div class="container prevent-user-selection" id="bubble-container">
    <div v-if="counter < 25" class="centered-title prevent-user-selection">
      <div>Help this little <span style="color: brown;">Julian</span> burst some bubbles!</div>
      <div>{{counter}}/25</div>
    </div>
    <!-- <div v-if="counter < 25" class="centered-title prevent-user-selection">{{counter}}/25</div> -->
    <transition name="fade">
      <div v-if="counter>=25" class="centered-title prevent-user-selection">02.10.2023</div>
    </transition>
    <transition name="fade">
      <div v-if="counter>=25" class="centered-sub-text prevent-user-selection">Happy anniversary hon ❤️❤️❤️</div>
    </transition>
    <iframe id="catFrame" class="prevent-user-selection" src="https://rive.app/community/8748-16732-cattt/embed" frameborder="0" style="
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
    "
    allowfullscreen></iframe>
</div>
</template>

<script setup>
import bubblePopSound from '../assets/bubble-burst.mp3';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const audio = new Audio(bubblePopSound);
let counter = ref(0)

const playPopSound = () => {
  audio.src = bubblePopSound;
  audio.type = 'audio/mp3';
  audio.currentTime = 0; // Rewind to the start
  audio.play();
};

const createBubble = () => {
  const container = document.getElementById('bubble-container');
  const iframe = document.getElementById('catFrame');
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const size = Math.random() * 60 + 10; // Bubble size between 10px and 70px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`; // Random position across the bottom

  container.appendChild(bubble);

  // Animation for bubble rising
  const animation = bubble.animate([
      { bottom: '0px', opacity: 1 },
      { bottom: '100%', opacity: 0 }
  ], {
      duration: Math.random() * 5000 + 5000,  // Duration between 3s and 6s
      easing: 'linear',
      iterations: 1
  });



  animation.onfinish = () => bubble.remove(); // Remove the bubble at the end of the animation

  // Burst effect on click/touch
  bubble.addEventListener('click', () => {
      counter.value++
      console.log(counter)
      playPopSound()
      bubble.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1.2)', opacity: 0.6 },
          { transform: 'scale(0)', opacity: 0 }
      ], {
          duration: 500,
          easing: 'ease-out',
          fill: 'forwards'
      }).onfinish = () => bubble.remove(); // Remove the bubble after the animation
  });

  // Disable pointer events on the iframe when hovering over a bubble
  bubble.addEventListener('mouseenter', () => {
    iframe.style.pointerEvents = 'none';
  });

  // Re-enable pointer events when the mouse leaves the bubble
  bubble.addEventListener('mouseleave', () => {
    iframe.style.pointerEvents = 'auto';
  });
}

// test
onMounted(() => {
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMove);
  document.removeEventListener('touchmove', handleMove);
});

const handleMove = (event) => {
  // Normalize mouse and touch events
  const x = event.clientX || event.touches[0]?.clientX;
  const y = event.clientY || event.touches[0]?.clientY;

  if (x && y) {
    // Check each bubble for intersection
    document.querySelectorAll('.bubble').forEach((bubble) => {
      const rect = bubble.getBoundingClientRect();
      const bubbleX = rect.left + rect.width / 2;
      const bubbleY = rect.top + rect.height / 2;
      const distance = Math.sqrt((x - bubbleX) ** 2 + (y - bubbleY) ** 2);

      // If the cursor or finger is inside the bubble
      if (distance < rect.width / 2) {
        burstBubble(bubble);
      }
    });
  }
};

const burstBubble = (bubble) => {
  if (!bubble.classList.contains('bursting')) { // Prevent re-bursting
    bubble.classList.add('bursting'); // Mark as bursting to avoid double triggers
    playPopSound()
    counter.value++
    console.log(counter)
    bubble.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.2)', opacity: 0.6 },
        { transform: 'scale(0)', opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
    }).onfinish = () => bubble.remove();
  }
};
// test


// Create new bubbles periodically
setInterval(createBubble, 500);

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

.laser {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
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
  top: 12%;
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
  height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: white;
	background: linear-gradient(to left, #7e94bf, #88bfb0);
	box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
	animation: linear rise2 5s;
	animation-delay: 3s;
	animation-timing-function: ease-in-out;
	animation-iteration-count:3;
	margin: 30px;
	margin-top: 200px;
  z-index: 2; /* Higher z-index so bubbles are on top */
}
.bubble:before {
	content: "";
	position: absolute;
	display: block;
	top: 5px;
	left: 7px;
	height: 23px;
	width: 23px;
	border-radius: 50%;
	background: #84b9bf;
	opacity: 0.8;
	overflow: hidden;
  z-index: 2; /* Higher z-index so bubbles are on top */
}

.bubble:after {
	content: "";
	position: absolute;
	display: block;
	top: 15px;
	left: 24px;
	height: 8px;
	width: 4px;
	border-radius: 50%;
	background: white;
	overflow: hidden;
  z-index: 2; /* Higher z-index so bubbles are on top */
}

.prevent-user-selection {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
