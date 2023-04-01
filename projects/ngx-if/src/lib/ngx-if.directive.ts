import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

class NgxIfContext<T> {
  private ngxIf: T;
  private $implicit: T;

  constructor(data: T) {
    this.$implicit = this.ngxIf = data;
  }
}

type OptionalTplRef<T> = TemplateRef<T> | null | undefined;

@Directive({
  selector: '[ngxIf]',
})
export class NgxIfDirective<T = unknown> implements OnChanges, OnDestroy {
  @Input('ngxIfOf') public data$!: Observable<T>;

  @Input('ngxIfLoading')
  public loadingTpl: OptionalTplRef<void>;

  @Input('ngxIfError')
  public errorTpl: OptionalTplRef<void>;

  private readonly viewDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly defaultTpl: TemplateRef<NgxIfContext<T>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  public ngOnChanges(): void {
    let data: T;

    this.renderTpl(this.loadingTpl);

    this.data$
      ?.pipe(
        tap((currentData) => (data = currentData)),
        takeUntil(this.viewDestroyed$)
      )
      .subscribe({
        next: () => this.renderTpl(this.defaultTpl, new NgxIfContext(data)),
        complete: () => this.renderTpl(this.defaultTpl, new NgxIfContext(data)),
        error: () => this.renderTpl(this.errorTpl),
      });
  }



  public ngOnDestroy(): void {
    this.viewDestroyed$.next(true);
    this.viewDestroyed$.complete();
  }

  private renderTpl(
    tpl: OptionalTplRef<any>,
    context?: NgxIfContext<unknown>
  ): void {
    if (tpl) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(tpl, context);
      this.changeDetector.markForCheck();
    }
  }
}
