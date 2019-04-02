import {Pokemon} from '../models/Pokemon';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class PokemonService {

    pokemons: Observable<Pokemon[]>;
    pokemonDoc: AngularFirestoreDocument<Pokemon>;
    pokemonsCollection: AngularFirestoreCollection<Pokemon>;

    constructor(private afs: AngularFirestore) {
        this.pokemons = afs.collection('pokemons').valueChanges();
        this.pokemonsCollection = this.afs.collection('pokemons', ref => ref.orderBy('nome', 'asc'));
        this.pokemons = this.pokemonsCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Pokemon;
                data.id = a.payload.doc.id;
                return data;
            });
        });
    }

    getPokemons() {
        return this.pokemons;
    }

    addPokemon(pokemon: Pokemon) {
        this.pokemonsCollection.add(pokemon);
    }

    deletePokemon(pokemon: Pokemon) {
        this.pokemonDoc = this.afs.doc(`pokemons/${pokemon.id}`);
        this.pokemonDoc.delete();
    }

    updatePokemon(pokemon: Pokemon) {
        this.pokemonDoc = this.afs.doc(`pokemons/${pokemon.id}`);
        this.pokemonDoc.update(pokemon);
    }

}
