import { Component } from '@angular/core';
// 1. Import your scroll animation directive
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive'; 

@Component({
  selector: 'app-homeindustries',
  // 2. Add the directive to the imports array so Angular recognizes it
  imports: [ScrollAnimateDirective], 
  templateUrl: './homeindustries.html',
  styleUrl: './homeindustries.css',
})
export class Homeindustries {

}