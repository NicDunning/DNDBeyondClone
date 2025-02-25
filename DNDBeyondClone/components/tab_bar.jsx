import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react'
import useCharacterContext from '../hooks/useCharacterContext';
import { use } from 'react';
import { LoadCharacters } from './character_data';

export let navigationInstance = null;

const TabBar = ({ state, descriptors, navigation}) => {
    const primaryColor = "#0891b2";
    const secondaryColor = "#737373";
    const {
        characters,
        setCharacters
    } = useCharacterContext()
    navigationInstance = navigation

    const icons = {
        characters: (props) => <MaterialCommunityIcons name="folder-account-outline" size={24} color={secondaryColor} {...props} />,
        explore: (props) => <MaterialCommunityIcons name="magnify" size={24} color={secondaryColor} {...props} />,
        index: (props) => <MaterialCommunityIcons name="home-outline" size={24} color={secondaryColor} {...props} />,
        sheet: (props) => <MaterialCommunityIcons name="note-outline" size={24} color={secondaryColor} {...props} />,
        profile: (props) => <MaterialCommunityIcons name="face-man-profile" size={24} color={secondaryColor} {...props} />,
    }

    return (
        <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
            if(["_sitemap", "+not-found"].includes(route.name)) return null
            if(route.name.includes('sheet_pages')) return null

            const { options } = descriptors[route.key];
            const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = async () => {
                if(route.key.includes('characters')){
                    setCharacters(await LoadCharacters())
                }
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
            };

            const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
            };

            return (
            <TouchableOpacity
                key={route.name}
                // href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabbarItem}
            >
                {
                    icons[route.name]({
                        color: isFocused ? primaryColor : secondaryColor
                    })
                }
                {/* <Text style={{ color: isFocused ? primaryColor : secondaryColor }}>
                {label.charAt(0).toUpperCase() + label.substring(1)}
                </Text> */}
            </TouchableOpacity>
            );
        })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        position: "absolute",
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 2,
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
    }
})

export default TabBar