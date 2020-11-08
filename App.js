import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const TASKS = [
  {
    id: '101',
    title: 'Task item one',
    isDone: true,
  },
  {
    id: '102',
    title: 'Another task item',
    isDone: false,
  },
  {
    id: '103',
    title: 'To-do list item third, Lorem ipsum',
    isDone: true,
  },
];

const TaskItem = ({task}) => {
  return (
    <View style={styles.flatListItem}>
      <View style={[styles.inputGroup]}>
        <CheckBox
          style={[styles.checkbox]}
          tintColors={{true: 'gray', false: 'black'}}
          value={task.isDone}
          onValueChange={() => {
            //
          }}
        />
        <TextInput
          style={[styles.textInput, task.isDone && styles.textStrikeThrough]}
          value={task.title}
        />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            // delete task item
          }}>
          <Text style={[styles.buttonLabel]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const renderItem = ({item}) => <TaskItem task={item} />;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header]}>
        <Text style={[styles.heading]}>To-do</Text>
      </View>
      <View style={[styles.container]}>
        <View style={[styles.inputGroup, styles.form]}>
          <TextInput
            style={[styles.textInput]}
            placeholder="Write a to-do item"
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonWide]}
            onPress={() => {
              // add task item
            }}>
            <Text style={[styles.buttonLabel]}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={TASKS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    backgroundColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 80,
    paddingBottom: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#fff',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    fontSize: 18,
  },
  button: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'gray',
    alignSelf: 'flex-end',
    borderRadius: 100,
  },
  buttonWide: {
    paddingLeft: 22,
    paddingRight: 22,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 12,
  },
  textStrikeThrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  checkbox: {
    marginTop: 3,
    marginLeft: -10,
  },
  flatList: {
    marginBottom: 10,
  },
  flatListItem: {
    marginBottom: 10,
  },
});
