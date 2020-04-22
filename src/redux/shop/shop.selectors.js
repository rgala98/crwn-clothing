import {createSelector} from 'reselect';

const selectShop = state => state.shop;


export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : [] 
)


export const selectCollection = collectionUrlPram => createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlPram] : null)
);


export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)


export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)

// !! - converts any value to boolean 