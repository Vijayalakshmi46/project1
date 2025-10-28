# Our Voice, Our Rights — MGNREGA Dashboard (Tamil Nadu)
Customized for: **Tamil Nadu** (demo districts seeded)
Languages: **English + Tamil**
Target hosting recommendation: **DigitalOcean / Docker on VM**

## Quickstart (local - docker)
1. Install Docker and Docker Compose.
2. Unzip the project and `cd` into the folder.
3. Build and run:
   ```bash
   docker-compose up --build -d
   ```
4. Initialize DB (one-time):
   ```bash
   docker exec -it $(docker ps -q -f ancestor=postgres:15) psql -U postgres -d ovor -f /app/backend/db/init.sql
   ```
5. Run ETL once for demo:
   ```bash
   docker exec -it $(docker ps -q -f name=our-voice-our-rights_backend) node etl/fetch_mgnrega.js
   ```
6. Visit `http://<VM-IP>:3000`

## Notes
- Replace the placeholder MGNREGA data.gov.in endpoint & API key in `backend/etl/fetch_mgnrega.js` with a real endpoint and your API key.
- This scaffold seeds two demo districts for Tamil Nadu. For production, load the full district list and geometries.
- The frontend includes English + Tamil UI labels; audio uses browser TTS for quick demo. For production, supply recorded audio in `/frontend/public/locales/`.
- Loom script is included in `docs/loom_script.txt`.

