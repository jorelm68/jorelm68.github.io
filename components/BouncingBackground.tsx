"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// --- PHYSICS CONFIGURATION ---
const BOX_SIZE = 120; 
const MOUSE_REPULSION_RADIUS = 200; 
const MOUSE_REPULSION_FORCE = 1.5;  

const IMAGES = [
  "/DNEP.png", 
  "/ROSS.png", 
  "/LSA.png"
];

export default function BouncingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isVisible, setIsVisible] = useState(false);

  // Physics state
  const physicsState = useRef(
    IMAGES.map((_, i) => {
      const baseSpeed = Math.random() * 2.0 + 1.0; 
      
      return {
        id: i,
        baseSpeed, 
        x: Math.random() * 500,
        y: Math.random() * 500,
        vx: (Math.random() > 0.5 ? 1 : -1) * baseSpeed,
        vy: (Math.random() > 0.5 ? 1 : -1) * baseSpeed,
        isHovered: false, // Track state in memory to prevent DOM style spamming
      };
    })
  );

  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollDelta = useRef(0);
  const mousePos = useRef({ x: -1000, y: -1000 }); 
  const wasHoveringAny = useRef(false);

  useEffect(() => {
    setIsVisible(true);
    
    let animationFrameId: number;

    const loop = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const boxes = physicsState.current;
      const mouse = mousePos.current;
      
      const currentScrollDelta = scrollDelta.current;
      scrollDelta.current = 0;

      let isHoveringAny = false;

      boxes.forEach((box, i) => {
        // 1. Math-Based Viewport Hover Detection
        const isHovered = 
          mouse.x >= box.x && 
          mouse.x <= box.x + BOX_SIZE && 
          mouse.y >= box.y && 
          mouse.y <= box.y + BOX_SIZE;

        if (isHovered) {
          isHoveringAny = true;
          // Smoothly brake the block underneath the mouse so it stands still for the click
          box.vx *= 0.85;
          box.vy *= 0.85;
        } else {
          // 2. Only apply repulsion physics if the cursor is OUTSIDE the block
          const dxMouse = (box.x + BOX_SIZE / 2) - mouse.x;
          const dyMouse = (box.y + BOX_SIZE / 2) - mouse.y;
          const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceToMouse < MOUSE_REPULSION_RADIUS && distanceToMouse > 0) {
            const force = (MOUSE_REPULSION_RADIUS - distanceToMouse) / MOUSE_REPULSION_RADIUS;
            box.vx += (dxMouse / distanceToMouse) * force * MOUSE_REPULSION_FORCE;
            box.vy += (dyMouse / distanceToMouse) * force * MOUSE_REPULSION_FORCE;
          }

          // Friction & Baseline Settle
          const currentSpeed = Math.sqrt(box.vx * box.vx + box.vy * box.vy);
          if (currentSpeed > box.baseSpeed * 1.1) {
            box.vx *= 0.995; 
            box.vy *= 0.995;
          } else if (currentSpeed < box.baseSpeed * 0.95) {
            const scale = box.baseSpeed / (currentSpeed || 1);
            box.vx *= scale;
            box.vy *= scale;
          }
        }

        // Apply velocities to coordinates
        box.x += box.vx;
        box.y += box.vy;

        // Left / Right Boundaries
        if (box.x <= 0) {
          box.x = 0;
          box.vx = Math.abs(box.vx);
        } else if (box.x + BOX_SIZE >= width) {
          box.x = width - BOX_SIZE;
          box.vx = -Math.abs(box.vx);
        }

        // Top / Bottom Boundaries
        if (box.y <= 0) {
          box.y = 0;
          box.vy = Math.abs(box.vy);
          if (currentScrollDelta > 0) box.vy += currentScrollDelta * 0.15; 
        } else if (box.y + BOX_SIZE >= height) {
          box.y = height - BOX_SIZE;
          box.vy = -Math.abs(box.vy);
          if (currentScrollDelta < 0) box.vy += currentScrollDelta * 0.15; 
        }

        // 3. Render and Guard Opacity State Changes
        const el = boxRefs.current[i];
        if (el) {
          el.style.transform = `translate(${box.x}px, ${box.y}px)`;
          
          // Only update DOM style if the hover state actually changed
          if (isHovered !== box.isHovered) {
            box.isHovered = isHovered;
            el.style.opacity = isHovered ? "1" : "0.3";
          }
        }
      });

      // 4. Handle Object-to-Object Collisions 
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const b1 = boxes[i];
          const b2 = boxes[j];

          const dx = b1.x + BOX_SIZE / 2 - (b2.x + BOX_SIZE / 2);
          const dy = b1.y + BOX_SIZE / 2 - (b2.y + BOX_SIZE / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < BOX_SIZE) {
            const overlap = BOX_SIZE - distance;
            const nx = dx / distance;
            const ny = dy / distance;

            b1.x += (nx * overlap) / 2;
            b1.y += (ny * overlap) / 2;
            b2.x -= (nx * overlap) / 2;
            b2.y -= (ny * overlap) / 2;

            const tempVx = b1.vx;
            const tempVy = b1.vy;
            b1.vx = b2.vx;
            b1.vy = b2.vy;
            b2.vx = tempVx;
            b2.vy = tempVy;
          }
        }
      }

      // Only update global cursor if state changed
      if (isHoveringAny !== wasHoveringAny.current) {
        wasHoveringAny.current = isHoveringAny;
        document.body.style.cursor = isHoveringAny ? "pointer" : "";
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    // --- EVENT LISTENERS ---
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDelta.current += (currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Safety Shield: Ignore background click if clicking real interactive elements
      if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest("input") || 
        target.closest("textarea")
      ) {
        return;
      }

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const boxes = physicsState.current;

      for (const box of boxes) {
        if (
          mouseX >= box.x && 
          mouseX <= box.x + BOX_SIZE && 
          mouseY >= box.y && 
          mouseY <= box.y + BOX_SIZE
        ) {
          window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
          break;
        }
      }
    };

    // CRITICAL FIX: Third parameter set to `true` enables event capturing phase.
    // This intercepts movements and clicks before other elements can swallow them.
    window.addEventListener("mousemove", handleMouseMove, true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick, true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove, true);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick, true);
      document.body.style.cursor = ""; 
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 pointer-events-none z-[-1] overflow-hidden transition-opacity duration-[2000ms] ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {IMAGES.map((src, i) => (
        <div
          key={i}
          ref={(el) => {
            boxRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 rounded-xl overflow-hidden shadow-2xl"
          style={{ 
            width: BOX_SIZE, 
            height: BOX_SIZE,
            opacity: 0.3, // Forced base opacity directly in JSX
            willChange: "transform, opacity",
            transition: "opacity 250ms ease-out" 
          }}
        >
          <Image 
            src={src} 
            alt={`Floating background element ${i + 1}`} 
            width={BOX_SIZE} 
            height={BOX_SIZE}
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
      ))}
    </div>
  );
}