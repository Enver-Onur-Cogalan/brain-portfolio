# 🧠 Brain Portfolio

**[🚀 View the live site here!](https://brain-portfolio.vercel.app)**

Interactive 3D brain-themed portfolio website with admin panel for content management.

## 📸 Screenshots

### Admin Panel - About Editor
<img width="1681" height="970" alt="Image" src="https://github.com/user-attachments/assets/60d43bc4-70e7-4d9d-bb1e-e762ac8a771e" />

### Admin Panel - Projects Editor
<img width="1681" height="970" alt="Image" src="https://github.com/user-attachments/assets/c4ad3e9e-acea-4f1a-9a30-69d927a69b35" />

### Admin Panel - Skills Editor
<img width="1681" height="970" alt="Image" src="https://github.com/user-attachments/assets/71898723-d048-4ee7-8eec-c5d12416221c" />

> **Note:** Add your screenshots to a `screenshots/` folder in the root directory.

## 🚀 Technologies Used

- **Frontend Framework:** React 19 + TypeScript
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Animations:** Framer Motion + GSAP
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Routing:** React Router DOM v7
- **Email Service:** EmailJS
- **Database**: MongoDB
- **Deployment**: Vercel

## 📂 Project Structure

```bash
brain-portfolio/
├── public/
│   └── brain_hologram.glb # 3D brain model
├── api/
│   └── content.ts # Serverless function for DB operations
├── src/
│   ├── components/
│   │   ├── canvas/ # 3D brain components
│   │   │   ├── BrainCanvas.tsx
│   │   │   ├── BrainModel.tsx
│   │   │   └── PostProcessing.tsx
│   │   ├── admin/ # Admin panel components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AboutEditor.tsx
│   │   │   ├── ProjectsEditor.tsx
│   │   │   ├── SkillsEditor.tsx
│   │   │   ├── PreviewPane.tsx
│   │   │   └── LanguageToggle.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── hooks/ # Custom React hooks
│   │   ├── useLanguageTransition.ts
│   │   ├── useLobeMapping.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useScrollTransition.ts
│   │   └── useThemeTransition.ts
│   ├── pages/
│   │   ├── Admin.tsx
│   │   ├── AdminLogin.tsx
│   │   └── Home.tsx
│   ├── store/ # Zustand stores
│   │   ├── useAuth.ts
│   │   ├── useContent.ts
│   │   └── useUI.ts
│   ├── locales/
│   │   └── translations.ts # EN/TR translations
│   ├── types/
│   │   └── content.ts
│   └── styles/
│       └── index.css
├── .env # Environment variables
├── package.json
├── vite.config.ts
└── tailwind.config.js



## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Admin Panel Password
VITE_ADMIN_PASSWORD=your_secure_password_here

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

#Database Configuration
MONGODB_URI=The_connection_string_for_your_MongoDB_database.
MONGODB_DB=The_name_of_the_database_to_be_used.
```

> Get your EmailJS credentials from [emailjs.com](https://www.emailjs.com/)

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Enver-Onur-Cogalan/brain-portfolio.git
cd brain-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
# Copy the environment variables above and add your credentials
```

4. **Run development server**
```bash
npm run dev
```

## 📄 License

This project is open source and available under the MIT License.
Feel free to use this project for your own portfolio!

Made with ❤️ using React, Three.js, and TypeScript
