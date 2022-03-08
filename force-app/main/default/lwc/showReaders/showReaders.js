import { LightningElement, track} from 'lwc';
import getAllissues from '@salesforce/apex/GetBooksByISBN.getAllissues';

const columns = [
    { label: 'Label', fieldName: 'RName' },
    { label: 'Website', fieldName: 'BCName' },
    { label: 'Phone', fieldName: 'date_of_return__c', type: 'date' },
    { label: 'Balance', fieldName: 'Price__c', type: 'currency' },
];

export default class ShowReaders extends LightningElement {
    @track issuesData = [];
    columns = columns;

    @track numOfIssuedBooks;
    
    @track overdueB=[];

    @track error;
     connectedCallback() {
        console.log('.....' );
        getAllissues({})
            .then(result => {
                this.issuesData = result;
                console.table('>>>>>>ISBS - ' + this.issuesData[0]);
                this.numOfIssuedBooks = this.issuesData.length;
                console.log('>>>>>>>>>>>length'+ this.numOfIssuedBooks);
 
                this.overdueB = this.issuesData.find(item => item.date_of_return__c < today());
                return {...row, RName : Reader__r.Name, BCName : Book_C__r.Name };

            })
            .catch(error => {
                this.error = error;
                console.table(this.error);
                console.log(this.error.description);
            });

    }

  
}