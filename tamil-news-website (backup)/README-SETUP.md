# Tamil News Website - Complete Setup Guide

## 🚀 Quick Setup

Run the automated setup script:
```bash
setup.bat
```

## 📋 Manual Setup Steps

### 1. **Install Dependencies**

```bash
# Install main project dependencies
npm install

# Install Strapi CMS dependencies
cd strapi-nambikkai
npm install
cd ..
```

### 2. **Database Setup (Supabase)**

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to SQL Editor
3. Run the SQL script from `scripts/001_create_profiles_and_subscriptions.sql`
4. Update your `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 3. **Strapi CMS Setup**

1. Navigate to Strapi directory:
   ```bash
   cd strapi-nambikkai
   ```

2. Start Strapi in development mode:
   ```bash
   npm run dev
   ```

3. Open http://localhost:1337/admin and create your admin account

4. The following content types are already configured:
   - **Articles** - News articles with title, content, category, author
   - **Categories** - News categories (Politics, Sports, Technology, etc.)
   - **Authors** - Article authors
   - **Tags** - Article tags

### 4. **Stripe Setup (Optional - for subscriptions)**

1. Create a [Stripe](https://stripe.com) account
2. Get your API keys from the Stripe dashboard
3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_secret
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### 5. **Start the Application**

1. **Start Strapi CMS** (in one terminal):
   ```bash
   cd strapi-nambikkai
   npm run dev
   ```
   - Strapi will run on http://localhost:1337

2. **Start Next.js App** (in another terminal):
   ```bash
   npm run dev
   ```
   - Main app will run on http://localhost:3000

## 🌟 Features

### ✅ Already Implemented
- **Responsive Design** - Works on all devices
- **Tamil Language Support** - Full Tamil typography
- **User Authentication** - Login/Signup with Supabase
- **Content Management** - Strapi CMS integration
- **Article System** - Full article CRUD operations
- **Category System** - Organized news categories
- **Subscription System** - Stripe integration for premium content
- **SEO Optimized** - Meta tags, structured data
- **Analytics** - Vercel Analytics integration

### 📱 Pages Available
- **Home** (`/`) - Latest news and featured articles
- **Categories** (`/category/[category]`) - Category-specific news
- **Articles** (`/article/[id]`) - Individual article pages
- **About** (`/about`) - About page
- **Authentication** (`/auth/login`, `/auth/signup`) - User auth
- **Dashboard** (`/dashboard`) - User dashboard
- **Pricing** (`/pricing`) - Subscription plans

## 🔧 Configuration Files

### Key Files to Configure:
1. **`.env.local`** - Environment variables
2. **`next.config.mjs`** - Next.js configuration
3. **`strapi-nambikkai/.env`** - Strapi configuration
4. **`middleware.ts`** - Authentication middleware

## 🎨 Customization

### Styling
- Uses **Tailwind CSS** for styling
- Custom Tamil fonts (Mukta, Catamaran)
- Dark/Light theme support
- Responsive design system

### Components
- Reusable UI components in `/components/ui/`
- Custom components for news display
- Header, Footer, Navigation components

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Strapi Deployment
- Deploy Strapi to Railway, Heroku, or DigitalOcean
- Update `NEXT_PUBLIC_STRAPI_URL_PROD` in production

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure Supabase and Strapi are running
4. Check network connectivity

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for admin accounts
- Enable RLS (Row Level Security) in Supabase
- Use HTTPS in production

---

**Happy coding! 🎉**