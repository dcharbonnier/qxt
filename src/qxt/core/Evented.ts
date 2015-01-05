module qxt.core {

    export interface Event {
        type: string;
        data?: any;
    }


    export class Evented {
        private _listerners = {};

        addEventListener(type:string, handler:any) {
            //@todo make sure we can not add twice the same type/handler
            if (!this._listerners.hasOwnProperty(type)) {
                this._listerners[type] = [];
            }
            this._listerners[type].push(handler);
        }

        removeEventListener(type:string, handler:any) {
            if (this._listerners.hasOwnProperty(type)) {
                var listeners = this._listerners[type];
                for (var i = listeners.length-1; i >= 0; i--) {
                    if (listeners[i] === handler) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }

        dispatchEvent(event:Event) {
            var type = event.type;
            if (this._listerners.hasOwnProperty(type)) {
                var listeners =  this._listerners[type].concat();
                for (var i = listeners.length-1; i >= 0; i--) {
                    listeners[i](event);
                }
            }
        }
    }
}