import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  users : Record<string, string>;
  quotes : Record<string, string[]> ;
  usernames;
  OGQuotes : Record<string, string[]>

  constructor(private http : HttpClient) {
    this.users = {
       "dante"  : "441708884378517514",
       "clark"  : "1124053366620823732",
       "kiera" : "698766259243974716",
       "jaysen" : "454722441780920330",
       "owen" : "703278178944417853",
       "gio" : "426074685340647424",
       "jack" : "214028075103551488",
       "amy" : "897988508948500503",
       "mary-ann" : "395686692306157581"
    };

    this.quotes = {}

    this.OGQuotes = {}

    this.usernames = ["dante", "clark", "kiera", "jaysen", "owen", "gio", "jack", "amy", "mary-ann"]

   }

   getQuote(name : string) : Observable<Quote[]>{
      return this.http.get<Quote[]>("http://149.56.102.175:8080/api/quotes/" + this.users[name])
  }


}
