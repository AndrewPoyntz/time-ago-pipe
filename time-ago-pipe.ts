import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy, Inject, LOCALE_ID} from "@angular/core";
@Pipe({
	name:'timeAgo',
	pure:false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
	private timer: number;
	constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone, @Inject(LOCALE_ID) private locale: string) {}
	transform(value:string) {
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
		let minutes = Math.round(Math.abs(seconds / 60));
		let hours = Math.round(Math.abs(minutes / 60));
		let days = Math.round(Math.abs(hours / 24));
		let months = Math.round(Math.abs(days/30.416));
		let years = Math.round(Math.abs(days/365));
		if (seconds <= 45) {
			return this.formatMessage('a_few_seconds_ago', []);
		} else if (seconds <= 90) {
			return this.formatMessage('a_minute_ago', []);
		} else if (minutes <= 45) {
			return this.formatMessage('x_minutes_ago', [minutes]);
		} else if (minutes <= 90) {
			return this.formatMessage('an_hour_ago', []);
		} else if (hours <= 22) {
			return this.formatMessage('x_hours_ago', [hours]);
		} else if (hours <= 36) {
			return this.formatMessage('a_day_ago', []);
		} else if (days <= 25) {
			return this.formatMessage('x_days_ago', [days]);
		} else if (days <= 45) {
			return this.formatMessage('a_month_ago', []);
		} else if (days <= 345) {
			return this.formatMessage('x_months_ago', [months]);
		} else if (days <= 545) {
			return this.formatMessage('a_year_ago', []);
		} else { // (days > 545)
			return this.formatMessage('x_years_ago', [years]);
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
	private formatMessage(message: string, args: any[]): string {
		let formatted: string = messages[message][this.locale] || messages[message]['en-US'];
		for (let i = 0; i < args.length; i++) {
			let regexp = new RegExp('\\{'+i+'\\}', 'gi');
			formatted = formatted.replace(regexp, args[i]);
		}
		return formatted;
	}
}

const messages = {
	'a_few_seconds_ago': {
		'en-US': 'a few seconds ago',
		'hu-HU': 'pár másodperce'
	},
	'a_minute_ago': {
		'en-US': 'a minute ago',
		'hu-HU': 'egy perce'
	},
	'x_minutes_ago': {
		'en-US': '{0} minutes ago',
		'hu-HU': '{0} perce'
	},
	'an_hour_ago': {
		'en-US': 'an hour ago',
		'hu-HU': 'egy órája'
	},
	'x_hours_ago': {
		'en-US': '{0} hours ago',
		'hu-HU': '{0} órája'
	},
	'a_day_ago': {
		'en-US': 'a day ago',
		'hu-HU': 'egy napja'
	},
	'x_days_ago': {
		'en-US': '{0} days ago',
		'hu-HU': '{0} napja'
	},
	'a_month_ago': {
		'en-US': 'a month ago',
		'hu-HU': 'egy hónapja'
	},
	'x_months_ago': {
		'en-US': '{0} months ago',
		'hu-HU': '{0} hónapja'
	},
	'a_year_ago': {
		'en-US': 'a year ago',
		'hu-HU': 'egy éve'
	},
	'x_years_ago': {
		'en-US': '{0} years ago',
		'hu-HU': '{0} éve'
	}
};
