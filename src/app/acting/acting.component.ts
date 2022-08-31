import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { APIService, Character } from '../api.service';
//import * as Observable from "zen-observable-ts";

@Component({
  selector: 'app-acting',
  templateUrl: './acting.component.html',
  styleUrls: ['./acting.component.sass']
})
export class ActingComponent implements OnInit, OnDestroy {

  //AMPLIFY TESTING
  public createForm: FormGroup;

  /* declare characters variable */
  public characters: Array<Character> = [];

  private subscription: Subscription | null = null;

  constructor(private api: APIService, private fb: FormBuilder) {
    //AMPLIFY TESTING
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      samplePath: ['', Validators.required],
      picturePath: ['', Validators.required]
    });
  }

  //AMPLIFY TESTING
  async ngOnInit() {
    const response = await this.api.ListCharacters();
    this.characters = response.items as Character[];

    /* subscribe to new restaurants being created */
    this.subscription = <Subscription>(this.api.OnCreateCharacterListener.subscribe(
      (event) => {
        const newCharacter = event.value.data?.onCreateCharacter;
        if (newCharacter) {
          this.characters = [newCharacter, ...this.characters];
        }
    }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

  public onClearPressed() {
    this.api.ListCharacters().then((event) => {
      let characters = event.items as Character[];
      characters.forEach((character) => {
        console.log("Deleting: " + character.name);
        this.api.DeleteCharacter({ id: character.id });
      });
      this.createForm.reset();
    });
  }

  //AMPLIFY TESTING
  public async onCreate(character: Character) {
    try {
      const response = await this.api.CreateCharacter(character);
      console.log('created ' + response.name);
      this.createForm.reset();
    } catch (e) {
      console.log('error creating character...', e);
    }   
  }
}
