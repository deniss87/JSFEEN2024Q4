# 🏎️ Async Race

## 🏁 About the Project

**Async Race** is an interactive **Single Page Application (SPA)** where you can manage a collection of cars, start their engines, and race them in real time.  
Each car is connected to an **HTTP-controlled engine API**, and its movement on the screen depends entirely on **real asynchronous responses from the server** — making every race dynamic and unpredictable.

Built with **TypeScript** and **pure JavaScript**, this project demonstrates advanced concepts like **asynchronous programming**, **state management**, and **modular architecture** without using any frameworks.

---

## ✨ Features

- 🚘 **Garage management** — create, edit, delete cars
- 🎨 Customize car colors with live preview
- ⚙️ **Engine control** — start/stop engine with real-time server sync
- 🏁 **Race mode** — launch all cars at once, track progress, and determine the winner
- 📊 **Winners table** — displays all winners with sorting and pagination
- 🧩 SPA architecture — seamless navigation between pages without reloads
- 📱 Responsive layout (min width: 500px)
- 💨 Smooth animations using **Web Animations API**

---

## ⚙️ Real-Time Interaction

A key feature of this project is **true asynchronous race behavior** driven by API responses:

- 🟢 A car **starts moving only after** receiving confirmation from the server that its engine is started and set to "drive" mode.
- 🔴 If at any moment the server reports **an engine failure**, the car **immediately stops**, even before reaching the finish line.
- 🏆 The first car to successfully complete the distance based on server timing is declared the winner.
- 🔁 All animations are synchronized with **real engine state changes** — no artificial timers.

This creates a **fully reactive simulation**, where network responses directly influence UI behavior and animation timing.

---

## 🧰 Tech Stack

| Technology             | Description                                      |
| ---------------------- | ------------------------------------------------ |
| **TypeScript**         | Strongly typed code and OOP structure            |
| **HTML5 / CSS3**       | Layout and design                                |
| **JavaScript (ES6+)**  | DOM manipulation, fetch requests, and animations |
| **Web Animations API** | Smooth, dynamic race animations                  |
| **Webpack**            | Bundling and development setup                   |
| **ESLint (Airbnb)**    | Code quality and linting rules                   |
| **REST API**           | Controls engines and race logic                  |
| **Responsive Design**  | Works across all screen sizes                    |

---

## ⚙️ Core Functionality

### 🚗 Garage View

- Manage cars with **CRUD operations**
- Generate 100 random cars at once
- Start/stop individual engines
- Trigger a **race for all cars on the current page**
- Realistic car motion based on server signals

### 🏆 Winners View

- Displays **winner stats** — car image, name, wins, and best time
- Supports **pagination** and **sorting** by wins or race time
- Updates automatically after each race

---

## 🧠 Key Learning Focus

- Building a **fully functional SPA** without frameworks
- Using **asynchronous programming** (Promises, async/await)
- Implementing **real-time API-driven animations**
- Integrating **TypeScript** with **Webpack and ESLint**
- Applying **OOP principles** in modular code design
- Handling **network errors and edge cases** in async flows

---

## 📂 Project Setup

To run the project locally, you need to start both the **frontend** and the **API server**.

### 👨🏻‍💻 1. Clone the repository

```bash
# Clone the repository
git clone https://github.com/deniss87/JSFEEN2024Q4/async-race.git

```

### ⚙️ 2. Start the API Server

The project requires a running **backend** to handle engine control and race logic.  
The server code is located in the `async-race-api` folder (copied from the official _Rolling Scopes School_ mock server).  
Make sure the API server is running before starting the frontend, otherwise engine requests will fail.

```bash
# Go to the API folder
cd async-race-api

# Install dependencies
npm install

# Start the server
npm start
```

### 🚗 3. Start the Frontend Application

```bash
# Navigate to the project folder
cd ../async-race

# Install dependencies
npm install

# Run the project
npm start
```
