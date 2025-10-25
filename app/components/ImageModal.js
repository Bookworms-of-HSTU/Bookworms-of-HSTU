'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './ImageModal.module.css';

export default function ImageModal({ src, alt, onClose }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Mouse event handlers for panning
  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Store the starting point of the drag relative to the image
    setPosition({
      x: e.clientX - position.x, 
      y: e.clientY - position.y,
    });
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - position.x;
      const newY = e.clientY - position.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      containerRef.current.style.cursor = 'grab';
    }
  };
  
  // Prevent background click from closing when dragging image
  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose}>&times;</button>
      <div 
        ref={containerRef}
        className={styles.modalContent}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'grab' }}
        onClick={handleImageClick} // Prevent overlay click
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={styles.zoomableImage}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />
      </div>
    </div>
  );
}
