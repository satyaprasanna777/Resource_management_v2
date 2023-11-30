import { observable, action } from 'mobx';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { API_INITIAL } from '@ib/api-constants';
class ItemModel {
    @observable name
    @observable link
    @observable resourceName
    @observable discription
    @observable itemLevel
    @observable isChecked = false
    @observable id
    constructor(item) {
        this.id = item.item_id;
        this.name = item.name;
        this.link = item.link;
        this.resourceName = item.resource_name;
        this.discription = item.description;
        this.itemLevel = item.item_level;
        this.isChecked = false;
    }
    @action.bound
    onHandleItemCheck() {
        this.isChecked = !this.isChecked;
    }

}
export default ItemModel;
