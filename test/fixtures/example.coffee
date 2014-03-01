root = exports ? this
__ = root.__
root.app = root.app || {}

class root.app.Blabla
	constructor:(opts)->

	onNewLocationSubmitted:=>
		bootbox.prompt __(         'Please, inform a comment regarding the event.'    ), (result)=>
		bootbox.prompt __("Please, inform a comment regarding the event."    ), (result)=>

	onAddMediaClicked:()=>
		bootbox.prompt __( 'Please, inform the url of the image or video you want to publish.', exampleObject), (result)=>
