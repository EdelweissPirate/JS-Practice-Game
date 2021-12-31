(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.digitalNumberSegment = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Am3QfMAAAghIIGqnTIgCAAIADgDIHEH7IAAf9InHIHg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.digitalNumberSegment, new cjs.Rectangle(-44,-153.6,88,307.2), null);


(lib.digital_readout_bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9E9E9").s().p("AhwB6QgKABABgKIAAjgQgBgLAKABIDgAAQALgBgBALIAADgQABAKgLgBg");
	this.shape.setTransform(-3.8503,-0.0449,1.6218,0.9492);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.digital_readout_bg, new cjs.Rectangle(-23.7,-11.6,39.7,23.2), null);


(lib.page_padding = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0.008)").ss(1,1,1).p("Egq9gZYMBV7AAAMAAAAyxMhV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.page_padding, new cjs.Rectangle(-276,-163.5,552,327), null);


(lib.messageLabel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// label
	this.tBox = new cjs.Text("test", "35px 'Tahoma'", "#CCCCA3");
	this.tBox.name = "tBox";
	this.tBox.textAlign = "center";
	this.tBox.lineHeight = 44;
	this.tBox.lineWidth = 457;
	this.tBox.parent = this;
	this.tBox.setTransform(230.25,2);

	this.timeline.addTween(cjs.Tween.get(this.tBox).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.messageLabel, new cjs.Rectangle(0,0,460.5,110.1), null);


(lib.holder_empty = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.bg_question = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#000066","#00003F"],[0,1],-248.2,-141.3,-103.8,-68.4).ss(4,1,1).p("EgnDgUTMBOHAAAQAyAAAAAyMAAAAnDQAAAygyAAMhOHAAAQgyAAAAgyMAAAgnDQAAgyAyAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#00004C","#00003F"],[0.102,1],-231.5,-161.5,-118.4,-48.4).s().p("EgnDAUUQgyAAAAgyMAAAgnDQAAgyAyAAMBOHAAAQAyAAAAAyMAAAAnDQAAAygyAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg_question, new cjs.Rectangle(-257,-132,514,264), null);


(lib.answerLabel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// label
	this.label = new cjs.Text("", "12px 'Tahoma'", "#CCCCA3");
	this.label.name = "label";
	this.label.lineHeight = 17;
	this.label.lineWidth = 457;
	this.label.parent = this;
	this.label.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.answerLabel, new cjs.Rectangle(0,0,460.5,18.5), null);


(lib.decimal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AgGAHIAAgNIANAAIAAANg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.decimal, new cjs.Rectangle(-0.7,-0.7,1.5,1.5), null);


(lib.button_bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#000066","#00003F"],[0,1],-73.2,-36.3,71.2,36.6).ss(4,1,1).p("Artj5IXbAAQAyAAAAAyIAAGPQAAAygyAAI3bAAQgyAAAAgyIAAmPQAAgyAyAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#00004C","#00003F"],[0.102,1],-56.5,-56.5,56.6,56.6).s().p("ArtD6QgyAAAAgyIAAmPQAAgyAyAAIXbAAQAyAAAAAyIAAGPQAAAygyAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.button_bg, new cjs.Rectangle(-82,-27,164,54), null);


(lib.home_icon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00004C").s().p("AgWD+IAAiBIhdAAIAACBIhUAAIAAkNIAqgwIAAiCIA3AAIAABDIBuh/IDADuIAAENg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,153,255,0.8)").s().p("AgWD+IAAiBIhdAAIAACBIhUAAIAAkNIAqgwIAAiCIA3AAIAABDIBuh/IDADuIAAENg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,76,0.498)").s().p("AgWD+IAAiBIhdAAIAACBIhUAAIAAkNIAqgwIAAiCIA3AAIAABDIBuh/IDADuIAAENg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-25.4,39.9,50.8);


(lib.benner_bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000033").s().p("Egq9AF3IAArtMBV7AAAIAALtg");
	this.shape.setTransform(-0.0009,0,1.0001,1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.benner_bg, new cjs.Rectangle(-275,-37.5,550,75), null);


(lib.digNumComplete = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// seg1
	this.seg1 = new lib.digitalNumberSegment();
	this.seg1.name = "seg1";
	this.seg1.setTransform(-43.9,-43.7,0.2768,0.2768,0,0,0,0,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.seg1).wait(1));

	// seg2
	this.seg2 = new lib.digitalNumberSegment();
	this.seg2.name = "seg2";
	this.seg2.setTransform(-0.25,-86.55,0.2768,0.2768,-90,0,0,0,0.2);

	this.timeline.addTween(cjs.Tween.get(this.seg2).wait(1));

	// seg3
	this.seg3 = new lib.digitalNumberSegment();
	this.seg3.name = "seg3";
	this.seg3.setTransform(44,-43.7,0.2768,0.2768,180,0,0,-0.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.seg3).wait(1));

	// seg4
	this.seg4 = new lib.digitalNumberSegment();
	this.seg4.name = "seg4";
	this.seg4.setTransform(0.35,-0.1,0.2768,0.2768,90,0,0,0.2,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.seg4).wait(1));

	// seg5
	this.seg5 = new lib.digitalNumberSegment();
	this.seg5.name = "seg5";
	this.seg5.setTransform(-43.2,42.5,0.2768,0.2768);

	this.timeline.addTween(cjs.Tween.get(this.seg5).wait(1));

	// seg6
	this.seg6 = new lib.digitalNumberSegment();
	this.seg6.name = "seg6";
	this.seg6.setTransform(0.35,86.65,0.2768,0.2768,90,0,0,0.2,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.seg6).wait(1));

	// seg7
	this.seg7 = new lib.digitalNumberSegment();
	this.seg7.name = "seg7";
	this.seg7.setTransform(43.3,42.5,0.2768,0.2768,180,0,0,-0.2,0);

	this.timeline.addTween(cjs.Tween.get(this.seg7).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.digNumComplete, new cjs.Rectangle(-56.1,-98.7,112.30000000000001,197.5), null);


(lib.button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// label
	this.label = new cjs.Text("button", "bold 25px 'Tahoma'", "#CCCCA3");
	this.label.name = "label";
	this.label.textAlign = "center";
	this.label.lineHeight = 32;
	this.label.lineWidth = 112;
	this.label.parent = this;
	this.label.setTransform(1.95,-10.8);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(1).to({y:-12.2,color:"#FF99FF"},0).wait(1).to({_off:true},1).wait(1));

	// bg
	this.instance = new lib.button_bg();
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",3,3,4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#80DED0").s().p("ArtD6QgyAAAAgyIAAmPQAAgyAyAAIXbAAQAyAAAAAyIAAGPQAAAygyAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85,-30,178,68);


(lib.banner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// home_icon
	this.home_icon = new lib.home_icon();
	this.home_icon.name = "home_icon";
	this.home_icon.setTransform(-221.7,1.65);
	new cjs.ButtonHelper(this.home_icon, 0, 1, 2, false, new lib.home_icon(), 3);

	this.timeline.addTween(cjs.Tween.get(this.home_icon).wait(1));

	// title
	this.title = new cjs.Text("TITLE", "bold 50px 'Tahoma'", "#00004C");
	this.title.name = "title";
	this.title.textAlign = "center";
	this.title.lineHeight = 62;
	this.title.lineWidth = 546;
	this.title.parent = this;
	this.title.setTransform(0.05,-24.25);

	this.timeline.addTween(cjs.Tween.get(this.title).wait(1));

	// bg
	this.instance = new lib.benner_bg();
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.banner, new cjs.Rectangle(-278,-40.5,564,88), null);


(lib.answer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// tBox
	this.tBox = new cjs.Text("answer placeholder", "12px 'Tahoma'", "#CCCCA3");
	this.tBox.name = "tBox";
	this.tBox.lineHeight = 17;
	this.tBox.lineWidth = 113;
	this.tBox.parent = this;
	this.tBox.setTransform(-57.7,-3.75);

	this.timeline.addTween(cjs.Tween.get(this.tBox).wait(1));

	// selector
	this.selector = new lib.button();
	this.selector.name = "selector";
	this.selector.setTransform(-112.05,0,0.56,0.56,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.selector, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.selector).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.answer, new cjs.Rectangle(-161,-18.1,218.7,44), null);


(lib.timer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// dots
	this.decimal = new lib.decimal();
	this.decimal.name = "decimal";
	this.decimal.setTransform(-20.2,-2.2,0.9797,0.9797);

	this.decimal_1 = new lib.decimal();
	this.decimal_1.name = "decimal_1";
	this.decimal_1.setTransform(-20.2,2.45,0.9797,0.9797);

	this.decimal_2 = new lib.decimal();
	this.decimal_2.name = "decimal_2";
	this.decimal_2.setTransform(-3.35,-2.2,0.9797,0.9797);

	this.decimal_3 = new lib.decimal();
	this.decimal_3.name = "decimal_3";
	this.decimal_3.setTransform(-3.35,2.45,0.9797,0.9797);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.decimal_3},{t:this.decimal_2},{t:this.decimal_1},{t:this.decimal}]}).wait(1));

	// min_1
	this.min_1 = new lib.digNumComplete();
	this.min_1.name = "min_1";
	this.min_1.setTransform(-32.6,0.15,0.0622,0.0622,0,0,0,-0.8,1.6);

	this.timeline.addTween(cjs.Tween.get(this.min_1).wait(1));

	// min_2
	this.min_2 = new lib.digNumComplete();
	this.min_2.name = "min_2";
	this.min_2.setTransform(-24.8,0.15,0.0622,0.0622,0,0,0,-0.8,1.6);

	this.timeline.addTween(cjs.Tween.get(this.min_2).wait(1));

	// sec_1
	this.sec_1 = new lib.digNumComplete();
	this.sec_1.name = "sec_1";
	this.sec_1.setTransform(-15.75,0.15,0.0622,0.0622,0,0,0,-0.8,1.6);

	this.timeline.addTween(cjs.Tween.get(this.sec_1).wait(1));

	// sec_2
	this.sec_2 = new lib.digNumComplete();
	this.sec_2.name = "sec_2";
	this.sec_2.setTransform(-7.95,0.15,0.0622,0.0622,0,0,0,-0.8,1.6);

	this.timeline.addTween(cjs.Tween.get(this.sec_2).wait(1));

	// msec_1
	this.msec_1 = new lib.digNumComplete();
	this.msec_1.name = "msec_1";
	this.msec_1.setTransform(1.15,0.2,0.0622,0.0622,0,0,0,0.8,1.6);

	this.timeline.addTween(cjs.Tween.get(this.msec_1).wait(1));

	// msec_2
	this.msec_2 = new lib.digNumComplete();
	this.msec_2.name = "msec_2";
	this.msec_2.setTransform(8.9,0.2,0.0622,0.0622,0,0,0,0.8,1.6);

	this.timeline.addTween(cjs.Tween.get(this.msec_2).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(51,51,51,0.298)","rgba(51,51,51,0)"],[0,0.369],-9.2,-5.7,-7.1,-5.7).s().p("AhWBcQgFAAAAgFIAAitQAAgFAFAAICtAAQAFAAAAAFIAACtQAAAFgFAAg");
	this.shape.setTransform(-20.0163,-0.0361,1.9291,1.0114);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["rgba(51,51,51,0.298)","rgba(51,51,51,0)"],[0,0.369],-0.6,-9.4,-0.6,-5.4).s().p("AhWBcQgFAAAAgFIAAitQAAgFAFAAICtAAQAFAAAAAFIAACtQAAAFgFAAg");
	this.shape_1.setTransform(-20.0163,-0.0361,1.9291,1.0114);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C2C5CA").s().p("AhWBcQgFAAAAgFIAAitQAAgFAFAAICtAAQAFAAAAAFIAACtQAAAFgFAAg");
	this.shape_2.setTransform(-20.0163,-0.0361,1.9291,1.0114);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// screen_bg_shade_left
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["rgba(51,51,51,0.298)","rgba(51,51,51,0)"],[0,0.369],-9.2,-5.7,-7.1,-5.7).s().p("AhWBcQgFAAAAgFIAAitQAAgFAFAAICtAAQAFAAAAAFIAACtQAAAFgFAAg");
	this.shape_3.setTransform(-3.7163,-0.0361,1.9291,1.0114);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// screen_bg_shade_top
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["rgba(51,51,51,0.298)","rgba(51,51,51,0)"],[0,0.369],-0.6,-9.4,-0.6,-5.4).s().p("AhWBcQgFAAAAgFIAAitQAAgFAFAAICtAAQAFAAAAAFIAACtQAAAFgFAAg");
	this.shape_4.setTransform(-3.7163,-0.0361,1.9291,1.0114);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// screen_bg
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C2C5CA").s().p("AhWBcQgFAAAAgFIAAitQAAgFAFAAICtAAQAFAAAAAFIAACtQAAAFgFAAg");
	this.shape_5.setTransform(-3.7163,-0.0361,1.9291,1.0114);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// shade_rim_screen
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["rgba(51,51,51,0.498)","rgba(51,51,51,0)"],[0,1],0.4,-12,1,-6.9).s().p("AhwB6QgKABABgKIAAjgQgBgLAKABIDgAAQALgBgBALIAADgQABAKgLgBg");
	this.shape_6.setTransform(-11.9336,-0.2783,2.1501,0.7827);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// rim_screen_copy_copy
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["rgba(51,51,51,0.098)","rgba(51,51,51,0)"],[0,1],-12.2,0,12.3,0).s().p("AhwB6QgKABABgKIAAjgQgBgLAKABIDgAAQALgBgBALIAADgQABAKgLgBg");
	this.shape_7.setTransform(-11.9443,-0.0802,2.1462,0.8019);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer_4
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E0E0E0").s().p("AhwB6QgKABABgKIAAjgQgBgLAKABIDgAAQALgBgBALIAADgQABAKgLgBg");
	this.shape_8.setTransform(-19.9728,-0.0802,1.4965,0.8019);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// rim_screen_copy
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E0E0E0").s().p("AhwB6QgKABABgKIAAjgQgBgLAKABIDgAAQALgBgBALIAADgQABAKgLgBg");
	this.shape_9.setTransform(-3.7728,-0.0802,1.4965,0.8019);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1));

	// bg_extender
	this.instance = new lib.digital_readout_bg();
	this.instance.setTransform(-15.65,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bg
	this.instance_1 = new lib.digital_readout_bg();
	this.instance_1.setTransform(-0.05,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.timer, new cjs.Rectangle(-39.3,-11.6,55.3,23.2), null);


(lib.page_question = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// question
	this.question = new cjs.Text("placeholder text", "12px 'Tahoma'", "#CCCCA3");
	this.question.name = "question";
	this.question.lineHeight = 17;
	this.question.lineWidth = 484;
	this.question.parent = this;
	this.question.setTransform(35,50);

	this.timeline.addTween(cjs.Tween.get(this.question).wait(1));

	// answers
	this.answer_D = new lib.answer();
	this.answer_D.name = "answer_D";
	this.answer_D.setTransform(457.25,246.8,1,1,0,0,0,-0.6,0);

	this.answer_C = new lib.answer();
	this.answer_C.name = "answer_C";
	this.answer_C.setTransform(457.25,196.8,1,1,0,0,0,-0.6,0);

	this.answer_B = new lib.answer();
	this.answer_B.name = "answer_B";
	this.answer_B.setTransform(194.75,246.8,1,1,0,0,0,-0.6,0);

	this.answer_A = new lib.answer();
	this.answer_A.name = "answer_A";
	this.answer_A.setTransform(194.75,196.8,1,1,0,0,0,-0.6,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.answer_A},{t:this.answer_B},{t:this.answer_C},{t:this.answer_D}]}).wait(1));

	// bg
	this.bg = new lib.bg_question();
	this.bg.name = "bg";
	this.bg.setTransform(271.9,158.95,1,1,0,0,0,-3.1,-5.1);

	this.timeline.addTween(cjs.Tween.get(this.bg).wait(1));

	// padding
	this.instance = new lib.page_padding();
	this.instance.setTransform(275,162.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.page_question, new cjs.Rectangle(-0.5,-0.5,551,326), null);


(lib.page_mode = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// button_normal
	this.button_normal = new lib.button();
	this.button_normal.name = "button_normal";
	this.button_normal.setTransform(100,140);
	new cjs.ButtonHelper(this.button_normal, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_normal).wait(1));

	// button_timed
	this.button_timed = new lib.button();
	this.button_timed.name = "button_timed";
	this.button_timed.setTransform(275,140);
	new cjs.ButtonHelper(this.button_timed, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_timed).wait(1));

	// button_survival
	this.button_survival = new lib.button();
	this.button_survival.name = "button_survival";
	this.button_survival.setTransform(450,140);
	new cjs.ButtonHelper(this.button_survival, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_survival).wait(1));

	// padding
	this.instance = new lib.page_padding();
	this.instance.setTransform(275,162.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.page_mode, new cjs.Rectangle(-0.5,-0.5,551,326), null);


(lib.page_messageBoard = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// label
	this.label = new lib.messageLabel();
	this.label.name = "label";
	this.label.setTransform(275.2,62.1,1,1,0,0,0,230.2,17.1);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(1));

	// button_one
	this.button_one = new lib.button();
	this.button_one.name = "button_one";
	this.button_one.setTransform(150,190);
	new cjs.ButtonHelper(this.button_one, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_one).wait(1));

	// button_two
	this.button_two = new lib.button();
	this.button_two.name = "button_two";
	this.button_two.setTransform(400,190);
	new cjs.ButtonHelper(this.button_two, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_two).wait(1));

	// bg
	this.instance = new lib.bg_question();
	this.instance.setTransform(271.9,157.4,1,1,0,0,0,-3.1,-5.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// padding
	this.instance_1 = new lib.page_padding();
	this.instance_1.setTransform(275,162.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.page_messageBoard, new cjs.Rectangle(-0.5,-0.5,551,326), null);


(lib.page_home = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// button_start
	this.button_start = new lib.button();
	this.button_start.name = "button_start";
	this.button_start.setTransform(275,70);
	new cjs.ButtonHelper(this.button_start, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_start).wait(1));

	// button_highScores
	this.button_highScores = new lib.button();
	this.button_highScores.name = "button_highScores";
	this.button_highScores.setTransform(275,140);
	new cjs.ButtonHelper(this.button_highScores, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_highScores).wait(1));

	// button_resetScores
	this.button_resetScores = new lib.button();
	this.button_resetScores.name = "button_resetScores";
	this.button_resetScores.setTransform(275,210);
	new cjs.ButtonHelper(this.button_resetScores, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_resetScores).wait(1));

	// padding
	this.instance = new lib.page_padding();
	this.instance.setTransform(275,162.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.page_home, new cjs.Rectangle(-0.5,-0.5,551,326), null);


(lib.page_difficulty = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// button_easy
	this.button_easy = new lib.button();
	this.button_easy.name = "button_easy";
	this.button_easy.setTransform(100,140);
	new cjs.ButtonHelper(this.button_easy, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_easy).wait(1));

	// button_medium
	this.button_medium = new lib.button();
	this.button_medium.name = "button_medium";
	this.button_medium.setTransform(275,140);
	new cjs.ButtonHelper(this.button_medium, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_medium).wait(1));

	// button_hard
	this.button_hard = new lib.button();
	this.button_hard.name = "button_hard";
	this.button_hard.setTransform(450,140);
	new cjs.ButtonHelper(this.button_hard, 0, 1, 2, false, new lib.button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_hard).wait(1));

	// padding
	this.instance = new lib.page_padding();
	this.instance.setTransform(275,162.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.page_difficulty, new cjs.Rectangle(-0.5,-0.5,551,326), null);


// stage content:
(lib.JSTutorialGame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// banner
	this.banner = new lib.banner();
	this.banner.name = "banner";
	this.banner.setTransform(275,37.5);

	this.timeline.addTween(cjs.Tween.get(this.banner).wait(1));

	// holder_page
	this.holder_page = new lib.holder_empty();
	this.holder_page.name = "holder_page";
	this.holder_page.setTransform(0,75);

	this.timeline.addTween(cjs.Tween.get(this.holder_page).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(272,197,289,-111);
// library properties:
lib.properties = {
	id: '067E1DD164CBAA46AB6494A53019023D',
	width: 550,
	height: 400,
	fps: 24,
	color: "#000072",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['067E1DD164CBAA46AB6494A53019023D'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;