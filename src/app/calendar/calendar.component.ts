import { Component, OnInit } from "@angular/core";
import { CalendarCreator } from "../service/calendarCreator.service";
import { Day } from "../models/day.model";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.less"],
})
export class CalendarComponent implements OnInit {
  public monthDays: Day[];

  public monthNumber: number;
  public year: number;

  public weekDaysName = [];

  constructor(public calendarCreator: CalendarCreator) {}

  ngOnInit(): void {
    this.setMonthDays(this.calendarCreator.getCurrentMonth());

    for (let i = 1; i < 8; i++) {
      this.weekDaysName.push(this.calendarCreator.getWeekDayName(i));
    }
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth() : void{
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }
}
