/// <reference path="./BaseObject" />

module qxt.core {
    interface RegistryMap {
        [email: string]: Object;
    }

    export interface IObjectRegistry {
        register(object:BaseObject):string
        unregister(object:BaseObject):void
    }

    class ObjectRegistryClass implements IObjectRegistry {

        private __registry:RegistryMap[] = [];
        private __nextHash:number = 0;
        private __freeHashes:string[] = [];
        private __postId:string = "-0";

        register(object:BaseObject):string {
            var registry = this.__registry;
            var hash = object.hashCode;
            if (hash === null) {
                var freeHashes = this.__freeHashes;
                if (freeHashes.length > 0) {
                    hash = freeHashes.pop();
                } else {
                    hash = (this.__nextHash++) + this.__postId;
                }
            }
            registry[hash] = object;
            return hash;
        }

        unregister(object:BaseObject):void {
            var registry = this.__registry;
            var hash = object.hashCode;
            if (registry && registry[hash]) {
                delete registry[hash];
                this.__freeHashes.push(hash);
            }
        }
    }
    export var ObjectRegistry:IObjectRegistry = new ObjectRegistryClass();
}