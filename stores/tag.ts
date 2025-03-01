import { makeAutoObservable } from 'mobx';
import { TagData } from '@/constants/tag';

class tagStore {
  editTag?: TagData;

  constructor() {
    makeAutoObservable(this)
  }

  setEditTag(tag?: TagData) {
    this.editTag = tag;
  }
}

const TagStore = new tagStore()
export default TagStore;