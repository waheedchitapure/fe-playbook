# Study Tracker & Context Log (PROGRESS.md)

> **Instructions for AI Assistant:**
> This repository is a 1-month intensive preparation for Frontend Engineering (React.js + Core JavaScript + Machine Coding).
> The learner is doing the Namaste React curriculum, targeting product companies. Focus on:
> 1. Machine Coding components (step-by-step state design & edge cases).
> 2. Core JS polyfills & tricky output problems (closures, event loop, prototypes).
> 3. React architecture from the 75-questions guide (Virtual DOM, Fiber, Reconciliation, Custom Hooks, Performance).
> Explain everything in clear, simple Hinglish (Hindi in Roman script).

---

## 📅 Roadmap Overview (30 Days)

| Week | Focus Area | Status |
|---|---|---|
| **Week 1** | Core JS (Execution Context, TDZ, Closures, Debounce) + Basic UI Components (Star Rating, Timer, Search Filter) | 🟡 Active (Day 1-3) |
| **Week 2** | Controlled Forms, Memoization (`useMemo`, `useCallback`), Todo & Accordion Labs | ⚪ Upcoming |
| **Week 3** | Async Data Fetching, Autocomplete Search (Debounce + Caching), Infinite Scroll | ⚪ Upcoming |
| **Week 4** | Recursive Tree (Nested Comments/File Explorer), Redux/Context & Mock Drills | ⚪ Upcoming |

---

## 📝 Completed Work & Current State

### ✅ Concept 1: Core JS Engine & Closures (COMPLETED & TESTED)
- [x] **Execution Context:** 2 Phases (Memory Creation with `undefined` vs Code Execution).
- [x] **DevTools Scope:** `Global` (var) vs `Script` (let/const).
- [x] **Temporal Dead Zone (TDZ):** Window from hoisting to initialization.
- [x] **Top 4 JS Errors:** `ReferenceError (TDZ)`, `ReferenceError (not defined)`, `SyntaxError (duplicate let)`, `TypeError (const reassign)`.
- [x] **Lexical Scope & Scope Chain:** Hierarchy, Grandparent-Parent-Child analogy.
- [x] **Closures:** Function bundled with lexical environment (`createCounter`, `createAdder`, loop + `setTimeout` trap).
- [x] **Stale Closure in Timers:** `setInterval` capturing old state vs Functional updates (`prev => prev + 1`).
- [x] **Debouncing Concept & Implementation:** Lift analogy, timer cancellation with `clearTimeout`, closure variables.

### ✅ Concept 2: Array Methods & Polyfills
- [x] `map`, `filter`, `reduce` differences.
- [x] `reduce` under the hood: Accumulator, Current, Initial Value.
- [x] The Empty Array Trap (`TypeError: Reduce of empty array with no initial value`).
- [x] Frequency counter problem solved.

### ✅ Concept 3: React Architecture & Component Patterns
- [x] **Controlled Components:** `value={state}` + `onChange`, why omitting `onChange` causes freeze.
- [x] **The 2-List Pattern in Search Filters:** Master Copy (`allRestaurants`) vs Display Copy (`filteredRestaurants`).
- [x] **Asynchronous Data Fetching & Shimmer UI:** 4-step formula (`data`, `isLoading`, `error`), `.finally()` pattern.
- [x] **4-Guard Production Search Architecture:**
  1. Debounce (typing control)
  2. Min-length guard (`length >= 3`)
  3. Search Caching (`cache[query]`)
  4. Race Condition & `AbortController` (`signal`, cleanup `controller.abort()`)

### ✅ Machine Coding Labs
- [x] **Lab 1: Star Rating Component:** Hover preview formula `isFilled = starValue <= (hoverRating || rating)`, keyboard accessibility (`Enter`/`Space`).
  - Code: `src/components/StarRating.jsx`
  - Blueprint: `docs/03-machine-coding-blueprints/01-star-rating-blueprint.md`
- [x] **Lab 2: Stopwatch / Timer Component:** Start/Pause toggle, Reset, zero memory leaks (clearInterval on unmount), and functional state updates.
  - Code: `src/components/Stopwatch.jsx`
  - Blueprint: `docs/03-machine-coding-blueprints/02-stopwatch-blueprint.md`

### 📄 Separate Master Revision Documents Created:
1. **JavaScript Core & Polyfills:**
   - Word Doc: `docs/01-JAVASCRIPT_REVISION.doc`
   - Markdown: `docs/01-JAVASCRIPT_REVISION.md`
2. **React.js Architecture & Components:**
   - Word Doc: `docs/02-REACT_REVISION.doc`
   - Markdown: `docs/02-REACT_REVISION.md`

---

## 🎯 Next Immediate Action
1. Machine Coding Lab 3: **Live Search Bar with Debounce & Caching Component**.
2. React Core Question: `useEffect` vs `useLayoutEffect` (PDF Q11).
