import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { SeoMetadata } from "../interfaces/SeoMetadata";

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  updateMetadata(metadata: SeoMetadata): void {
    this.title.setTitle(metadata.title);

    this.meta.updateTag({ name: 'description', content: metadata.description });
    this.meta.updateTag({ name: 'keywords', content: metadata.keywords });
    this.meta.updateTag({ name: 'robots', content: metadata.robots });
    
    this.meta.updateTag({ rel: 'canonical', href: metadata.canonical });
    // Add more meta tags as needed
  }
}