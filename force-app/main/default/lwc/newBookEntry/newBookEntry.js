import { LightningElement,api,track,wire } from 'lwc';
import getBook from '@salesforce/apex/GetBooksByISBN.getBook';
import createCopies from '@salesforce/apex/GetBooksByISBN.createCopies';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class NewBookEntry extends LightningElement {

@track isbnNumber;
@track Book = {};
@track error;   

    changeHandler(event){
    
        this.isbnNumber = event.target.value;
        console.log(this.isbnNumber);
        getBook({ iSBNnumber: this.isbnNumber })
            .then(result => {
                this.Book = result;
                console.log(this.Book);
            })
            .catch(error => {
                this.error = error;
            });
    }

    updaterecords(){
        console.log('26');

        createCopies({ stringBook: JSON.stringify(this.Book) })
        .then(result => {
            console.log('22');
            this.dispatchEvent(new ShowToastEvent({
                title: 'record created',
                message: 'message',
                variant: 'success'
            }));    
        
        })
        .catch(error => {
            console.log('36');

            this.error = error;
        });
    }
      
}