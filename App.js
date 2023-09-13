import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, FlatListComponent, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [seconds, setseconds] = useState(0)
  const [minutes, setminutes] = useState(0)
  const [custominteval, setcustominterval] = useState();
  const [estado, setestado] = useState([])

  const startTime = () => {
    setcustominterval(
      setInterval(() => {
        changeTime();
      }, 1000)
    );
  };
  const stopTimer = () => {
    if (custominteval) {
      clearInterval(custominteval);
      var sal = 'Minuto Pausado  ' + minutes + ':' + seconds
      var valor = [...estado]
      valor.unshift(sal)
      setestado(valor)
      console.log(estado)

    }
  };

  const clear = () => {
    stopTimer();
    setseconds(0);
    setminutes(0);
    setestado([]);
  };
  const changeTime = () => {
    setseconds((prevState) => {
      if (prevState + 1 == 60) {
        setminutes(minutes + 1);
        return 0;
      }
      return prevState + 1;
    })

  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTimer}>
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title='Start' onPress={startTime} />
        <Button title='Stop' onPress={stopTimer} />
        <Button title='Reset' onPress={clear} />
      </View>
        <FlatList
          data={estado}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
          style={{height: 30}}
        />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  textTimer: {
    fontSize: 30,

  },
  buttonContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  }
});
