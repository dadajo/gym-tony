import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { GymService } from '../services/gym';

type User = {
  id: string;
  email: string;
}

@Component({
  selector: 'gym',
  templateUrl: 'gym/templates/gym.html',
  styleUrls: ['gym/styles/gym.css']
})
export class GymCmp implements OnInit, OnDestroy {
  
	gymId: any;
  private sub: any;
  public user: User = {id: undefined, email: undefined};

  constructor(private route: ActivatedRoute
            , private _gymService: GymService) {}

  
   add():void {

     if(this.gymId){
       this._gymService
          .add({"user": this.user, "id": this.gymId})
          .subscribe((resp) => {
            console.log(resp);
          });
     } 

  }

  ngOnInit(){

		this.sub = this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if(id)
          this.gymId = id;//console.log('gym/:id =>  '+id);
        else
          console.log('gym =>  sin id');
      });

	}

	ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
