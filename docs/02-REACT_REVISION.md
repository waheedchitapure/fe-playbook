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
  * Form inputs ya state wale components me incorrect state preserve ho jayegi.
* **Rule:** Hamesha unique ID use karo (e.g. `item.id`). Index sirf tab use karo agar list completely static ho.

---

## 4. Controlled Components & Search Filters (PDF Q7, Q43)

### Controlled vs Uncontrolled
* **Controlled Component:** Input ki value **React State** se bandhi hoti hai (`value={state}` + `onChange`). React is the **Single Source of Truth**.
* **Uncontrolled Component:** Input value ko direct **DOM** sambhalta hai (`useRef` se read kiya jata hai).

### 🛑 The Input Freeze Trap
* Agar `<input value={text} />` me `onChange` nahi lagaya, toh input **freeze** ho jayega! User chahe kitna bhi type kare, text change nahi hoga.

### 🛡️ The 2-List Pattern in Search Filters (Namaste React Pattern)
* Hamesha **2 States** rakho:
  1. `allRestaurants`: Master Copy (Original API data, kabhi mutate nahi hota).
  2. `filteredRestaurants`: Display Copy (Screen par render hone wali list).

---

## 5. Production Search Bar: The 4-Guard Architecture

Jab interviewer puche ki *"Search Bar ko production level par scale kaise karoge?"*, toh yeh 4 points bolo:

1. **Debouncing:** Fast typing bursts ko rokta hai (user ke 300ms rukne par hi call).
2. **Minimum Length Guard:**
   ```javascript
   if (searchText.trim().length < 3) return; // 1-2 letters par API call block
   ```
3. **Search Caching (Memory Hashmap):**
   ```javascript
   const cache = { "pizza": [...results] };
   // Agar word cache me hai, toh 0ms me screen par dikhao, no API call!
   ```
4. **Race Condition Prevention with `AbortController` (PDF Q40):**
   ```javascript
   useEffect(() => {
     const controller = new AbortController();

     fetch(`/api/search?q=${searchText}`, { signal: controller.signal })
       .then(res => res.json())
       .then(data => setResults(data));

     // 🧹 Naya letter type hone par pichhli pending request cancel:
     return () => controller.abort();
   }, [searchText]);
   ```

---

## 6. Asynchronous Data Fetching & Shimmer UI (PDF Q36 & Q40)

### 4-Step Master Formula:
1. **Teen States:** `data` (`[]`), `isLoading` (`true`), `error` (`null`).
2. **`useEffect` with `[]`:** Sirf initial render par 1 baar call hoga.
3. **Handle Promises with `.finally()`:**
   ```javascript
   fetch('/api/cards')
     .then(res => res.json())
     .then(data => setCards(data))
     .catch(err => setError(err.message))
     .finally(() => setIsLoading(false)); // 👈 Hamesha loading false karega!
   ```
4. **Conditional Rendering Order:**
   * Pehle `error` check karo (`if (error) return <Error />`)
   * Fir `isLoading` check karo (`if (isLoading) return <Shimmer />`)
   * Fir Asli UI render karo.

---

## 7. Machine Coding: Star Rating Component

### Requirements & Props
* Props: `totalStars` (default 5), `onRate(value)` callback.
* States: `rating` (saved state), `hoverRating` (temporary preview state).

### 🌟 The Golden Formula:
```javascript
const isFilled = starValue <= (hoverRating || rating);
```
* Agar mouse hover ho raha hai (`hoverRating > 0`), toh preview dikhao.
* Agar mouse bahar chala gaya (`hoverRating === 0`), toh saved `rating` dikhao.

### ♿ Accessibility Checklist
* Har star par `role="button"` aur `tabIndex={0}` lagao.
* Keyboard support: `Enter` ya `Space` dabane par star select ho.
