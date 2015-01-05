/// <reference path="./ObjectRegistry" />
/// <reference path="./MEvent.ts" />
/// <reference path="./MProperty.ts" />

module qxt.core {

    export class BaseObject implements MEvent, MProperty {

        private __hashCode:string = null;
        private __disposed:boolean = false;

        constructor() {
            this.__hashCode = ObjectRegistry.register(this);
        }

        destruct() {
            ObjectRegistry.unregister(this);
            delete this.__hashCode;
        }

        dispose():void {
            if (this.__disposed) {
                return;
            }
            this.__disposed = true;
            this.destruct();
        }

        get disposed():boolean {
            return this.__disposed;
        }

        get hashCode():string {
            return this.__hashCode;
        }

        toString():string {
            return '';
        }

        protected _disposeArray(field:string) {

        }

        protected _disposeMap(field:string) {

        }

        protected _disposeObjects(...objects: string[]) {

        }

        protected _disposeSingletonObjects() {

        }

        //MEvent
        public addListener:
            (type:string, listener:Function, self?:Object, capture?:boolean)  => string;
        public removeListener:
            (type:string, listener:Function, self?:Object, capture?:boolean)  => boolean;

        //MProperty
        __propertyObservers:any ={};
        public observeProperty:
            (property:string, listener:Function) => void;
    }
    applyMixins(BaseObject, [MEvent, MProperty]);
}