import { Routes } from '@angular/router';

import { GymCmp }   from './gym/components/gym';
import { TodoCmp }   from './todo/components/todo-cmp';

export const rootRouterConfig: Routes = [
/*
{
	path: '',
	redirectTo: 'wol',
	pathMatch: 'full'
	
},
*/
{
	path: '',
	component: GymCmp
},
{
	path: ':id',
	component: GymCmp
}

];

/*

*/