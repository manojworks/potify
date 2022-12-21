export interface ManagerListing {
  id: string,
  file_name: string;
  state:number;
  attr: [];
  //listingsCount:number;
}
export const emptyManagerListing = (): ManagerListing => ({
  id: 'empty',
  file_name: 'empty',
  state: 0,
  //listingsCount: 0,
  attr: [],
});
