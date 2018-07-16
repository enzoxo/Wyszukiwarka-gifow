App = React.createClass({
	render: function () {
		
		var styles ={
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style = {styles}>
				<h1>Wyszukiwarka gifów</h1>
				<p>Znajdz gifa na <a href="http://giphy.com"> giphy</a>. Naciśnij enter, aby pobrać kolejne gify</p>
				<Search />
			 <Gif 
			 	loading={this.state.loading}
			 	url={this.state.gif.url}
			 	sourceUrl={this.state.gif.sourceUrl}
			 />
			 </div>
			);
	}
});

getInitialState() {
	return {
		loading: false,
		searchingText: '',
		gif: {}
	};
},

<Search onSearch={this.handleSearch}/>

handleSearch: function(searchingText) {
	this.setState({
		loading: true
	});

	this.getGif(searchingText, function(gif) {
		this.setState({
			loading:false,
			gif: gif,
			searchingText: searchingText
		});
	}.bind(this));
},


getGif: function(searchingText, callback) {
	var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
	var xhr = new XMLHttpRequest();
	xhr.opet('GET', url);
	xhr.onload = function() {
		if (xhr.status === 200) {
			var data = JSON.parse(xhr.responseText).data;
				var gif ={
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif);
		};
		xhr.send();
	},
	
}