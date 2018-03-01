let App_start = React.createClass({
  
    getInitialState() {
      return {
        data: [],
        originalData: []
      }
    },
    
    componentWillMount() {
      let oReq = new XMLHttpRequest();
      oReq.open('get', 'https://dev.userlite.com/apps/userlitestoreapps/devprojects/v999/sample.htp?v=2');
      oReq.onload = () => {
        const data = JSON.parse(oReq.response)
        // console.log('data', data);
        this.setState({
          data: data.entries,
          originalData: data.entries
        })
      }
      oReq.send();
    },
    
    filterInput(e) {
      console.log(e.target.value);
      
      let filterArray = this.state.originalData.filter( (i) => {
        return i.API.toLowerCase().includes(e.target.value.toLowerCase())
      })
      
      this.setState({
        data: filterArray
      })
    },
    
    render() {
      // console.log('state', this.state);
      return (
        React.createElement('div', {}, 
          React.createElement( input, {filterInput: this.filterInput}),
            React.createElement( 'div', {}, 
              !this.state.data.length 
              ? 
              React.createElement(loading) 
              : 
              React.createElement(dataList, {data: this.state.data}) 
            )
         )
      )
    }
    
  })
  
  
    let loading = React.createClass({
      render: function() {
        return React.createElement('div', {}, 'Loading...');
      }
    })
    
    let input = React.createClass({
      render: function() {
        return React.createElement('input', {onChange: this.props.filterInput})
      }
    })
    
    let dataList = React.createClass({
      render: function() {
        return React.createElement('div', {}, this.props.data.map( (e, i) => {
          return React.createElement('div', {key: i}, e.API)
        }))
      }
    })
    
    ReactDOM.render(
      React.createElement(App_start),
      document.getElementById('root')
    );
  
  