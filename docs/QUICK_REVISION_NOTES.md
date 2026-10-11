# 📖 Frontend Quick Revision & Cheat-Sheet (Last-Minute Notes)

> Yeh document aapke interview se 1-2 din pehle quick revision ke liye hai. Isme lambi theory nahi, sirf **punchy bullet points, formula aur interviewer ke tricky traps** hain.

---

## ⚡ 1. Core JavaScript Engine & Closures

### Execution Context (2 Phases)
- **Phase 1 (Memory Creation):** Variable ko `undefined`, function ko pura code milta hai.
- **Phase 2 (Code Execution):** Values assign hoti hain aur code line-by-line chalta hai.

### TDZ (Temporal Dead Zone)
- `let` aur `const` hoist hote hain par initialize nahi hote.
- Declaration se pehle access karne par: `ReferenceError: Cannot access 'x' before initialization`.

### Closure (Interview Definition)
- Inner function apne lexical parent scope ke variables ko access kar sakta hai, chahe parent function execute hoke return kyu na ho chuka ho.
- **Real use:** Data privacy, memoization, event callbacks, React `useState` internals.

### The Loop Trap
```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
// Output: 4, 4, 4 (kyunki var function/global scoped hai)
// Solution: 'let' use karo (har loop me naya block scope banta hai)
```

---

## ⚡ 2. Array Methods & `reduce` Deep Dive

### `map` vs `filter` vs `reduce`
- `map`: Har element ko transform karta hai (output length = input length).
- `filter`: Condition check karta hai (output length <= input length).
- `reduce`: Array ko single value (number, object, array) me condense karta hai.

### The Empty Array Trap in `reduce`
- Agar `initialValue` di hai: `acc = initialValue`, loop index `0` se shuru.
- Agar `initialValue` nahi di: `acc = arr[0]`, loop index `1` se shuru.
- **DANGER:** Agar array empty `[]` hai aur `initialValue` nahi di, toh JS throw karega:
  `TypeError: Reduce of empty array with no initial value`. Always provide `initialValue`!

### Frequency Counter Pattern
```javascript
const fruits = ['apple', 'banana', 'apple'];
const counts = fruits.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc; // ⚠️ Hamesha acc return karna zaroori hai!
}, {});
// Result: { apple: 2, banana: 1 }
```

---

## ⚡ 3. Machine Coding: Star Rating Component

### Requirements & Props
- Props: `totalStars` (default 5), `onRate(value)` callback.
- States: `rating` (saved state), `hoverRating` (temporary preview state).

### The Golden Formula:
```javascript
// Star fill hoga ya empty?
const isFilled = starValue <= (hoverRating || rating);
```
- Agar mouse hover ho raha hai (`hoverRating > 0`), toh hover preview dikhao.
- Agar mouse bahar chala gaya (`hoverRating === 0`), toh saved `rating` dikhao.

### Accessibility Points (Interviewer Bonus)
- Har star par `role="button"` aur `tabIndex={0}` lagao.
- `onKeyDown` par `Enter` aur `Space` key handle karo.
