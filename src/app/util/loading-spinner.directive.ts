import {Directive, ElementRef, inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appLoadingSpinnerDirective]',
})
export class LoadingSpinnerDirective implements OnInit, OnChanges {
  private loader =inject(HTMLElement);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  @Input() loading: boolean = false;

  @Input()
  set isLoading(isLoading: boolean) {
    if (isLoading) {
      this.loader = this.renderer.createElement("div");
    }
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createSimpleLoader();
    if(this.loading && this.el) {
      this.renderer.setStyle(
        this.el.nativeElement.firstChild,
        "display",
        "none"
      );
      this.renderer.appendChild(this.el.nativeElement, this.loader);
    } else {
      this.renderer.removeChild(this.el.nativeElement, this.loader);
      this.renderer.setStyle(
        this.el?.nativeElement.firstChild,
        "display",
        "block"
      );
    }
  }

  createSimpleLoader() {
    this.renderer.setStyle(this.loader, "display", "flex");
    this.renderer.setStyle(this.loader, "flex-direction", "column");
    this.renderer.setStyle(this.loader, "justify-content", "center");
    this.renderer.setStyle(this.loader, "align-items", "center");

    const ldsRoller = this.renderer.createElement("div");
    this.renderer.addClass(ldsRoller, "lds-roller");
    [0,1,2,3,4,5,6,7].forEach((value) => {
      const div = this.renderer.createElement("div");
      this.renderer.appendChild(ldsRoller, div);
    });
    this.renderer.appendChild(this.loader, ldsRoller);
  }
}
