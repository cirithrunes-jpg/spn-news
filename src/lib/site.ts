const deploymentDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || (deploymentDomain ? `https://${deploymentDomain}` : 'http://localhost:3000'),
);
export const indexable = process.env.SITE_INDEXABLE === 'true';
export const slogan = 'O mundo pop levado a sério. Mais ou menos.';
