import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button, FlatList, Text, Pressable } from 'react-native';
import React, {useReducer, useState} from 'react';

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {text: action.text, completed: false}]
    case 'REMOVE_TODO':
      return state.filter((todo, index) => index !== action.index)
    }
  }

export default function App() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [text, setText] = useState('');

  function handleAddTodo() {
    dispatch({ type: 'ADD_TODO', text });
    setText('');
    
  }

  return (
    <View style={styles.container}>
        <TextInput 
        value={text} 
        onChangeText={setText} 
        placeholder="Task..."
        />
        <Button title='Save' onPress={() => handleAddTodo()} />

        <FlatList 
          style={{marginTop: 10}}
          data={todos}
          renderItem={({item, index}) => (
            <Pressable onPress={() => dispatch({ type: 'REMOVE_TODO', index })}>
              <View>
                <Text style={{fontSize: 19}}>{item.text}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
