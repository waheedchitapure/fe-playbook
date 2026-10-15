import React, { useState, useEffect } from 'react';

/**
 * Machine Coding Lab 2: Stopwatch / Timer Component
 * Key concepts:
 * - setInterval inside useEffect with clearInterval cleanup
 * - Avoiding Stale Closures with functional state updates: setSeconds(prev => prev + 1)
 * - Helper function to format seconds into HH:MM:SS
 */
export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        // ⚠️ Functional update avoids stale closures!
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // 🧹 Cleanup to prevent memory leaks when paused or unmounted
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // Helper: Format raw seconds into HH:MM:SS format
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div style={containerStyle}>
      <div style={timerDisplayStyle}>
        {formatTime(seconds)}
      </div>

      <div style={buttonGroupStyle}>
        <button
          onClick={handleStartPause}
          style={{
            ...btnStyle,
            backgroundColor: isRunning ? '#f59e0b' : '#10b981',
          }}
        >
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </button>

        <button
          onClick={handleReset}
          style={{
            ...btnStyle,
            backgroundColor: '#ef4444',
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div style={metaInfoStyle}>
        Status: <strong style={{ color: isRunning ? '#10b981' : '#6b7280' }}>
          {isRunning ? 'Running' : seconds > 0 ? 'Paused' : 'Stopped'}
        </strong>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '28px',
  borderRadius: '16px',
  background: '#ffffff',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  gap: '18px',
  minWidth: '280px',
};

const timerDisplayStyle = {
  fontFamily: 'Consolas, monospace',
  fontSize: '44px',
  fontWeight: 'bold',
  color: '#0f172a',
  letterSpacing: '2px',
  background: '#f8fafc',
  padding: '12px 24px',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '12px',
};

const btnStyle = {
  padding: '10px 20px',
  fontSize: '15px',
  fontWeight: '600',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'transform 0.1s ease, opacity 0.2s ease',
  outline: 'none',
};

const metaInfoStyle = {
  fontSize: '13px',
  color: '#64748b',
};
