# 🇮🇳 India Tour & Travel Agency

Premium international tour and travel agency website for exploring India.

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Django 5, Django REST Framework, Python 3.12
- **Database:** MySQL 8.0
- **Infrastructure:** Docker, Nginx, Gunicorn

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend dev)
- Python 3.12+ (for local backend dev)

### Quick Start with Docker

```bash
# 1. Clone the repository
git clone <repo-url>
cd tour

# 2. Create environment file
cp .env.example .env
# Edit .env with your settings

# 3. Start all services
docker-compose up --build

# 4. Run migrations (first time)
docker-compose exec backend python manage.py migrate

# 5. Create admin user
docker-compose exec backend python manage.py createsuperuser

# 6. Load sample data (optional)
docker-compose exec backend python manage.py loaddata seed_data
```

### Access

| Service   | URL                          |
| --------- | ---------------------------- |
| Website   | http://localhost              |
| API       | http://localhost/api/         |
| Admin     | http://localhost/admin/       |

### Local Development

#### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

#### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Runs on http://localhost:8000
```

## Project Structure

```
tour/
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities & API client
│   │   └── styles/             # Global styles
│   ├── public/                 # Static assets
│   └── Dockerfile
├── backend/                    # Django backend
│   ├── config/                 # Django project settings
│   ├── apps/                   # Django applications
│   │   ├── tours/              # Tour packages
│   │   ├── bookings/           # Booking management
│   │   ├── users/              # User accounts
│   │   └── reviews/            # Tour reviews
│   ├── media/                  # User uploads
│   └── Dockerfile
├── nginx/                      # Nginx configuration
│   ├── nginx.conf              # Development config
│   └── nginx.prod.conf         # Production config
├── docker-compose.yml          # Development Docker setup
├── docker-compose.prod.yml     # Production Docker setup
├── .env.example                # Environment variable template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Docker Services

| Service    | Description                          | Port (Dev) |
| ---------- | ------------------------------------ | ---------- |
| `db`       | MySQL 8.0 database                   | 3306       |
| `backend`  | Django REST API (Gunicorn in prod)   | 8000       |
| `frontend` | Next.js application                  | 3000       |
| `nginx`    | Reverse proxy & static file server   | 80 / 443   |
| `backup`   | Automated daily DB backups (prod)    | —          |

## Production Deployment

```bash
# Build and start production services
docker-compose -f docker-compose.prod.yml up --build -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

> **Note:** Production deployment requires SSL certificates placed in `nginx/ssl/`. The production Nginx config expects `fullchain.pem` and `privkey.pem`. If using Cloudflare, generate an Origin Certificate from the Cloudflare dashboard.

## Environment Variables

See [`.env.example`](.env.example) for all available configuration options including:

- Database credentials
- Django secret key & CORS settings
- SMTP email configuration
- WhatsApp contact number
- Currency API settings

## License

All rights reserved.
