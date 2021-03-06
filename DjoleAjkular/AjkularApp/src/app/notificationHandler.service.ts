// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import { URLProviderService } from "./URLProvider.service";
import { Accommodation } from "./accommodation/accommodation.model";
import { LocalStorageService } from "./localStorage.service";

// declare the global variables
declare var $: any;  

@Injectable()  
export class NotificationHandlerService {  
    // Declare the variables  
    private proxy: any;  
    private proxyName: string = 'AccommodationNotification';  
    private connection: any;  

    // create the Event Emitter  
    public accommodationAddedNotification: EventEmitter <Accommodation>;  
    public accommodationApprovedNotification: EventEmitter <Accommodation>;
    public connectionEstablished: EventEmitter < Boolean >;  
    public connectionExists: Boolean;  
   
    constructor(private urlProviderService: URLProviderService, private localStorageService: LocalStorageService) {  
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter < Boolean > ();  
        this.accommodationAddedNotification = new EventEmitter < Accommodation > ();  
        this.accommodationApprovedNotification=new EventEmitter <Accommodation>();     
        this.connectionExists = false;  
    }  
    
    private RegisterToRole() {  
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('RegisterToRole',this.localStorageService.get('role'),this.localStorageService.get('appUserID'));  
    }  

    public  connect()
    {
        // create hub connection  
        this.connection = $.hubConnection(this.urlProviderService.getURL());  
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);  
        // register on server events  
        this.registerOnAccommodationAddedEvents();
        this.registerAccommodationApprovedEvents();
        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection(); 
    }

    // check in the browser console for either signalr connected or not  
    private startConnection(): void {  
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);  
            this.connectionEstablished.emit(true);  
            this.connectionExists = true;
            this.RegisterToRole();
        }).fail((error: any) => {  
            console.log('Could not connect ' + error);  
            this.connectionEstablished.emit(false);  
        });  
    }  
    private registerOnAccommodationAddedEvents(): void
    {  
        
        this.proxy.on('accommodationAddedNotification', (data: Accommodation) => this.NotifyAccommodationAdded(data)); 
    }

    private registerAccommodationApprovedEvents(): void
    {
        this.proxy.on('accommodationApprovedNotification',(data: Accommodation)=>this.NotifyAccommodationApproved(data));
    }

    NotifyAccommodationAdded(data: Accommodation)
    {
       this.accommodationAddedNotification.emit(data);
    }  

    NotifyAccommodationApproved(data: Accommodation)
    {
        this.accommodationApprovedNotification.emit(data);
    }
}  