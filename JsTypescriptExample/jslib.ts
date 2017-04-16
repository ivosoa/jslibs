module JsLibModule {
    
    export class DataFunctions {
        private _dataVariables: any;
        private returnObject: any;

        constructor() {
            this._dataVariables = {};
        }

        public set(name: string, value: any): void {
            this._dataVariables[name] = value;
            var functionName = "get" + name.charAt(0).toUpperCase() + name.slice(1);

            this[functionName] = function () {
                return this._dataVariables[name];
            }
        }

        public setData(props: any): void {
            if (typeof props != "undefined" && typeof props == "object") {
                for (var key in props) {
                    this.set(key, props[key]);
                }
            }
        }

        public get(name: string): any {
            return this._dataVariables[name];
        }

        public append(name: string, column: number, value: any): any {
            if (typeof this._dataVariables[name] == "undefined") {
                this._dataVariables[name] = {};
            }
            this._dataVariables[name][column] = value;
        }

        public debug(): any {
            var result = {};
            for (var key in this._dataVariables) {
                result[key] = this.get(key);
            }
            return result;
        }
    }
}

var jslib$ = new JsLibModule.DataFunctions();
