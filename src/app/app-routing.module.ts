import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CharacterDetailsComponent } from './character/character-details/character-details.component';
import { CharacterNotesComponent } from './character/character-notes/character-notes.component';
import { CharacterSkillsComponent } from './character/character-skills/character-skills.component';
import { CharacterSpellsComponent } from './character/character-spells/character-spells.component';
import { SpellsComponent } from './manage/spells/spells.component';
import { SkillsComponent } from './manage/skills/skills.component';
import { ItemsComponent } from './manage/items/items.component';
import { SpellDetailsComponent } from './manage/spells/spell-details/spell-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'character/:id', component: CharacterDetailsComponent, children: [
    { path: 'notes', component: CharacterNotesComponent },
    { path: 'skills', component: CharacterSkillsComponent },
    { path: 'spells', component: CharacterSpellsComponent }
  ]},
  { path: 'spells', component: SpellsComponent, children:[
    {path: "", component: SpellDetailsComponent},
    {path: ":id", component: SpellDetailsComponent}
  ]},
  { path: 'skills', component: SkillsComponent},
  { path: 'items', component: ItemsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
