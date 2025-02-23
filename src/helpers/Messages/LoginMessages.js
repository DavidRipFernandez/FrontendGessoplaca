import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class LoginMessages{


    static Failed(message){
        Notify.failure(message);
    }


    static Success(message){
        Notify.success(message);
    }
}



