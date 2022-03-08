public with sharing class GetBooksByISBN{

    @AuraEnabled(cacheable=true)
    public static Book__c getBook(Integer iSBNnumber){
        Book__c book = new Book__c();
        
        try {
              book = [SELECT ID,Name,Price__c, Author__c, Number_of_Books__c, Number_of_Free_Books__c,
                            ISBN_Number__c, (select id from Issues__r)
                            FROM Book__c 
                            WHERE ISBN_Number__c =:  iSBNnumber LIMIT 1];  
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }  
        return book;
    }

    @AuraEnabled(cacheable=true)
    public static list<Book__c> getBooks(String searchKey){
        list<Book__c> books = new list<Book__c>();
        
        try {

            String searchString = '%' + searchKey + '%';
              books = [SELECT ID,Name,Price__c, Author__c, Number_of_Books__c, Number_of_Free_Books__c,
                            ISBN_Number__c, (select id,Name from Issues__r)
                            FROM Book__c 
                            WHERE Name LIKE :searchString
                              OR Author__c LIKE :searchString  
                              WITH SECURITY_ENFORCED
                             ];  
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }  
        return books;
    }
    
    @AuraEnabled(cacheable=true)
    public static void  createCopies(String stringBook){
        Book__c bookRec = (Book__c)JSON.deserialize(stringBook, Book__c.class ); 
    	UPSERT bookRec;
        
        List<Book_copy__c> bookcopy = new List<Book_copy__c>();
        for(Integer i=0 ; i <bookRec.Number_of_Books__c ; i++){
            Book_copy__c bc = new Book_copy__c();
            bc.Name='abc'+i;
            bc.Book__c = bookRec.id;
            bc.Issued__c = false;
            bookcopy.add(bc);
        }
        INSERT bookcopy;
        
        
    }

    @AuraEnabled(cacheable=true)
    public static List<Book_Copy__c> getBCByBook(Id bookId){
        return [SELECT  Id, Name, CreatedDate, Book_Number__c, 
        Issued__c, Book__r.Name, Number_of_Issued_Books_del__c
            FROM Book_Copy__c
            WHERE Book__c = : bookId
            WITH SECURITY_ENFORCED
         ];
    } 
 
    @AuraEnabled(cacheable=true)
    public static List<Issue__c> getAllissues( ){
        return [SELECT Id,  Reader__r.Name, Book_C__r.Name, 
         date_of_return__c, Price__c 
            FROM Issue__c
             WITH SECURITY_ENFORCED
         ];
    } 

}