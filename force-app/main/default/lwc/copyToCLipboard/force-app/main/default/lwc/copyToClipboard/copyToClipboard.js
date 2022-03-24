import { LightningElement ,track} from 'lwc';

export default class CopyToClipboard extends LightningElement {

     details;

    changeHandler(event) {
        this.details = event.target.value;
      }
    handleCopyToClickboardEvent(event) {
        console.log(this.details);
        //let tag = this.details;
        let tag = document.createElement('textarea');
        tag.setAttribute('id', 'input_test_id');
        tag.value = this.details;
        document.getElementsByTagName('body')[0].appendChild(tag);
        document.getElementById('input_test_id').select();
        document.execCommand('copy');
        document.getElementById('input_test_id').remove();
       // alert(' Replication success ');
        
    }
}