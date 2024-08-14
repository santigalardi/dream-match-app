export class KonamiCode {
  private sequence: string[] = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ];

  private input: string[] = [];

  constructor(private onActivate: () => void) {
    this.init();
  }

  private init() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.input.push(event.code);
    this.input = this.input.slice(-this.sequence.length);

    if (this.sequence.join(',') === this.input.join(',')) {
      this.onActivate();
      this.input = [];
    }
  }

  public destroy() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }
}
