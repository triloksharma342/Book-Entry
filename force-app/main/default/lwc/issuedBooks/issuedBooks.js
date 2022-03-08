import { LightningElement ,track } from 'lwc';
import getAllissues from '@salesforce/apex/GetBooksByISBN.getAllissues';

 
export default class IssuedBooks extends LightningElement {

    @track issuesData = [];

    @track error;
     connectedCallback() {
        console.log('.....' );
        getAllissues({})
            .then(result => {
                this.issuesData = result;
                console.table('>>>>>>ISBS - ' + this.issuesData[0]);
            })
            .catch(error => {
                this.error = error;
                console.table(this.error);
                console.log(this.error.description);
            });

         
    }

  


}