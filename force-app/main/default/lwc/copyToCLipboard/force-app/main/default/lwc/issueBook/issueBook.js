import { LightningElement,api } from 'lwc';
import ISSUE_OBJ from '@salesforce/schema/Issue__c';
import BOOK_CNAME from '@salesforce/schema/Issue__c.Book_C__c';
import READER from '@salesforce/schema/Issue__c.Reader__c';
import DATE from '@salesforce/schema/Issue__c.date_of_return__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class IssueBook extends LightningElement {
    @api bcId;
    BOOK_CNAME = this.bcId;
     issueObj = ISSUE_OBJ;
    myFields = [BOOK_CNAME, READER, DATE];
    readerId;
    dateOfReturnn;
   
    handleIssueCreated(){
        // Run code when account is created.
        this.dispatchEvent(new ShowToastEvent({
            title: 'wooohhhoooooo',
            message: 'Created',
            variant: 'success'
        }));
    }
}