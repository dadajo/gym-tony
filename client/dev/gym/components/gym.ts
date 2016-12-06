import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gym',
  templateUrl: 'gym/templates/gym.html',
  styleUrls: ['gym/styles/gym.css']
})
export class GymCmp implements OnInit, OnDestroy {
  
	id: any;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
		
		// Obtenemos el id del curso pasado por la url
		/*
		this.route.params.subscribe(
			params => { 
				
				this.id = +params['id'];

				console.log(this.id);
			}
		)
		*/
		this.sub = this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if(id)
          console.log('gym/:id =>  '+id);
        else
          console.log('gym =>  sin id');
      });

	}

	ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
