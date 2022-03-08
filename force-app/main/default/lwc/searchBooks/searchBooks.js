import { LightningElement, track, api, wire} from 'lwc';
import getBooks from '@salesforce/apex/GetBooksByISBN.getBooks';


const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'ISBN', fieldName: 'ISBN_Number__c'},
    { label: 'Author', fieldName: 'Author__c'},
    { label: 'Number of Available book copy', fieldName: 'Number_of_Free_Books__c', type: 'number' },
];

export default class SearchBooks extends LightningElement {
     @track error;
    @api searchKey ='';
    @track value;
    @track error;
    @track data;
      result;
    @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track columns; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 5; 
    @track totalRecountCount = 0;
    @track totalPage = 0;
     columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        
    }

    handleKeyChange( event ) {
        this.searchKey = event.target.value;
        console.log('searchkey>>>>>' + this.searchKey);
    }


    
    @wire (getBooks, { searchKey: '$searchKey'})
        wiredBooks({data,error}){
            console.log('im in');
        if(data){

            this.items = data;
            this.totalRecountCount = data.length; 
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            
            this.data = this.items.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
            this.columns = columns;

            this.error = undefined;

        }
        if(error){
            this.error = error;
            this.data = undefined;
        }
    }

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    //clicking on next button this method will be called
    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);            
        }             
    }
    displayRecordPerPage(page){

        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 

        this.data = this.items.slice(this.startingRecord, this.endingRecord);

        this.startingRecord = this.startingRecord + 1;
    }  

    @track showModal = false;
    
    @track book ;

    openModal(event) {
         console.log(event.target.dataset.id);
         console.log(event.currentTarget.dataset.id );
          this.book = this.data.find(item => item.Id === event.currentTarget.dataset.id);

        // console.log(this.data[0].Issues__r);
        console.log(this.book);
         this.showModal = true;
      }

    closeModal() {
         this.showModal = false;
    }
}