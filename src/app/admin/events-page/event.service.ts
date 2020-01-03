import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';
import { EventPage } from './eventPage';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class EventService {
  readonly eventsList = 'events';

  constructor(
    private sharedService: SharedService,
  ) { }

  getEventsList(): Observable<any[]> {
    return this.sharedService.getListAsSnapshot(this.eventsList, null).pipe(
      map(res => {
        return res.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
  }

  getEventById(id: string): Observable<any> {
    return this.sharedService.getObject(`${this.eventsList}/${id}`);
  }

  addEvent(event: EventPage) {
    return this.sharedService.pushObjectToList(this.eventsList, event);
  }

  updateEvent(event: EventPage): Promise<void> {
    return this.sharedService.updateObject(`${this.eventsList}/${event.key}`, event);
  }

  deleteEvent(event: EventPage): Promise<void> {
    return this.sharedService.deleteObject(`${this.eventsList}/${event.key}`);
  }
}
