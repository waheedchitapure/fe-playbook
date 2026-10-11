# JavaScript Execution Context, Hoisting & Closures

## 1. Execution Context (JS Code Kaise Run Hota Hai?)

JavaScript ek **Synchronous Single-Threaded** language hai. Iska matlab ek baar me ek hi line execute hoti hai ek specific order me.

Jab bhi koi JS file run hoti hai, sabse pehle **Global Execution Context (GEC)** banta hai.

Har Execution Context ke **2 Phases** hote hain:

```
+-------------------------------------------------------+
|                 Execution Context                     |
+---------------------------+---------------------------+
| 1. Memory Creation Phase  | 2. Code Execution Phase   |
| (Variable Environment)    | (Thread of Execution)     |
|                           |                           |
| a: undefined              | a = 10                    |
| fn: function code {...}   | fn() executes line-by-line|
+---------------------------+---------------------------+
```

### Phase 1: Memory Creation Phase
- JS engine poore code ko scan karta hai.
- Variables (`var`) ko memory allocate hoti hai aur value milti hai `undefined`.
- Functions ko poora ka poora unka code assign ho jata hai.

### Phase 2: Code Execution Phase
- Code line-by-line chalna shuru hota hai.
- Jahan actual assignment hota hai (jaise `a = 10`), wahan value update hoti hai.

---

## 2. Hoisting & Temporal Dead Zone (TDZ)

### `var` vs `let` vs `const`
- `var`: Global ya Function scope me hoist hota hai aur `undefined` se initialize hota hai.
- `let` aur `const`: Hoist **hote hain**, lekin unhe alag script scope me rakha jata hai aur initialize nahi kiya jata jab tak unki line of code execute na ho.
- **Temporal Dead Zone (TDZ):** `let`/`const` ke declare hone se lekar initialize hone tak ka jo time/zone hota hai, use TDZ kehte hain. Agar TDZ ke dauran access kiya toh `ReferenceError: Cannot access 'x' before initialization` aayega.

```javascript
console.log(a); // Output: undefined
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization (TDZ)
let b = 20;
```

---

## 3. Closures (Sabse Favorite Interview Question)

### Definition (Simple Hinglish):
> **Closure** ek aisi property hai jisme ek inner function apne **lexical parent scope** ke variables ko yaad rakhta hai, chahe outer function execute hoke call stack se destroy (return) kyu na ho chuka ho!

### Code Example:
```javascript
function createCounter() {
  let count = 0; // Outer variable

  return function increment() {
    count++; // count is accessed via closure
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = createCounter();
console.log(counter2()); // 1 (Alag scope instance)
```

### Real-world use cases of Closures:
1. **Data Privacy / Encapsulation:** Variables ko bahar se directly modify hone se bachana (jaise private variables).
2. **Currying & Memoization:** Function results ko cache karna.
3. **Event Handlers & Callback functions:** State ko retain rakhna.
4. **React Hooks internally:** `useState` aur `useEffect` closures ke sahare hi pichhle render ki state ko yaad rakhte hain!

---

## 4. Top Interview Question: `setTimeout` inside `for` loop

### Question: Iska output kya aayega?
```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```
**Output:**
```
4 (after 1s)
4 (after 2s)
4 (after 3s)
```
**Kyun?**
Kyunki `var` function-scoped / globally shared hota hai. Jab tak `setTimeout` ka callback run hota hai, tab tak loop complete ho chuka hota hai aur `i` ki value `4` ho chuki hoti hai.

### Solution 1: `let` use karo (Block Scope):
```javascript
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i); // 1, 2, 3
  }, i * 1000);
}
```
*`let` har loop iteration ke liye ek naya block scope create karta hai.*

### Solution 2: Closure / IIFE use karo (`var` ke saath):
```javascript
for (var i = 1; i <= 3; i++) {
  (function(currentI) {
    setTimeout(() => {
      console.log(currentI); // 1, 2, 3
    }, currentI * 1000);
  })(i);
}
```
