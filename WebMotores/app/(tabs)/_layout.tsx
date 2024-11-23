import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e60000',  // Cor vermelha para os ícones ativos
        tabBarInactiveTintColor: '#ccc',   // Cor cinza claro para os ícones inativos
        tabBarStyle: {
          backgroundColor: '#121212',  // Fundo escuro da barra de navegação
          borderTopColor: '#333',      // Cor de borda superior (mais suave)
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Comprar',
          tabBarIcon: ({ color }) => <TabBarIcon name="directions-car" color={color} />,
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color }) => <TabBarIcon name="add" color={color} />,
        }}
      />
    </Tabs>
  );
}
