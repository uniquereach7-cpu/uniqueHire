import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './career.html',
  styleUrls: ['./career.css'],
})
export class Career { }
