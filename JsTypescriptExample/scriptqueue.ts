module ScriptQueueModule {
	class QueueObject{
		public queue: any[];
		public queueb4Ready: any[];
		public queueAfterLoad: any[];

		constructor(){
			this.queue = [];
			this.queueb4Ready = [];
			this.queueAfterLoad = [];
		}
	}

	export class ScriptQueue{
		private _queueObj: QueueObject;

		constructor(){
			this._queueObj = new QueueObject();
		}

		public processQ():void{
			if(typeof this._queueObj.queue != "undefined"){
				for (var i = 0; i < this._queueObj.queue.length; i++) { 
					this._queueObj.queue[i]();
				}
			}
		}

		public processQb4Ready():void{
			if(typeof this._queueObj.queue != "undefined"){
				for (var i = 0; i < this._queueObj.queue.length; i++) { 
					this._queueObj.queue[i]();
				}
			}
		}

		public processQAfterLoad():void{
			if(typeof this._queueObj.queueAfterLoad != "undefined"){
				for (var i = 0; i < this._queueObj.queueAfterLoad.length; i++) { 
					this._queueObj.queueAfterLoad[i]();
				}
			}
		}

		public addToQ(val:any, b4ready:boolean):void{
			if(typeof b4ready != "undefined" && b4ready == true){
				if(typeof this._queueObj.queueb4Ready == "undefined" || this._queueObj.queueb4Ready == null){
					this._queueObj.queueb4Ready = [];
				}
				
				this._queueObj.queueb4Ready.push(val);
			}
			else{
				if(typeof this._queueObj.queue == "undefined" || this._queueObj.queue == null){
					this._queueObj.queue = [];
				}
				
				this._queueObj.queue.push(val);
			}
		}

		public addToQAfterLoad(val):void{
			if(typeof this._queueObj.queueAfterLoad == "undefined" || this._queueObj.queueAfterLoad == null){
				this._queueObj.queueAfterLoad = [];
			}
			
			this._queueObj.queueAfterLoad.push(val);
		}
	}
}

var sq = new ScriptQueueModule.ScriptQueue();
