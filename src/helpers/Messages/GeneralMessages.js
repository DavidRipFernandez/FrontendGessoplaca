

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class GeneralMessages{


    static Failed(message){
        Notify.failure(message);
    }


    static Success(message){
        Notify.success(message);
    }
}



