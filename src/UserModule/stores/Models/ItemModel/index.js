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
        this.id = item.id;
        this.name = item.name;
        this.link = item.link;
        this.resourceName = item.resource_name;
        this.discription = item.discription;
        this.itemLevel = item.item_level;
        this.isChecked = false;
    }
    @action.bound
    onChangeItemName(updatedName) {
        this.name = updatedName;
    }
    @action.bound
    onChangeItemLink(updatedLink) {
        this.link = updatedLink;
    }
    @action.bound
    onChangeresourceName(updatedResourceName) {
        this.resourceName = updatedResourceName;
    }
    @action.bound
    onChangediscription(updatedDiscription) {
        this.discription = updatedDiscription;
    }
    @action.bound
    onChangeItemLevel(updatedItemLevel) {
        this.itemLevel = updatedItemLevel;
    }
    @action.bound
    onHandleItemCheck() {
        this.isChecked = !this.isChecked;
    }

}
export default ItemModel;
