# ⚛️ React.js Core & Machine Coding - Revision Notes

> **Target:** Namaste React Foundations, Architecture, Component Patterns & Interview Traps (PDF Q1 - Q15, Q36, Q40).

---

## 1. React Basics & Core Constructs

### React Element vs React Component vs React Node (PDF Q2)
* **React Element:** Ek plain immutable JavaScript object jo describe karta hai ki UI me kya dikhna chahiye.
  * Banaya jata hai JSX se ya `React.createElement('h1', null, 'Hello')`.
* **React Component:** Ek JavaScript function (ya class) jo React Elements return karta hai aur UI logic encapsulate karta hai.
* **React Node:** Jo kuch bhi render ho sakta hai: React element, string, number, array ya `null`.

### What is JSX & How does it work? (PDF Q3)
* JSX browser ko directly samajh nahi aata!
* **Babel** JSX ko compile/transpile karta hai `React.createElement()` calls me:
  ```javascript
  // JSX:
  const el = <h1>Hello</h1>;
  // Transpiled by Babel to:
  const el = React.createElement('h1', null, 'Hello');
  ```

---

## 2. State vs Props & Immutability

### State vs Props (PDF Q4)
| Aspect | State | Props |
|---|---|---|
| **Origin** | Component ke andar banti aur manage hoti hai | Parent component se pass hoti hai |
| **Mutability** | Mutable (via `setState` / `useState`) | Read-only (Immutable for child) |
| **Purpose** | Dynamic data jo time ke saath change ho sakta hai | Component ko configure aur data pass karne ke liye |

### Why React Recommends Against Mutating State (PDF Q23)
* React **shallow comparison** (reference check) use karta hai.
* Agar aap array me direct `items.push(4)` kar doge, toh memory reference same rehta hai!
* React sochega data change nahi hua aur component **re-render nahi hoga**!
* **Best practice:** Hamesha naya object/array banao (`[...items, 4]`).

---

## 3. Lists, Rendering & The `key` Prop

### Purpose of `key` Prop (PDF Q5)
* React ke **Reconciliation / Diffing Algorithm** ko batata hai ki list me kaun sa item add hua, delete hua, ya reorder hua.
* Without key, React poori list ko dobaara re-render kar dega.

### ⚠️ Array Index as Key kyu nahi use karna chahiye? (PDF Q6)
* Agar list items add/remove ya re-sort hote hain:
  * Index change ho jayenge!
  * React confuse ho jayega aur galat DOM nodes reuse kar lega.
* **Rule:** Hamesha unique ID use karo (e.g. `item.id`). Index sirf tab use karo agar list completely static ho.

---

## 4. Controlled Components & Search Filters (PDF Q7, Q43)

### Controlled vs Uncontrolled
* **Controlled Component:** Input ki value **React State** se bandhi hoti hai (`value={state}` + `onChange`). React is the **Single Source of Truth**.
* **Uncontrolled Component:** Input value ko direct **DOM** sambhalta hai (`useRef` se read kiya jata hai).

### 🛑 The Input Freeze Trap
* Agar `<input value={text} />` me `onChange` nahi lagaya, toh input **freeze** ho jayega!

### 🛡️ The 2-List Pattern in Search Filters (Namaste React Pattern)
* Hamesha **2 States** rakho:
  1. `allRestaurants`: Master Copy (Original API data, kabhi mutate nahi hota).
  2. `filteredRestaurants`: Display Copy (Screen par render hone wali list).

---

## 5. `useEffect` vs `useLayoutEffect` (PDF Q11)

| Feature | `useEffect` | `useLayoutEffect` |
|---|---|---|
| **Execution Timing** | Browser ke **Paint hone ke BAAD** (Asynchronous) | DOM updates ke baad par **Paint se PEHLE** (Synchronous) |
| **Blocking Behavior** | Screen render ko block nahi karta (Smooth UX) | Browser paint ko block karta hai |
| **Best Used For** | Data fetching (APIs), Event listeners, Timers | DOM measurements (width/height), Tooltip/Modal positioning |
| **Swiggy Cards** | **100% useEffect** (Taaki blank screen na dikhe) | ❌ API call ke liye kabhi use mat karo (Screen freeze hogi) |

> **Screen Flickering Fix:** Jab tooltip ya modal screen par aane se pehle jump/flicker karta hai, tab use sahi jagah bithane ke liye `useLayoutEffect` use karte hain.

---

## 6. Production Search Bar: The 4-Guard Architecture

1. **Debouncing:** Fast typing bursts ko rokta hai (user ke 300ms rukne par hi call).
2. **Minimum Length Guard:** `if (searchText.trim().length < 3) return;` (1-2 letters par API call block).
3. **Search Caching (Memory Hashmap):** `cache[query]` me save rakho taaki repeat search 0ms me load ho.
4. **Race Condition Prevention with `AbortController` (PDF Q40):** Naye keystroke aane par pending request ko `controller.abort()` se cancel karo.

---

## 7. Asynchronous Data Fetching & Shimmer UI (PDF Q36 & Q40)

### 4-Step Master Formula:
1. **Teen States:** `data` (`[]`), `isLoading` (`true`), `error` (`null`).
2. **`useEffect` with `[]`:** Sirf initial render par 1 baar call hoga.
3. **Handle Promises with `.finally()`:** Hamesha `setIsLoading(false)` karo.
4. **Conditional Rendering Order:** Pehle `error`, fir `isLoading` (Shimmer), fir Asli UI.

---

## 8. Machine Coding: Star Rating & Stopwatch

* **Star Rating Formula:** `const isFilled = starValue <= (hoverRating || rating);`
* **Stopwatch Stale Closure Fix:** `setSeconds(prev => prev + 1);` + cleanup: `return () => clearInterval(id);`
