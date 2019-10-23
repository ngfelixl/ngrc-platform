import { DualshockState, initialControllerState } from '@ngrc/dualshock-shared';
import { Observable, fromEvent, timer, of, Subject, merge, combineLatest } from 'rxjs';
import { HID, devices } from 'node-hid';
import { mapTo, map, switchMap, retryWhen, tap, shareReplay,
  delayWhen, startWith, distinctUntilChanged, scan } from 'rxjs/operators';
import { dualshockMapping } from '../helpers';

export class Dualshock {
  private ds4$: Observable<HID>;
  private ds4Data$: Observable<Partial<DualshockState>>;
  private ds4RuntimeError$: Observable<any>;
  private ds4Connected$: Observable<boolean>;
  public state$: Observable<DualshockState>;

  private errorSubject$ = new Subject<void>();

  constructor() {
    this.ds4$ = this.createDs4Instance();
    this.ds4RuntimeError$ = this.createDs4RuntimeError();
    this.ds4Data$ = this.createDs4DataStream();

    this.ds4Connected$ = merge(
      this.ds4$.pipe(mapTo(true)),
      this.ds4RuntimeError$.pipe(mapTo(false))
    ).pipe(
      distinctUntilChanged(),
      startWith(false)
    );

    this.state$ = this.createDs4State();
  }

  private createDs4State(): Observable<DualshockState> {
    return combineLatest(this.ds4Data$, this.ds4Connected$).pipe(
      scan((state: DualshockState, [ds4data, connected]: [Partial<DualshockState>, boolean]) => {
        return {...state, ...ds4data, connected};
      }, initialControllerState)
    );
  }

  private createDs4DataStream(): Observable<Partial<DualshockState>> {
    return this.ds4$.pipe(
      switchMap((ds4) =>  fromEvent(ds4, 'data')),
      map(dualshockMapping)
    );
  }

  private createDs4RuntimeError(): Observable<unknown> {
    return this.ds4$.pipe(
      switchMap((ds4) => fromEvent(ds4, 'error')),
      tap(() => this.errorSubject$.next())
    );
  }

  private createDs4Instance(): Observable<HID> {
    return merge(of([]), this.errorSubject$).pipe(
      map(() => {
        const usbDevices = devices();
        const ds4 = usbDevices.filter(device => device.vendorId === 0x054C && device.productId === 0x05C4);

        if (!ds4 || !ds4[0]) {
          throw new Error();
        }

        return new HID(ds4[0].vendorId, ds4[0].productId);
      }),
      retryWhen((error) => error.pipe(
        delayWhen(() => timer(500)),
        tap(() => console.log('Retry to connect to dualshock...'))
      )),
      shareReplay(1)
    );
  }
}
