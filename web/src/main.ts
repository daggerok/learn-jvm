import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare var IS_PRODUCTION: any;

if (typeof IS_PRODUCTION !== 'undefined' && IS_PRODUCTION) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
