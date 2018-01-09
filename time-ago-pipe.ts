import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from "@angular/core";
import {Translate} from './translate';
@Pipe({
	name:'timeAgo',
	pure:false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
	private timer: number;
	private translate: Translate = new Translate();

	constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
	transform(value:string, locale?: string) {
		this.removeTimer();
		let d = new Date(value);
		let now = new Date();
		let seconds = Math.round(Math.abs((now.getTime() - d.getTime())/1000));
		let timeToUpdate = this.getSecondsUntilUpdate(seconds) *1000;
		this.timer = this.ngZone.runOutsideAngular(() => {
			if (typeof window !== 'undefined') {
				return window.setTimeout(() => {
					this.ngZone.run(() => this.changeDetectorRef.markForCheck());
				}, timeToUpdate);
			}
			return null;
		});

		return this.getI18nMessage(seconds, locale || 'en');
	}

	getI18nMessage(seconds:number, locale: string) {
		let minutes = Math.round(Math.abs(seconds / 60));
		let hours = Math.round(Math.abs(minutes / 60));
		let days = Math.round(Math.abs(hours / 24));
		let months = Math.round(Math.abs(days/30.416));
		let years = Math.round(Math.abs(days/365));


        if (seconds <= 45) {
            return this.translate.translate(locale, 'a few seconds ago');
        } else if (seconds <= 90) {
            return this.translate.translate(locale, 'a minute ago');
        } else if (minutes <= 45) {
            return this.translate.translate(locale, 'minutes ago', { minutes });
        } else if (minutes <= 90) {
            return this.translate.translate(locale, 'an hour ago');
        } else if (hours <= 22) {
            return this.translate.translate(locale, 'hours ago', { hours });
        } else if (hours <= 36) {
            return this.translate.translate(locale, 'a day ago');
        } else if (days <= 25) {
            return this.translate.translate(locale, 'days ago', { days });
        } else if (days <= 45) {
            return this.translate.translate(locale, 'a month ago');
        } else if (days <= 345) {
            return this.translate.translate(locale, 'months ago', { months });
        } else if (days <= 545) {
            return this.translate.translate(locale, 'a year ago');
        } else { // (days > 545)
            return this.translate.translate(locale, 'years ago', { years });
        }
	}

	ngOnDestroy(): void {
		this.removeTimer();
	}
	private removeTimer() {
		if (this.timer) {
			window.clearTimeout(this.timer);
			this.timer = null;
		}
	}
	private getSecondsUntilUpdate(seconds:number) {
		let min = 60;
		let hr = min * 60;
		let day = hr * 24;
		if (seconds < min) { // less than 1 min, update ever 2 secs
			return 2;
		} else if (seconds < hr) { // less than an hour, update every 30 secs
			return 30;
		} else if (seconds < day) { // less then a day, update every 5 mins
			return 300;
		} else { // update every hour
			return 3600;
		}
	}
}