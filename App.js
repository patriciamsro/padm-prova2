import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image} from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default App = () => {
  const [date, setDate] = useState(new Date());
  const [nasa, setNasa] = useState(null);
  const [open, setOpen] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const api = () => {
    fetch(
      'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + date.getFullYear() + '-' 
      + date.getMonth() + '-' + date.getDate()
    )
    .then(response => response.json())
    .then(json => setNasa(json.url))
    .catch(err => console.log("erro ", err));
  };

  return (
    <View style={styles.container}>
        <StatusBar/>
        {!nasa ? (
          <>
            <Text style={styles.texto}>{date.toLocaleDateString('fr')}</Text>
            <View style={styles.espacamento}/>
            <Button title="Alterar data" onPress={showDatepicker} />
            <View style={styles.espacamento}/>
            <Button title="Buscar" onPress={() => api()} style={styles.btn}/>
            
            {/* <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={dataSelecionada => {
                setOpen(false);
                setDate(dataSelecionada);
              }}
              onCancel={() => {
                setOpen(false)
              }}
            /> */}
          </>
        ) : (
          <>
            <Button 
              title="Buscar outra foto"
              onPress={() => setNasa(null)} 
              />
            <Image
              style={styles.imagem}
              source={{uri: nasa}}
              resizeMode="contain"  
            />
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    padding: 200,
    flex: 1,
  },
  espacamento: {
    padding: 15,
  },
  texto : {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 20
  }
});
