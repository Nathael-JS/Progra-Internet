import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';

export default class Listas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos:[],
        };
    }

    componentDidMount(){
        this.cargaDatos();
    }

    cargaDatos = () => {
        console.log("entro");
        let _this = this;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var temp =JSON.parse(xhttp.responseText);
                _this.setState({datos: temp});
            }
        };
        xhttp.open('GET', 'https://progra0internet.000webhostapp.com/mostrar.php');
        xhttp.send();
    };

    render() {
        return (
            <View>
                <FlatList
                style={{marginTop: 10}}
                data={this.state.datos}

                renderItem={({item}) => (
                    <View style={{justifyContent: 'center', marginBottom: 10}}>
                        <Text
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: 10,
                            width: Dimensions.get('window').width,
                        }}>
                            {item.Nombre}
                        </Text>
                        <Text
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: 10,
                            width: Dimensions.get('window').width,
                        }}>
                            {item.Codigo}
                        </Text>
                        <Text
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: 10,
                            width: Dimensions.get('window').width,
                        }}>
                            {item.Centro}
                        </Text>
                        <Text
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: 10,
                            width: Dimensions.get('window').width,
                        }}>
                            {item.Imagen}
                        </Text>
                        </View>
                        )}
                    keyExtractor={item => item.Codigo}
                    keyExtractor={item => item.Centro}
                    keyExtractor={item => item.Imagen}
                    />
            </View>
        );
    }
}