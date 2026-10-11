# Frontend Engineering Playbook & UI Lab (fe-playbook)

A comprehensive reference library and practical workbench for modern frontend engineering in **JavaScript** and **React**.

---

## 🎯 Repository Architecture

```
fe-playbook/
├── docs/                               # Engineering guides & deep-dive documentation
│   ├── 01-javascript-core/             # Engine internals, execution context, closures, event loop
│   ├── 02-react-internals/             # Virtual DOM, Fiber, Reconciliation, Custom Hooks, Performance
│   └── 03-machine-coding-blueprints/   # Standard design patterns for production UI components
│
├── src/
│   ├── polyfills/                      # Custom implementations (map, filter, reduce, bind, debounce)
│   ├── components/                     # Standalone interactive UI patterns
│   │   └── StarRating/
│   │   └── Autocomplete/
│   │   └── ...
│   ├── App.jsx                         # Interactive UI playground switcher
│   └── main.jsx
│
└── package.json
```

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the interactive lab:**
   ```bash
   npm run dev
   ```

3. **Syncing across devices (Home & Office):**
   ```bash
   # Before leaving:
   git add .
   git commit -m "feat: updated core notes and component patterns"
   git push origin main

   # When switching to the other device:
   git pull origin main
   ```

---

## 📚 Curriculum & Milestones

- [x] **Milestone 1:** JavaScript Core Engine, Prototypes & Polyfills
- [ ] **Milestone 2:** React Lifecycle, Hooks Mental Model & Form Components
- [ ] **Milestone 3:** Async Data Fetching, Debounced Search, Pagination & Virtualization
- [ ] **Milestone 4:** Complex State Machines, Recursive Component Trees (Nested Comments) & Optimization
