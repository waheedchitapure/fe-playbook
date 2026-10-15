# ⚡ JavaScript Core & Machine Coding - Revision Notes

> **Target:** JS Foundations, Engine Internals, Polyfills & Output Tricky Questions.

---

## 1. Execution Context & JS Engine (2 Phases)
- **Everything in JS runs inside an Execution Context.**
- **Phase 1 (Memory Creation Phase):**
  - Variables (`var`) ko memory allocate hoti hai with value `undefined`.
  - Functions ko unka poora code memory me store kar diya jata hai.
- **Phase 2 (Code Execution Phase):**
  - Code line-by-line chalta hai (Single Threaded, Synchronous order me).

---

## 2. Hoisting, Scopes & Temporal Dead Zone (TDZ)
- `var`: Global scope me banta hai (`window.x = undefined`), isliye declaration se pehle access karne par `undefined` milta hai.
- `let` aur `const`: Alag **Script Scope** me bante hain. Hoist hote hain, par **uninitialized** rehte hain.
- **Temporal Dead Zone (TDZ):** Time from when a `let`/`const` is hoisted until it is declared/initialized with a value.

### ⚠️ Top 4 Interview Errors Table
| Error Type | Reason | Example |
|---|---|---|
| **`ReferenceError: Cannot access 'y' before initialization`** | Variable memory me hai, lekin **TDZ** ke andar access kiya gaya. | `console.log(y); let y = 50;` |
| **`ReferenceError: x is not defined`** | Variable poore program me kahin declare hi nahi kiya gaya. | `console.log(x);` |
| **`SyntaxError: Identifier 'a' has already been declared`** | Same scope me `let` ko do baar declare kar diya. | `let a = 10; let a = 20;` |
| **`TypeError: Assignment to constant variable`** | `const` variable ko reassign karne ki koshish ki. | `const pi = 3.14; pi = 4;` |

---

## 3. Lexical Environment & Closures
- **Lexical:** Physical placement in source code hierarchy.
- **Scope Chain:** Inner function apne local variables + parent ke lexical variables + global variables sab access kar sakta hai.
- **Closure (Interview Definition):**
  > *"A function bundled together with references to its lexical environment forms a Closure."*
  > Inner function apne parent function ke variables ko yaad rakhta hai, chahe parent function call stack se destroy (return) kyu na ho chuka ho!

### 🛑 The Loop + `setTimeout` Trap
```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
// Output: 4, 4, 4 (kyunki var globally/function shared hai)
// Solution 1: Use 'let' (har loop me naya block scope banta hai)
// Solution 2: Use Closure/IIFE: ((currentI) => setTimeout(...))(i)
```

### 🛑 The Stale Closure in Timers Trap
```javascript
// Galat: timer ke callback ne purana count=0 closure me pack kar liya
setInterval(() => setCount(count + 1), 1000); // Freezes at 1!

// Sahi (Functional update):
setInterval(() => setCount(prev => prev + 1), 1000); // Hamesha latest value!
```

---

## 4. Array Methods & Polyfills

### `map` vs `filter` vs `reduce`
- `map`: Har element ko transform karta hai (output length == input length).
- `filter`: Condition check karta hai (output length <= input length).
- `reduce`: Array ko single value me accumulate karta hai.

### 💣 The Empty Array Trap in `reduce`
- Agar `initialValue` nahi di aur array empty `[]` hai, toh JS crash hota hai with:
  `TypeError: Reduce of empty array with no initial value`. **Hamesha initialValue pass karein!**

### Frequency Counter Pattern
```javascript
const fruits = ['apple', 'banana', 'apple'];
const counts = fruits.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc; // ⚠️ acc return karna zaroori hai!
}, {});
// Result: { apple: 2, banana: 1 }
```
