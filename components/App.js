App = React.createClass({
	getInitialState() {
	return {
		loading: false,
		searchingText: '',
		gif: {}
	};
},
getGif: function(searchingText, callback) {
	const url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'HoJIjlMtXlhBI0dxLP6PLkRV1h0oPvB9' + '&tag=' + searchingText;
	function httpGet(url) {
		return new Promise(function(resolve, reject){
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText).data;
				resolve(JSON.parse(xhr.responseText).data);
			}else {
				reject(new Error(this.statusText));
			}
		};
		xhr.onerror = function() {
			reject(
				new Error(`XMLHttpRequest Error: ${this.statusText}`)
		);			
	};
		xhr.open('GET', url);
		xhr.send();
		});
	}
	httpGet(url)
	.then((response) => {
		var gif = {
					url: response.fixed_width_downsampled_url,
					sourceUrl: response.url
				};
				callback(gif);
		})
		.catch((error) => console.error("Something went wrong", error));				
	},

	
	
/*
getGif: function(searchingText, callback) {
	var url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'HoJIjlMtXlhBI0dxLP6PLkRV1h0oPvB9' + '&tag=' + searchingText;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.onload = function() {
		if (xhr.status === 200) {
			var data = JSON.parse(xhr.responseText).data;
				var gif ={
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif);
			}
		};
		xhr.send();
	},
	*/
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
	render: function () {
		
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style = {styles}>
				<h1>Wyszukiwarka GIFów</h1>
				<p>Znajdz gifa na <a href="http://giphy.com"> giphy</a>. Naciśnij enter, aby pobrać kolejne gify</p>
				<Search onSearch={this.handleSearch}/>
			 <Gif 
			 	loading={this.state.loading}
			 	url={this.state.gif.url}
			 	sourceUrl={this.state.gif.sourceUrl}
			 	/>
			 </div>
			);
		}
	});