import { useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";

export default function EmberParticles() {
  // Load the slim version of tsparticles for better performance
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Ensure particles stay in the background
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } }, // Adjust ember density
          color: { value: ["#ff4500", "#ff6347", "#ffb347"] }, // Ember color variation
          shape: { type: "circle" },
          opacity: {
            value: 0.8,
            random: true,
            anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false },
          },
          size: {
            value: 2.5,
            random: true,
            anim: { enable: true, speed: 3, size_min: 0.5, sync: false },
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "top-right",
            random: true,
            straight: false,
            out_mode: "out",
          },
        },
        interactivity: { detect_on: "canvas", events: { resize: true } },
        background: { color: "transparent" }, // Keep background clean
      }}
    />
  );
}
