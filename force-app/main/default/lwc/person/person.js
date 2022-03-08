import { api, LightningElement ,track} from 'lwc';

export default class Person extends LightningElement {

    @api location ;      
    
    @track
    user ={
        firstname : 'Trilok',
        lastname : 'Sharma'
    } ;
    
    @api
    updateuserdetails(){
        console.log('function called'); 
        this.user.firstname = 'palak'
        
    }
}