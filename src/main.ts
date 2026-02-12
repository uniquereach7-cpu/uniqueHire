import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';

//
// Merge providers from your existing appConfig (if any) and add the router provider.
// This approach is defensive: if appConfig has providers we'll keep them, otherwise we create one.
const existingProviders = (appConfig && (appConfig as any).providers) ? (appConfig as any).providers : [];

const providers = [
  ...existingProviders,
  provideRouter(routes)
];

// Build a final bootstrap options object that preserves other appConfig properties.
const bootstrapOptions = {
  ...(appConfig || {}),
  providers
};

bootstrapApplication(App, bootstrapOptions)
  .catch((err) => console.error(err));
