import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Homeservice } from './homeservice/homeservice';
import { Homegcc } from './homegcc/homegcc';
import { Homeaboutus } from './homeaboutus/homeaboutus';
import { Homeindustries } from './homeindustries/homeindustries';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, Homeservice, Homegcc, Homeaboutus, Homeindustries],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
