# 📖 Frontend Quick Revision & Cheat-Sheet (Last-Minute Notes)

> Yeh document aapke interview se 1-2 din pehle quick revision ke liye hai. Isme lambi theory nahi, sirf **punchy bullet points, visual memory, formula aur interviewer ke tricky traps** hain.

---

## ⚡ 1. Core JavaScript Engine & Execution Context

### 🧠 Execution Context (2 Phases)
* **Everything in JS runs inside an Execution Context.**
* **Phase 1: Memory Creation Phase (Scan Round):**
  * Variables (`var`) ko memory milti hai with value `undefined`.
  * Functions ko poora ka poora code memory me allot ho jata hai.
* **Phase 2: Code Execution Phase (Action Round):**
  * Code line-by-line chalta hai, values assign hoti hain, execution contexts Call Stack me aate/jaate hain.

---

## ⚡ 2. Hoisting, Scopes & Temporal Dead Zone (TDZ)

### 🔍 DevTools Memory Concept
* `var`: Banta hai **Global Scope** (`window.x = undefined`). Isliye declaration se pehle read karne par `undefined` milta hai.
* `let` aur `const`: Bante hain alag **Script Scope** me. Hoist hote hain, par unhe initialize nahi kiya jata!
* **Temporal Dead Zone (TDZ):** Time from when a `let`/`const` is hoisted until it is declared/initialized. TDZ me variable access karna mana hai.

### ⚠️ Top 4 Interview Errors (Akshay Saini Special)
| Error Type | Reason | Example |
|---|---|---|
| **`ReferenceError: Cannot access 'y' before initialization`** | Variable memory me hai, par **TDZ** ke andar chhua gaya. | `console.log(y); let y = 50;` |
| **`ReferenceError: x is not defined`** | Variable poore program me kahin declare hi nahi kiya. | `console.log(x);` (no var/let/const) |
| **`SyntaxError: Identifier 'a' has already been declared`** | Same scope me `let` ko do baar declare kar diya. | `let a = 10; let a = 20;` |
| **`TypeError: Assignment to constant variable`** | `const` variable ko reassign karne ki koshish ki. | `const pi = 3.14; pi = 4;` |

---

## ⚡ 3. Lexical Environment & Closures

### 🌳 Scope Chain (Family Analogy)
* **Lexical** = Physical placement (Code kahan likha gaya hai).
* **Rule:** Child function apne local variables + parent ke variables + global variables sab access kar sakta hai. Bahar wala andar ke variables access nahi kar sakta.

### 🎒 Closure (Interview Golden Definition)
> *"A function bundled together with its lexical environment forms a Closure."*
> Inner function apne outer parent scope ke variables ko yaad rakhta hai, chahe parent function execute hoke call stack se destroy (return) ho chuka ho!

```javascript
function createAdder(x) {
  return function(y) {
    return x + y; // x is remembered via closure!
  };
}
const addFive = createAdder(5);
console.log(addFive(3)); // Output: 8
```

### 🛑 The Loop + `setTimeout` Trap
```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
// Output: 4, 4, 4 (kyunki var function/global scoped hai)
// Solution 1: 'let' use karo (har loop iteration me naya block scope banta hai)
// Solution 2: Closure / IIFE use karo: ((currentI) => setTimeout(...))(i)
```

---

## ⚡ 4. Array Methods & `reduce` Deep Dive

### `map` vs `filter` vs `reduce`
* `map`: Har element ko transform karta hai (Output length == Input length).
* `filter`: Condition check karta hai (Output length <= Input length).
* `reduce`: Array ko single value (number, object, array) me condense karta hai.

### 💣 The Empty Array Trap in `reduce`
* Agar `initialValue` di hai: `acc = initialValue`, loop index `0` se shuru.
* Agar `initialValue` nahi di: `acc = arr[0]`, loop index `1` se shuru.
* **DANGER:** Agar array empty `[]` hai aur `initialValue` nahi di, toh JS throw karega:
  `TypeError: Reduce of empty array with no initial value`. **Hamesha initialValue pass karein!**

### 📊 Frequency Counter Pattern
```javascript
const fruits = ['apple', 'banana', 'apple'];
const counts = fruits.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc; // ⚠️ Hamesha acc return karna zaroori hai!
}, {});
// Result: { apple: 2, banana: 1 }
```

---

## ⚡ 5. Machine Coding: Star Rating Component

### Requirements & Props
* Props: `totalStars` (default 5), `onRate(value)` callback.
* States: `rating` (saved state), `hoverRating` (temporary preview state).

### The Golden Formula:
```javascript
// Star fill hoga ya empty?
const isFilled = starValue <= (hoverRating || rating);
```
* Agar mouse hover ho raha hai (`hoverRating > 0`), toh hover preview dikhao.
* Agar mouse bahar chala gaya (`hoverRating === 0`), toh saved `rating` dikhao.

### ♿ Accessibility Points (Interviewer Bonus)
* Har star par `role="button"` aur `tabIndex={0}` lagao.
* `onKeyDown` par `Enter` aur `Space` key handle karo.
