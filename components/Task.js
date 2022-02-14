import React, { useState, useEffect } from 'react'
import { StyleSheet, KeyboardAvoidingView,Text, View, TextInput, TouchableOpacity, Keyboard,Alert,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {API} from '../config/api'
import axios from 'axios'
import db from '../firebase';
import {
  getDatabase,
  ref,
  remove,
  push,
  onValue,
  update,
} from 'firebase/database';
const app = getDatabase(db)
function Task() {
  const [task, setTask] = useState('') 
    const [taskItems, setTaskItems] = useState({})

    
 
  useEffect(() => {
    const data = ref(app, 'todoList');
    onValue(data, (snapshot) => {
      setTaskItems(snapshot.val());
    });
    return () => {
      console.log('a');
    };
  }, []);
    
    const handleChange = () =>{
        
      Keyboard.dismiss()
      if(task==''){
          Alert.alert('Please field the form input')
      }else{
        
       console.log(taskItems)
       push(ref(app, '/todoList'), {
        task: task,
        isDone: false,
      }).then(() => {
        setTask('');
      });
      }
      
   
     setTask('')
     
    }
    
    const completeTask = (todoId,val )=> {
      update(ref(app, 'todoList/' + todoId), {
        ...val,
        isDone: true,
      });
        
      };
       const deleteTask = todoId => {
        remove(ref(app, 'todoList/' + todoId));
  };
const _listItem =({item,index}) =>{
  return(
  
           <View style={styles.tasks}>
                <View style={styles.itemLeft}> 
                {!item[1].isDone &&(     <View style={styles.square}>
                                  <TouchableOpacity style={{backgroundColor:'green', height:24, width:24,borderRadius:5}} onPress={() => completeTask(item[0],item[1])}>
                                      <Icon style={{color:'#FFFF'}} name="done" size={25} />
                                      </TouchableOpacity> 
                          </View> )}
                          <Text style={styles.text}>
                                  {item[1].task}
                                  
                          </Text>
                     </View>
                     <TouchableOpacity></TouchableOpacity>
                      <View style={styles.circular}>
                         <TouchableOpacity  onPress={()=>{deleteTask(item[0])}}><Text style={{color:'white'}}>Delete</Text></TouchableOpacity>
                      </View>
                    </View>
                    
       
  )
}
  return (
     <View style={styles.Container}>  
   
   <View style={styles.allTask}>  
        {(taskItems && <FlatList 
         data={Object.entries(taskItems)}
         renderItem={_listItem}
         keyExtractor={(item) => item[0]}
         />
       )}

       </View>
         
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding": "height"} style={styles.writeTask}>
      <TextInput style={styles.input} placeholder={'What your task today?'}value={task} onChangeText={text => setTask(text)} />

      <TouchableOpacity onPress={() =>{handleChange()}}>
        <View style={styles.addTask}>
            <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    
      </View>
  )
}


const styles = StyleSheet.create({
    Container:{
        flex:1,
        marginTop:500
    },
    allTask:{
        position:'relative',
    marginTop:-320,
    width:350
    },
     tasks:{
         backgroundColor: '#FFF',
         padding:15,
         borderRadius:10,
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between',
         width:350,
         marginTop:15
     },
    itemLeft:{
        flexDirection: 'row',
        alignItems:'center',
        flexWrap:'wrap'
    },
    square:{
        width:24,
        height:24,
        backgroundColor: 'green',
        opacity:0.4,
        borderRadius:5,
        marginRight:15,
        
        
    },
    text:{
        maxWidth:'80%',
        width: 100,

    },
    circular:{
        width:50,
        height:25,
        borderRadius:5,
        color:'#FFF',
        borderColor:'red',
        borderWidth:2,
        backgroundColor:'red',
        fontSize:24,
        alignItems:'center'

    },
    writeTask:{
        position:'absolute',
        marginTop:-420,
        width:'100%',
        justifyContent: 'space-around',
        alignItems:'center',
        flexDirection:'row'
      },
      input:{
        width:275,
        paddingVertical:17,
        paddingHorizontal:15,
        backgroundColor: '#FFF',
        borderRadius: 20,
        borderColor: '#C0C0C0',
        borderWidth: 1,
     
    
      },
      addTask:{
        width:60,
        height:60,
        backgroundColor:'#FFF',
        borderRadius:60,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#C0C0C0',
        borderWidth: 1
    
      },
      addText:{
    
      }
})

export default Task;


