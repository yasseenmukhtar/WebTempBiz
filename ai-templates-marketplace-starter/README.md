# AI Templates Marketplace — Starter

Quick start (dev):

1. Install
   ```bash
   npm install
   ```

2. Create `.env.local` with:
```
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
OPENAI_API_KEY=sk-xxx   # optional, for real AI calls
```

3. Add demo template zip & screenshot to `public/templates/` (this repo includes demo files).

4. Run
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

This starter contains a simple catalog, Stripe checkout integration (example), and a demo AI customize endpoint.
