export default function(){
	this.transition(
	    this.hasClass('requestInvite'),

	    // this makes our rule apply when the liquid-if transitions to the
	    // true state.
	    this.toModel(true),
	    this.use('crossFade', {duration: 1000}),

	    // which means we can also apply a reverse rule for transitions to
	    // the false state.
	    this.reverse('crossFade', {duration: 1000})
	);

	this.transition(
		this.hasClass('chat'),

		// this makes our rule apply when the liquid-if transitions to the
		// true state.
		this.toModel(true),
		this.use('toLeft', {duration: 1000}),

		// which means we can also apply a reverse rule for transitions to
		// the false state.
		this.reverse('toRight', {duration: 1000})
	);

}