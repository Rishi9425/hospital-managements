import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {
private socket: Socket;
readonly SERVER_URL = 'http://localhost:3000'; // Replace with your server URL
  constructor() {
    this.socket =io(this.SERVER_URL);
   }

   on(eventName: string, callback: Function){
    this.socket.on(eventName, (data)=>callback(data));
   }

   emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
   }
}
