import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  state = {
    response: '',
    post: '',
    responseToPost: '',
    fullUrl: '',
    shortUrl: '',
  };

  componentDidMount(){
    this.callApi()
      .then(res => this.setState({response: res.express}))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('');
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/shortUrls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: this.state.post})
    })
    const body = await response.text();
    var mydata = JSON.parse(body)
    console.log(mydata.current)
    this.setState({ responseToPost: mydata, fullUrl: mydata.current.full, shortUrl: 'http://localhost:5000/'+mydata.current.short })
  }

  render(){
    return (
      <div className="container">
          <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <div class="navbar-header">
                    <h2 class="navbar-brand">URL SHORTENER</h2>
                </div>
            </div>
          </nav>
          <br></br>
          <div>
          <h5>Enter Original URL:</h5>
          </div>
          <form onSubmit={this.handleSubmit}>
              <input 
                required 
                placeholder="Url" 
                type="url" 
                onChange={e => this.setState({ post: e.target.value })}
                name="fullUrl" 
                id="fullUrl" 
                className="form-control col mr-2" />
              <button className="btn btn-success" type="submit">Shorten</button>
          </form>
          <p>Shortened URL is: <a href={this.state.shortUrl}>{this.state.shortUrl}</a></p>
      </div>
    );
  }
  
}

export default App;
