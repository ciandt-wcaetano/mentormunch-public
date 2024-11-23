import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class FaleConoscoComponent implements OnInit {

  textButton = 'Clique aqui!';

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  phrases: string[] = [
    'Muito rápido?!',
    'Vamos tentar de novo!',
    'Você vai conseguir!',
    'Quase lá!',
    'Não desista!',
    'Continue tentando!',
    'Você está indo bem!',
    'Mais uma vez!',
    'Boa tentativa!',
    'Continue assim!',
    'Você está quase lá!',
    'Vamos lá!',
    'Não desista agora!',
    'Você consegue!',
    'Agora é sério pode clicar!',
    'Aposto que você não consegue clicar!',
  ];

  moveButton(event: MouseEvent) {
    const button = event.target as HTMLElement;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    
    const padding = 50;

    const maxLeft = screenWidth - buttonWidth - padding;
    const maxTop = screenHeight - buttonHeight - padding;
    const minLeft = padding;
    const minTop = padding;

    const newLeft = Math.random() * (maxLeft - minLeft) + minLeft;
    const newTop = Math.random() * (maxTop - minTop) + minTop;

    this.renderer.setStyle(button, 'position', 'absolute');
    this.renderer.setStyle(button, 'left', `${newLeft}px`);
    this.renderer.setStyle(button, 'top', `${newTop}px`);
    this.textButton = this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

}
