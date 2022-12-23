export interface Listing {
  id: string,
  file_name: string;
  state:number;
  attr: [];
}

export interface ManagerListings {
  count: number;
  data: Listing[]
}



export const emptyListing = () : Listing => ({
  id: 'empty',
  file_name: 'empty',
  state: 0,
  attr: []
})

export const emptyManagerListing = (): ManagerListings => {
  return ({
    count: 0,
    data: [emptyListing()]
  });
};
