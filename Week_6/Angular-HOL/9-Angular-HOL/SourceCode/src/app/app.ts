import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AsyncPipe,
    Header
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public loadingService: LoadingService) {}
}