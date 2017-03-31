import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigService } from './service/config.service';
import { Config } from './model/config';

@NgModule({
    exports: [
        ConfigModule
        , ConfigService
        , Config
    ],
    providers: [
        ConfigService
        , Config
    ]
})
export class ConfigModule { }