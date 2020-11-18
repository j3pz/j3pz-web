export const GA_MEASUREMENT_ID = 'G-HTNX630B9C';

export function report(event: Gtag.EventNames | string, options?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams) {
    try {
        gtag('event', event, options);
    } catch (e) {
        // no gtag
    }
}
