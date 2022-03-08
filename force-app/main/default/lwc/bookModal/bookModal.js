import { LightningElement, api, track } from 'lwc';
import getBCByBook from '@salesforce/apex/GetBooksByISBN.getBCByBook';

// Id, Name, CreatedDate, Book_Number__c, 
//         Issued__c, Book__r.Name, Number_of_Issued_Books_del__c
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Book', fieldName: 'BName' },
    { label: 'Book Number', fieldName: 'Book_Number__c' },
    { label: 'Issued?', fieldName: 'Issued__c' },
    {
        type: "button", typeAttributes: {
            label: 'Issue',
            name: 'Issue',
            title: 'Issue',
            disabled: false,
            value: 'Issue',
            iconPosition: 'left'
        }
    },
    {
        type: "button", typeAttributes: {
            label: 'return',
            name: 'return',
            title: 'return',
            disabled: false,
            value: 'return',
            iconPosition: 'left'
        }
    }

];

export default class BookModal extends LightningElement {
    columns = columns;

    BCID;
    @api bookObj;
    @track issues = {};
    @track error;
    @track numberOfFreeBooks;
    @track showIssue = false;
    async connectedCallback() {
        console.log('.....' + this.bookObj);
        getBCByBook({ bookId: this.bookObj.Id })
            .then(result => {

                let tempRecords = JSON.parse(JSON.stringify(result));
                tempRecords = tempRecords.map(row => {
                    return { ...row, BName: row.Book__r.Name };
                })

                // this.numberOfFreeBooks = tempRecords[0][0];
                this.issues = tempRecords;
                console.log('>>>>>>>>>333' + this.issues[0]);
            })
            .catch(error => {
                this.error = error;
            });

        console.log('noffb '+this.bookObj.Number_of_Free_Books__c);

        this.numberOfFreeBooks = this.bookObj.Number_of_Free_Books__c;
    }

    callRowAction(event) {
        console.log('trilok  wrong ');

        const actionName = event.detail.action.name;
        if (actionName === 'Issue') {
            console.log('trilok is not wrong ');
            console.log(event.detail.row.Id);
            this.BCID = event.detail.row.Id;
            this.showIssue = true;
        }
    }

    showIssuePage(event) {
        this.showIssue = true;
    }




}