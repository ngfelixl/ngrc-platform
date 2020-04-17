import { Controller, DualshockState, DualshockConfig } from '@ngrc/interfaces/dualshock';
import { devices, HID } from 'node-hid';
import { combineLatest, fromEvent, merge, Observable, of, Subject, timer, BehaviorSubject } from 'rxjs';
import { delayWhen, distinctUntilChanged, map, mapTo, pluck, retryWhen, sampleTime, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { dualshockMapping } from '../helpers';

export class Dualshock {
  private dualshock$: Observable<HID>;
  private ds4RuntimeError$: Observable<any>;
  private connected$: Observable<boolean>;
  private battery$: Observable<number>;
  private errorSubject$ = new Subject<void>();
  public state$: Observable<DualshockState>;
  public data$: Observable<Controller>;
  public config$ = new BehaviorSubject<DualshockConfig>({
    frequency: 16.7
  });

  constructor() {
    this.dualshock$ = this.createDs4Instance();
    this.ds4RuntimeError$ = this.createDs4RuntimeError();

    const ds4DataStream$ = this.createDs4DataStream();
    this.data$ = ds4DataStream$.pipe(
      pluck('controller'),
      distinctUntilChanged(),
      shareReplay(1)
    );
    this.battery$ = ds4DataStream$.pipe(
      pluck('battery'),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.connected$ = merge(
      this.dualshock$.pipe(mapTo(true)),
      this.ds4RuntimeError$.pipe(mapTo(false))
    ).pipe(
      distinctUntilChanged(),
      startWith(false)
    );

    this.state$ = this.createDs4State();
  }

  private createDs4State(): Observable<DualshockState> {
    return combineLatest([this.battery$, this.connected$]).pipe(
      map(([battery, connected]: [number, boolean]) => ({battery, connected}))
    );
  }

  private createDs4DataStream(): Observable<{ battery: number, controller: Controller }> {
    return combineLatest([
      this.dualshock$,
      this.config$
    ]).pipe(
      switchMap(([dualshock, config]) => fromEvent(dualshock, 'data').pipe(
        sampleTime(config?.frequency || 16.7)
      )),
      map(dualshockMapping),
      shareReplay(1)
    );
  }

  private createDs4RuntimeError(): Observable<unknown> {
    return this.dualshock$.pipe(
      switchMap((dualshock) => fromEvent(dualshock, 'error')),
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
        delayWhen(() => timer(500))
      )),
      shareReplay(1)
    );
  }
}
