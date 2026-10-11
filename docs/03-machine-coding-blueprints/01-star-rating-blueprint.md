# Machine Coding Blueprint: Star Rating Component

## 🎯 Interview Problem Statement
> "Ek interactive Star Rating component create karo. User stars par hover kare toh preview dikhe, click kare toh rating save ho, mouse bahar jaye toh previous selected rating dikhe, aur keyboard se bhi access ho sake."

---

## 💡 Step 1: Requirements & State Planning

Interview me code likhne se pehle interviewer ko bolna:
1. **Inputs (Props):**
   - `totalStars`: Kitne stars render karne hain (default: `5`).
   - `onRate`: Callback function jab user rate kare.
2. **State variables:**
   - `rating`: Currently saved rating (0 se 5).
   - `hoverRating`: Jab user mouse kisi star par le jata hai (0 se 5). Agar hover nahi hai toh `0`.

---

## 🧠 Step 2: The Core Logic (Simple Hinglish)

> **Formula:**
> Koi star filled hoga ya empty?
> `isFilled = starValue <= (hoverRating || rating)`

*Agar `hoverRating > 0` hai, iska matlab user abhi mouse move kar raha hai, toh `hoverRating` ko priority do.*
*Agar hover nahi ho raha (`hoverRating === 0`), toh jo saved `rating` hai use show karo.*

---

## ⚡ Step 3: Event Handlers

1. **`onMouseEnter(index)`**: `setHoverRating(index)`
2. **`onMouseLeave()`**: `setHoverRating(0)` (Reset hover preview)
3. **`onClick(index)`**: `setRating(index)` + `onRate(index)`
4. **Keyboard Accessibility (`onKeyDown`)**:
   - `e.key === 'Enter' || e.key === ' '`: `handleClick(index)`

---

## 🛑 Common Interview Pitfalls
1. **`key` prop bhool jana:** Stars ko array render karte waqt unique key dena zaroori hai.
2. **Hover reset bhool jana:** Agar container par `onMouseLeave` nahi lagaya, toh last hovered star active hi reh jayega.
3. **Accessibility:** Interviewer impress hota hai jab aap `role="button"` aur `tabIndex={0}` add karte ho.
