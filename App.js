import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const TASKS = [
  {
    id: '0',
    title: 'This is a test please update',
    isDone: true,
  },
  {
    id: '1',
    title: 'Another task item',
    isDone: false,
  },
  {
    id: '2',
    title: 'To-do list item third, Lorem ipsum',
    isDone: true,
  },
];

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const TaskItem = ({task, deleteTask, toggleTaskDoneStatus}) => {
  return (
    <View style={styles.flatListItem}>
      <View style={[styles.inputGroup]}>
        <CheckBox
          style={[styles.checkbox]}
          tintColors={{true: 'gray', false: 'black'}}
          value={task.isDone}
          onValueChange={() => {
            // update task `isDone` value
            // toggleTaskDoneStatus(task.id, !task.isDone);
          }}
        />
        <TextInput
          style={[styles.textInput, task.isDone && styles.textStrikeThrough]}
          value={task.title}
        />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            deleteTask(task.id);
          }}>
          <Text style={[styles.buttonLabel]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const [tasks, setTasks] = React.useState(TASKS);
  const [newTask, setNewTask] = React.useState('');

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
  };

  const addTask = (task) => {
    const dateNow = Date.now().toString();
    setTasks((prevTasks) => [
      {id: dateNow, title: task, isDone: false},
      ...prevTasks,
    ]);
  };

  const toggleTaskDoneStatus = (taskID, isDone) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id == taskID);
      prevTasks[taskIndex].isDone = isDone;

      console.log(prevTasks[taskIndex].isDone);

      return prevTasks;
    });
  };

  const addTaskInputHandler = (value) => {
    setNewTask(value);
  };

  const taskItem = ({item}) => (
    <TaskItem
      task={item}
      deleteTask={deleteTask}
      toggleTaskDoneStatus={toggleTaskDoneStatus}
    />
  );

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header]}>
        <Text style={[styles.heading]}>To-do {`(${tasks.length})`}</Text>
      </View>
      <View style={[styles.container]}>
        <View style={[styles.inputGroup, styles.form]}>
          <TextInput
            style={[styles.textInput]}
            placeholder="Write something here"
            onChangeText={addTaskInputHandler}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonWide]}
            onPress={() => {
              addTask(newTask);
            }}>
            <Text style={[styles.buttonLabel]}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList data={tasks} renderItem={taskItem} />
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
