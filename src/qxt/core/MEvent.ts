module qxt.core {

    export class MEvent {
        /*

        public addListener:
         (type:string, listener:Function, self?:Object, capture?:boolean)  => string;
        public removeListener:
         (type:string, listener:Function, self?:Object, capture?:boolean)  => boolean;

        */

        public addListener (type:string, listener:Function, self?:Object, capture?:boolean):string {
            console.log(arguments, 'addListener');
            return 'test';
        }
        /*public addListenerOnce (type:string, listener:Function, self?:Object, capture?:boolean):string {
            console.log(arguments, 'addListenerOnce');
            return 'test';
        }*/
        public removeListener (type:string, listener:Function, self?:Object, capture?:boolean):boolean {
            return true;
        }
        /*
        public removeListenerById (id:string):boolean {
            return true;
        }
        public hasListener(type:string, capture?:boolean):boolean {
            return true;
        }
        public dispatchEvent(evt:any):boolean {
            return true;
        }
        public fireEvent(type:string, clazz?:Object, args?:any[]):boolean {
            return true;
        }*/
    }
}