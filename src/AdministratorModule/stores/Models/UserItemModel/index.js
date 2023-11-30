import { observable, action } from 'mobx';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { API_INITIAL } from '@ib/api-constants';
class UserItemModel {
    @observable name
    @observable link
    @observable resourceName
    @observable discription
    @observable itemLevel
    @observable isChecked = false
    @observable id
    constructor(item) {
        this.id = item.useritem_id;
        this.itemName = item.item;
        this.link = item.link;
        this.accessLevel = item.access_level;
        this.resourceName = item.resource;
        this.discription = item.description;
        this.isChecked = false;
    }
    @action.bound
    onHandleItemCheck() {
        this.isChecked = !this.isChecked;
    }

}
export default UserItemModel;
