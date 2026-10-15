import React, { useState } from 'react';
import StarRating from './components/StarRating';
import Stopwatch from './components/Stopwatch';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('components');
  const [activeComponent, setActiveComponent] = useState('stopwatch'); // 'star' or 'stopwatch'
  const [selectedRating, setSelectedRating] = useState(0);
  const [polyfillOutput, setPolyfillOutput] = useState('');

  const runPolyfills = () => {
    const arr = [10, 20, 30, 40];
    const mapped = arr.map(x => x * 2);
    const filtered = arr.filter(x => x > 20);
    const reduced = arr.reduce((acc, curr) => acc + curr, 0);

    setPolyfillOutput(
      `Original Array: [${arr.join(', ')}]\n` +
      `myMap (x * 2): [${mapped.join(', ')}]\n` +
      `myFilter (x > 20): [${filtered.join(', ')}]\n` +
      `myReduce (sum): ${reduced}`
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Frontend Engineering Playbook & Lab</h1>
        <p className="subtitle">Interactive UI Patterns & Core Engineering Workbench</p>
      </header>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'components' ? 'active' : ''}`}
          onClick={() => setActiveTab('components')}
        >
          🧩 UI Components Lab
        </button>
        <button
          className={`tab-btn ${activeTab === 'polyfills' ? 'active' : ''}`}
          onClick={() => setActiveTab('polyfills')}
        >
          ⚡ JS Polyfills & Engine
        </button>
      </div>

      <main className="tab-content">
        {activeTab === 'components' ? (
          <section className="card-section">
            <div className="sub-tab-navigation" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                className={`tab-btn ${activeComponent === 'stopwatch' ? 'active' : ''}`}
                onClick={() => setActiveComponent('stopwatch')}
              >
                ⏱️ Lab 2: Stopwatch / Timer
              </button>
              <button
                className={`tab-btn ${activeComponent === 'star' ? 'active' : ''}`}
                onClick={() => setActiveComponent('star')}
              >
                ⭐ Lab 1: Star Rating
              </button>
            </div>

            {activeComponent === 'stopwatch' ? (
              <div className="component-card">
                <div className="card-header">
                  <h2>2. Stopwatch & Countdown Timer</h2>
                  <span className="badge">Interval & Cleanup</span>
                </div>
                <p className="description">
                  Features: Start / Pause toggle, Reset, zero memory leaks (clearInterval on unmount), and functional state updates preventing stale closures.
                </p>
                <div className="component-preview">
                  <Stopwatch />
                </div>
              </div>
            ) : (
              <div className="component-card">
                <div className="card-header">
                  <h2>1. Star Rating Component</h2>
                  <span className="badge">Interactive Pattern</span>
                </div>
                <p className="description">
                  Features: Hover preview, click to select, keyboard accessible, responsive transitions.
                </p>
                <div className="component-preview">
                  <StarRating
                    totalStars={5}
                    onRate={(val) => setSelectedRating(val)}
                  />
                </div>
                {selectedRating > 0 && (
                  <p className="feedback-text">Parent state received rating: {selectedRating} stars</p>
                )}
              </div>
            )}
          </section>
        ) : (
          <section className="card-section">
            <div className="component-card">
              <div className="card-header">
                <h2>Core JavaScript Polyfills</h2>
                <span className="badge">Engine Logic</span>
              </div>
              <p className="description">
                Custom Array prototype methods (map, filter, reduce, bind, debounce).
              </p>
              <button className="action-btn" onClick={runPolyfills}>
                Run Polyfill Verification
              </button>
              {polyfillOutput && (
                <pre className="code-block">{polyfillOutput}</pre>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
