# Flora — Full-Stack Project

Final combined project for the GOIT "Практикум з сучасних методологій розробки ПЗ" course — covers all three homework stages (static frontend, interactive frontend, backend) in one repository.

## Structure

```
frontend/   Flora website (HTML/CSS/JS, no framework)
backend/    REST API for the bouquets catalog (Express + PostgreSQL + Sequelize)
```

Each folder has its own `README.md` with setup instructions.

## Live links

- Frontend (GitHub Pages): _add after deploying_
- Backend (Render): _add after deploying_
- Swagger UI: `<backend URL>/api-docs`

## Running everything locally

```bash
# Terminal 1 — backend
cd backend
npm install
cp .env.example .env   # fill in DATABASE_URL
npm run seed
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npx serve .
```

Open the printed frontend URL. The frontend automatically points at `http://localhost:3000/api` when served from `localhost`/`127.0.0.1`, and at the deployed backend URL otherwise (see `frontend/js/api.js`).

## Deployment notes

- The backend must be deployed over **HTTPS** (e.g. Render) — if the frontend is served over HTTPS (GitHub Pages) and the backend over plain HTTP, browsers block the requests as mixed content.
- After deploying the backend, update `DEPLOYED_API_BASE_URL` in `frontend/js/api.js` to the real backend URL, then redeploy the frontend.
