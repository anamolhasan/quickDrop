# 🚚 QuickDrop – Smart Courier & Delivery Platform (Client Side)

QuickDrop is a **Next.js-based Smart Courier & Delivery Platform** that enables users to create, track, and manage deliveries with real-time tracking, instant notifications, secure proof of delivery, and integrated payment features.  
It is designed for **consumer-to-consumer (C2C)** personal deliveries — a fast, secure, and reliable way to send packages to friends, family, or individuals.

---

## 🌐 Live Demo
🔗 [QUICK DROP](https://quick-drop-six.vercel.app)

---

## 🧭 Project Overview
**QuickDrop** revolutionizes how individuals handle parcel deliveries by providing:
- Real-time tracking using **Leaflet Maps**
- Instant notifications & chatbot support
- Route optimization & digital proof of delivery
- Integrated **Stripe payment gateway**
- Rider feedback & star ratings
- Complaint box for user issues
- Secure authentication & JWT-based session handling

---

## 🏗️ Technologies Used

### **Frontend (Client)**
- ⚛️ **Next.js 15** – For SSR, SSG, and excellent SEO
- 💨 **Tailwind CSS v4** + **DaisyUI** – For responsive & elegant UI
- 🧠 **React Query (TanStack)** – For server-state management
- 💳 **Stripe Integration** – For secure online payments
- 🗺️ **Leaflet + React Leaflet** – For real-time map-based tracking
- ✨ **Framer Motion** – For smooth UI animations
- 💬 **SweetAlert2** – For stylish alerts & confirmations
- 📦 **Axios** – For API requests
- 🔐 **Next Auth + JWT Decode** – For secure authentication
- 🔊 **React Hot Toast** – For instant toast notifications
- 📈 **Recharts** – For data visualization
- 🌀 **Swiper** – For carousel/sliders
- 🛠️ **React Hook Form** – For form handling

### **Backend**
- ⚙️ **Node.js + Express.js** – REST API and server logic
- 🍃 **MongoDB** – Database for users, orders, payments, feedback
- 🔑 **JWT Authentication** – Secure route & data protection

---

## 📦 Dependencies

```json
"dependencies": {
  "@stripe/react-stripe-js": "^5.0.0",
  "@stripe/stripe-js": "^8.0.0",
  "@tanstack/react-query": "^5.90.2",
  "autoprefixer": "^10.4.21",
  "axios": "^1.12.2",
  "framer-motion": "^12.23.22",
  "jwt-decode": "^4.0.0",
  "leaflet": "^1.9.4",
  "lucide-react": "^0.544.0",
  "next": "15.5.3",
  "next-auth": "^4.24.11",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "react-fast-marquee": "^1.6.5",
  "react-hook-form": "^7.62.0",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-leaflet": "^5.0.0",
  "recharts": "^3.2.1",
  "sweetalert2": "^11.23.0",
  "swiper": "^12.0.2"
},
"devDependencies": {
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4.1.14",
  "daisyui": "^5.1.12",
  "eslint": "^9",
  "eslint-config-next": "15.5.3",
  "tailwindcss": "^4.1.14"
}
