# 🎓 CODIAL - Role-Based Learning Management System

React + React Router v6 + Tailwind CSS + AOS Animations bilan qurilgan zamonaviy ta'lim boshqaruv tizimi.

## ✨ Xususiyatlar

- 🎨 **Modern UI/UX** - Tailwind CSS bilan chiroyli dizayn
- 📱 **To'liq Responsive** - Desktop, tablet, mobile uchun optimallashtirilgan
- 🎭 **4 xil Role** - Student, Teacher, Admin, Owner
- 🔐 **Protected Routes** - Role-based access control
- 🎬 **AOS Animations** - Smooth scroll animations
- 🎯 **Active States** - Joriy sahifa highlight
- 🔔 **Badge Notifications** - Real-time yangiliklar
- 📲 **Mobile Bottom Nav** - Qulay mobil navigatsiya
- 🍔 **Hamburger Menu** - Mobil sidebar

## 🚀 Texnologiyalar

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **AOS** - Animate On Scroll library
- **Vite** - Next generation build tool

## 📦 O'rnatish

```bash
# Repository ni clone qiling
git clone <repository-url>

# Papkaga kiring
cd codial

# Paketlarni o'rnating
npm install

# Development server ni ishga tushiring
npm run dev
```

## Foydalanuvchilar

Login sahifasida quyidagi foydalanuvchilardan birini tanlang:

| Foydalanuvchi | Role | Avatar |
|---------------|------|--------|
| Hasanali Turdialiyev | Student | 👨‍🎓 |
| Fatima Karimova | Teacher | 👩‍🏫 |
| Bobur Rahimov | Admin | 👨‍💼 |
| Sardor Toshmatov | Owner | 👔 |

## Responsive Dizayn

### Desktop (> 1024px)
- To'liq sidebar navigation
- Keng content area
- Hover effects

### Tablet (768px - 1024px)
- Optimized sidebar
- Responsive grid layouts

### Mobile (< 768px)
- menu
- Bottom navigation (4 ta asosiy sahifa)
- Touch-friendly interface

## 🎨 Dizayn Xususiyatlari

### Sidebar
- CODIAL logo (ko'k gradient)
- Icon + label navigation
- Active state (ko'k background)
- Badge notifications (qizil)
- User info (avatar + ism + role)
- Chiqish button

### Mobile Bottom Navigation
- 4 ta asosiy sahifa
- Icon + label
- Active state
- Touch-optimized

### Animations
- Fade-right sidebar items
- Fade-up content
- Smooth transitions
- Hover effects

## 📁 Folder Structure

```
src/
├── components/
│   ├── layouts/
│   │   ├── StudentLayout.jsx
│   │   ├── TeacherLayout.jsx
│   │   ├── AdminLayout.jsx
│   │   └── OwnerLayout.jsx
│   ├── MobileBottomNav.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── student/
│   ├── teacher/
│   ├── admin/
│   ├── owner/
│   └── Login.jsx
├── routes/
│   └── AppRoutes.jsx
├── utils/
│   └── auth.js
└── App.jsx
```

## 🎯 Rollar va Sahifalar

### Student (O'quvchi)
- Dashboard
- Yangiliklar (badge: 6)
- Profil
- Reyting
- Kitoblarim
- Auksion
- Baholash nizomi

### Teacher (Ustoz)
- Dashboard
- Yangiliklar (badge: 3)
- Reyting
- Auksion
- Baholash
- Baholash qoidalari
- Modallar

### Admin
- Dashboard
- Yangiliklar
- Kurslar
- O'quvchilar
- Ustozlar
- Auksion
- Modallar

### Owner (Ega)
- Dashboard
- Yangiliklar
- Adminlar
- Kurslar
- Ustozlar
- Guruhlar
- O'quvchilar
- Auksion
- Baholash
- Modallar

## 🎨 Color Palette

```js
primary: {
  50: '#f5f7ff',
  100: '#ebf0ff',
  200: '#d6e0ff',
  300: '#b3c7ff',
  400: '#8ca5ff',
  500: '#667eea',  // Main
  600: '#5568d3',
  700: '#4451b8',
  800: '#363d94',
  900: '#2d3275',
}
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## 📝 License

MIT

## 👨‍💻 Developer

Built with ❤️ by Asadbek Mirmahmudov and CODIAL team