# 📚 LearnFetch

> A resource aggregation platform that helps students find free learning materials from multiple sources in one place.

![LearnFetch](https://img.shields.io/badge/LearnFetch-v1.0-6d28d9?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)

## 🌐 Live Demo
**[learnfetch.vercel.app](https://learnfetch.vercel.app)**

---

## 📖 About

LearnFetch is a unified search platform that aggregates free educational resources from multiple sources including YouTube, Open Library, ArXiv, and Wikipedia. Users can search any topic and instantly get curated videos, books, academic papers, and articles — all in one place.

---

## ✨ Features

- 🔐 **Authentication** — Secure login and signup via Supabase
- 🔍 **Unified Search** — Search across multiple resource types simultaneously
- 🎥 **YouTube Videos** — Curated tutorial videos for any topic
- 📚 **Books & PDFs** — Free books from Open Library
- 📄 **Academic Papers** — Research papers from ArXiv
- 📰 **Wikipedia Articles** — Quick reference articles
- 🔖 **Save Resources** — Bookmark resources for later
- 📱 **Responsive Design** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Auth & Database | Supabase |
| APIs | YouTube, Open Library, ArXiv, Wikipedia |
| Deployment | Vercel |

---

## 📁 Project Structure
```
src/
├── app/
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ResourceCard.tsx
│   │   └── FilterPanel.tsx
│   ├── pages/             # Page components
│   │   ├── SearchPage.tsx
│   │   ├── SavedResourcesPage.tsx
│   │   └── ResourceDetailPage.tsx
│   ├── services/          # API integrations
│   │   ├── youtubeApi.ts
│   │   ├── openLibraryApi.ts
│   │   ├── arxivApi.ts
│   │   └── wikipediaApi.ts
│   ├── types/             # TypeScript types
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── lib/                   # Supabase client
└── styles/                # Global styles
```

---

## 🔌 APIs Used

| API | Purpose | Free Tier |
|---|---|---|
| YouTube Data API v3 | Video tutorials | 10,000 req/day |
| Open Library API | Free books & PDFs | Unlimited |
| ArXiv API | Academic papers | Unlimited |
| Wikipedia API | Reference articles | Unlimited |

---

## 📄 License

MIT License — feel free to use this project for learning purposes.

---

<p align="center">Made with ❤️ by <a href="https://github.com/arjungupta2508">Arjun Gupta</a></p>
