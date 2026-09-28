# 🌿 The Nature Club

A premium travel agency website with an integrated admin console for content management. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## ✨ Features

### Admin Console
- 🔐 Secure authentication with NextAuth
- 📝 Blog management with rich content
- 🗺️ Destination management with itineraries
- ⭐ Testimonial management with ratings
- 📊 Dashboard with analytics
- 🎨 Clean, intuitive interface

### Public Website (Coming Soon)
- 🏠 Homepage with hero section
- 🗺️ Destinations showcase
- 📰 Blog posts
- 💬 Customer testimonials
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Fill in your database credentials and generate a NextAuth secret:
```bash
openssl rand -base64 32
```

### 3. Set Up Database
```bash
npm run seed
```

Default admin credentials:
- **Email**: admin@thenatureclub.com
- **Password**: admin123456

⚠️ **Change this password after first login!**

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000/admin/login

## 📚 Tech Stack

- **Framework**: Next.js 16.3.4 (App Router)
- **React**: 19.2.8
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **Database**: Vercel Postgres
- **Authentication**: NextAuth v5
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Media Storage**: Vercel Blob (to be implemented)

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/              # Admin console
│   │   ├── login/         # Login page
│   │   ├── blogs/         # Blog management
│   │   ├── destinations/  # Destination management
│   │   └── testimonials/  # Testimonial management
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication
│   │   ├── blogs/         # Blog endpoints
│   │   ├── destinations/  # Destination endpoints
│   │   └── testimonials/  # Testimonial endpoints
│   └── (public)/          # Public pages (to be built)
├── components/
│   ├── ui/                # Reusable components
│   ├── admin/             # Admin components
│   └── public/            # Public components
├── lib/
│   ├── auth.ts           # Auth configuration
│   ├── db.ts             # Database queries
│   ├── validations.ts    # Form validations
│   └── utils.ts          # Utilities
└── types/
    └── index.ts          # TypeScript types
```

## 🗄️ Database Schema

- **users** - Admin authentication
- **blogs** - Blog posts with rich content
- **blog_media** - Blog images/videos
- **destinations** - Travel destinations
- **destination_media** - Destination galleries
- **testimonials** - Customer reviews

## 🎯 Implementation Status

### ✅ Completed
- Database schema and migrations
- Authentication system
- Admin dashboard
- Blog management (CRUD)
- Destination API endpoints
- Testimonial API endpoints
- Protected routes
- Type-safe forms with validation

### 🚧 In Progress
- Destination create/edit forms
- Testimonial create/edit forms
- Rich text editor integration
- Media upload system

### 📋 To Do
- Public homepage
- Public blog pages
- Public destination pages
- Public testimonials section
- Framer Motion animations
- SEO optimization
- Media upload with Vercel Blob

## 🔐 Security

- Password hashing with bcryptjs
- Protected admin routes
- JWT-based sessions
- Input validation with Zod
- SQL injection prevention
- XSS protection

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

```bash
vercel
```

### Environment Variables Needed

```env
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
BLOB_READ_WRITE_TOKEN=
```

## 📖 Documentation

- [Setup Guide](SETUP.md) - Detailed setup instructions

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.

## 📄 License

Private - All Rights Reserved

---

Built with ❤️ for The Nature Club
