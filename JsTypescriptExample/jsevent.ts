module EmitterListener{
    export class EmitterListener{
        private listener: any;
        private listenerOnce: any;

        constructor() {
            this.listener = {};
            this.listenerOnce = {};
        }

        public emit(name:string, params?:any):void{
            if (typeof this.listener[name] != "undefined") {
                for (var i = 0; i < this.listener[name].length; i++) { 
					this.listener[name][i](params);
				}
            }
            if (typeof this.listenerOnce[name] != "undefined") {
                for (var i = 0; i < this.listenerOnce[name].length; i++) { 
					this.listenerOnce[name][i](params);
                }
                
                this.listenerOnce[name] = [];
            }
        }
        
        public listen(name:string, listenerFunction:() => void):void{
            if (typeof this.listener[name] == "undefined") {
                this.listener[name] = [];
            }
            this.listener[name].push(listenerFunction);
        }

        public listenOnce(name:string, listenerFunction:() => void):void{
            if (typeof this.listenerOnce[name] == "undefined") {
                this.listenerOnce[name] = [];
            }
            this.listenerOnce[name].push(listenerFunction);
        }
    }
}

var emitterListener = new EmitterListener.EmitterListener();