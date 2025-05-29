
import { InjectionToken } from '@angular/core';

export interface AppConfig {
    apiUrl: string;
    version: string;
    is_maintenance: number;
    maintenance_message: string;
    queue_batch_cleanup_threshold: number;
    queue_cleanup_interval: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');


export const appConfigValue: AppConfig = {
    "apiUrl":"",
    "is_maintenance": 0,
    "maintenance_message": "This website is currently undergoing scheduled maintenance. We are working on a feature that will allow users to access the website without providing their mobile number and password. We strictly maintain user data privacy and will not compromise on data security. We expect the patch update to be live within the day.",
    "queue_batch_cleanup_threshold": 10,
    "queue_cleanup_interval": 30,
    "version": "1.1.0"

};