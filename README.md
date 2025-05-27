# Wemolo Parkzeit Erinnerung

A Next.js-based web application that helps users avoid parking tickets by sending SMS or WhatsApp reminders when their parking time is about to expire.

## 🚀 Features

- **Modern UI** built with Next.js 15 and Tailwind CSS
- **License Plate Input** with German license plate validation
- **Multiple Contact Channels**
  - SMS notifications
  - WhatsApp notifications
- **User Tracking** with unique visitor identification
- **Responsive Design** that works on all devices
- **GDPR Compliance** with data protection information
- **Analytics** to track user interactions and conversions
- **Real-time Updates** using Supabase Realtime

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI Primitives with Shadcn/ui
- **State Management**: React Hooks
- **Package Manager**: npm/yarn

## 🏗️ Project Structure

```
src/
├── app/                    # App router pages
│   ├── api/                # API routes
│   │   ├── subscribe/      # Handle subscription requests
│   │   ├── visit/          # Track user visits
│   │   └── feedback/       # Process user feedback
│   ├── components/         # Reusable components
│   │   ├── ui/            # Shadcn/ui components
│   │   └── customized/    # Custom application components
│   ├── lib/                # Utility functions
│   │   └── supabase.ts    # Supabase client configuration
│   └── ...
├── public/               # Static assets (images, fonts)
└── styles/               # Global styles
```

## 📡 API Endpoints

### `POST /api/subscribe`
Handles new subscriptions and updates existing ones.

**Request Body:**
```json
{
  "uniqueId": "user-uuid",
  "plate": "M-AB123",
  "channel": "sms" | "whatsapp",
  "phone": "+49123456789",
  "name": "John Doe"
}
```

**Responses:**
- `200`: Subscription successful
- `400`: Invalid input data
- `500`: Server error

### `POST /api/visit`
Tracks user visits and creates/updates visitor records.

**Request Body:**
```json
{
  "uniqueId": "user-uuid"
}
```

### `POST /api/feedback`
Processes user feedback and updates the database.

## 🗄️ Database Schema (Supabase)

### `signups` Table
Stores user subscription information.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| unique_id | uuid | Unique visitor identifier |
| plate | text | License plate |
| channel | text | Notification channel (sms/whatsapp) |
| phone | text | User's phone number |
| name | text | User's name |
| status | text | Subscription status |
| created_at | timestamp | Record creation timestamp |
| updated_at | timestamp | Last update timestamp |
| visited_at | timestamp | Last visit timestamp |

## 🔧 Environment Variables

| Variable Name | Required | Description |
|--------------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Your Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Your Supabase service role key (server-side only) |
| `NODE_ENV` | ❌ | Set to 'production' in production |

## � Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reminder-prototype.git
   cd reminder-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # App Configuration
   NODE_ENV=development
   ```

   > **Security Note**: The `SUPABASE_SERVICE_ROLE_KEY` should never be exposed to the client-side code.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the project to Vercel
3. Add the required environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms
This is a standard Next.js application and can be deployed to any platform that supports Node.js applications.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact support@wemolo.com.

---

Made with ❤️ by [Wemolo](https://wemolo.com)
