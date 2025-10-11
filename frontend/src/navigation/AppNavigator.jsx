import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { supabase } from '../lib/supabase';

export default function AppNavigator() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <NavigationContainer>
            {session ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}