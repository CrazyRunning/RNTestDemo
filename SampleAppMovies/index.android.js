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
	    // ��ES6�У�������Զ���ĺ�����ʹ����this�ؼ��֣�����Ҫ������С��󶨡�����������this��ָ�򲻶�
        // ���������д���һ������constructor��ʹ��bind������һ������������һЩ������������ʹ�ü�ͷ�����ȣ�
        this.fetchData  = this.fetchData.bind(this);
        var ToastAndroid = require('./component/ToastAndroid');
        ToastAndroid.show('��ӭ������');
	}
	
	//componentDidMount��React�����һ���������ڷ���������������ռ�����ɵ�ʱ�����һ�Σ��Ժ󲻻��ٱ����á�
	componentDidMount() {
    this.fetchData();
  }
  
  fetchData(){
  	/**
 * Ϊ�˱���ɧ�ţ���������һ���������������Rotten Tomatoes��API
 * ��������������ݷ���React Native��Github���С�
 */
    
  	fetch(REQUEST_URL)
  	    .then((response) => response.json())
  	    .then((responseData) => {
  	    	// ע�⣬����ʹ����this�ؼ��֣�Ϊ�˱�֤this�ڵ���ʱ��Ȼָ��ǰ�����������Ҫ������С��󶨡�����
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
