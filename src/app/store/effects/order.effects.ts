import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { AddOrder, AddOrderComplete, AddOrderError, OrderActionTypes,
        GetOrderList, GetOrderListComplete, GetOrderListError,
        SaveAgreementError, SaveAgreement, SaveAgreementComplete, 
        SetOrderStatus, SetOrderStatusComplete, SetOrderStatusError, SaveOrderMetaFirst, 
        SaveOrderMetaForthComplete, SaveOrderMetaFirstError, SaveOrderMetaSecond, SaveOrderMetaSecondError, 
        SaveOrderMetaFirstComplete, SaveOrderMetaSecondComplete, SaveOrderMetaThird, SaveOrderMetaThirdComplete, 
        SaveOrderMetaThirdError, SaveOrderMetaForth, SaveOrderMetaForthError,} from '../actions/order.action';

import { Router } from '@angular/router';

import { of } from 'rxjs';
import { OrderService } from '../../core/services/order.service';

import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Injectable()
export class OrderEffects
{
    /**
     * Constructor
     *
     * @param {Actions} actions$
     */
    constructor(
        private actions$: Actions,
        private router: Router,
        private orderService: OrderService 
    )
    {
    }

    @Effect()
    addOrder$ = this.actions$.pipe(
        ofType(OrderActionTypes.ADD_ORDER),
        map((action: AddOrder) => action.payload),
        switchMap((payload) => {
            return this.orderService.addOrder(payload.order, payload.customer_id)
                .pipe(
                map((customer) => {
                    return new AddOrderComplete()
                }),
                catchError((error: Error) => {
                    Swal.fire('Ooops!', 'The customer can not be added', 'error');
                    return of(new AddOrderError({ errorMessage: error.message }));
                })
            );
        })
    );

    @Effect()
    oderList$ = this.actions$.pipe(
        ofType(OrderActionTypes.GET_ORDER_LIST),
        switchMap(() => {
            return this.orderService.getOrderList()
                .pipe(
                map((orderList) => {
                    let orderArray : any[] = [];
                    orderList.forEach(element => {
                        orderArray.push(element);
                    });
                    return new GetOrderListComplete({orderList : orderArray})
                }),
                catchError((error: Error) => {
                    return of(new GetOrderListError({ errorMessage: error.message }));
                })
            );
        })
    );

    @Effect()
    saveAgreement$ = this.actions$.pipe(
        ofType(OrderActionTypes.SAVE_AGREEMENT),
        map((action: SaveAgreement) => action.payload),
        switchMap((payload) => {
            return this.orderService.saveAgreement(payload.agreement)
                .pipe(
                map((state) => {
                    Swal.fire('Yes!', 'The agreement has successfully saved', 'success');
                    return new SaveAgreementComplete();
                }),
                catchError((error: Error) => {
                    Swal.fire('Ooops!', 'The agreement has invailed', 'error');
                    return of(new SaveAgreementError({ errorMessage: error.message }));
                })
            );
        })
    );    

    @Effect()
    setOrderStatus$ = this.actions$.pipe(
        ofType(OrderActionTypes.SET_ORDER_STATUS),
        map((action: SetOrderStatus) => action.payload),
        switchMap((payload) => {
            return this.orderService.setOrderStatus(payload.orderStatus)
                .pipe(
                map((state) => {
                    return new SetOrderStatusComplete();
                }),
                catchError((error: Error) => {
                    return of(new SetOrderStatusError({ errorMessage: error.message }));
                })
            );
        })
    );
    
    @Effect()
    saveOrderMetaFirst$ = this.actions$.pipe(
        ofType(OrderActionTypes.SAVE_ORDER_META_FIRST),
        map((action: SaveOrderMetaFirst) => action.payload),
        switchMap((payload) => {
            return this.orderService.saveOrderMetaFirst(payload.orderMetaFirst)
                .pipe(
                map((state) => {
                    Swal.fire('Yes!', 'You saved successfully', 'success');
                    return new SaveOrderMetaFirstComplete();
                }),
                catchError((error: Error) => {
                    return of(new SaveOrderMetaFirstError({ errorMessage: error.message }));
                })
            );
        })
    );

    @Effect()
    saveOrderMetaSecond$ = this.actions$.pipe(
        ofType(OrderActionTypes.SAVE_ORDER_META_SECOND),
        map((action: SaveOrderMetaSecond) => action.payload),
        switchMap((payload) => {
            return this.orderService.saveOrderMetaSecond(payload.orderMetaSecond)
                .pipe(
                map((state) => {
                    Swal.fire('Yes!', 'You saved successfully', 'success');
                    return new SaveOrderMetaSecondComplete();
                }),
                catchError((error: Error) => {
                    return of(new SaveOrderMetaSecondError({ errorMessage: error.message }));
                })
            );
        })
    );
    
    @Effect()
    saveOrderMetaThird$ = this.actions$.pipe(
        ofType(OrderActionTypes.SAVE_ORDER_META_THIRD),
        map((action: SaveOrderMetaThird) => action.payload),
        switchMap((payload) => {
            return this.orderService.saveOrderMetaThird(payload.orderMetaThird)
                .pipe(
                map((state) => {
                    Swal.fire('Yes!', 'You saved successfully', 'success');
                    return new SaveOrderMetaThirdComplete();
                }),
                catchError((error: Error) => {
                    return of(new SaveOrderMetaThirdError({ errorMessage: error.message }));
                })
            );
        })
    );

    @Effect()
    saveOrderMetaForth$ = this.actions$.pipe(
        ofType(OrderActionTypes.SAVE_ORDER_META_FORTH),
        map((action: SaveOrderMetaForth) => action.payload),
        switchMap((payload) => {
            return this.orderService.saveOrderMetaForth(payload.orderMetaForth)
                .pipe(
                map((state) => {
                    Swal.fire('Yes!', 'You saved successfully', 'success');
                    return new SaveOrderMetaForthComplete();
                }),
                catchError((error: Error) => {
                    return of(new SaveOrderMetaForthError({ errorMessage: error.message }));
                })
            );
        })
    );
}