module test {
    export class MPropertyTestObject extends qxt.core.BaseObject {
        public regular:string = 'Init';
        private __getterAndSetter:string = 'Init';

        get getterAndSetter():string {
            return this.__getterAndSetter+'fromGet';
        }
        set getterAndSetter(value:string) {
            this.__getterAndSetter=value+'fromSet';
        }
    }
}