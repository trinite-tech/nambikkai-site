I need help connecting my Tamil news website (hosted on Hostinger) to a Strapi CMS that will be hosted on AWS. Please provide a complete step-by-step guide covering:

## Current Setup:
- **Frontend**: Next.js Tamil news website hosted on Hostinger (static files)
- **Backend**: Need to deploy Strapi CMS on AWS
- **Database**: Need PostgreSQL/MySQL setup
- **Authentication**: Using Supabase for user auth

## Strapi Content Types Required:
```json
{
  "article": {
    "title": "string (required)",
    "slug": "uid (auto-generated)",
    "excerpt": "text (300 chars max)",
    "content": "blocks (rich text editor)",
    "featuredImage": "media (single image, required)",
    "gallery": "media (multiple images/videos)",
    "featured": "boolean (default: false)",
    "breaking": "boolean (default: false)",
    "premium": "boolean (default: false)",
    "viewCount": "integer (default: 0)",
    "readTime": "string (default: '5 min')",
    "publishedDate": "datetime (required)",
    "category": "relation (many-to-one with category)",
    "author": "relation (many-to-one with author)",
    "tags": "relation (many-to-many with tags)"
  },
  "category": {
    "name": "string (required, unique)",
    "slug": "uid (auto-generated)",
    "description": "text",
    "color": "string (default: '#003d7a')",
    "icon": "string",
    "featured": "boolean (default: false)",
    "sortOrder": "integer (default: 0)"
  },
  "author": {
    "name": "string (required)",
    "slug": "uid (auto-generated)",
    "bio": "text",
    "avatar": "media (single image)",
    "email": "email",
    "designation": "string (default: 'Reporter')",
    "specialization": "enumeration ['world', 'india', 'tamilnadu', 'sports', 'technology', 'business', 'entertainment']"
  },
  "tag": {
    "name": "string (required, unique)",
    "slug": "uid (auto-generated)",
    "color": "string (default: '#e60000')"
  },
  "advertisement": {
    "title": "string (required)",
    "image": "media (single image, required)",
    "link": "string (URL)",
    "position": "enumeration ['header', 'sidebar', 'footer', 'inline', 'popup']",
    "active": "boolean (default: true)",
    "startDate": "datetime",
    "endDate": "datetime"
  },
  "subscriber": {
    "email": "email (required, unique)",
    "name": "string",
    "subscriptionType": "enumeration ['free', 'premium']",
    "active": "boolean (default: true)"
  }
}
```

## What I Need Help With:

### 1. AWS Deployment Setup:
- Which AWS services to use (EC2, ECS, Lambda, etc.)
- Database setup (RDS PostgreSQL vs MySQL)
- File storage for media (S3 configuration)
- Domain and SSL setup
- Environment variables configuration

### 2. Strapi Configuration:
- Complete installation and setup process
- Content type creation (based on schema above)
- API permissions configuration
- Admin user setup
- Media library configuration with S3

### 3. API Integration Requirements:
- **API Token Generation**: How to create and secure API tokens
- **Required API Endpoints**: List all endpoints needed for:
  - Articles (CRUD operations)
  - Categories (read operations)
  - Authors (read operations)
  - Tags (read operations)
  - Advertisements (read operations)
  - Subscribers (create/read operations)

### 4. Frontend Integration:
- Environment variables needed in production
- API call examples for each content type
- Error handling for API failures
- Caching strategies for better performance

### 5. Security & Performance:
- CORS configuration for Hostinger domain
- Rate limiting setup
- API authentication best practices
- CDN setup for media files
- Database optimization

### 6. Sample API Calls Needed:
```javascript
// Examples of API calls I need to implement:
// 1. Get all articles with pagination
// 2. Get single article by slug
// 3. Get articles by category
// 4. Get featured articles
// 5. Get breaking news
// 6. Search articles
// 7. Get categories with article counts
// 8. Subscribe to newsletter
// 9. Get advertisements by position
```

### 7. Environment Variables:
Current production environment:
```
NEXT_PUBLIC_SUPABASE_URL=https://yrqsvlgxxhnkwzdbimms.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[existing_key]
NEXT_PUBLIC_STRAPI_URL_PROD=https://yourdomain.com/strapi
STRAPI_API_TOKEN=[need_to_generate]
```

### 8. Deployment Checklist:
- AWS resource provisioning
- Strapi deployment and configuration
- Database migration and seeding
- API testing and validation
- Frontend integration testing
- Performance optimization
- Monitoring and logging setup

### 9. Sample Data:
Need help populating with Tamil categories:
- உலக செய்திகள் (World News)
- இந்தியா (India)
- தமிழ்நாடு (Tamil Nadu)
- விளையாட்டு (Sports)
- தொழில்நுட்பம் (Technology)
- வணிகம் (Business)
- பொழுதுபோக்கு (Entertainment)

### 10. Specific Questions:
1. What's the most cost-effective AWS setup for a Tamil news website?
2. How to handle media uploads and optimization?
3. Best practices for API caching and performance?
4. How to set up automated backups?
5. Monitoring and error tracking recommendations?

Please provide a comprehensive guide with code examples, configuration files, and step-by-step instructions for each phase of the deployment.