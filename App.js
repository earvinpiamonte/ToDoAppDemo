import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const TaskItem = ({task, updateTask, deleteTask, toggleTaskDoneStatus}) => {
  return (
    <View style={styles.flatListItem}>
      <View style={[styles.inputGroup]}>
        <CheckBox
          style={[styles.checkbox]}
          tintColors={{true: 'gray', false: 'black'}}
          value={task.isDone}
          onValueChange={() => {
            toggleTaskDoneStatus(task.id);
          }}
        />
        <TextInput
          style={[styles.textInput, task.isDone && styles.textStrikeThrough]}
          value={task.title}
          onChangeText={(newTitle) => {
            updateTask(task.id, newTitle);
          }}
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
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState('');
  const [sorting, setSorting] = React.useState('all');

  const addTask = (task) => {
    if (task == '') {
      return;
    }

    const dateNow = Date.now().toString();

    setTasks((prevTasks) => [
      {id: dateNow, title: task, isDone: false},
      ...prevTasks,
    ]);

    setNewTask('');
    setSorting('all');
  };

  const addTaskInputHandler = (value) => {
    setNewTask(value);
  };

  const toggleTaskDoneStatus = (id) => {
    setTasks((prevTasks) => {
      const currentTasks = [...prevTasks];

      const taskIndex = currentTasks.findIndex((task) => task.id == id);

      currentTasks[taskIndex].isDone = !currentTasks[taskIndex].isDone;

      return currentTasks;
    });
  };

  const updateTask = (id, newTitle) => {
    setTasks((prevTasks) => {
      const currentTasks = [...prevTasks];

      const taskIndex = currentTasks.findIndex((task) => task.id == id);

      currentTasks[taskIndex].title = newTitle;

      return currentTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
  };

  const taskItem = ({item}) => (
    <TaskItem
      task={item}
      deleteTask={deleteTask}
      updateTask={updateTask}
      toggleTaskDoneStatus={toggleTaskDoneStatus}
    />
  );

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header]}>
        <Text style={[styles.heading]}>To-do</Text>
      </View>
      <View style={[styles.container]}>
        <View style={[styles.inputGroup, styles.form]}>
          <TextInput
            style={[styles.textInput]}
            placeholder="Write something here"
            value={newTask}
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
        {tasks.length > 0 && (
          <View style={[styles.buttonGroup]}>
            <TouchableOpacity
              style={[
                styles.buttonGroupButton,
                sorting === 'all' ? styles.buttonGroupButtonActive : null,
              ]}
              onPress={() => {
                setSorting('all');
                // show all tasks
              }}>
              <Text style={[styles.textBold]}>All {`(${tasks.length})`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonGroupButton,
                sorting === 'done' ? styles.buttonGroupButtonActive : null,
              ]}
              onPress={() => {
                setSorting('done');
              }}>
              <Text style={[styles.textBold]}>
                Done {`(${tasks.filter((task) => task.isDone).length})`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={
            sorting === 'done' ? tasks.filter((task) => task.isDone) : tasks
          }
          renderItem={taskItem}
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
  textBold: {
    fontWeight: 'bold',
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
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonGroupButton: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  buttonGroupButtonActive: {
    borderBottomColor: 'gray',
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
