import {View, Text, Image, StyleSheet} from 'react-native'

//para mudar a imagem nesse fica mais fácil por que a imagem é uma variável
// export function ProfileImage({ image }) {
//     return(
//         <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
//             <Image source={image} style={{width: 200, height: 200, borderRadius: 100}}></Image>
//         </View>
//     );
// }

export function ProfileImage(){
    return(
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/ronaldinho.png')} style={{width: 200, height: 200, borderRadius: 100}}></Image>
        </View>
    );
}

