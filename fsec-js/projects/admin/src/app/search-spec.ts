export class SearchSpec {
  constructor(public sortName: string, public sortValue: string) {}
  params() {
    if (this.sortName == null || this.sortValue == null) { return null; }
    return {
      sort: this.sortName,
      dir: this.sortValue
    }
  }
}
