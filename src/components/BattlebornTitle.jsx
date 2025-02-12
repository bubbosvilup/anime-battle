import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BattlebornTitle() {
  // Create references to the title and subtitle elements
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Animate the title text when the component mounts
    // The title will start with zero opacity, a slight upward position, and a smaller scale
    // It will then transition to full opacity, its normal position, and full scale
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50, scale: 0.8 }, // Initial state before animation
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" } // Final state with animation duration and easing
    );

    // Animate the subtitle text with a delay so it appears slightly after the title
    // The subtitle will start with zero opacity and a slight downward position
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 }, // Initial state
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" } // Delayed appearance for smoother effect
    );

    // Add a dynamic glow effect to the title text
    // Instead of a siren-like blinking, the glow intensity will subtly fluctuate randomly
    const glowAnimation = () => {
      gsap.to(titleRef.current, {
        textShadow:
          "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)", // Base glow
        duration: Math.random() + 1, // Random duration between 1 and 3 seconds
        ease: "power1.inOut",
        onComplete: glowAnimation, // Recursively call itself to keep the glow effect random
      });
    };
    glowAnimation();

    // Add a subtle animation to the subtitle text
    // The text will gently shift up and down slightly to create a floating effect
    gsap.to(subtitleRef.current, {
      y: "+=5", // Move 5 pixels down
      repeat: -1, // Infinite loop
      yoyo: true, // Moves back up and down
      duration: 2, // Smooth transition over 2 seconds
      ease: "sine.inOut", // Soft and natural movement
    });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="text-center absolute top-16 left-1/2 transform -translate-x-1/2 text-white">
      {/* Main title text for BATTLEBORN, centered on the screen */}
      <h1
        ref={titleRef}
        className="text-6xl md:text-8xl font-extrabold tracking-widest text-white-600 drop-shadow-lg"
      >
        BATTLEBORN
      </h1>

      {/* Subtitle text for TEAMFIGHT, positioned below the main title */}
      <p
        ref={subtitleRef}
        className="text-xl md:text-2xl mt-2 tracking-wide text-white-600 drop-shadow-lg"
      >
        TEAMFIGHT
      </p>
    </div>
  );
}
