/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {

  ScrollView,
  StatusBar,
  StyleSheet,

  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { ActivityIndicator, Dialog, MD2Colors, PaperProvider, Portal, Button, Text, Icon } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';





type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [checked, setChecked] = React.useState(false);

  const safePadding = '5%';

  return (
    <PaperProvider>
      <View style={backgroundStyle}>




        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>


        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          style={backgroundStyle}>
          {/* <View style={{paddingRight: safePadding}}>
          <Header/>
        </View> */}
          {/* <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View> */}
          <Text style={{ color: (isDarkMode) ? '#fff' : '#000000' }}>Spin App{(isDarkMode) ? 'dark' : 'light'}</Text>
          <ActivityIndicator animating={true} color={(isDarkMode) ? '#fff' : '#000000'} />
          <Button onPress={showDialog}>Show Dialog</Button>


          <Icon
            source="camera"
            color={'red'}
            size={20}
          />

        </ScrollView>
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
