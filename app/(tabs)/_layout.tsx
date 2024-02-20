//tabs layout

import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    //Changing href to 'null' hides the index tab from the tab bar
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }}></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;
