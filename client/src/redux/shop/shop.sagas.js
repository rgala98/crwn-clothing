import { takeLatest, all, call, put} from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {
    fetchCollectionSuccess,
    fetchCollectionFailure
} from './shop.actions';


export function* fetchCollectionsAsync(){

    const collectionRef = firestore.collection('collections');

    try{
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));

    }
    catch(error){
            yield put(fetchCollectionFailure(error.message));
    }



}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync);
}

export function* shopSagas(){
    yield all ([
        call(fetchCollectionsStart)
    ]);
}