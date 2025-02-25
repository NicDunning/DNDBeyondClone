import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import useCharacterContext from '../hooks/useCharacterContext';
import { useSwipe } from '../hooks/useSwipe'



const SheetTabBar = ({state}) => {
    // console.log(state.navigate.navigate)
    const primaryColor = "#0891b2";
    const secondaryColor = "#737373";

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

    function onSwipeLeft(){
        state.navigate.navigate(state.index + 1)
    }

    function onSwipeRight(){
        state.navigate.navigate(state.index - 1)
    }

    const icons = {
        abilities: (props) => <MaterialCommunityIcons name="dice-6" size={24} color={secondaryColor} {...props} />,
        skills: (props) => <MaterialCommunityIcons name="arm-flex" size={24} color={secondaryColor} {...props} />,
        actions: (props) => <MaterialCommunityIcons name="sword" size={24} color={secondaryColor} {...props} />,
        spells: (props) => <MaterialCommunityIcons name="book-open" size={24} color={secondaryColor} {...props} />,
        features: (props) => <MaterialCommunityIcons name="feather" size={24} color={secondaryColor} {...props} />,
        inventory: (props) => <MaterialCommunityIcons name="treasure-chest" size={24} color={secondaryColor} {...props} />,
    }

    return (
        <ScrollView contentContainerStyle={styles.scroll} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <View style={styles.tabbar} >
                {state.routes.map((route, index) => {
                    const label = route.name
                    const isFocused = state.index === index;

                    const onPress = async () => {
                        state.navigate.navigate(index)
                    };

                    const onLongPress = () => {
                        console.log(route.name, " Longpressed")
                    // navigation.emit({
                    //     type: 'tabLongPress',
                    //     target: route.key,
                    // });
                    };

                    return (
                    <TouchableOpacity
                        key={route.name}
                        // href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        // accessibilityLabel={options.tabBarAccessibilityLabel}
                        // testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >
                        {
                            icons[route.name]({
                                color: isFocused ? primaryColor : secondaryColor
                            })
                        }
                    </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        // position: "absolute",
        // bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        // marginHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 12,
        // borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll:{
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SheetTabBar