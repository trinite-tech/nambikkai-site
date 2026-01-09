# Strapi User Permissions Setup Guide

## Step 1: Access Strapi Admin Panel
1. Start Strapi: `cd strapi-nambikkai && npm run develop`
2. Open: `http://localhost:1337/admin`
3. Login with your admin credentials

## Step 2: Create Editor Role
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Add new role**
3. Name: `Editor`
4. Description: `Content editors for Tamil news website`

## Step 3: Set Editor Permissions
### Article Permissions:
- ✅ **Find** - View articles
- ✅ **FindOne** - View single article
- ✅ **Create** - Create new articles
- ✅ **Update** - Edit articles
- ✅ **Delete** - Delete articles

### Category Permissions:
- ✅ **Find** - View categories
- ✅ **FindOne** - View single category
- ✅ **Create** - Create categories
- ✅ **Update** - Edit categories

### Author Permissions:
- ✅ **Find** - View authors
- ✅ **FindOne** - View single author
- ✅ **Create** - Create authors
- ✅ **Update** - Edit authors

### Upload Permissions:
- ✅ **Upload** - Upload media files

## Step 4: Create Editor User
1. Go to **Settings** → **Users & Permissions Plugin** → **Users**
2. Click **Add new user**
3. Fill details:
   - **Username**: `editor`
   - **Email**: `editor@tamilnews.com`
   - **Password**: `tamil123editor`
   - **Role**: `Editor`
4. Click **Save**

## Step 5: API Token (Optional)
1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name: `Editor Token`
4. Token duration: `Unlimited`
5. Token type: `Custom`
6. Set permissions for Article, Category, Author (Find, Create, Update)

## Step 6: Public Permissions
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Public**
3. Enable permissions:
   - **Article**: Find, FindOne
   - **Category**: Find, FindOne
   - **Author**: Find, FindOne

## Step 7: Test Access
- Editor login: `http://localhost:1337/admin`
- Username: `editor`
- Password: `tamil123editor`