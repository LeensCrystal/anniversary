import "./styles.css";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { useState, useEffect, useRef } from 'react'
import bubblePopSound from './assets/bubble-burst.mp3';

export const RiveDemo = () => {
  const riveRef = useRef(null); // Create a ref

  const { RiveComponent } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: "cattt.riv",
    // Be sure to specify the correct state machine (or animation) name
    stateMachines: "State Machine 1",
    // This is optional.Provides additional layout control.
    // layout: new Layout({
    //   fit: Fit.FitWidth, // Change to: rive.Fit.Contain, or Cover
    //   alignment: Alignment.Center,
    // }),
    layout: new Layout({
      fit: Fit.Contain,
      minX: 50,
      minY: 50,
      maxX: 100,
      maxY: 100,
    }),
    autoplay: true,
    ref: riveRef,

  });
  return <RiveComponent />;
};

// Another example loading a Rive file from a URL
export const UrlDemo = () => {
  const { rive, RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    autoplay: true,
  });
  return <RiveComponent />;
};

export default function App() {
  const [counter, setCounter] = useState(0);
  // This will be a huge test


  const audio = new Audio(bubblePopSound);

  const playPopSound = () => {
    audio.src = bubblePopSound;
    audio.type = 'audio/mp3';
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0; // Reset the time to start from the beginning
    }

    audio.play().catch((error) => {});
  };

  const createBubble = () => {
    const container = document.getElementById('bubble-container');
    const catFrame = document.getElementById('catFrame');
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
        setCounter((prevCounter) => prevCounter + 1);
        console.log('Counter',counter)
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
  }

  // test
  useEffect(() => {
    // Code here will run once the component is mounted
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
      // Create new bubbles periodically
    setInterval(createBubble, 500);

    return () => {
      // This function will be called when the component is about to unmount
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      console.log('Component will unmount');
    };
  }, []); // The empty array ensures this effect is only applied once

  const handleMove = (event) => {
    // Normalize mouse and touch events
    let x, y;

    // Check if it's a touch event
    if (event.touches && event.touches.length > 0) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      // It's a mouse event
      x = event.clientX;
      y = event.clientY;
    }

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
      setCounter((prevCounter) => prevCounter + 1);
      console.log('Counter',counter)
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


  // // Create new bubbles periodically
  // setInterval(createBubble, 500);
  // This will be a huge test
  return (
    <div className="RiveContainer">
      {/* <RiveDemo /> */}
      {/* <UrlDemo /> */}

      {/* This is a test */}
      <div className="container prevent-user-selection" id="bubble-container">
        {counter < 25 && (
          <div className="centered-title prevent-user-selection">
            <div>Help this little <span style={{ color: 'brown' }}>Julian</span> burst some bubbles!</div>
            <div>{counter}/25</div>
          </div>
        )}
        {counter >= 25 && (
          <div className="fade-in">
            <div v-if="counter>=25" className="centered-title prevent-user-selection">02.10.2023</div>
            <div v-if="counter>=25" className="centered-sub-text prevent-user-selection">Happy anniversary hon ❤️❤️❤️</div>
          </div>
        )}
        <RiveDemo id="catFrame" />
      </div>
      {/* This is a test */}
    </div>
  );
}
