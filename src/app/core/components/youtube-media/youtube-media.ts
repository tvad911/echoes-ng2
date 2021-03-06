import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { YoutubeMediaResource } from '../../interfaces/youtube.media.resource.d';

// var css = require('less!./youtube-media.less');
/* @ngInject */
@Component({
	selector: 'youtube-media',
	template: require('./youtube-media.html'),
	styles: [ `
		@media (min-width: 768px) {
			.youtube-item {
			    width: 25%;
			}
		}
	` ],
	directives: [ NgClass ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeMedia {
	@Input() media: any;
	@Output() play = new EventEmitter();
	@Output() queue = new EventEmitter();
	@Output() add = new EventEmitter();

	showDesc = false;
	isPlaying = false;

	constructor () {

	}

	ngOnInit(){
		if (this.media.statistics) {
			this.media.statistics.likeCount = parseInt(this.media.statistics.likeCount);
			this.media.statistics.viewCount = parseInt(this.media.statistics.viewCount);
		}
	}

    playVideo (media: YoutubeMediaResource) {
    	this.play.next(media);
	}

	queueVideo(media: YoutubeMediaResource) {
		this.queue.next(media);
	}

	addVideo (media: YoutubeMediaResource) {
		this.add.next(media);
	}

	toggle (showDesc: Boolean) {
		this.showDesc = !showDesc;
	}
}
