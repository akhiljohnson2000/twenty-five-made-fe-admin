# TwentyFiveMade Admin Panel - Complete Setup Guide

This guide will help you set up the complete admin panel for managing your TwentyFiveMade business.

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Supabase account and project set up
- Environment variables configured

## Step 1: Database Setup

The database schema has already been created with the following tables:
- `admin_users` - Admin user accounts
- `categories` - Product categories  
- `products` - Product listings
- `orders` - Customer orders
- `order_items` - Items within orders
- `transactions` - Financial transaction records

### Create Initial Admin User

1. Go to your Supabase dashboard
2. Generate a bcrypt hash for your password:
   - Use an online tool like https://bcrypt.online/ or run:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('your_password', 10))"
   ```
   - Replace 'your_password' with your desired admin password

3. Execute the setup SQL script in Supabase:
   - Go to SQL Editor in Supabase
   - Copy contents of `/scripts/02-create-admin-user.sql`
   - Update the email and password_hash values
   - Run the query

Default credentials (change immediately):
- Email: `admin@twentyfivemade.com`
- Password: `admin123`

## Step 2: Environment Variables Setup

### Backend Environment Variables

Create a `.env.local` file in the project root with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT Secret (generate a strong random string)
JWT_SECRET=your_very_secure_random_string_here
```

### Frontend Environment Variables

Create `admin/.env.local` with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from:
- Supabase Dashboard → Settings → API → Project Settings

## Step 3: Install Dependencies

```bash
# Install backend dependencies
pnpm install

# Install admin panel dependencies
cd admin
pnpm install
cd ..
```

## Step 4: Run the Application

### Start Backend (Next.js)
```bash
pnpm dev
```
The backend API will run on `http://localhost:3000`

### Start Admin Panel (Vue.js) - In a new terminal
```bash
cd admin
pnpm dev
```
The admin panel will run on `http://localhost:5173`

### Access the Admin Panel
1. Open `http://localhost:5173` in your browser
2. Login with your admin credentials
3. You should see the dashboard

## Step 5: First Time Setup

After logging in:

1. **Add Categories**: Go to Categories page and add your product categories
2. **Add Products**: Go to Products page and create your first products
3. **Check Orders**: View the Orders page (initially empty)
4. **Monitor Cashbook**: Check the Cashbook page for sales analytics

## API Architecture

The admin panel communicates with these API routes:

### Authentication
- `POST /api/admin/login` - Admin login (returns JWT token)

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Categories
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create new category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

### Orders
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders/[id]` - Update order status

## Deployment

### Deploy Backend to Vercel

1. Push your code to GitHub
2. Connect to Vercel and import the project
3. Add environment variables in Vercel Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
4. Deploy

### Deploy Admin Panel

Option 1: Deploy to Vercel (Recommended)
```bash
cd admin
# Build the admin panel
pnpm build

# Deploy the dist folder to Vercel
# Or connect to Vercel directly
```

Option 2: Deploy as static site to any hosting (Netlify, GitHub Pages, etc.)
```bash
cd admin
pnpm build
# Upload 'dist' folder to your hosting
```

### Access Deployed Admin Panel

After deployment:
1. Navigate to your deployed admin panel URL
2. The backend API will be proxied through your Vercel deployment
3. Login with your admin credentials

## Security Considerations

✅ **Implemented Security Features:**
- JWT token-based authentication
- Password hashing with bcryptjs
- HTTP-only cookie storage
- Server-side token verification
- Protected API routes requiring valid JWT

📋 **Additional Security Measures:**

1. **Change Default Password**
   - Immediately change the default admin password
   - Use a strong, unique password

2. **Enable HTTPS**
   - Always use HTTPS in production
   - Vercel handles this automatically

3. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use `.env.example` for reference
   - Store secrets in hosting provider settings

4. **API Security**
   - All admin endpoints require valid JWT token
   - Tokens expire after 7 days
   - Implement rate limiting if needed

5. **Database Security**
   - Use Supabase Row Level Security (RLS) for additional protection
   - Regularly backup your database
   - Monitor access logs

## Troubleshooting

### Login not working
- Verify admin user exists in database
- Check environment variables are set correctly
- Ensure JWT_SECRET is the same on backend

### Products/Categories not loading
- Check if API routes exist
- Verify Supabase tables are created
- Check browser console for API errors
- Verify authentication token is valid

### CORS errors
- Check that backend and frontend URLs are correct
- Verify proxy settings in vite.config.ts

### Database connection issues
- Verify SUPABASE_SERVICE_ROLE_KEY is correct
- Check Supabase project status
- Verify network connectivity

## Support

For issues or questions:
1. Check the README files in `/admin` and `/app/api/admin`
2. Review Supabase documentation
3. Check browser DevTools console for errors
4. Verify all environment variables are set

## File Structure

```
project/
├── app/
│   └── api/admin/
│       ├── login/
│       ├── products/
│       ├── categories/
│       └── orders/
├── admin/                  # Vue.js Admin Panel
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Pinia stores
│   │   ├── router/         # Vue Router
│   │   └── lib/            # Utilities
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
├── lib/
│   └── auth.ts             # Authentication utilities
├── scripts/
│   ├── 01-create-admin-tables.sql
│   └── 02-create-admin-user.sql
└── ADMIN_SETUP.md          # This file
```

## Next Steps

1. ✅ Database created
2. ✅ Backend API configured
3. ✅ Admin panel built
4. 📋 Run the setup steps above
5. 📋 Add your data (categories, products)
6. 📋 Deploy to production
