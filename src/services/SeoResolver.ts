import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { SeoMetadata } from "../interfaces/SeoMetadata";
import { SeoService } from "./SeoService";

export const seoResolver: ResolveFn<void> = (route) => {
  const seoService = inject(SeoService);
  const metadata = route.data as SeoMetadata;
  seoService.updateMetadata(metadata);
  return;
};