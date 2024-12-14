import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-quote-display',
  templateUrl: './quote-display.component.html',
  styleUrls: ['./quote-display.component.css']
})
export class QuoteDisplayComponent {
  currentQuote : string
  currentAnswer : string
  currentAnswerIndex : number
  score : number
  currDisplayMessage : string
  lastAnswer : string
  constructor(private quotesService : QuotesService) {
    this.currentQuote = ''
    this.currentAnswer = ''
    this.currentAnswerIndex = 0
    this.score = 0
    this.currDisplayMessage = "Take a guess!"
    this.lastAnswer = ""
   }
  

  
  ngOnInit() : void{
    this.quotesService.usernames.forEach(name => {
      this.quotesService.getQuote(name).pipe(finalize(() => {
        this.setRandomQuoteAndAnswer()
      })).subscribe(value => {
        this.quotesService.quotes[name] = []
        value.forEach(input => {
          this.quotesService.quotes[name].push(input.message)
          //bitch
        })
      })
      
    })
    

  }

  setRandomQuoteAndAnswer(){
    this.currentAnswer = this.quotesService.usernames[Math.floor(Math.random() * (this.quotesService.usernames.length))]
    this.currentAnswerIndex = Math.floor(Math.random() * this.quotesService.quotes[this.currentAnswer].length)
    var regex = new RegExp(/["“](.*)["”] \- (.*)/)
    var expression = this.quotesService.quotes[this.currentAnswer][this.currentAnswerIndex].match(regex)
     
    if(expression === undefined || expression === null){
      this.setRandomQuoteAndAnswer()
    } else {
      this.currentQuote = expression[1]
    }
    
     
     
     
     
  }

  OnSubmit(){
    let answer_stuff =  document.getElementById("answer-box") as HTMLInputElement;
    const answer = answer_stuff.value;
    answer_stuff.value = ""
     
    if(answer == ""){
      this.currDisplayMessage = "Erm. What the sigma"
      this.score = 0
    }
    if(answer.toLowerCase() == this.currentAnswer){
      this.score++
      this.currDisplayMessage = "Nice job!"
    } else {
      this.score = 0
      this.currDisplayMessage = "Uh oh! From the beginning."
    }
    this.quotesService.quotes[this.currentAnswer].splice(this.currentAnswerIndex, 1)
    this.lastAnswer = "Last Answer: " + this.currentAnswer
    this.setRandomQuoteAndAnswer()
  
  }

}
