import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { SavedNewsService } from '../services/saved-news.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  stories$;
  page: number = 1;
  constructor(
    private newsService: NewsService,
    private savedNewsService: SavedNewsService,
    private authService: AuthService
  ) {
    this.stories$ = this.newsService.getTopStoriesObservable(this.page);
  }

  onCategoryChange($event) {
    this.stories$ = this.newsService.getTopStoriesObservable(
      this.page,
      $event.detail.value
    );
  }

  saveArticle(article) {
    this.savedNewsService.addSavedNews(article);
  }

  articleSaved(article) {
    return this.savedNewsService.isArticleSaved(article)
  }

  signOut(): void {
    this.authService.signOut();
  }

  imageError(e, article) {
    article.urlToImage = '';
  }
}
