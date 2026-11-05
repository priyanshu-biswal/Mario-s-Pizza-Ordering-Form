# Mario's Pizza Hub

A React single-page app for user registration, customizable pizza orders, and
order receipt history. Receipts and the registered user are stored in the
browser's `localStorage`; no backend or payment processing is connected.

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)

## Getting started

Open a terminal in the project directory and run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

On systems where `npm` works directly, `npm install` and `npm run dev` are
equivalent.

## Available commands

```powershell
npm.cmd run dev      # Start the development server
npm.cmd run build    # Create a production build in dist/
npm.cmd run preview  # Preview the production build locally
```

## Features

- Registration form with live validation and password visibility controls
- Pizza size, crust, topping, quantity, and side selections
- Automatic subtotal, 5% tax, and total calculations in rupees
- Printable order confirmation receipts
- Order history persisted in browser `localStorage`
- Responsive layout styled with Tailwind CSS

## Project structure

```text
.
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── OrderReceiptModal.jsx
│   │   ├── PizzaOrderForm.jsx
│   │   ├── ReceiptHistory.jsx
│   │   └── RegistrationForm.jsx
│   └── data/
│       └── pizzaOptions.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
