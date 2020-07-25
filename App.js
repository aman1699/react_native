import React from 'react';
import 'react-native-gesture-handler';
import { Appbar,TextInput,Button,Card,List } from 'react-native-paper';
import { View, Text,StyleSheet,AsyncStorage,ScrollView } from 'react-native';


export default class MyHomeScreen extends React.Component {
  arr = []
  id = 0
  state = {
    text: '',
    item: [
      {
        id: '1',
        data: 'loading'
      }
    ]
  };
 async componentDidMount() {
    this.setState({
      item:JSON.parse(await AsyncStorage.getItem('mylist')) || ''
    })
    this.arr=JSON.parse(await AsyncStorage.getItem('mylist')) || []

 }
  storeData = async () => {
    this.arr.push({ id: this.id, data: this.state.text })
    const a = this.id++;
    console.log(a);
    await AsyncStorage.setItem('mylist', JSON.stringify(this.arr))
    this.setState({
      item:JSON.parse(await AsyncStorage.getItem('mylist'))
    })
  
  }
  render() {
    let renderList
    if (this.state.item.length> 0 ){
     renderList = this.state.item.map(item => {
       return (<Card key={item.id} style={{margin:10}}> 
          <List.Item
           title={item.data}
           right={() => <List.Icon icon="delete" />}
  />    
       </Card>)
      })
    } else {
     renderList=<Text>no items</Text>
    }
    return (
      <View style={styles.container}>
         <Appbar.Header>
        <Appbar.Content title="TODO LIST"  />
        </Appbar.Header>
        <TextInput
          label="Add your Todo"
           value={this.state.text}
          onChangeText={text => this.setState({ text })}
    />
      
        <Button style={{margin:10}}  mode="contained" onPress={this.storeData}>
         ADD TODO
        </Button>
        <ScrollView>
          {renderList}
        </ScrollView>
      </View>
    );
  }
}




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d3d3d3",
    
    
    },
  
  });
