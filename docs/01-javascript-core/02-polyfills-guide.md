# Essential JavaScript Polyfills & Implementations

Jab interviewer bolta hai *"Array.prototype.map ka polyfill likh ke dikhao"*, wo dekhna chahta hai:
1. Aapko `Array.prototype` aur `this` keyword ka idea hai ya nahi.
2. Corner cases (empty arrays, callback arguments `(element, index, array)`).

---

## 1. Array.prototype.myMap

```javascript
Array.prototype.myMap = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  // 'this' yahan wo array hai jiske upar myMap call hua hai
  for (let i = 0; i < this.length; i++) {
    // Sparse array check (holes in array)
    if (i in this) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

// Test
const numbers = [1, 2, 3, 4];
console.log(numbers.myMap((num) => num * 2)); // [2, 4, 6, 8]
```

---

## 2. Array.prototype.myFilter

```javascript
Array.prototype.myFilter = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};

// Test
const nums = [1, 2, 3, 4, 5];
console.log(nums.myFilter((n) => n % 2 === 0)); // [2, 4]
```

---

## 3. Array.prototype.myReduce (Tricky Interview Question!)

`reduce` ka sabse main catch: **initialValue optional hoti hai!** Agar initialValue nahi di gayi, toh array ka pehla element accumulator banta hai aur loop index 1 se start hota hai.

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const hasInitial = arguments.length > 1;
  let accumulator = hasInitial ? initialValue : this[0];
  let startIndex = hasInitial ? 0 : 1;

  if (this.length === 0 && !hasInitial) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

// Test
const sum = [1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

---

## 4. Debounce Function

### Concept:
Jab user continuous events trigger kare (jaise search input type karna), function tabhi execute ho jab user typing band kare aur ek given `delay` beet chuka ho.

```javascript
function debounce(fn, delay = 300) {
  let timerId = null;

  return function (...args) {
    const context = this;

    // Pichhla timer cancel karo
    if (timerId) clearTimeout(timerId);

    // Naya timer set karo
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
```

---

## 5. Throttle Function

### Concept:
Event chahe kitni bhi baar trigger ho (jaise window scrolling ya resizing), function ek fixed time interval me sirf **ek hi baar** chalega.

```javascript
function throttle(fn, limit = 300) {
  let inThrottle = false;

  return function (...args) {
    const context = this;

    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```

---

## 6. Flatten Array (Recursive Polyfill)

`[1, [2, [3, [4]], 5]]` ko `[1, 2, 3, 4, 5]` me convert karna.

```javascript
function flattenArray(arr, depth = 1) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result = result.concat(flattenArray(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Test
console.log(flattenArray([1, [2, [3, [4]]]], Infinity)); // [1, 2, 3, 4]
```
