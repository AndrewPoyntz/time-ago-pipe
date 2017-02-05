import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './time-ago-pipe';

@NgModule({
	declarations: [TimeAgoPipe],
	exports: [TimeAgoPipe],
})
export class TimeAgoPipeModule { }

export * from './time-ago-pipe';
