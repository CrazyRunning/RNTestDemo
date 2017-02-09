/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
//var { NativeModules } = require('react-native');
//module.exports = NativeModules.ToastAndroid;

 class SampleAppMovies extends Component {
    
	constructor(props){
	    super(props);
	    this.state = {
	    //	movies: null,
	    dataSource: new ListView.DataSource({
	    	    rowHasChanged: (row1, row2) => row1 !== row2,
	    	  }),
	    	  loaded: false,
	    };
	    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData  = this.fetchData.bind(this);
        var ToastAndroid = require('./component/ToastAndroid');
        ToastAndroid.show('欢迎！！！');
	}
	
	//componentDidMount是React组件的一个生命周期方法，它会在组件刚加载完成的时候调用一次，以后不会再被调用。
	componentDidMount() {
    this.fetchData();
  }
  
  fetchData(){
  	/**
 * 为了避免骚扰，我们用了一个样例数据来替代Rotten Tomatoes的API
 * 请求，这个样例数据放在React Native的Github库中。
 */
    
  	fetch(REQUEST_URL)
  	    .then((response) => response.json())
  	    .then((responseData) => {
  	    	// 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
  	    	    this.setState({ 	    	    	
 // 	    	    	    movies: responseData.movies,
                     dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                     loaded: true,
  	    	    	});
  	    	  })
  	    	  .done();
  	
  }
	
  render() {
  	
  	
    //var MOCKED_MOVIES_DATA  = [{title: 'title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},];
  	//var movie = MOCKED_MOVIES_DATA[0];
  	var styles = StyleSheet.create({
  	                         container: {
  	                         	flex: 1,
  	                         	flexDirection: 'row',
  	                         	justifyContent: 'center',
  	                         	alignItems: 'center',
  	                         	backgroundColor: '#F5FCFF',
  	                         	marginLeft:16
  	                         },
  	                         rightContainer: {
  	                         	flex: 1,
  	                         },
  	                         title: {
  	                         	fontSize: 20,
  	                         	marginBottom: 8,
  	                         	textAlign: 'center',
  	                         },
  	                        year: {
  	                        	textAlign: 'center',
  	                        	},
  	                        thumbnail: {
  	                        	width: 53,
  	                        	height: 81,
  	                        	},
  	                    });
  	if (this.state.dataSource == null){
//  		console.log('hello world');
  		return this.renderLoadingView();
  	}
  	return(
  	    <ListView dataSource = {this.state.dataSource}
  	                  renderRow = {this.renderMovie}
  	                  style = {styles.listView}
  	                  />
  	 );
  	
//  	var movie = this.state.movies[0];
//    return this.renderMovie(movie);
    
//    return (
//      <View style={styles.container}>     
//        <Image source={{uri: movie.posters.thumbnail}}
 //       style = {styles.thumbnail}/>
 //       <View style = {styles.rightContainer}>
 ///         <Text style = {styles.title}>{movie.title}</Text>
   //       <Text style = {styles.year}>{movie.year}</Text>
  //      </View>
 //     </View>
 //   );
  }
  
  renderLoadingView(){
     return (
         <View style = {styles.container}>
             <Text>
                 loading......
             </Text>
         </View>
     );	
}
  
  renderMovie(movie){
    return (
      <View style={styles.container}>         
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
