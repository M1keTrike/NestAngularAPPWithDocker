// frontend-angular/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // 1. Importar

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() 
  ]
};
