# techandtonic.tech

Landing page project for moving Tech and Tonic content off Beacons and onto a first-party domain.

## What is included

- A branded homepage for techandtonic.tech
- A featured section for the verified free download, The Hidden Language of Trauma
- A link hub section that can replace the current Beacons-style button page
- Static content written in `src/main.ts` and styled in `src/style.css`

## Verified migrated links

- `https://techandtonic.store/`
- `https://techandtonic.store/shop/583c5bec-b36c-49f4-bc1d-e06eeaf6ce9f?pageViewSource=lib_view`
- `https://beacons.ai/techandtonic`
- `https://omni-cosmos-v2-1.vercel.app`
- `https://aaroncrume-techandtonic.github.io/Modoc-War/`
- `https://aaroncrume-techandtonic.github.io/indigenous-pages/`
- `https://aaroncrume-techandtonic.github.io/klamath-watershed/`
- `https://aaroncrume-techandtonic.github.io/OracleNeumero/`
- `https://github.com/aaroncrume-techandtonic/TheWebOracle`
- `https://techandtonic.store/shop/4440aedc-a40d-45f1-824c-4ca4fe42a3b6`

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment (Vercel)

This repository is configured for Vercel-first deployment.

1. Import the repository in Vercel.
2. Keep defaults or set:
	- Build Command: `npm run build`
	- Output Directory: `dist`
3. Connect `techandtonic.tech` and `www.techandtonic.tech` in Vercel Domains.
4. Push to `main` to trigger production deploys.

`vercel.json` in the repo pins build/output settings so deploy behavior stays consistent.

## Updating the link hub

Edit the `primaryLinks` array in `src/main.ts` to add or replace active links, and use `linksNeedingConfirmation` for any destinations that still need to be verified.