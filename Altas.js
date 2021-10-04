import React, { Component } from 'react';
import { View, 
    Text,
    StyleSheet,
    TextInput,
    Picker,
    Image,
    TouchealeOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ActivityIndicator, Button } from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';

export default class Altas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue:'',
            fileUri:'',
            nombre:'',
            password:'',
            codigo:'',
            campus:'',
            rutai:'',
        };
    }

    renderFileUri(){
        if (this.state.fileUri){
            return <Image source={{uri: this.state.fileUri}} style={styles.imagen} />;
        } else {
            return(
                <Image source={require('./Imagenes/user.png')} style={styles.imagen} />
            );
        }
    }

    uploadImageToServer = async () => {
        const response = await fetch(this.state.resourcePath.uri);
        const blob = await response.blob();
        var reader = new FileReader();
        reader.onload = () => {
        
        var InsertAPI = 'https://progra0internet.000webhostapp.com/upload.php';
        console.log(reader.result);
        var Data={img:reader.result};
        var headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
        }
        fetch(InsertAPI,{
        method:'POST',
        headers:headers,
        body:JSON.stringify(Data),
        }).then((response)=>response.json()).then((response)=>{
        console.log("server "+response)
        this.setState({accesofotos: "https://progra0internet.000webhostapp.com"+response})
        console.log(this.state.accesofotos);
        })
        .catch(err=>{
        console.log(err);
        })
        }
        reader.readAsDataURL(blob);
        }

    render() {
        const AltaDatos = () => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange=function(){
                if(this.readyState == 4 && this.status == 200){
                    console.log(xhttp.responseText);
                }
            };
            xhttp.open("GET", "https://progra0internet.000webhostapp.com/auth.php?nom="+this.
            state.nombre+"&codigo="+this.state.codigo+"&pass="+this.state.password+"&centro="+
            this.state.campus+"&imagen="+this.state.rutai, true);
            xhttp.send();
        }


        const accesofotos = () => {
            ImagePicker.launchImageLibrary(
                {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
                },
                response => {
                    console.log(response);
                    var source = response;
                    var array = Object.keys(source).map(function (key) {
                        return source[key]
                    });
                    var finalArray = array[0][0];
                    this.setState({fileUri: finalArray.uri});
                    this.uploadImageToServer();
                    // cosole.log(finalArray.uri);
                },
            );
        };

        return (
            <View>
                <Text style = {styles.titulo}> Altas </Text>
                <View style={styles.inputs}>
                <Input
                    placeholder="Nombre"
                    onChangeText={nombre => this.setState({nombre})} 
                    
                />
                </View>
                <View style={styles.inputs}>
                <Input
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={password => this.setState({password})}  
                    
                />
                </View>
                <View style={styles.inputs}>
                <Input
                    placeholder="Codigo"
                    onChangeText={codigo => this.setState({codigo})}
                />
                </View>
            
                <View style={styles.input}>
                    <Text>Centro Universitario</Text>

                <Picker

                    onValueChange={(campus)=>this.setState({campus})}
                    //selectedValue={this.state.selectedValue}
                    style={{ height: 50, width: 150 }}>
                    <Picker.Item label="CUSH" value="CUSH" />
                    <Picker.Item label="CUCEA" value="CUCEA" />
                    <Picker.Item label="CUCEI" value="CUCEI" />
                    <Picker.Item label="CUTONALA" value="CUTONALA" />
                    <Picker.Item label="CUTLAJO" value="CUTLAJO" />
                </Picker>
                </View>

                <View style={styles.avatar}>
                    <Text>Imagen</Text>
                    <TouchealeOpacity onPress={accesofotos}>
                        {this.renderFileUri()}
                    </TouchealeOpacity>
                </View>
                <View style={styles.boton}>
                    <Button
                    icon={<Icon name="User-plus" size={15} color="white" />}
                    title=" ALta"
                    onPress={AltaDatos}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
titulo:{
    fontSize: 30,
    textAlign: 'center',
},
inputs:{
    marginTop: 10,
    width: 200,
},
avatar:{
    width: 200,
    height: 200,
},
imagen:{
    width: 200,
    height: 200,
},
});