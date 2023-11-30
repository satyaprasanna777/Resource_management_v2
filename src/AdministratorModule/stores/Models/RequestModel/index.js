import { observable } from 'mobx';
class RequestModel {
    @observable userName
    @observable resourceName
    @observable itemName
    @observable accessLevel
    @observable dueDateTime
    @observable id
    @observable isChecked
    constructor(request) {
        this.userName = request.person_name;
        this.resourceName = request.resource;
        this.itemName = request.item;
        this.accessLevel = request.access_level;
        this.dueDateTime = request.due_datetime;
        this.id = request.request_id;
        this.pic = request.pic;
        this.isChecked = false;
    }
    onChangeIsChecked = () => {
        this.isChecked = !this.isChecked;
    }
}
export default RequestModel;
