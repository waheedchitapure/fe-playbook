# Machine Coding Blueprint: Stopwatch / Timer Component

## 🎯 Interview Problem Statement
> "Ek Stopwatch / Timer component banao jisme Start, Pause, aur Reset buttons hon. Time HH:MM:SS format me dikhna chahiye, component freeze nahi hona chahiye, aur memory leak se bachna chahiye."

---

## 💡 Step 1: Requirements & State Planning

Code likhne se pehle interviewer ke samne structure plan karein:
1. **States:**
   - `seconds`: Total time elapsed in seconds (integer, starts at `0`).
   - `isRunning`: Timer chal raha hai ya ruka hua hai (boolean, default: `false`).
2. **Key Challenges Interviewer Checks:**
   - `setInterval` ka cleanup (Memory leaks prevent karna).
   - `setSeconds` me **Stale Closure Trap** se bachna.

---

## 🧠 Step 2: The Stale Closure Trap (Why Beginners Fail)

```javascript
// ❌ WRONG (Stale Closure):
setInterval(() => {
  setSeconds(seconds + 1); // Har bar '0 + 1 = 1' hi hoga!
}, 1000);

// ✅ CORRECT (Functional State Update):
setInterval(() => {
  setSeconds((prev) => prev + 1); // Hamesha latest value milegi!
}, 1000);
```

---

## 🧹 Step 3: Lifecycle & Cleanup (Zero Memory Leaks)

Jab component unmount ho ya pause ho, background timer ko clear karna zaroori hai:
```javascript
useEffect(() => {
  let intervalId = null;

  if (isRunning) {
    intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  // Return cleanup function:
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [isRunning]);
```

---

## ⏱️ Step 4: Time Formatting (HH:MM:SS)

```javascript
const formatTime = (totalSeconds) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};
```
