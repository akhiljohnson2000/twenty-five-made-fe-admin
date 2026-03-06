# TwentyFiveMade Admin Panel - Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Environment Setup
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
JWT_SECRET=any_random_string_123
```

Create `admin/.env.local`:
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Install Dependencies
```bash
pnpm install
cd admin && pnpm install && cd ..
```

### 3. Create Admin User
In Supabase SQL Editor, run:
```sql
INSERT INTO admin_users (email, password_hash) VALUES (
  'admin@twentyfivemade.com',
  '$2a$10$9IQmtna7I5NyIEnJlylR8OPST9/PgBkqquzi.Ee3SE/PCFrTa8kKW'
);
```
(Password: `admin123` - change immediately!)

### 4. Run
Terminal 1 (Backend):
```bash
pnpm dev
```

Terminal 2 (Admin Panel):
```bash
cd admin && pnpm dev
```

### 5. Access
- Admin Panel: http://localhost:5173
- Login: admin@twentyfivemade.com / admin123

## 📊 What You Get

✅ **Dashboard** - Overview of products, categories, orders, revenue
✅ **Products** - Full CRUD for products with categories
✅ **Categories** - Manage product categories
✅ **Orders** - View and update order status
✅ **Cashbook** - Sales analytics with daily charts
✅ **Auth** - Secure admin login/logout

## 📁 Project Structure
```
admin/                    # Vue.js SPA
├── src/pages/            # 6 pages (Login, Dashboard, Products, Categories, Orders, Cashbook)
├── src/stores/           # Pinia state management
├── src/components/       # Vue components (Navbar, Sidebar, LineChart)
└── src/router/           # Vue Router setup

app/api/admin/            # Next.js API routes
├── login/                # Authentication
├── products/             # Product CRUD
├── categories/           # Category CRUD
└── orders/               # Order management

lib/auth.ts               # JWT verification utility
scripts/                  # SQL database setup
```

## 🔐 Default Login
- **Email:** admin@twentyfivemade.com
- **Password:** admin123
- **⚠️ Change immediately after first login!**

## 📝 Common Tasks

### Add a New Product
1. Go to Products page
2. Click "➕ Add Product"
3. Fill in: Name, Category, Price, Stock, Description
4. Click Save

### Create a Category
1. Go to Categories page
2. Click "➕ Add Category"
3. Enter Name and Description
4. Click Save

### Update Order Status
1. Go to Orders page
2. Use dropdown to change status: pending → processing → completed
3. Changes save automatically

### View Sales Analytics
1. Go to Cashbook page
2. See total revenue, completed orders, average order value
3. View daily sales chart
4. Scroll down for transaction history

## 🐛 Troubleshooting

**Can't login?**
- Verify admin user exists: SELECT * FROM admin_users;
- Check environment variables in .env.local
- Clear browser cache and try again

**API errors?**
- Check backend is running: http://localhost:3000/api/admin/login
- Verify JWT_SECRET is set
- Check browser console for CORS errors

**Data not loading?**
- Verify Supabase tables exist
- Check authentication token
- Look at Network tab in DevTools

## 🚢 Deploy

### Deploy Backend (Next.js)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Deploy Admin Panel (Vue.js)
```bash
cd admin
pnpm build
# Upload dist/ to Vercel, Netlify, or any static host
```

## 📚 Full Documentation
- Backend: See `ADMIN_SETUP.md`
- Admin Panel: See `admin/README.md`
- Database Schema: See `scripts/01-create-admin-tables.sql`

## 💡 Key Features

| Feature | Location | Details |
|---------|----------|---------|
| User Auth | `/api/admin/login` | JWT-based authentication |
| Products | `/products` page | Add, edit, delete with categories |
| Categories | `/categories` page | Organize products |
| Orders | `/orders` page | Track and update status |
| Analytics | `/cashbook` page | Sales charts and reports |
| Dashboard | `/dashboard` page | Key metrics overview |

---

**You're all set! Start by logging in and adding your first products.** 🎉
