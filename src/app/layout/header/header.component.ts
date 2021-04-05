import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions, EventApi} from '@fullcalendar/angular';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { formatDate } from '@fullcalendar/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('calendarModal') calendarModal: TemplateRef<any>;
  dialogRef: MatDialogRef<TemplateRef<any>>;
  userDetails = JSON.parse(localStorage.getItem('user'));
  items = [
    {
      title: 'Profile',
      icon: 'portrait',
      link: {route: '/admin/employee/view-employee', param: this.userDetails}
    }
  ];

  currentEvents: any[] = [];

  calendarVisible = false;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    // initialEvents: this.currentEvents, // alternatively, use the `events` setting to fetch from a feed
    events: this.currentEvents,
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  getAllEmployeeUrl = environment.getAllEmployeeUrl;
  allEmployees: any[];

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
    // this.avatarActions();
    this.getAllEmployee(this.getAllEmployeeUrl);
  }

  getAllEmployee(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        if (data.responseCode === '00'){
          this.allEmployees = data.responseObject;
          this.currentEvents = this.allEmployees.map((emp, i) => {
            // const date = emp.emp_dob.slice(0, emp.emp_dob.indexOf(' ')).split('-');
            return {
                    title: `${emp.emp_firstname} ${emp.emp_lastname}'s Birthday`,
                    start: new Date(emp.emp_dob).toISOString().replace(/T.*$/, ''),
                    end: new Date(emp.emp_dob).toISOString().replace(/T.*$/, ''),
                    allDay: new Date(emp.emp_dob).toISOString().replace(/T.*$/, ''),
                    id: i++
                   };
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openCalendar(dialog: TemplateRef<any>, options) {
    this.calendarVisible = true;
    this.dialogRef = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  // handleDateSelect(selectInfo: DateSelectArg) {
  //   const title = prompt('Please enter a new title for your event');
  //   const calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     });
  //   }
  // }

  // handleEventClick(clickInfo: EventClickArg) {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // }

  // handleEvents(events: EventApi[]) {
  //   this.currentEvents = events;
  // }

  // avatarActions() {
  //   return false;
    // this.nbMenuService.onItemClick()
    //   .pipe(
    //     filter(({ tag }) => tag === 'my-avatar-menu'),
    //     map(({ item }) => {
    //       if (item.link) {
    //         return {action: item.title.toLowerCase(), link: item.link};
    //       } else {
    //         return {action: item.title.toLowerCase()};
    //       }
    //     }),
    //   )
    //   .subscribe(menu => {
    //     if (menu.action === 'profile' && menu.link) {
    //       this.router.navigate([menu.link, this.userDetails.emp_username]);
    //     } else if (menu.action === 'logout') {
    //       this.auth.logout();
    //     }
    //   });
  // }

  toggle() {
    // this.sidebarService.toggle(true);
    return false;
  }

  getUserDetails() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn() {
    return this.auth.checkLogin ? 'Logged In' : ' ';
  }

  logout() {
    this.auth.logout();
  }
}
