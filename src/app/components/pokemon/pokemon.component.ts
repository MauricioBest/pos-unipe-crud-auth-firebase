import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../models/Pokemon';
import {PokemonService} from '../../services/pokemon.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pokemons',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

    pokemon: Pokemon;
    pokemons: Pokemon[];
    pokemonToEdit: Pokemon;
    editState: boolean;

    constructor(private pokemonService: PokemonService, private authService: AuthService, private router: Router) {
        this.editState = false;
        this.pokemon = {
            nome: '',
            tipo: ''
        };
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.pokemonService.getPokemons().subscribe(pokemonsResponse => {
            this.pokemons = pokemonsResponse;
        });
    }

    addPokemon() {
        if (this.pokemon.nome != '' && this.pokemon.nome != '') {
            this.pokemonService.addPokemon(this.pokemon);
            this.pokemon.nome = '';
            this.pokemon.tipo = '';
        }
    }

    deletePokemon(event, pokemon: Pokemon) {
        this.pokemonService.deletePokemon(pokemon);
    }

    editPokemon(event, pokemon: Pokemon) {
        if (this.editState === false) {
            this.editState = true;
        } else {
            this.editState = false;
        }
        this.pokemonToEdit = pokemon;
    }

    updatePokemon(pokemon: Pokemon) {
        this.pokemonService.updatePokemon(pokemon);
        this.editState = false;
    }

}
