import React, {useState} from 'react'

import { StyleSheet, KeyboardAvoidingView,Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import Task from './components/Task';

export default function App() {
 
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.title}>What's you goal Today?</Text>

       
            
                  <View style={styles.task}><Task  /></View>
             
            
           
           
       
      </View>


      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141413',
    position:'relative'
    
    
  },
  tasksWrapper:{
    paddingTop: 100,
    paddingHorizontal: 20
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    color: '#FFF'
  }, 
  task:{
    flex:1
  }
  
 

});
