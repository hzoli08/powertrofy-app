import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import Dashboard from '../screens/Dashboard';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors, size, fonts } from '../theme';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let icon;
                    if (route.name === 'Dashboard') icon = 'home';
                    else if (route.name === 'Workouts') icon = 'barbell';
                    else if (route.name === 'Statistics') icon = 'stats-chart';
                    else if (route.name === 'Settings') icon = 'settings';
                    return <Ionicons name={icon} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: colors.main_font,
                tabBarInactiveTintColor: colors.sec_font,
                tabBarStyle: { backgroundColor: colors.accent, borderTopWidth: 0, height: 128, paddingTop: size.md },
            })}
        >
            <Tab.Screen name='Dashboard' component={Dashboard} />
            <Tab.Screen name='Workouts' component={WorkoutsScreen} />
            <Tab.Screen name='Statistics' component={StatisticsScreen} />
            <Tab.Screen name='Settings' component={SettingsScreen} />
        </Tab.Navigator>
    );
}