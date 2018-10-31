import { Animation } from '@common/js/Animation.js'
import { Gesture, GestureEvent } from 'ad-events'
import { Styles, Markup, Align } from 'ad-view'
import { ImageManager } from 'ad-control'
import { MonetUtils } from 'ad-utils'


export class Control {
	static preMarkup() {
		console.log('Control.preMarkup()')
View.netflixFonts = document.createElement('netflix-fonts')
Markup.get('main').appendChild(View.netflixFonts)


	}

	static postMarkup() {
		console.log('Control.postMarkup()')
		// listen for default exit
		Gesture.add(View.main, GestureEvent.CLICK, Control.handleClick)


		View.endFrame.hide()
		
Gesture.add(View.endFrame, GestureEvent.OVER, function() {
	View.endFrame.cta.mouseover()
})
Gesture.add(View.endFrame, GestureEvent.OUT, function() {
	View.endFrame.cta.mouseout()
})

View.ribbon.addEventListener('coverComplete', function(event) {
	event.stopImmediatePropagation() // this event was coming through twice
	Animation.playIntro()
})


	}


	static handleClick(event) {	

		Network.exit( 
			overridePlatformExit, 
			MonetUtils.getDataByKey('Exit_URL')
		); 
	}




	static handleMonetLoadComplete(element) {
		console.log('Control.handleMonetLoadComplete()')
		MonetUtils.setData(element)
			.then(data => {
				console.log('	-> All Netflix web components ready')
				// monet data is now assigned to MonetUtils
adData.hasFTM = MonetUtils.getDataByKey('FTM').length > 0 ? true : false
adData.hasTuneIn = MonetUtils.getDataByKey('Tune_In').length > 0 ? true : false

// Ratings Bug
adData.hasRatings = MonetUtils.getDataByKey('Ratings_Bug_20x20').length > 0 ? true : false
if (adData.hasRatings) adData.ratingsSrc = ImageManager.addToLoad(MonetUtils.getDataByKey('Ratings_Bug_20x20'), { forCanvas: false })

// proceed with ad AFTER the setData() Promise has been fulfilled
ImageManager.load(function() {
	View.intro.postMarkupStyling()
	View.endFrame.postMarkupStyling()
	Control.postMarkup()
	Animation.start()
})


			})
			.catch(err => {
				console.log(err)
				global.failAd()
			})
	}
	
	static handleIntroVideoComplete(event) {
		Animation.showEndFrame()

	}

	static handleIntroClick(event) {
		View.intro.hide()
		Animation.showEndFrame()
		Control.handleClick()
	}
	

}