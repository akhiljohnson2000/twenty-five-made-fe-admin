# TwentyFiveMade Admin Panel

A Vue.js 3 + Vite admin panel for managing products, categories, orders, and cashbook for the TwentyFiveMade business.

## Features

- **Admin Authentication**: Secure login with username/password
- **Product Management**: Add, edit, and delete products with categories
- **Category Management**: Organize products by categories
- **Order Tracking**: View and manage customer orders with status updates
- **Cashbook & Analytics**: Sales reports with daily sales charts and transaction history
- **Dashboard**: Overview of key metrics (total products, categories, orders, revenue)

## Setup

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account and project
- Environment variables set up

### Installation

1. Install dependencies:
```bash
cd admin
pnpm install
```

2. Create `.env.local` with your Supabase credentials:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start the development server:
```bash
pnpm dev
```

The admin panel will be available at `http://localhost:5173`

### Build

```bash
pnpm build
```

## Project Structure

```
admin/
├── src/
│   ├── components/        # Reusable Vue components
│   │   ├── Navbar.vue    # Top navigation bar
│   │   ├── Sidebar.vue   # Left sidebar navigation
│   │   └── LineChart.vue # Sales chart component
│   ├── pages/            # Page components
│   │   ├── Login.vue     # Admin login page
│   │   ├── Dashboard.vue # Dashboard overview
│   │   ├── Products.vue  # Product management
│   │   ├── Categories.vue # Category management
│   │   ├── Orders.vue    # Order tracking
│   │   └── Cashbook.vue  # Sales analytics
│   ├── stores/           # Pinia stores for state management
│   │   ├── auth.ts       # Authentication store
│   │   ├── products.ts   # Products store
│   │   ├── categories.ts # Categories store
│   │   └── orders.ts     # Orders store
│   ├── router/           # Vue Router configuration
│   ├── lib/              # Utilities
│   │   └── supabase.ts   # Supabase client
│   ├── App.vue           # Root component
│   ├── main.ts           # Application entry point
│   └── style.css         # Global styles
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies
```

## API Endpoints

The admin panel communicates with these backend API routes:

- `POST /api/admin/login` - Admin login
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders/[id]` - Update order status

## Database Schema

The admin panel uses the following database tables:

- `admin_users` - Admin user accounts
- `categories` - Product categories
- `products` - Product listings
- `orders` - Customer orders
- `order_items` - Items within orders
- `transactions` - Financial transactions (for cashbook)

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Supabase** - Backend as a Service

## Security

- JWT token-based authentication
- HTTP-only cookie storage for tokens
- Server-side token verification
- Password hashing with bcrypt
- Protected API routes with authentication middleware
