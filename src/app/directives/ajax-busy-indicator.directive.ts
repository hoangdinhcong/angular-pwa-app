import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { AjaxBusyNotifierService } from '../services/ajax-busy-notifier.service';

@Directive({ selector: '[ajax-busy-indicator]' })
export class AjaxBusyIndicatorDirective implements OnInit {

    @Input() showDelay = 50;
    @Input() hideDelay = 1000;
    hideTimer: Subscription;
    showTimer: Subscription;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private ajaxBusyNotifierService: AjaxBusyNotifierService) { }

    ngOnInit(): void {
        this.ajaxBusyNotifierService.busy.subscribe(busy => {
            if (busy) {
                this.cancelPendingHide();

                // If a show is already pending, don't start a new one.
                if (!this.showTimer) {
                    this.showTimer = interval(this.showDelay).subscribe(_ => {
                        this.renderer.removeClass(this.el.nativeElement, 'inactive');
                        this.showTimer.unsubscribe();
                        this.showTimer = null;
                    });
                }
            } else {
                this.cancelPendingShow();

                // If a show is already pending, don't start a new one.
                if (!this.hideTimer) {
                    this.hideTimer = interval(this.hideDelay).subscribe(() => {
                        this.renderer.addClass(this.el.nativeElement, 'inactive');
                        this.hideTimer.unsubscribe(); this.hideTimer = null;
                    });
                }
            }
        });
    }


    private cancelPendingHide(): void {
        if (this.hideTimer) {
            this.hideTimer.unsubscribe();
            delete this.hideTimer;
        }
    }

    private cancelPendingShow(): void {
        if (this.showTimer) {
            this.showTimer.unsubscribe();
            delete this.showTimer;
        }
    }
}
