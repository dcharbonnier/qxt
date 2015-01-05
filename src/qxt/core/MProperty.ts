module qxt.core {

    export class MProperty {
         __propertyObservers:any ={};

        public observeProperty(property:string, listener:Function) {
            var propertyObservers = this.__propertyObservers;
            if (propertyObservers[property]) {
                propertyObservers[property].push(listener);
            } else {

                var descriptor = Object.getOwnPropertyDescriptor(this['__proto__'], property);
                var getter:any = null;
                var setter:any = null;
                if (descriptor === undefined) {
                    if (!this.hasOwnProperty(property)) {
                        throw Error('Can\'t observe ' + property + ': does not exist');
                    }
                } else {
                    getter =descriptor.get;
                    setter =descriptor.set;
                }
                var value = this[property];
                var self = this;

                var listeners = [listener];
                var observerSetter = function (newValue:any) {
                    var oldValue = value;
                    if(getter) {
                        oldValue = getter.call(self);
                    }
                    if(setter) {
                        setter.call(self,newValue);
                    }
                    if(getter) {
                        newValue = getter.call(self);
                    }
                    for (var i = 0, l = listeners.length; i < l; i++) {
                        listeners[i](oldValue, newValue);
                    }
                };
                var observerGetter = function () {
                    if (getter) {
                        return getter.call(self);
                    } else {
                        return value;
                    }
                }
                propertyObservers[property] = listeners;
                Object.defineProperty(this,property, {
                    get: observerGetter,
                    set: observerSetter
                });
            }
        }
    }
}