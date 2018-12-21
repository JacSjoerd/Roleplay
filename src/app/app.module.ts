import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { CharacterDetailsComponent } from './character/character-details/character-details.component';
import { HomeComponent } from './home/home.component';
import { CharacterSpellsComponent } from './character/character-spells/character-spells.component';
import { DataStorageService } from './shared/data-storage.service';
import { CharacterSummaryComponent } from './home/character-summary/character-summary.component';
import { CharacterAbilitiesComponent } from './character/character-abilities/character-abilities.component';
import { AppRoutingModule } from './app-routing.module';
import { SkillsComponent } from './manage/skills/skills.component';
import { ItemsComponent } from './manage/items/items.component';
import { SpellsComponent } from './manage/spells/spells.component';
import { SpellService } from './manage/spells/spell.service';
import { SpellListComponent } from './manage/spells/spell-list/spell-list.component';
import { SpellSummaryComponent } from './manage/spells/spell-list/spell-summary/spell-summary.component';
import { SpellDetailsComponent } from './manage/spells/spell-details/spell-details.component';
import { CharacterIdService } from './shared/character-id.service';
import { CharacterNotesComponent } from './character/character-notes/character-notes.component';
import { CharacterNoteDetailsComponent } from './character/character-notes/character-note-details/character-note-details.component';
import { CharacterNoteListComponent } from './character/character-notes/character-note-list/character-note-list.component';
import { CharacterSkillsComponent } from './character/character-skills/character-skills.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterDetailsComponent,
    HomeComponent,
    CharacterSpellsComponent,
    CharacterSummaryComponent,
    CharacterAbilitiesComponent,
    SpellsComponent,
    SpellListComponent,
    SpellSummaryComponent,
    SpellDetailsComponent,
    SkillsComponent,
    ItemsComponent,
    CharacterNotesComponent,
    CharacterNoteDetailsComponent,
    CharacterNoteListComponent,
    CharacterSkillsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [
    CharacterIdService,
    DataStorageService,
    SpellService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
