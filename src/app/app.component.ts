import { Component, OnInit, OnDestroy } from '@angular/core';

import { CharacterIdService } from './shared/character-id.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  characterId: number;
  characterIdSubscription: Subscription;

  constructor(private characterIdService: CharacterIdService) {}

  ngOnInit() {
    this.characterIdSubscription = this.characterIdService.getId().subscribe(
      message => {
        this.characterId = message.id;
      }
    );
  }

  ngOnDestroy() {
    this.characterIdSubscription.unsubscribe();
  }
}
